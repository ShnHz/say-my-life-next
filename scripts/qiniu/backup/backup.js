#!/usr/bin/env node

'use strict'

/**
 * 将七牛 Kodo 空间的当前对象全部备份到本地。
 *
 * 凭证从仓库根目录 .env 或环境变量读取：
 *   QINIU_ACCESS_KEY=...
 *   QINIU_SECRET_KEY=...
 *   QINIU_BUCKET=say-my-life       # 可省略，默认 say-my-life
 *   QINIU_BACKUP_PREFIX=           # 可选；默认整个空间
 *   QINIU_DOWNLOAD_DOMAIN=...      # 可选；也兼容 QINIU_PUBLIC_BASE_URL
 *   QINIU_BACKUP_DIR=...           # 可选，默认 ./qiniu-backup/say-my-life
 *   QINIU_CONCURRENCY=4            # 可选
 *
 * 用法：
 *   node scripts/qiniu/backup/backup.js
 *   node scripts/qiniu/backup/backup.js --dest /Volumes/Backup/qiniu
 *   node scripts/qiniu/backup/backup.js --skip-existing
 *
 * 说明：这是“当前对象”备份，不包含七牛历史版本或已删除对象。
 * 目录占位 key（以 / 结尾）会跳过；若父路径曾被写成同名文件，会自动清除以容纳子对象。
 */

const fs = require('fs')
const path = require('path')
const http = require('http')
const https = require('https')
const qiniu = require('qiniu')

try {
  require('dotenv').config({
    path: path.resolve(__dirname, '../../../.env'),
  })
} catch {
  // dotenv 已在本仓库安装；即使未安装，也允许直接使用 shell 环境变量运行。
}

const ROOT = path.resolve(__dirname, '../../..')

function env(name, fallback = '') {
  const value = process.env[name]
  return value == null ? fallback : String(value).trim()
}

function requiredEnv(name) {
  const value = env(name)
  if (!value) {
    throw new Error(`缺少环境变量 ${name}，请在 .env 或 shell 环境中配置`)
  }
  return value
}

function positiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

function parseArgs(argv) {
  const options = {
    dest: env('QINIU_BACKUP_DIR', path.resolve(ROOT, 'qiniu-backup/say-my-life')),
    // 与站点 manifest 的 QINIU_PREFIX 隔离；备份默认必须覆盖整个空间。
    prefix: env('QINIU_BACKUP_PREFIX'),
    skipExisting: false,
    concurrency: positiveInt(env('QINIU_CONCURRENCY', '4'), 4),
    help: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '--help' || arg === '-h') {
      options.help = true
    } else if (arg === '--skip-existing') {
      options.skipExisting = true
    } else if (arg === '--dest') {
      options.dest = path.resolve(argv[++i] || '')
    } else if (arg === '--prefix') {
      options.prefix = argv[++i] || ''
    } else if (arg === '--concurrency') {
      options.concurrency = positiveInt(argv[++i], options.concurrency)
    } else {
      throw new Error(`未知参数：${arg}，使用 --help 查看用法`)
    }
  }

  options.prefix = options.prefix.replace(/^\/+/, '')
  if (options.prefix && !options.prefix.endsWith('/')) options.prefix += '/'
  return options
}

function printHelp() {
  console.log(`用法：
  node scripts/qiniu/backup/backup.js [选项]

选项：
  --dest <目录>          本地备份目录；默认 ./qiniu-backup/say-my-life
  --prefix <前缀>        只备份指定 key 前缀
  --skip-existing        本地文件存在且大小相同则跳过；默认重新下载
  --concurrency <数量>   并发下载数；默认 4
  -h, --help             显示帮助

凭证：
  QINIU_ACCESS_KEY、QINIU_SECRET_KEY 必填
  QINIU_BUCKET 默认 say-my-life
  QINIU_DOWNLOAD_DOMAIN 可选；不填时自动从空间域名列表取第一个
  QINIU_PUBLIC_BASE_URL 可作为 QINIU_DOWNLOAD_DOMAIN 的兼容别名
`)
}

function callbackResult(call) {
  return new Promise((resolve, reject) => {
    call((error, body, responseInfo) => {
      if (error) {
        reject(error)
        return
      }
      const statusCode = responseInfo && responseInfo.statusCode
      if (statusCode && (statusCode < 200 || statusCode >= 300)) {
        reject(new Error(`七牛 API 返回 HTTP ${statusCode}: ${JSON.stringify(body)}`))
        return
      }
      resolve(body)
    })
  })
}

async function listAllObjects(bucketManager, bucket, prefix) {
  const objects = []
  let marker = ''

  do {
    const body = await callbackResult((callback) =>
      bucketManager.listPrefix(
        bucket,
        { prefix, marker, limit: 1000, delimiter: '' },
        callback,
      ),
    )

    for (const item of body.items || []) {
      if (item && item.key) objects.push(item)
    }
    marker = body.marker || ''
    process.stdout.write(`\r已列举 ${objects.length} 个对象`)
  } while (marker)

  process.stdout.write('\n')
  return objects
}

async function resolveDownloadDomain(bucketManager, bucket) {
  const configured = env('QINIU_DOWNLOAD_DOMAIN') || env('QINIU_PUBLIC_BASE_URL')
  if (configured) return configured.replace(/\/+$/, '')

  const domains = await callbackResult((callback) =>
    bucketManager.listBucketDomains(bucket, callback),
  )
  const domain = Array.isArray(domains) && domains.find((item) => item && item.domain)
  if (!domain) {
    throw new Error(
      '没有找到空间域名，请设置 QINIU_DOWNLOAD_DOMAIN（例如 https://cdn.example.com）',
    )
  }
  const value = String(domain.domain).replace(/\/+$/, '')
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

function localPathForKey(root, key) {
  const destination = path.resolve(root, key)
  const relative = path.relative(root, destination)
  if (relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    throw new Error(`对象 key 超出备份目录，已拒绝：${key}`)
  }
  return destination
}

/** 七牛常见的目录占位对象，例如 other/、wedding/；本地无法写成文件。 */
function isDirectoryMarkerKey(key) {
  return key.endsWith('/')
}

/**
 * 确保 target 的父路径都是目录。
 * 若中间某段已被下载成同名文件（常见空目录占位），先删掉再 mkdir。
 */
function ensureParentDirectory(root, target) {
  const parent = path.dirname(target)
  const rootResolved = path.resolve(root)
  const segments = []
  let current = parent
  while (current.startsWith(rootResolved + path.sep) || current === rootResolved) {
    if (current === rootResolved) break
    segments.push(current)
    current = path.dirname(current)
  }

  for (const segment of segments.reverse()) {
    if (!fs.existsSync(segment)) continue
    const stat = fs.statSync(segment)
    if (stat.isFile()) {
      fs.rmSync(segment, { force: true })
    } else if (!stat.isDirectory()) {
      throw new Error(`路径冲突，无法作为目录：${segment}`)
    }
  }

  fs.mkdirSync(parent, { recursive: true })
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function requestToFile(urlString, outputPath, redirects = 0) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString)
    const transport = url.protocol === 'https:' ? https : http
    const request = transport.get(url, (response) => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) {
        const location = response.headers.location
        response.resume()
        if (!location || redirects >= 5) {
          reject(new Error(`下载重定向失败：${urlString}`))
          return
        }
        requestToFile(new URL(location, url).toString(), outputPath, redirects + 1)
          .then(resolve, reject)
        return
      }

      if (response.statusCode < 200 || response.statusCode >= 300) {
        response.resume()
        reject(new Error(`下载失败 HTTP ${response.statusCode}：${urlString}`))
        return
      }

      const output = fs.createWriteStream(outputPath)
      let bytes = 0
      response.on('data', (chunk) => {
        bytes += chunk.length
      })
      response.on('error', (error) => {
        output.destroy()
        reject(error)
      })
      output.on('error', reject)
      output.on('finish', () => resolve(bytes))
      response.pipe(output)
    })

    request.setTimeout(120000, () => request.destroy(new Error('下载超时（120 秒）')))
    request.on('error', reject)
  })
}

async function downloadObject({ bucketManager, domain, root, object, skipExisting }) {
  if (isDirectoryMarkerKey(object.key)) {
    return { key: object.key, skipped: true, size: 0 }
  }

  const target = localPathForKey(root, object.key)
  const temp = `${target}.part-${process.pid}`

  ensureParentDirectory(root, target)

  // 同名路径已是目录（子文件先落盘，或占位 key 无尾斜杠）时，保留目录结构。
  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    return { key: object.key, skipped: true, size: 0 }
  }

  if (skipExisting && fs.existsSync(target)) {
    const stat = fs.statSync(target)
    if (object.fsize == null || stat.size === object.fsize) {
      return { key: object.key, skipped: true, size: stat.size }
    }
  }

  const url = bucketManager.privateDownloadUrl(domain, object.key, Math.floor(Date.now() / 1000) + 3600)
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      ensureParentDirectory(root, target)
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        return { key: object.key, skipped: true, size: 0 }
      }
      const bytes = await requestToFile(url, temp)
      if (object.fsize != null && bytes !== object.fsize) {
        throw new Error(`大小校验失败，期望 ${object.fsize} 字节，实际 ${bytes} 字节`)
      }
      if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
        fs.rmSync(temp, { force: true })
        return { key: object.key, skipped: true, size: 0 }
      }
      fs.renameSync(temp, target)
      return { key: object.key, skipped: false, size: bytes }
    } catch (error) {
      lastError = error
      try {
        fs.rmSync(temp, { force: true })
      } catch {
        // ignore cleanup errors; the next attempt will overwrite the temp file
      }
      if (attempt < 3) await wait(1000 * 2 ** (attempt - 1))
    }
  }

  throw new Error(`${object.key}: ${lastError.message}`)
}

async function runWorkers(objects, options, worker) {
  let next = 0
  let completed = 0
  let skipped = 0
  const failures = []

  async function run() {
    for (;;) {
      const index = next++
      if (index >= objects.length) return
      const object = objects[index]
      try {
        const result = await worker(object)
        completed += 1
        if (result.skipped) skipped += 1
        console.log(`[${completed}/${objects.length}] ${result.skipped ? '跳过' : '完成'} ${object.key}`)
      } catch (error) {
        failures.push(error)
        completed += 1
        console.error(`[${completed}/${objects.length}] 失败 ${object.key}: ${error.message}`)
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(options.concurrency, objects.length || 1) }, run),
  )
  return { skipped, failures }
}

async function main() {
  const options = parseArgs(process.argv.slice(2))
  if (options.help) {
    printHelp()
    return
  }

  const accessKey = requiredEnv('QINIU_ACCESS_KEY')
  const secretKey = requiredEnv('QINIU_SECRET_KEY')
  const bucket = env('QINIU_BUCKET', 'say-my-life')
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const bucketManager = new qiniu.rs.BucketManager(mac, new qiniu.conf.Config())

  fs.mkdirSync(options.dest, { recursive: true })
  const domain = await resolveDownloadDomain(bucketManager, bucket)
  console.log(`空间：${bucket}`)
  console.log(`下载域名：${domain}`)
  console.log(`本地目录：${options.dest}`)
  console.log(`对象前缀：${options.prefix || '(全部)'}`)

  const objects = await listAllObjects(bucketManager, bucket, options.prefix)
  console.log(`共 ${objects.length} 个对象，开始下载（并发 ${options.concurrency}）`)

  const result = await runWorkers(objects, options, (object) =>
    downloadObject({
      bucketManager,
      domain,
      root: options.dest,
      object,
      skipExisting: options.skipExisting,
    }),
  )

  console.log(`备份完成：${objects.length - result.failures.length} 个成功，${result.skipped} 个跳过，${result.failures.length} 个失败`)
  if (result.failures.length) process.exitCode = 1
}

main().catch((error) => {
  console.error(`[qiniu-backup] ${error.message || error}`)
  process.exitCode = 1
})

/**
 * 使用七牛管理凭证列举指定前缀下的对象，生成静态 manifest JSON（供站点读取）。
 *
 * 用法：在仓库根目录配置 .env（勿提交），然后：
 *   npm run manifest:ai-gallery
 *
 * 依赖环境变量见仓库根目录 .env.example
 */

'use strict'

const fs = require('fs')
const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
})

const qiniu = require('qiniu')

function requireEnv(name) {
  const v = process.env[name]
  if (v == null || String(v).trim() === '') {
    throw new Error(
      `缺少环境变量 ${name}，请在仓库根目录创建 .env（可参考 .env.example）`
    )
  }
  return String(v).trim()
}

function normalizePrefix(prefix) {
  if (!prefix) return ''
  return prefix.replace(/^\/+/, '')
}

function normalizeBaseUrl(base) {
  return base.replace(/\/+$/, '')
}

function parseExtFilter(raw) {
  if (!raw || !String(raw).trim()) {
    return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif', 'svg', 'bmp']
  }
  return String(raw)
    .split(',')
    .map((s) => s.trim().toLowerCase().replace(/^\./, ''))
    .filter(Boolean)
}

function keyMatchesExt(key, exts) {
  const lower = key.toLowerCase()
  const dot = lower.lastIndexOf('.')
  if (dot === -1) return false
  const ext = lower.slice(dot + 1)
  return exts.includes(ext)
}

function listPrefixPage(bucketManager, bucket, prefix, marker) {
  return new Promise((resolve, reject) => {
    bucketManager.listPrefix(
      bucket,
      {
        prefix,
        limit: 1000,
        marker: marker || '',
      },
      (err, body, respInfo) => {
        if (err) {
          reject(err)
          return
        }
        if (!respInfo || respInfo.statusCode !== 200) {
          const code = respInfo ? respInfo.statusCode : 'unknown'
          reject(
            new Error(
              `列举失败 HTTP ${code} body=${JSON.stringify(body)}`
            )
          )
          return
        }
        resolve(body)
      }
    )
  })
}

async function listAllObjects(bucketManager, bucket, prefix) {
  const keys = []
  let marker = ''
  for (;;) {
    const body = await listPrefixPage(bucketManager, bucket, prefix, marker)
    const items = body.items || []
    for (const it of items) {
      if (it && it.key) keys.push(it.key)
    }
    marker = body.marker || ''
    if (!marker) break
  }
  return keys
}

async function main() {
  const accessKey = requireEnv('QINIU_ACCESS_KEY')
  const secretKey = requireEnv('QINIU_SECRET_KEY')
  const bucket = requireEnv('QINIU_BUCKET')
  const prefix = normalizePrefix(
    process.env.QINIU_PREFIX != null
      ? process.env.QINIU_PREFIX
      : 'ai-images/'
  )
  const publicBaseUrl = normalizeBaseUrl(
    requireEnv('QINIU_PUBLIC_BASE_URL')
  )

  const outRel =
    process.env.QINIU_MANIFEST_OUT != null &&
    String(process.env.QINIU_MANIFEST_OUT).trim()
      ? String(process.env.QINIU_MANIFEST_OUT).trim()
      : 'docs/public/json/ai-gallery-manifest.json'

  const outAbs = path.resolve(__dirname, '../../', outRel)
  const exts = parseExtFilter(process.env.QINIU_MANIFEST_EXT)

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const config = new qiniu.conf.Config()
  const bucketManager = new qiniu.rs.BucketManager(mac, config)

  const allKeys = await listAllObjects(bucketManager, bucket, prefix)
  const imageKeys = allKeys
    .filter((k) => keyMatchesExt(k, exts))
    .sort((a, b) => a.localeCompare(b))

  const items = imageKeys.map((key) => ({
    key,
    src: `${publicBaseUrl}/${key.replace(/^\/+/, '')}`,
  }))

  const manifest = {
    generatedAt: new Date().toISOString(),
    bucket,
    prefix,
    publicBaseUrl,
    itemCount: items.length,
    items,
  }

  fs.mkdirSync(path.dirname(outAbs), { recursive: true })
  fs.writeFileSync(outAbs, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  console.log(
    `[gen-ai-gallery-manifest] 已写入 ${items.length} 条记录 -> ${outRel}`
  )
}

main().catch((err) => {
  console.error('[gen-ai-gallery-manifest]', err.message || err)
  process.exit(1)
})

const fs = require('fs')
const path = require('path')

exports.createFile = function createFile(filePath, value) {
  writeFileSyncSafe(filePath, value)
}

exports.writeFile = writeFileSyncSafe

/** Recursively create directory (async-style API used by bigFileUpload) */
exports.mkdir = function mkdir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true })
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function writeFileSyncSafe(filePath, value) {
  ensureDirForFile(filePath)
  fs.writeFileSync(filePath, value, 'utf-8')
}

const path = require("path");
const bodyParser = require("body-parser");
const fse = require("fs-extra");
const multiparty = require("multiparty");

const {
    mkdir,
} = require('../../utils/utils_createFile.js');
const {
    has
} = require("core-js/core/dict");

// 大文件存储目录
const UPLOAD_DIR = path.resolve(__dirname, ".", "file");

module.exports = function (app) {
    // post 收到前端传来的分片请求
    app.post('/other/bigFileUploadAndResume/upload', bodyParser.json(), (req, res) => {
        try {
            const multipart = new multiparty.Form();
            multipart.parse(req, async (err, fields, files) => {
                if (err) {
                    return;
                }
                const [chunk] = files.chunk;
                const [hash] = fields.hash;
                const [fileHash] = fields.fileHash;

                // 创建临时文件夹用于临时存储 chunk
                // 添加 chunkDir 前缀与文件名做区分
                const chunkDir = `${UPLOAD_DIR}/chunkDir_${fileHash}`
                await mkdir(chunkDir);
                await fse.move(chunk.path, `${chunkDir}/${hash}`);

                res.json({
                    success: true,
                })
            })
        } catch {
            res.json({
                success: false
            })
        }
    })

    // post 合并分片
    app.post('/other/bigFileUploadAndResume/merge', bodyParser.json(), async (req, res) => {
        const {
            filename,
            fileHash,
            size
        } = req.body


        try {
            const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${extractExt(filename)}`);
            await mergeFileChunk(filePath, fileHash, size);

            res.json({
                success: true,
            })
        } catch {
            res.json({
                success: false
            })
        }
    })

    // get 是否服务器已存在文件
    app.get('/other/bigFileUploadAndResume/hasfile', bodyParser.json(), async (req, res) => {
        const {
            filename,
            fileHash,
        } = req.query

        try {
            const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${extractExt(filename)}`);

            if (fse.existsSync(filePath)) {
                res.json({
                    success: true,
                    shouldUpload: false
                })
            } else {
                res.json({
                    success: true,
                    shouldUpload: true,
                    createUploadedList: await createUploadedList(fileHash)
                })
            }

        } catch {
            res.json({
                success: false
            })
        }
    })
}

// 提取文件后缀名
const extractExt = filename =>
    filename.slice(filename.lastIndexOf("."), filename.length);

// 写入文件流
const pipeStream = (path, writeStream) => {
    return new Promise(resolve => {
        const readStream = fse.createReadStream(path)
        readStream.on("end", () => {
            fse.unlinkSync(path)
            resolve()
        })
        readStream.pipe(writeStream);
    });
}

// 合并切片
const mergeFileChunk = async (filePath, fileHash, size) => {
    const chunkDir = `${UPLOAD_DIR}/chunkDir_${fileHash}`
    const chunkPaths = await fse.readdir(chunkDir);
    // 根据切片下标进行排序
    // 否则直接读取目录的获得的顺序会错乱
    chunkPaths.sort((a, b) => a.split("-")[1] - b.split("-")[1]);
    // 并发写入文件
    await Promise.all(
        chunkPaths.map((chunkPath, index) =>
            pipeStream(
                path.resolve(chunkDir, chunkPath),
                // 根据 size 在指定位置创建可写流
                fse.createWriteStream(filePath, {
                    start: index * size,
                })
            )
        )
    );
    // 合并后删除保存切片的目录
    fse.rmdirSync(chunkDir);
};

// 返回已上传的所有切片名
const createUploadedList = async (fileHash) => {
    return fse.existsSync(`${UPLOAD_DIR}/chunkDir_${fileHash}`) ? await fse.readdir(`${UPLOAD_DIR}/chunkDir_${fileHash}`) : []
};
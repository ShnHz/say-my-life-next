var fs = require('fs');
var path = require('path');

exports.createFile = function (filePath, value) {
    writeFile(filePath, value);
}

exports.writeFile = writeFile
exports.mkdir = mkdir

const dirCache = {};

function writeFile(filePath, value) {
    if (fs.existsSync(filePath)) {} else {
        mkdirSync(filePath);
    }

    fs.writeFile(filePath, value, function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

function mkdirSync(filePath) {
    const arr = filePath.split('/');
    let dir = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (!dirCache[dir] && !fs.existsSync(dir)) {
            dirCache[dir] = true;
            fs.mkdirSync(dir);
        }
        dir = dir + '/' + arr[i];
    }
    fs.writeFileSync(filePath, '')
}

function mkdir(filePath) {
    const arr = filePath.split('/');
    let dir = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (!dirCache[dir] && !fs.existsSync(dir)) {
            dirCache[dir] = true;
            fs.mkdir(dir);
        }
        dir = dir + '/' + arr[i];
    }
}
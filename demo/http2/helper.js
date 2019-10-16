'use strict'

const fs = require('fs');

function getFiles (baseDir) {
  const files = new Map();

  fs.readdirSync(baseDir).forEach((fileName) => { 
    files.set(`/${baseDir}/${fileName}`, getFileDescription(baseDir, fileName))
  });

  return files;
}

function getContentHeader(fileName) {
    const ext = fileName.split('.').pop();
    const mimeTypes = {
        css: 'text/css',
        jpg: 'image/jpeg',
        js: 'application/javascript'
    };

    return {
        'content-type': mimeTypes[ext]
    }
}

function getFileDescription(baseDir, file) {
    return {
        path: `/${baseDir}/${file}`,
        filePath: `./${baseDir}/${file}`,
        headers: getContentHeader(file),
    };
}

module.exports = {
  getFiles
}
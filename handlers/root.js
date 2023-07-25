const path = require('node:path');
const fileSystem = require('node:fs');

module.exports = res =>
{
    var filePath = path.join('public', 'templates', 'index.html');
    var stat = fileSystem.statSync(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', stat.size);
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
}
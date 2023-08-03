const path = require('node:path');
const fs = require('node:fs');

module.exports = res =>
{
    require('./../repository/BaseRepository');
    var filePath = path.join('public', 'templates', 'index.html');
    var stat = fs.statSync(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', stat.size);
    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
}
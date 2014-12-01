var request = require("request");
var fs = require("fs");
var path = require("path");
var progress = require("progress");

module.exports = downloadProgress;

function downloadProgress(url, file_dest, callback) {
  request({
    url: url,
    headers: {
      'User-Agent': "reggi-utils",
      "Accept": "application/octet-stream"
    }
  })
    .on('end', callback)
    .on('error', callback)
    .on('response', function(response) {
      bar = new progress('  [:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: parseInt(response.headers['content-length'])
      });
    })
    .on('data', function(chunk) {
      bar.tick(chunk.length);
    })
    .pipe(fs.createWriteStream(file_dest));
}
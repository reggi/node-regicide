var request = require("request");
var fs = require("fs");
var path = require("path");

module.exports = downloadStream;

function downloadStream(options, callback) {
  request({
    url: options.url,
    headers: {
      'User-Agent': "reggi-utils",
      "Accept": "application/octet-stream"
    }
  })
    .on('end', callback)
    .on('error', callback)
    .pipe(fs.createWriteStream(options.file_dest));
}
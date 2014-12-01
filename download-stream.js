var request = require("request");
var fs = require("fs");
var path = require("path");

module.exports = downloadStream;

function downloadStream(url, file_dest, callback) {
  request({
    url: url,
    headers: {
      'User-Agent': "reggi-utils",
      "Accept": "application/octet-stream"
    }
  })
    .on('end', callback)
    .on('error', callback)
    .pipe(fs.createWriteStream(file_dest));
}
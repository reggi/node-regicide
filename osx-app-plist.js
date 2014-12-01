var untildify = require('untildify');
var plist = require("plist");
var fs = require("fs");
var path = require("path");

module.exports = osxAppPlist;

function osxAppPlist(app_file, callback) {
  var options = {};
  options.appFile = untildify(app_file);
  options.infoPlist = path.join(options.appFile, "Contents", "Info.plist");
  return fs.readFile(options.infoPlist, 'utf8', function(err, data) {
    if (err) return callback(err);
    return callback(null, plist.parse(data));
  });
}
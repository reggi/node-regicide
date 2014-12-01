var untildify = require("untildify");
var osxAppPlist = require("./osx-app-plist");

module.exports = osxAppIconName;

function osxAppIconName(app_file, callback) {
  var options = {};
  options.appFile = untildify(app_file);
  return osxAppPlist(options.appFile, function(err, plist) {
    if (err) return callback(err);
    return callback(null, plist.CFBundleIconFile);
  });
}
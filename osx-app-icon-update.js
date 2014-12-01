var async = require("async");
var untildify = require('untildify');
var fs = require("fs-extra");
var path = require("path");
var osxAppIconTouch = require("./osx-app-icon-touch");
var osxAppIconName = require("./osx-app-icon-name");

module.exports = osxAppIconUpdate;

function osxAppIconUpdate(options, callback) {
  options.iconFile = untildify(options.icon_file);
  options.appFile = untildify(options.app_file);
  options.appFileExt = path.extname(options.appFile);
  options.appFileName = path.basename(options.appFile, options.appFileExt);
  options.iconDirectory = (options.appFileExt == ".app") ? path.join(options.appFile, "Contents", "Resources") : options.app_file;
  options.iconFileExt = path.extname(options.iconFile);
  return async.auto({
    "icon_name": async.apply(osxAppIconName, options.appFile),
    "copy_icon": ["icon_name",
      function(callback, results) {
        results.existing_icon = path.join(options.iconDirectory, results.icon_name);
        return fs.copy(options.iconFile, results.existing_icon, callback);
      }
    ],
    "touch_icon": ["copy_icon", async.apply(osxAppIconTouch, options.appFile)],
  }, callback);
}
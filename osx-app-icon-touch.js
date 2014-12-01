// https://gist.github.com/fabiofl/5873100#comment-1320553
var untildify = require('untildify');
var async = require("async");
var path = require("path");
var childProcess = require("child_process");

module.exports = osxAppIconTouch;

function osxAppIconTouch(app_file, callback) {
  var exec = childProcess.exec;
  var options = {};
  options.appFile = untildify(app_file);
  options.infoPlist = path.join(options.appFile, "Contents", "Info.plist");
  return async.parallel({
    "touch_app": async.apply(exec, "touch " + options.appFile),
    "touch_plist": async.apply(exec, "touch " + options.infoPlist),
  }, callback);
}
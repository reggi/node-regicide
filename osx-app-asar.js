var fs = require('fs-extra')
var async = require("async");
var path = require("path");
var untildify = require('untildify');
var minimistReverse = require("./minimist-reverse");
var childProcess = require("child_process");

module.exports = osxAppAsar;

function osxAppAsar(options, callback) {
  options.appFile = untildify(options.app_file);
  options.tmp = path.join(options.appFile, "..", "tmp", "app");
  options.source = path.join(options.appFile, "/Contents", "/Resources", "/app");
  options.destination = path.join(options.appFile, "/Contents", "/Resources", "app.asar");
  var exec = childProcess.exec;
  var flags = ["pack", options.source, options.destination].join(" ");
  return async.parallel({
    "move_asar": async.apply(fs.move, options.destination, options.tmp),
    "asar": async.apply(exec, 'asar ' + flags),
    "move_app": async.apply(fs.move, options.source, options.tmp),
  }, callback);
}
var minimistReverse = require("./minimist-reverse");
var childProcess = require("child_process");

module.exports = codesign;

function codesign(options, callback) {
  if (!options.path) return callback(new Error("missing options.path"));
  var exec = childProcess.exec;
  options["_"] = [];
  options["_"].push(options.path);
  delete options.path;
  options = minimistReverse(options);
  return exec('codesign ' + options, callback);
}
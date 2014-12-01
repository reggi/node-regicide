var childProcess = require("child_process");

module.exports = mongoBoot;

function mongoBoot(logPath, callback) {
  var exec = childProcess.exec;
  var command = "mongod --fork --logpath " + logPath;
  return exec(command, callback);
}
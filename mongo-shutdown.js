var childProcess = require("child_process");

module.exports = mongoShutdown;

function mongoShutdown(callback) {
  var exec = childProcess.exec;
  var command = "mongo --eval \"db.getSiblingDB('admin').shutdownServer()\"";
  return exec(command, callback);
}
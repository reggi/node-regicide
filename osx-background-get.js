var osascript = require('node-osascript');

module.exports = osxBackgroundGet;

function osxBackgroundGet(callback) {
  osascript.execute([
    'tell application "System Events"',
    'tell current desktop',
    'get picture',
    'end tell',
    'end tell'
  ].join("\n"), callback);
}
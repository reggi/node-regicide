var osascript = require('node-osascript');

module.exports = osxBackgroundSet;

function osxBackgroundSet(wallpaperPath, callback) {
  osascript.execute([
    'tell application "Finder"',
    'set desktop picture to POSIX file "' + wallpaperPath + '"',
    'end tell'
  ].join("\n"), callback);
}
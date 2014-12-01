var minimist = require('minimist');

module.exports = minimistString;

var minimistString = function(string) {
  string = string.split(" ");
  return minimist(string);
}
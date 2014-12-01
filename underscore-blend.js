//https://stackoverflow.com/questions/20103565/convert-array-of-objects-to-just-one-object
// convert array of objects to objects
var _ = require("underscore");

module.exports = underscoreBlend;

function underscoreBlend(array) {
  return _.extend.apply(null, [{}].concat(array));
}
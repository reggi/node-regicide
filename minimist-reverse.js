module.exports = minimistReverse;

function minimistReverse(minimistObject) {
  var strings = [];
  for (var key in minimistObject) {
    var value = minimistObject[key];
    if (key !== "_") {
      if (value == true) {
        strings.push("--" + key);
      } else {
        strings.push("--" + key);
        strings.push(JSON.stringify(value));
      }
    }
  }
  var _ = minimistObject["_"];
  var _length = _.length;
  for (var i = 0; i < _length; i++) {
    strings.push(_[i]);
  }
  return strings.join(" ");
}
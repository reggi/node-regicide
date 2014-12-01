var request = require("request");

module.exports = githubReleases;

function githubReleases(repo, callback) {
  return request({
    url: 'https://api.github.com/repos/' + repo + '/releases',
    json: true,
    headers: {
      'User-Agent': "github-releases-js"
    }
  }, function(error, response, body) {
    if (error) return callback(error);
    if (response.statusCode == 403) return callback(new Error("github API unexpected response in githubReleases() with HTTP response code of " + response.statusCode + '. Probably hit the throttle limit.'));
    if (response.statusCode != 200) return callback(new Error("github API unexpected response in githubReleases() with HTTP response code of " + response.statusCode));
    return callback(null, body);
  });
}
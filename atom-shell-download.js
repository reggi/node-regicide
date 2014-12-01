var path = require("path");
var async = require("async");
var fs = require("fs-extra");
var semver = require("semver");
var _ = require("underscore");
_.blend = require("./underscore-blend");
var untildify = require("untildify");
var githubReleases = require("./github-releases");
var downloadProgress = require("./download-progress");
var downloadStream = require("./download-stream");

module.exports = atomShellDownload;

function versionLatest(releases) {
  return _.findWhere(releases, {
    'prerelease': false
  }).tag_name;
}

function versionValid(releases, version) {
  var versions = _.map(releases, function(value, key) {
    return value.tag_name;
  });
  return _.contains(versions, version);
}

function platformFiles(options) {
  return _.map(options.platforms, function(platform) {
    return ["atom-shell", options.version, platform].join("-") + ".zip";
  });
}

function buildDownloads(releases, options) {
  var release = _.findWhere(releases, {
    "tag_name": options.version,
  });
  var platform_files = platformFiles(options);
  var map = _.map(platform_files, function(file) {
    var platform = _.findWhere(release.assets, {
      "name": file,
    });
    return {
      "name": platform.name,
      "browser_download_url": platform.browser_download_url,
      "file_dest": path.join(options.destination, platform.name)
    }
  });
  return map;
}

function atomShellDownload(options, callback) {
  if (options.version && !semver.valid(options.version)) return callback("invalid semver version");
  options.repo = "atom/atom-shell";
  options.platforms = options.platforms || [process.platform + "-" + process.arch];
  options.version = options.version || false;
  options.destination = options.destination || "cache";
  options.destination = path.resolve(untildify(options.destination));
  options.download_progress = options.download_progress || false;
  async.auto({
    "destination": async.apply(fs.mkdirs, options.destination),
    "releases": function(callback) {
      githubReleases("atom/atom-shell", function(err, releases) {
        if (err) return callback(err);
        if (options.version && !versionValid(releases, options.version)) return callback(new Error("version not found"));
        options.version = options.version || versionLatest(releases);
        options.downloads = buildDownloads(releases, options);
        return callback(null, options);
      });
    },
    "check_cache": ["releases",
      function(callback, results) {
        var downloads = _.clone(results.releases.downloads);
        async.map(downloads, function(download, callback) {
          fs.exists(download.file_dest, function(exists) {
            download.exists = exists;
            return callback(null, download);
          });
        }, callback);
      }
    ],
    "download": ["destination", "check_cache",
      function(callback, results) {
        var downloads = _.clone(results.check_cache);
        if (typeof downloads == "undefined") return callback(null, new Error("downloads is undefined"));
        if (downloads.length == 0) return callback(null, new Error("downloads is a empty array"));
        async.map(downloads, function(download, callback) {
          if (download.exists) return callback(null, new Error(download.name + " download exists"));
          var dl = (options.download_progress) ? downloadProgress : downloadStream;
          return dl({
            "url": download.browser_download_url,
            "file_dest": download.file_dest,
          }, callback);
        }, callback);
      }
    ]
  }, callback);
}
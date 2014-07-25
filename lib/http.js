var request = require('request');

module.exports.get = function (url, options, cb) {
  var proxy = /^https/.test(url) ? process.env.HTTPS_PROXY : process.env.HTTP_PROXY;

  options.proxy = proxy || undefined;

  request.get(url, options, function (err, res, body) {
    if (err) return cb(err);

    if (res.statusCode !== 200) {
      return cb(new Error('Request for ' + res.request.href + ' failed with status code ' + res.statusCode));
    }

    cb(err, res, body);
  });
}

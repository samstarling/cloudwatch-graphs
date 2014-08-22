var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  httpOptions: {
    proxy: 'http://www-cache.reith.bbc.co.uk:80'
  },
  sslEnabled: false
});

module.exports.metric = function (namespace, metric, cb) {
  var cloudwatch = new AWS.CloudWatch();

  var params = {
    MetricName: metric,
    Namespace: namespace,
    Period: 60,
    StartTime: new Date(new Date().getTime() - (6 * 60 * 60 * 1000)),
    EndTime: new Date,
    Statistics: [ 'Average' ],
  };

  cloudwatch.getMetricStatistics(params, function(err, data) {
    if (err) cb(err);
    else cb(null, data.Datapoints);
  });
}


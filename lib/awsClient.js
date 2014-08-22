var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({ region: config.awsRegion });

if(process.env.HTTP_PROXY != null) {
  AWS.config.update({
    httpOptions: { proxy: process.env.HTTP_PROXY },
    sslEnabled: false
  });
}

module.exports.metric = function (namespace, metric, cb) {
  var cloudwatch = new AWS.CloudWatch();

  var params = {
    MetricName: metric,
    Namespace: namespace,
    Period: config.period,
    StartTime: new Date(new Date().getTime() - (config.hoursToShow * 60 * 60 * 1000)),
    EndTime: new Date,
    Statistics: ['Average'],
  };

  cloudwatch.getMetricStatistics(params, function(err, data) {
    if (err) cb(err);
    else cb(null, data.Datapoints);
  });
}


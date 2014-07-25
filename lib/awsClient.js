var AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
});

module.exports.metric = function (name, cb) {
  var cloudwatch = new AWS.CloudWatch();

  var params = {
    MetricName: name,
    Namespace: 'response-monitoring',
    Period: 60,
    StartTime: new Date(new Date().getTime() - (2 * 60 * 60 * 1000)),
    EndTime: new Date,
    Statistics: [ 'Average' ],
  };

  cloudwatch.getMetricStatistics(params, function(err, data) {
    if (err) cb(err);
    else cb(null, data.Datapoints);
  });
}


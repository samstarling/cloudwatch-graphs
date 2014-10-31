var AWS = require('aws-sdk');
var config = require('../config');

AWS.config.update({ region: config.awsRegion });

if(process.env.HTTP_PROXY != null) {
  AWS.config.update({
    httpOptions: { proxy: process.env.HTTP_PROXY },
    sslEnabled: false
  });
}

function compare(a,b) {
  if (a.Timestamp < b.Timestamp)
    return -1;
  if (a.Timestamp > b.Timestamp)
    return 1;
  return 0;
}

var cloudwatch = new AWS.CloudWatch();

module.exports.metric = function (params, cb) {
  params['StartTime'] = new Date(new Date().getTime() - ((24 * 5) * 60 * 60 * 1000));
  params['EndTime'] = new Date(new Date().getTime() - (config.hoursToShow * 60 * 60 * 1000));
  params['Statistics'] = ['Average'];
  params['Period'] = config.period;

  cloudwatch.getMetricStatistics(params, function(err, data) {
    if (err) cb(err);
    else cb(null, data.Datapoints.sort(compare));
  });
}

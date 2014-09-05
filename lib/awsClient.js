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

module.exports.metric = function (options, cb) {

  var dimensions = [];
  if(options.metric == "2xxStatuses") {
    dimensions = [
        {
            "Name": "Environment",
            "Value": "test"
        },
        {
            "Name": "Zenoss",
            "Value": "BBCApp"
        },
        {
            "Name": "valueType",
            "Value": "GAUGE"
        }
    ]
  }

  var params = {
    MetricName: options.metric,
    Namespace: options.namespace,
    Period: config.period,
    StartTime: options.from,
    EndTime: options.to,
    Dimensions: dimensions,
    Statistics: ['Average'],
  };

  cloudwatch.getMetricStatistics(params, function(err, data) {
    if (err) cb(err);
    else cb(null, data.Datapoints.sort(compare));
  });
}

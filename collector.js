var AWS = require('aws-sdk');
var http = require('./lib/http.js')

AWS.config.update({
  region: 'eu-west-1',
});

var cloudwatch = new AWS.CloudWatch();

var apigeeKey = process.env.APIGEE_KEY;
var start = Date.now();

http.get('http://data.bbc.co.uk/ldp/creative-works?api_key=' + apigeeKey, {}, function(err, res, body) {
  var time = Date.now() - start;

  var params = {
    MetricData: [ {
      MetricName: 'ldp-core-response-time',
      Timestamp: new Date,
      Value: time,
      Unit: 'Milliseconds'
    } ],
    Namespace: 'response-monitoring'
  }

  cloudwatch.putMetricData(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Success: Time of ' + time);
  });
})

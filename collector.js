var AWS = require('aws-sdk');
var http = require('./lib/http.js')

AWS.config.update({
  region: 'eu-west-1',
});

var cloudwatch = new AWS.CloudWatch();

var apigeeKey = process.env.APIGEE_KEY;

function report(url, metricName) {
  var start = Date.now();

  http.get(url + '&api_key=' + apigeeKey, {}, function(err, res, body) {
    var time = Date.now() - start;

    var params = {
      MetricData: [ {
        MetricName: metricName,
        Timestamp: new Date,
        Value: time,
        Unit: 'Milliseconds'
      } ],
      Namespace: 'response-monitoring'
    }

    cloudwatch.putMetricData(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else console.log(metricName + ': Time of ' + time);
    });
  })
}

report('http://data.bbc.co.uk/ldp/creative-works?', 'ldp-core-response-time');
report('http://data.bbc.co.uk/ldp/creative-works-v2?', 'ldp-core-cw-v2-response-time');
report('http://data.bbc.co.uk/ldp/creative-works-v2?about=creative-works-v2?about=32308873-9c53-4071-97b5-4aa7129a4bc5', 'ldp-core-cw-v2-london-response-time');
report('http://data.bbc.co.uk/ldp/tag-concepts?', 'ldp-core-tag-concepts-response-time');
report('http://data.bbc.co.uk/ldp/tag-concepts?', 'ldp-core-datasets-response-time');
report('http://data.bbc.co.uk/ldp/tag-concepts?', 'ldp-core-ontologies-response-time');

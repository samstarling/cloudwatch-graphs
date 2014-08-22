var awsClient = require('../lib/awsClient');
var config = require('../config');
var _ = require('underscore');

module.exports.index = function (req, res, next) {
  res.render('index', {
    title: config.title,
    metrics: config.metrics
  });
}

module.exports.data = function (req, res, next) {
  awsClient.metric(req.query.namespace, req.query.metric, function(err, data) {
    var transformedData = data.map(function(cur, idx) {
      return {
        x: cur.Timestamp.getTime() / 1000,
        y: cur.Average
      }
    });

    res.json([{
      name: 'data',
      data: _.sortBy(transformedData, 'x')
    }]);
  });
}

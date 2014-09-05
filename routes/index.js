var awsClient = require('../lib/awsClient');
var config = require('../config');
var _ = require('underscore');

var transformations = {
  'identity': function(data, idx) {
    return data[idx].Average
  },
  'counter': function(data, idx) {
    return data[idx].Average - (data[idx - 1] || 0).Average
  }
}

function transformFor(metricType) {
  return transformations[metricType] || transformations['identity'];
}

module.exports.index = function (req, res, next) {
  res.render('index', {
    title: config.title,
    metrics: config.metrics,
    period: config.period,
    hours: config.hoursToShow
  });
}

module.exports.data = function (req, res, next) {
  var options = {
    namespace: req.query.namespace,
    metric: req.query.metric,
    from: new Date(new Date().getTime() - (config.hoursToShow * 60 * 60 * 1000)),
    to: new Date()
  }

  awsClient.metric(options, function(err, data) {
    var transformedData = data.map(function(cur, idx) {
      return {
        x: cur.Timestamp.getTime() / 1000,
        y: transformFor(req.query.type)(data, idx)
      }
    });

    res.json([{
      name: 'data',
      data: _.sortBy(transformedData, 'x')
    }]);
  });
}

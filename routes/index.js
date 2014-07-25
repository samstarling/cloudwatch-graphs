var awsClient = require('../lib/awsClient');
var _ = require('underscore');

module.exports.index = function (req, res, next) {
  res.render('index');
}

module.exports.data = function (req, res, next) {
  awsClient.metric(req.query.id, function(err, data) {
    var transformedData = data.map(function(x) { return {
      x: x.Timestamp.getTime() / 1000,
      y: x.Average
    }});

    res.json([{
      name: "Response Time",
      data: _.sortBy(transformedData, 'x')
    }]);
  });
}

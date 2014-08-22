// function addCommas(nStr) {
//   nStr += '';
//   x = nStr.split('.');
//   x1 = x[0];
//   x2 = x.length > 1 ? '.' + x[1] : '';
//   var rgx = /(\d+)(\d{3})/;
//   while (rgx.test(x1)) {
//     x1 = x1.replace(rgx, '$1' + ',' + '$2');
//   }
//   return x1 + x2;
// }


$(document).ready(function() {

  function initializeGraph($metrics, namespace, metric) {
    var axes;
    var $metric = $($metrics[0]);
    var graph = new Rickshaw.Graph.Ajax( {
        element: $metric.find(".metric--graph")[0],
        height: 140,
        min: 'auto',
        renderer: 'line',
        interpolation: 'line',
        dataURL: 'data?namespace=' + namespace + '&metric=' + metric,
        onComplete: function(transport) {
          var graph = transport.graph;
          if(!axes) {
            axes = new Rickshaw.Graph.Axis.Time({
              graph: graph,
              fixedTimeUnit: 1
            });
            var hoverDetail = new Rickshaw.Graph.HoverDetail( {
                graph: graph,
                formatter: function(series, x, y) {
                    return y;
                }
            });
          }
          var data = graph.series[0].data;
          var last = Math.floor(data[data.length - 1].y);
          $metric.find('.metric--value').text(last);
          graph.update();
        },
        series: [
          { name: 'data', color: '#45B29D' }
        ]
    });

    setInterval(function() {
      graph.request();
    }, 1000);
  }


  var formatDate = d3.time.format.iso;
  $(".metric").each(function( index ) {
    $metric = $(this);
    var namespace = $metric.attr('data-namespace');
    var metricName = $metric.attr('data-metric-name');
    initializeGraph($metric, namespace, metricName);
  });
});

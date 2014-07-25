odometerOptions = { auto: false }; // Disables auto-initialization

function initializeGraph(id, dataURL) {
  var axes;
  var graph = new Rickshaw.Graph.Ajax( {
      element: document.getElementById(id).getElementsByClassName("graph")[0],
      height: 140,
      renderer: 'line',
      dataURL: dataURL,
      interpolation: 'linear',
      padding: {
        top: 0.03,
        bottom: 0
      },
      onComplete: function(transport) {
        var graph = transport.graph;
        if(!axes) {
          axes = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            fixedTimeUnit: 1
          });
          var hoverDetail = new Rickshaw.Graph.HoverDetail( {
              graph: graph
          } );
          axes.render();
        }
        var data = graph.series[0].data;
        var last = data[data.length - 1];
        $("#" + id + " .stats .latest .number").text(Math.floor(last.y));
        graph.update();
      },
      series: [ {
        name: 'Response Time',
        color: '#45B29D',
      } ]
  });


  setInterval(function() {
    graph.request();
  }, 10000000);
}

$(document).ready(function() {
  var formatDate = d3.time.format.iso;
  initializeGraph('cw', 'data?id=ldp-core-response-time')
  initializeGraph('cw-v2', 'data?id=ldp-core-cw-v2-response-time')
  initializeGraph('tc', 'data?id=ldp-core-tag-concepts-response-time')
});

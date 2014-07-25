$(document).ready(function() {
  var formatDate = d3.time.format.iso;

  var graph = new Rickshaw.Graph.Ajax( {
      element: document.getElementById("graph"),
      height: 100,
      min: 'auto',
      renderer: 'line',
      dataURL: 'data',
      interpolation: 'linear',
      padding: {
        top: 0.03,
        bottom: 0.3
      },
      onComplete: function(transport) {
        var graph = transport.graph;
        var detail = new Rickshaw.Graph.HoverDetail({ graph: graph });
        var xAxis = new Rickshaw.Graph.Axis.Time({ graph: graph });
        graph.update();
      },
      series: [ {
        name: 'Response Time',
        color: '#000000',
      } ]
  });
});

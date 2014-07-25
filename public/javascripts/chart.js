function initializeGraph(id, dataURL) {
  var axes;
  var graph = new Rickshaw.Graph.Ajax( {
      element: document.getElementById(id).getElementsByClassName("graph")[0],
      height: 140,
      min: 0,
      renderer: 'line',
      dataURL: dataURL,
      onComplete: function(transport) {
        var graph = transport.graph;
        if(!axes) {
          axes = new Rickshaw.Graph.Axis.Time({
            graph: graph,
            fixedTimeUnit: 1
          });
          var hoverDetail = new Rickshaw.Graph.HoverDetail( {
              graph: graph
          });
        }
        var data = graph.series[0].data;
        var last = Math.floor(data[data.length - 1].y);
        $("#" + id + " .stats .latest .number").text(last);
        if(last > 750) {
          $("#" + id + " .stats .latest .number").addClass("bad");
        } else {
          $("#" + id + " .stats .latest .number").addClass("good");
        }


        graph.update();
      },
      series: [
        { name: 'Response Time', color: '#45B29D' }
      ]
  });


  setInterval(function() {
    graph.request();
  }, 1000);
}

$(document).ready(function() {
  var formatDate = d3.time.format.iso;
  initializeGraph('cw', 'data?id=ldp-core-response-time')
  initializeGraph('cw-v2', 'data?id=ldp-core-cw-v2-response-time')
  initializeGraph('cwl', 'data?id=ldp-core-cw-v2-london-response-time')
  initializeGraph('tc', 'data?id=ldp-core-tag-concepts-response-time')
  initializeGraph('d', 'data?id=ldp-core-datasets-response-time')
  initializeGraph('o', 'data?id=ldp-core-ontologies-response-time')
});

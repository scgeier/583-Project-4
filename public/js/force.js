var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-920)
    .linkDistance(200)
    .size([width, height]);

var svg = d3.select("#force").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("js/force.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 2);

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return setRadius(d);})
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);


  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
 
  function setRadius(d) {
        if (d.perCapitaGdp == null) {
            return 5;
        }else{
        return (d.perCapitaGdp / 2000);
        }
 };
 
});
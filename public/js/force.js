var width = 720,
    height = 563;

var margin = 10;

//var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-100)
    .linkDistance(80)
    .size([(width - margin), (height - (margin/2))]);

var svg = d3.select("#force")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 500")
    .attr("class", "force")
    //class to make it responsive
    .classed("svg-content-responsive", true);
    
var tooltip = d3.select("body").append("div")
                .attr("class", "col-xs-12 tooltip")
                .style("position", "absolute")
                .style("opacity", 0);

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
      .style("stroke-width", 2)
      .style("stroke-dasharray", function(d){ return d.value; })

 
  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return setRadius(d);})
      .style("fill", function(d) { return d.color; })
      .call(force.drag)
      .on("mouseenter", function(d){
        d3.select("#territories-intro")
          .transition()
          .duration(300)
          .style("opacity", 0)
          
         tooltip
          .transition()
          .duration(300)
          .ease("back")
          .attr("class", "summary")
          .style("opacity", 1)
          .style("left", "55%")
          .style("bottom", "5%")
  
        tooltip.html(
            "<img class='map' src='" + d.map + "'/>"  + "<h3>" + d.name + "</h3>" + "Controlled by: " + d.governor + "</br>Per capita GDP: " + gdpNull(d) + "</br></br>" + "<div class='territory-info'>" + d.info + "</div>")
      
        console.log(d.name);
      })
      
    //Remove nation info on mouseleave//
      .on("mouseleave", function(d){
        d3.select("#territories-intro")
          .transition()
          .duration(300)
          .style("opacity", 1)
         tooltip
          .transition()
          .duration(300)
          .ease("back")
          .style("opacity", 0)
         console.log("mouseout");
      });

        
  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        //.style("stroke-dasharray", function(d){ return dashedLine(); });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
  });
  
//
  function dashedLine(d) {
    if (d.source == 7) {
        return [5,5];
    }else{
      return "none";
    }
 };
 
  function gdpNull(d){
          if (d.perCapitaGdp == null) {
            return "N/A";
          }else{
            return "$" + d.perCapitaGdp;
          }
        };
        
  function setRadius(d) {
        if (d.perCapitaGdp == null) {
            return 4;
        }else{
        return (d.perCapitaGdp / 3000);
        }
 };
 
 
});
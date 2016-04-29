var width = 720,
    height = 563;

var margin = 10;

//Set up the D3 force layout//
var force = d3.layout.force()
    .charge(-100)
    .linkDistance(80)
    .size([(width - margin), (height - (margin/2))]);

//Make a responsive SVG canvas for the chart//
var svg = d3.select("#force")
    .append("div")
    .classed("svg-container", true) 
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 500")
    .attr("class", "force")
    .classed("svg-content-responsive", true);

//Make a tooltip//
var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("opacity", 0);

//Call the JSON data//
d3.json("js/force.json", function(error, graph) {
  if (error) throw error;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

//Make the links//
  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", 2)
      .style("stroke-dasharray", function(d){ return d.value; })

//Make the circles, with the radius a function of per capita GDP and colors according to which country owns each territory
  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", function(d){ return setRadius(d);})
      .style("fill", function(d) { return d.color; })
      .call(force.drag)
//Make the tooltip appear on mouseovers, and hide the main intro section//
      .on("mouseenter", function(d){
        d3.select("#territories-intro")
          .transition()
          .duration(300)
          .style("opacity", 0)
          
         tooltip
          .transition()
          .duration(300)
          .ease("back")
          .style("opacity", 1)
          .style("left", "55%")
          .style("top", "10%")
  
        tooltip.html(
            "<img class='map' src='" + d.map + "'/>"  + "<h3>" + d.name + "</h3>" + "Controlled by: " + d.governor + "</br>Per capita GDP: " + gdpNull(d) + "</br></br>" + "<div class='tooltip-text'>" + d.info + "</div>")
      
        console.log(d.name);
      })
      
//Remove tooltip on mouseout//
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

//Add a smaller tooltip with just the country's name over each circle//  
  node.append("title")
      .text(function(d) { return d.name; });

//Allow users to drag the circles, but with some snap back//
  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
  });
  
//Return "N/A" when the territory's GDP value is null
  function gdpNull(d){
          if (d.perCapitaGdp == null) {
            return "N/A";
          }else{
            return "$" + d.perCapitaGdp;
          }
        };

//Make the circle radius a function of GDP, and give null values a small set radius, so they aren't completely invisbible//         
  function setRadius(d) {
        if (d.perCapitaGdp == null) {
            return 4;
        }else{
        return (d.perCapitaGdp / 3000);
        }
 };
 
 
});
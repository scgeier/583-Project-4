var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("opacity", 0);
                
d3.json("js/nations.json", function(error, data) {
  if (error) throw error;

  //data.forEach(function(d) {
    //d.sepalLength = +d.sepalLength;
    //d.sepalWidth = +d.sepalWidth;
  //});

//Set the X and Y axes using the min amd max values in the given array//
  x.domain(d3.extent(data, function(d) { return d.agriculture; })).nice();
  y.domain(d3.extent(data, function(d) { return d.perCapitaGdp; })).nice();

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Percent of Land Used for Agriculture");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Per Capita GDP")

 svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4.5)
      .attr("cx", function(d) { return x(d.agriculture); })
      .attr("cy", function(d) { return y(d.perCapitaGdp); })
      .style("fill", function(d) { return color(d.population); })
      .on("mouseenter", function(d){
            if (d.background !== undefined) {
                  
        d3.select("#summary")
         tooltip.transition()
          .delay(200)
          .attr("class", "summary")
          .style("opacity", 1)
          .style("left", "50%")
          .style("bottom", "45%")
  
          
          tooltip.html("<h3>" + d.id + "</h3>"
                       + d.background)
            }
      })
      
    //Remove author bio on mouseleave//
      .on("mouseleave", function(d){
            d3.select("#summary")
           .style("opacity", 1)
         tooltip.transition().style("opacity", 0)
      });

});
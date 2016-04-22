$(document).ready(function(){
    console.log("DOM loaded!");
    
var selectedXAxis = 'obesity';
var selectedYAxis = 'healthExpenditures';
var globalData = null;

var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category20();

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
  
  
   
function init(){
  d3.json("js/nations.json", function(error, data) {
  if (error) throw error;
  
  globalData = data;


//Set the X and Y axes using the min amd max values in the given array of values//
  x.domain(d3.extent(data, function(d) { return d[selectedXAxis]; })).nice();
  y.domain(d3.extent(data, function(d) { return d[selectedYAxis]; })).nice();

svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "x label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text(function(d){ return setXAxisText();});

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(function(d){ return setYAxisText();});

 svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 4)
      .attr("cx", function(d) { console.log(d[selectedXAxis]); return x(d[selectedXAxis]); })
      .attr("cy", function(d) { console.log(d[selectedYAxis]); return y(d[selectedYAxis]); })
      .style("fill", function(d) { return color(d.population); })
      .on("mouseenter", function(d){
        //if (d.background !== undefined) {//
                  
         tooltip.transition()
          .delay(200)
          .attr("class", "summary")
          .style("opacity", 1)
          .style("left", "70%")
          .style("bottom", "45%")
  
        tooltip.html("<h3>" + d.name + "</h3>")
        
        console.log(d.name);
      })
      
    //Remove nation info on mouseleave//
      .on("mouseleave", function(d){
         tooltip.transition().style("opacity", 0)
         console.log("mouseout");
      });

       
  $( "#target" ).submit(function( event ) {
                        selectedYAxis = $("select.yOptions option:selected").val();
                        selectedXAxis = $("select.xOptions option:selected").val();
                        console.log(selectedXAxis + selectedYAxis);
                        update();
     }); //close selected X function
  
  function setXAxisText(d) {
    if (selectedXAxis  == "obesity") {
        return "obesity rates";
    }else if(selectedXAxis  == "healthExpenditures"){
        return "Percent GPD Spent on Healthcare";
    }else{
        return "whah?";
    }
  };
  
    function setYAxisText(d) {
    if (selectedYAxis  == "obesity") {
        return "obesity rates";
    }else if(selectedYAxis  == "healthExpenditures"){
        return "Percent GPD Spent on Healthcare";
    }else{
        return "whah?";
    }
  };
  


  function update() {
    
     x.domain(d3.extent(data, function(d) { return d[selectedXAxis]; })).nice();
     y.domain(d3.extent(data, function(d) { return d[selectedYAxis]; })).nice();

     svg.selectAll("g.x.axis")
        .call(xAxis);
        
     svg.selectAll("g.y.axis")
        .call(yAxis);
     
     svg.selectAll(".x.label")
        .transition()
        .text(function(d){return setXAxisText();})
    
     svg.selectAll(".y.label")
        .transition()
        .text(function(d){return setYAxisText();})
        
     svg.selectAll(".dot")
      .transition()
      .duration(2000)
      .ease("elastic")
      .attr("cx", function(d) { console.log(d[selectedXAxis]); return x(d[selectedXAxis]); })
      .attr("cy", function(d) { console.log(d[selectedYAxis]); return y(d[selectedYAxis]); })
};
 
  });//close d3.json
};//close init();

init();
});//close document ready function


$(document).ready(function(){
    console.log("DOM loaded!");
    
var selectedXAxis = 'obesity';
var selectedYAxis = 'healthExpenditures';
var globalData = null;

var margin = {top: 20, right: 20, bottom: 40, left: 75},
    width = 860 - margin.left - margin.right,
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


//Set the X and Y axes using the min amd max values from the user's chosen data set//
  x.domain(d3.extent(data, function(d) { return d[selectedXAxis]; })).nice();
  y.domain(d3.extent(data, function(d) { return d[selectedYAxis]; })).nice();

//Make the X axis, with the label a function of the data
svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "x label")
      .attr("x", width)
      .attr("y", 37)
      .style("font-size", 15)
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text(function(d){ return setXAxisText();});

//Make the Y axis, with the label's content AND position a function of the data
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y", function(d){ return labelPosition();})
      .attr("dy", ".7em")
      .style("font-size", 15)
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text(function(d){ return setYAxisText();});

 svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", hideNulls)
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
        return "Percentage of GPD Spent on Healthcare";
    }else if(selectedXAxis  == "population"){
        return "Population (millions)";
    }else if(selectedXAxis  == "popGrowth"){
        return "Population Growth Rate (%)";
    }else if(selectedXAxis  == "perCapitaGdp"){
        return "Per Capita GDP";
    }else if(selectedXAxis  == "migration"){
        return "Net Migration Rate (0 migrants/1,000 people)";
    }else if(selectedXAxis  == "infantMortality"){
        return "Infant Mortality (number of deaths per 1000 births)";
    }else if(selectedXAxis  == "lifeExpectancy"){
        return "Life Expectancy";
    }else if(selectedXAxis  == "education"){
        return "Percentage of GDP Spent on Education";
    }else if(selectedXAxis  == "unemployment"){
        return "Unemployment Rate";
    }else if(selectedXAxis  == "area"){
        return "Area (1,000 sq km)";
    }else if(selectedXAxis  == "budget"){
        return "Budget Deficit or Surplus (% of GDP)";
    }else if(selectedXAxis  == "debt"){
        return "External Debt (billion US $)";
    }else if(selectedXAxis  == "fossilFuels"){
        return "Electricity from Fossil Fuels (%)";
    }else if(selectedXAxis  == "internet"){
        return "Internet Users (% of population)";
    }else if(selectedXAxis  == "airports"){
        return "Airports";
    }else if(selectedXAxis  == "military"){
        return "Percentage of GDP Spent on Military";
    }
  };
  
    function setYAxisText(d) {
    if (selectedYAxis  == "obesity") {
        return "obesity rates";
    }else if(selectedYAxis  == "healthExpenditures"){
        return "Percentage of GPD Spent on Healthcare";
    }else if(selectedYAxis  == "population"){
        return "Population (millions)";
    }else if(selectedYAxis  == "popGrowth"){
        return "Population Growth Rate (%)";
    }else if(selectedYAxis  == "perCapitaGdp"){
        return "Per Capita GDP";
    }else if(selectedYAxis  == "migration"){
        return "Net Migration Rate (0 migrants/1,000 people)";
    }else if(selectedYAxis  == "infantMortality"){
        return "Infant Mortality (number of deaths per 1000 births)";
    }else if(selectedYAxis  == "lifeExpectancy"){
        return "Life Expectancy";
    }else if(selectedYAxis  == "education"){
        return "Percentage of GDP Spent on Education";
    }else if(selectedYAxis  == "unemployment"){
        return "Unemployment Rate";
    }else if(selectedYAxis  == "area"){
        return "Area (1,000 sq km)";
    }else if(selectedYAxis  == "budget"){
        return "Budget Deficit or Surplus (% of GDP)";
    }else if(selectedYAxis  == "debt"){
        return "External Debt (billion US $)";
    }else if(selectedYAxis  == "fossilFuels"){
        return "Electricity from Fossil Fuels (%)";
    }else if(selectedYAxis  == "internet"){
        return "Internet Users (% of population)";
    }else if(selectedYAxis  == "airports"){
        return "Airports";
    }else if(selectedYAxis  == "military"){
        return "Percentage of GDP Spent on Military";
    }
  };

function labelPosition(d) {
    if ((selectedYAxis == "area") || (selectedYAxis == "population") || (selectedYAxis == "debt") || (selectedYAxis == "perCapitaGdp") || (selectedYAxis == "airports")) {
        return 6;
    }else{
        return -42;
    }
};

function hideNulls(d) {
    if ((d[selectedXAxis] == null) || (d[selectedYAxis] == null)){
        return 0;
    }else{
        return 4;
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
        .attr("y", function(d){ return labelPosition();})
        .text(function(d){return setYAxisText();})
        
     svg.selectAll(".dot")
      .transition()
      .duration(2000)
      .ease("elastic")
      .attr("r", hideNulls)
      .attr("cx", function(d) { console.log(d[selectedXAxis]); return x(d[selectedXAxis]); })
      .attr("cy", function(d) { console.log(d[selectedYAxis]); return y(d[selectedYAxis]); })
};
 
  });//close d3.json
};//close init();

init();
});//close document ready function


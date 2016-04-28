$(document).ready(function(){
    console.log("DOM loaded!");
    
var selectedXAxis = 'Obesity Rate';
var selectedYAxis = 'Health Expenditures';
var globalData = null;

var margin = {top: 10, right: 70, bottom: 40, left: 65},
    width = 654 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

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

var svg = d3.select("#chart")
    .append("div")
    .classed("svg-container", true) //container class to make it responsive
    .append("svg")
//responsive SVG needs these 2 attributes and no width and height attr
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 600 500")
    .attr("class", "scatterplot")
    //class to make it responsive
    .classed("svg-content-responsive", true)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("background", "white")
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
      .style("font-size", 10)
      .call(xAxis)
    .append("text")
      .attr("class", "x label")
      .attr("x", width - 10)
      .attr("y", 37)
      .style("font-size", 10)
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text(function(d){ return setXAxisText();});

//Make the Y axis, with the label's content AND position a function of the data
  svg.append("g")
      .attr("class", "y axis")
      .style("font-size", 10)
      .call(yAxis)
    .append("text")
      .attr("class", "y label")
      .attr("transform", "rotate(-90)")
      .attr("y", function(d){ return labelPosition();})
      .attr("dy", ".4em")
      .style("font-size", 10)
      .style("font-weight", 200)
      .style("text-anchor", "end")
      .text(function(d){ return setYAxisText();});

var dots = svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", hideNulls)
      .attr("cx", 150)
      .attr("cy", 50)
      .style("fill", function(d) { return color(d.Population); })
      .on("mouseenter", function(d){        
         tooltip.transition(d)
          .delay(200)
          .attr("class", "summary")
          .style("opacity", .9)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px")
  
        tooltip.html("<h4>" + d.name + "</h4>" + selectedXAxis + ": " + d[selectedXAxis] + xUnits() + "</br>"
                     + selectedYAxis + ": " + d[selectedYAxis] + yUnits())
        
        console.log(d.name);
      })
      
    //Remove nation info on mouseleave//
      .on("mouseleave", function(d){
         tooltip.transition().style("opacity", 0)
         console.log("mouseout");
      });

dots.transition()
    .attr("cx", function(d) { console.log(d[selectedXAxis]); return x(d[selectedXAxis]); })
    .attr("cy", function(d) { console.log(d[selectedYAxis]); return y(d[selectedYAxis]); })
    .duration(3000)
    .ease("elastic");
       
  $( "#target" ).submit(function( event ) {
                        selectedYAxis = $("select#yOptions option:selected").val();
                        selectedXAxis = $("select#xOptions option:selected").val();
                        console.log(selectedXAxis + selectedYAxis);
                        update();
     }); //close selected X function
  
  function setXAxisText(d) {
    if (selectedXAxis  == "Obesity Rate") {
        return "obesity rates";
    }else if(selectedXAxis  == "Health Expenditures"){
        return "Percentage of GPD Spent on Healthcare";
    }else if(selectedXAxis  == "Population"){
        return "Population (millions)";
    }else if(selectedXAxis  == "Population Growth"){
        return "Population Growth Rate (%)";
    }else if(selectedXAxis  == "Per Capita GDP"){
        return "Per Capita GDP";
    }else if(selectedXAxis  == "Net Migration Rate"){
        return "Net Migration Rate (0 migrants/1,000 people)";
    }else if(selectedXAxis  == "Infant Mortality Rate"){
        return "Infant Mortality (number of deaths per 1000 births)";
    }else if(selectedXAxis  == "Life Expectancy"){
        return "Life Expectancy";
    }else if(selectedXAxis  == "Education Expenditures"){
        return "Percentage of GDP Spent on Education";
    }else if(selectedXAxis  == "Unemployment Rate"){
        return "Unemployment Rate";
    }else if(selectedXAxis  == "Area"){
        return "Area (1,000 sq km)";
    }else if(selectedXAxis  == "Budget Deficit or Surplus"){
        return "Budget Deficit or Surplus (% of GDP)";
    }else if(selectedXAxis  == "External Debt"){
        return "External Debt (billion US $)";
    }else if(selectedXAxis  == "Fossil Fuel Use"){
        return "Electricity from Fossil Fuels (%)";
    }else if(selectedXAxis  == "Internet Use"){
        return "Internet Users (% of population)";
    }else if(selectedXAxis  == "Airports"){
        return "Airports";
    }else if(selectedXAxis  == "Military Expenditures"){
        return "Percentage of GDP Spent on Military";
    }
  };
  
    function setYAxisText(d) {
    if (selectedYAxis  == "Obesity Rate") {
        return "obesity rates";
    }else if(selectedYAxis  == "Health Expenditures"){
        return "Percentage of GPD Spent on Healthcare";
    }else if(selectedYAxis  == "Population"){
        return "Population (millions)";
    }else if(selectedYAxis  == "Population Growth"){
        return "Population Growth Rate (%)";
    }else if(selectedYAxis  == "Per Capita GDP"){
        return "Per Capita GDP";
    }else if(selectedYAxis  == "Net Migration Rate"){
        return "Net Migration Rate (0 migrants/1,000 people)";
    }else if(selectedYAxis  == "Infant Mortality Rate"){
        return "Infant Mortality (number of deaths per 1000 births)";
    }else if(selectedYAxis  == "Life Expectancy"){
        return "Life Expectancy";
    }else if(selectedYAxis  == "Education Expenditures"){
        return "Percentage of GDP Spent on Education";
    }else if(selectedYAxis  == "Unemployment Rate"){
        return "Unemployment Rate";
    }else if(selectedYAxis  == "Area"){
        return "Area (1,000 sq km)";
    }else if(selectedYAxis  == "Budget Deficit or Surplus"){
        return "Budget Deficit or Surplus (% of GDP)";
    }else if(selectedYAxis  == "External Debt"){
        return "External Debt (billion US $)";
    }else if(selectedYAxis  == "Fossil Fuel Use"){
        return "Electricity from Fossil Fuels (%)";
    }else if(selectedYAxis  == "Internet Use"){
        return "Internet Users (% of population)";
    }else if(selectedYAxis  == "Airports"){
        return "Airports";
    }else if(selectedYAxis  == "Military Expenditures"){
        return "Percentage of GDP Spent on Military";
    }
  };

function labelPosition(d) {
    if ((selectedYAxis == "Area") || (selectedYAxis == "Population") || (selectedYAxis == "External Debt") || (selectedYAxis == "Per Capita GDP") || (selectedYAxis == "Airports")) {
        return 6;
    }else{
        return -42;
    }
};

function hideNulls(d) {
    if ((d[selectedXAxis] == null) || (d[selectedYAxis] == null)){
        return 0;
    }else{
        return 3;
    }
};

var xUnits = function () {
    if (selectedXAxis == "Obesity Rate"){
        return "%";
    }else if(selectedXAxis  == "Health Expenditures"){
        return "% of GDP";
    }else if(selectedXAxis  == "Population"){
        return " million people";
    }else if(selectedXAxis  == "Population Growth"){
        return "%";
    }else if(selectedXAxis  == "Per Capita GDP"){
        return " (US $)";
    }else if(selectedXAxis  == "Net Migration Rate"){
        return " (per 1,000 people)";
    }else if(selectedXAxis  == "Infant Mortality Rate"){
        return " (deaths per 1000 births)";
    }else if(selectedXAxis  == "Life Expectancy"){
        return " years";
    }else if(selectedXAxis  == "Education Expenditures"){
        return "% of GDP";
    }else if(selectedXAxis  == "Unemployment Rate"){
        return "%";
    }else if(selectedXAxis  == "Area"){
        return " (x 1,000 sq km)";
    }else if(selectedXAxis  == "Budget Deficit or Surplus"){
        return "% of GDP";
    }else if(selectedXAxis  == "External Debt"){
        return " (billion US $)";
    }else if(selectedXAxis  == "Fossil Fuel Use"){
        return "% of total installed electrical capacity ";
    }else if(selectedXAxis  == "Internet Use"){
        return "% of population";
    }else if(selectedXAxis  == "Airports"){
        return "";
    }else if(selectedXAxis  == "Military Expenditures"){
        return "% of GDP";
    }
};

var yUnits = function () {
    if (selectedYAxis == "Obesity Rate"){
        return "%";
    }else if(selectedYAxis  == "Health Expenditures"){
        return "% of GDP";
    }else if(selectedYAxis  == "Population"){
        return " million people";
    }else if(selectedYAxis  == "Population Growth"){
        return "%";
    }else if(selectedYAxis  == "Per Capita GDP"){
        return " (US $)";
    }else if(selectedYAxis  == "Net Migration Rate"){
        return " (per 1,000 people)";
    }else if(selectedYAxis  == "Infant Mortality Rate"){
        return " (deaths per 1000 births)";
    }else if(selectedYAxis  == "Life Expectancy"){
        return " years";
    }else if(selectedYAxis  == "Education Expenditures"){
        return "% of GDP";
    }else if(selectedYAxis  == "Unemployment Rate"){
        return "%";
    }else if(selectedYAxis  == "Area"){
        return " (x 1,000 sq km)";
    }else if(selectedYAxis  == "Budget Deficit or Surplus"){
        return "% of GDP";
    }else if(selectedYAxis  == "External Debt"){
        return " (billion US $)";
    }else if(selectedYAxis  == "Fossil Fuel Use"){
        return "% of total installed electrical capacity ";
    }else if(selectedYAxis  == "Internet Use"){
        return "% of population";
    }else if(selectedYAxis  == "Airports"){
        return "";
    }else if(selectedYAxis  == "Military Expenditures"){
        return "% of GDP";
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

$("#mobile-about-button").click(function() {
         $("#scatterplot-intro").fadeToggle("medium", "linear");
         $(this).toggle();
         $("#mobile-close-button").toggle();
     });

$("#mobile-close-button").click(function() {
         $("#scatterplot-intro").fadeToggle("medium", "linear");
         $(this).toggle();
     });

});//close document ready function
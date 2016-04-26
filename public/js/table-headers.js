$(document).ready(function(){
    console.log("DOM ready!");

 $("#population-info").mouseover(function(){
         $('#appendix-population').toggle(200);
         $('#rankings-introduction').toggle(200);
            });
 
  $("#population-info").mouseout(function(){
         $('#appendix-population').toggle(200);
         $('#rankings-introduction').toggle(200);
            });
 
 $("#pop-growth-info").mouseover(function(){
         $('#appendix-pop-growth').toggle(200);
         $('#rankings-introduction').toggle(200);
            });
 
  $("#pop-growth-info").mouseout(function(){
         $('#appendix-pop-growth').toggle(200);
         $('#rankings-introduction').toggle(200);
            });
});
$(document).ready(function() {
  display_plates();
  display_index();
});
/*
 * All plates
 */
 function display_plates() {
   $.ajax({
     url: "/myplates",
     type: "GET",
     data {
       user:user
     },
     success : function(json){
       html = "<ul>";
       $.each(json.user, function(index,element)){
         html += "<li>" + element.name +"</li>"
       }
       hml +="</ul>"
     }
   })
 }

 function display_index() {
   $.ajax({
     url: "/",
     type: "GET",
     data {
       propositions:propositions
     },
     success : function(json){
       html = "<ul>";
       $.each(json.user, function(index,element)){
         html += "<li>" + element.name +"</li>"
       }
       hml +="</ul>"
     }
     error{

     }
   })
 }

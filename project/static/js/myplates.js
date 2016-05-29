$(document).ready(function() {
  /*
   * All plates
   */
   function display_plates() {
     $.ajax({
       url: "/myplates",
       type: "GET",
       data {
         plate_list:plate_list
       },
       success : function(json){
         html = "<ul>";
         $.each(plate=json.plate_list){
           html += "<li>" + plate.name +"</li>"
         }
         hml +="</ul>"
       }
     })
   }
});

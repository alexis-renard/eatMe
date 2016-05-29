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
         $.each(json.plate_list, function(index,element)){
           html += "<li>" + element.name +"</li>"
         }
         hml +="</ul>"
       }
     })
   }
});

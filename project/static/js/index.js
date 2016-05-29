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
     url: "/home_user",
     type: "GET",
     data: {
       propositions:propositions
     },
     success : function(json){
       $.each(json.propositions){

       }
     }
     error{

     }
   })
 }

 // {% for user in propositions %}
 //   <div class="item">
 //     <div class="testimonial-thumb">
 //       <img class="img-circle" src="../static/images/gerard.jpg" alt="testimonial" >
 //     </div>
 //     <div class="testimonial-content">
 //       <h3 class="name">{{ user.username }}<span>Description</span></h3>
 //       <p class="testimonial-text">
 //         What loved
 //       </p>
 //     </div>
 //   </div>
 //   {% endfor %}

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
       $("#main_container").empty();
       var html = "";
       $.each(json.propositions, function (cle,valeur)){

        html+=" <div class=\"item\">"
        html+="   <div class=\"testimonial-thumb\">"
        html+="     <img class=\"img-circle\" src=\"images/team/pic1.jpg\" alt=\"testimonial\" >"
        html+="   </div>"
        html+="   <div class=\"testimonial-content\">"
        html+="     <h3 class=\"name\">Katee Nureen <span>Exectuive Director</span></h3>"
        html+="     <p class=\"testimonial-text\">"
        html+="       iLorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose. Lorem Ipsum is that it as opposed to using."
        html+="     </p>"
        html+="   </div>"
        html+=" </div>"
        $("#main_container").html(html);
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

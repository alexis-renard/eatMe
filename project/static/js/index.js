$(document).ready(function() {
  $("#login").click(function() {
        display_login();
    });
});
/*
 * All plates
 */
 // function display_plates() {
 //   $.ajax({
 //     url: "/myplates",
 //     type: "GET",
 //     data {
 //       user:user
 //     },
 //     success : function(json){
 //       html = "<ul>";
 //       $.each(json.user, function(index,element)){
 //         html += "<li>" + element.name +"</li>"
 //       }
 //       hml +="</ul>"
 //     }
 //   })
 // }
 //
 // function display_index() {
 //   $.ajax({
 //     url: "/home_user",
 //     type: "GET",
 //     data: {
 //       propositions:propositions
 //     },
 //     success : function(json){
 //       $("#main_container").empty();
 //       var html = "";
 //       $.each(json.propositions, function (username,dico_plates)){
 //          html+=" <div class=\"item\">"
 //          html+="   <div class=\"testimonial-thumb\">"
 //          html+="     <img class=\"img-circle\" src=\"images/team/pic1.jpg\" alt=\"testimonial\" >"
 //          html+="   </div>"
 //          html+="   <div class=\"testimonial-content\">"
 //          html+="     <h3 class=\"name\">"+username+" <span>Exectuive Director</span></h3>"
 //          html+="     <p class=\"testimonial-text\">"
 //          html+="       iLorem Ipsum as their default model text, and a search for ‘lorem ipsum’ will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose. Lorem Ipsum is that it as opposed to using."
 //          html+="     </p>"
 //          html+="   </div>"
 //          html+=" </div>"
 //       }
 //       $("#testimonial-carousel").append(html);
 //     }
 //     error : function(json){
 //     }
 //   })
 // }

function display_login(){
  $("#main_container").empty();
  var html = "";
  html +="<section id=\"contact\">";
  html +="    <div class=\"container\">";
  html +="        <div class=\"row\">";
  html +="          <div class=\"col-md-12 col-sm-12 col-xs-12\">";
  html +="                  <div class=\"feature_header text-center\">";
  html +="                      <h3 class=\"feature_title\">Sign <b>in</b></h3>";
  html +="                      <h4 class=\"feature_sub\">Take your seats! There's enough cake for everybody!  </h4>";
  html +="                      <div class=\"divider\"></div>";
  html +="                  </div>";
  html +="          </div>";
  html +="        </div>";
  html +="        <div class=\"row\">";
  html +="          <form class=\"form-horizontal\" role=\"form\" method=\"POST\" action=\"{{ url_for('login') }}\">";
  $("#main_container").append(html);
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

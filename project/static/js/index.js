$(document).ready(function() {
    $("#login").click(function() {
        display_login();
    });
    $("#register").click(function() {
          display_register();
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
    html +="    <div class=\"row\">"
    html +="         <div class=\"contact_full\">"
    html +="            <div class=\"col-md-12 text-center\">"
    html +="                <div class=\"center_contact\">"
    html +="                    <form action=\"role\">"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"username\" placeholder=\"Username\" id=\"username\"  value=\"\" type=\"text\" class=\"input-block\">"
    html +="                            <span class=\"form-icon fa fa-user\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"password\" placeholder=\"Password\" id=\"password\" class=\"input-block\" value=\"\" type=\"password\">"
    html +="                            <span class=\"form-icon fa fa-key \"></span>"
    html +="                    </form>"
    html +="                </div>"
    html +="            </div>"
    html +=""
    html +="            <div class=\"col-md-12 text-center\">"
    html +="                <button class=\"btn btn-main featured\">Let's eat</button>"
    html +="            </div>"
    html +="        </div>"
    html +="    </div>"
    html +="</section>";
  $("#main_container").append(html);
}



function display_register(){
    $("#main_container").empty();
    var html = "";
    html +="<section id=\"contact\">";
    html +="    <div class=\"container\">";
    html +="        <div class=\"row\">";
    html +="          <div class=\"col-md-12 col-sm-12 col-xs-12\">";
    html +="                  <div class=\"feature_header text-center\">";
    html +="                      <h3 class=\"feature_title\">Sign <b>up</b></h3>";
    html +="                      <h4 class=\"feature_sub\">Fresh meat is near...</h4>";
    html +="                      <div class=\"divider\"></div>";
    html +="                  </div>";
    html +="          </div>";
    html +="        </div>";
    html +="        <div class=\"row\">";
    html +="         <div class=\"contact_full\">"
    html +="            <div class=\"col-md-6 left\">"
    html +="                <div class=\"left_contact\">"
    html +="                    <form action=\"role\">"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"username\" placeholder=\"Username\" id=\"username\"  value=\"\" type=\"text\" class=\"input-block\">"
    html +="                            <span class=\"form-icon fa fa-user\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"password\" placeholder=\"Password\" id=\"password\" class=\"input-block\" value=\"\" type=\"password\">"
    html +="                            <span class=\"form-icon fa fa-key\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"firstName\" placeholder=\"First Name\" id=\"firstName\" class=\"input-block\" value=\"\" type=\"firstName\">"
    html +="                            <span class=\"form-icon fa fa-hand-spock-o\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"lastName\" placeholder=\"Last Name\" id=\"lastName\" class=\"input-block\" value=\"\" type=\"lastName\">"
    html +="                            <span class=\"form-icon fa fa-hand-paper\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"email\" placeholder=\"Email\" id=\"mail\" class=\"input-block\" value=\"\" type=\"email\">"
    html +="                            <span class=\"form-icon fa fa-envelope\"></span>"
    html +="                        </div>"
    html +="                        <div class=\"form-level\">"
    html +="                            <input name=\"email\" placeholder=\"Email\" id=\"mail\" class=\"input-block\" value=\"\" type=\"email\">"
    html +="                            <span class=\"form-icon fa fa-envelope\"></span>"
    html +="                        </div>"
    html +="                    </form>"
    html +="                </div>"
    html +="            </div>"
    html +=""
    html +="            <div class=\"col-md-6 right\">"
    html +="                <div class=\"form-level\">"
    html +="                    <textarea name=\"desc\" id=\"desc\"  rows=\"10\" class=\"textarea-block\" placeholder=\"Description\"></textarea>"
    html +="                    <span class=\"form-icon fa fa-pencil\"></span>"
    html +="                </div>"
    html +="            </div>"
    html +="            <div class=\"col-md-12 text-center\">"
    html +="                <button class=\"btn btn-main featured\">Submit Now</button>"
    html +="            </div>"
    html +="        </div>"
    html +="    </div>"
    html +="</section>";
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

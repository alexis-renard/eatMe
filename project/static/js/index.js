$(document).ready(function() {
    bindings();
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
 //       $.each(json.user, function(index,element)){
 //         html += "<li>" + element.name +"</li>"
 //       }
 //       hml
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
 //       $.eacsitions:propositions
 //     },
 //     success : function(json){
 //       $("#mml+="     <img class=\"img-circle\" src=\"images/team/pic1.jpg\" alt=\"testimonial\" >"
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

 function bindings(){
   $("#login_form").bind("submit", post_login);
   $("#register_form").bind("submit", post_register);

   $("#login").click(function() {
       display_login();
   });
   $("#register").click(function() {
         display_register();
   });
   $("#my_profil").click(function() {
       my_profil();
   });
 }

function add_love(id){
  console.log("begin");
  var dict = {username : id };
  console.log(dict);
  var data = JSON.stringify(dict);
  console.log(data);
  $.ajax({
    url: "/user/loved",
    type: "PUT",
    contentType:"application/json",
    data: data,
    success: function(json){
        window.location.reload();
    }
  })
}

function post_login(){
     $("#login_form").submit(function(e){
         e.preventDefault();
         var dict={
              username: $('input[id="username"]').val(),
              password: $('input[id="password"]').val()
          };
         var datas=JSON.stringify(dict);
         console.log("test");
         // test form
         $.ajax({
                url: "/user",
                type: "POST",
                contentType:"application/json",
                data: datas,
                success: function(json){
                    window.location.reload();
                    // display_home() ;
                }
            });
        bindings();
        return false;
    });
}

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
    html +="    <div class=\"row\">";
    html +="         <div class=\"contact_full\">";
    html +="            <div class=\"col-md-12 text-center\">";
    html +="                <div class=\"center_contact\">";
    html +="                    <form id=\"login_form\" methods='POST'>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"username\" placeholder=\"Username\" id=\"username\" class=\"input-block\" value=\"\" type=\"username\">";
    html +="                            <span class=\"form-icon fa fa-user \"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"password\" placeholder=\"Password\" id=\"password\" class=\"input-block\" value=\"\" type=\"password\">";
    html +="                            <span class=\"form-icon fa fa-key \"></span>";
    html +="                        </div>";
    html +="                        <input id=\"login_submit\"type=\"submit\" value=\"Do Eat\" class=\"btn btn-main featured\">";
    html +="                    </form>";
    html +="                </div>";
    html +="            </div>";
    html +="        </div>";
    html +="    </div>";
    html +="</section>";
    $("#main_container").append(html);
    post_login();
}



function post_register(){
    $("#register_form").submit(function(e){
        e.preventDefault();
        var dict={
             username: $('input[id="username"]').val(),
             password: $('input[id="password"]').val(),
             firstName: $('input[id="firstName"]').val(),
             lastName: $('input[id="lastName"]').val(),
             email: $('input[id="email"]').val(),
             picture: $('input[id="picture"]').val(),
             desc: $('textarea[id="desc"]').val(),
             town: $('input[id="town"]').val()
        };
        var datas=JSON.stringify(dict);
        console.log("test");
        $.ajax({
               url: "/user",
               type: "PUT",
               contentType:"application/json",
               data: datas,
               success: function(json){
                   window.location.reload();
                   display_home();
               }
           });
       bindings();
       return false;
    });
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
    html +="         <div class=\"contact_full\">";
    html +="            <div class=\"col-md-6 left\">";
    html +="                <div class=\"\">";
    html +="                    <form id=\"register_form\">";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"username\" placeholder=\"Username\" id=\"username\"  value=\"\" type=\"text\" class=\"input-block\">";
    html +="                            <span class=\"form-icon fa fa-user\"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"password\" placeholder=\"Password\" id=\"password\" class=\"input-block\" value=\"\" type=\"password\">";
    html +="                            <span class=\"form-icon fa fa-key\"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"firstName\" placeholder=\"First Name\" id=\"firstName\" class=\"input-block\" value=\"\" type=\"firstName\">";
    html +="                            <span class=\"form-icon fa fa-hand-o-left\"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"lastName\" placeholder=\"Last Name\" id=\"lastName\" class=\"input-block\" value=\"\" type=\"lastName\">";
    html +="                            <span class=\"form-icon fa fa-hand-o-right\"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"email\" placeholder=\"Email\" id=\"email\" class=\"input-block\" value=\"\" type=\"email\">";
    html +="                            <span class=\"form-icon fa fa-envelope\"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"picture\" placeholder=\"Picture\" id=\"picture\" class=\"input-block\" value=\"\" type=\"picture\">";
    html +="                            <span class=\"form-icon fa fa-picture-o \"></span>";
    html +="                        </div>";
    html +="                        <div class=\"form-level\">";
    html +="                            <input name=\"town\" placeholder=\"Town\" id=\"town\" class=\"input-block\" value=\"\" type=\"town\">";
    html +="                            <span class=\"form-icon fa fa-building-o \"></span>";
    html +="                        </div>";
    html +="                        <input id=\"register_submit\"type=\"submit\" value=\"Time to Eat\" class=\"btn btn-main featured\">";
    html +="                    </form>";
    html +="                </div>";
    html +="            </div>";
    html +="";
    html +="            <div class=\"col-md-6 right\">";
    html +="                <div class=\"form-level\">";
    html +="                    <textarea name=\"desc\" id=\"desc\"  rows=\"10\" class=\"textarea-block\" placeholder=\"Description\"></textarea>";
    html +="                    <span class=\"form-icon fa fa-pencil\"></span>";
    html +="                </div>";
    html +="            </div>";
    html +="        </div>";
    html +="    </div>";
    html +="</section>";
    $("#main_container").prepend(html);
    post_register();
}


function display_all_plates(){
    $("#main_container").empty();
    $.ajax({
      url : "http://localhost:5000/allplates",
      type : "GET",
      datatype: "json",
      success: function(data){
        var html="";
        var category=data.category;
        var plates=data.dictionnary;
        html+="<section id=\"portfolio\">";
        html+="        <div class=\"container\">";
        html+="            <div class=\"row\">";
        html+="                <div class=\"col-md-12 col-sm-12 col-xs-12\">";
        html+="                    <div class=\"feature_header text-center\">";
        html+="                        <h3 class=\"feature_title\">aria-hidden plates</b></h3>";
        html+="                        <h4 class=\"feature_sub\">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </h4>";
        html+="                        <div class=\"divider\"></div>";
        html+="                    </div>";
        html+="                </div>  <!-- Col-md-12 End -->";
        html+="            </div>";
        html+="        </div>";
        html+=" ";
        html+=" ";
        html+="    <div id=\"isotope-filter\" class=\"skew3 text-center\">";
        html+="        <a data-filter=\"*\"  href=\"#\" class=\"active \">All</a>";
        for (var prop in category) {
        html+="        <a data-filter=\"."+prop+"*\"  href=\"#\" class=\"\">"+prop+"</a>";
        }
        html+="    </div>";
        html+="    <div class=\"clearfix\"></div>";
        html+="            <div class=\"text-center \">";
        html+="              <ul class=\"portfolio-wrap\" id=\"portfolio_items\">";
        for (var prop in plates) {
        var plates_category=plates[prop];
        html+="                    <li class=\"col-xs-12 col-sm-6 col-md-3 single-portfolio";
        for (var prop in plates_category) { html+=" "+prop}; html+= "\">";
        html+="                        <figure>";
        html+="                            <img src=\"../static/images/portfolio/p1.jpg\" alt=\"\" />";
        html+="                            <figcaption>";
        html+="                                <h5>"+prop+"</h5>";
        html+="                                <p class=\"links\">";
        html+="                                    <a href=\"portfolio-single.html\"> <i class=\"fa fa-link\"></i></a>";
        html+="                                    <a href=\"images/portfolio/p1.jpg\" data-rel=\"prettyPhoto\" class=\"img-responsive\">";
        html+="                                        <i class=\"fa fa-plus\"></i>";
        html+="                                    </a>";
        html+="                                </p>";
        html+="                                <p class=\"description\">";
        html+="                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.";
        html+="                                </p>";
        html+="                            </figcaption>";
        html+="                        </figure>";
        html+="                    </li>";
        }
        html+="                </ul>";
        html+="             </div> <!-- Container Full End -->";
        html+="</section>  <!-- Portfolio Section End -->";
        $("#main_container").append(html);
    }
});
}



function my_profil(){
    $("#main_container").empty();
    $.ajax({
      url : "http://localhost:5000/user/profil",
      type : "GET",
      datatype: "json",
      success: function(data){
        var html = "";
        html +="<section id=\"contact\">";
        html +="    <div class=\"container\">";
        html +="        <div class=\"row\">";
        html +="          <div class=\"col-md-12 col-sm-12 col-xs-12\">";
        html +="                  <div class=\"feature_header text-center\">";
        html +="                      <h3 class=\"feature_title\">My <b>profil</b></h3>";
        html +="                      <div class=\"divider\"></div>";
        html +="                  </div>";
        html +="          </div>";
        html +="        </div>";
        html +="        <div class=\"row\">";
        html +="         <div class=\"contact_full\">";
        html +="            <div class=\"col-md-6 left\">";
        html +="                <div class=\"\">";
        html +="                    <form action=\"role\">";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"username\" placeholder=\"Username\" id=\"username\"  value=\""+data.user.username+"\" type=\"text\" class=\"input-block\">";
        html +="                            <span class=\"form-icon fa fa-user\"></span>";
        html +="                        </div>";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"password\" placeholder=\"Password\" id=\"password\" class=\"input-block\" value=\"\" type=\"password\">";
        html +="                            <span class=\"form-icon fa fa-key\"></span>";
        html +="                        </div>";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"firstName\" placeholder=\"First Name\" id=\"firstName\" class=\"input-block\" value=\""+data.user.firstName+"\" type=\"firstName\">";
        html +="                            <span class=\"form-icon fa fa-hand-o-left\"></span>";
        html +="                        </div>";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"lastName\" placeholder=\"Last Name\" id=\"lastName\" class=\"input-block\" value=\""+data.user.lastName+"\" type=\"lastName\">";
        html +="                            <span class=\"form-icon fa fa-hand-o-right\"></span>";
        html +="                        </div>";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"email\" placeholder=\"Email\" id=\"mail\" class=\"input-block\" value=\""+data.user.email+"\" type=\"email\">";
        html +="                            <span class=\"form-icon fa fa-envelope\"></span>";
        html +="                        </div>";
        html +="                        <div class=\"form-level\">";
        html +="                            <input name=\"img\" placeholder=\"Image\" id=\"img\" class=\"input-block\" value=\""+data.user.img+"\" type=\"url\">";
        html +="                            <span class=\"form-icon fa fa-picture-o\"></span>";
        html +="                        </div>";
        html +="                    </form>";
        html +="                </div>";
        html +="            </div>";
        html +="";
        html +="            <div class=\"col-md-6 right\">";
        html +="                <div class=\"form-level\">";
        html +="                    <textarea name=\"desc\" id=\"desc\"  rows=\"10\" class=\"textarea-block\" placeholder=\"Description\">"+data.user.desc+"</textarea>";
        html +="                    <span class=\"form-icon fa fa-pencil\"></span>";
        html +="                </div>";
        html +="            </div>";
        html +="            <div class=\"col-md-12 text-center\">";
        html +="                <button class=\"btn btn-main featured\">Submit Now</button>";
        html +="            </div>";
        html +="        </div>";
        html +="    </div>";
        html +="</section>";
        $("#main_container").append(html);
      }
    });
}

function display_home(){
    $.ajax({
      url : "http://localhost:5000/home_user",
      type : "GET",
      datatype: "json",
      success: function(data){
        $("#main_container").empty();
        var html="";
        html+="{% if not current_user.is_authenticated %}";
        html+=" <!-- Slider start -->";
        html+="  <section id=\"slider_part\">";
        html+="       <div class=\"carousel slide\" id=\"carousel-example-generic\" data-ride=\"carousel\">";
        html+="          <!-- Indicators -->";
        html+="           <ol class=\"carousel-indicators text-center\">";
        html+="              <li data-target=\"#carousel-example-generic\" data-slide-to=\"0\" class=\"active\"></li>";
        html+="              <li data-target=\"#carousel-example-generic\" data-slide-to=\"1\"></li>";
        html+="              <li data-target=\"#carousel-example-generic\" data-slide-to=\"2\"></li>";
        html+="           </ol>";
        html+="";
        html+="          <div class=\"carousel-inner\">";
        html+="              <div class=\"item active\">";
        html+="                  <div class=\"overlay-slide\">";
        html+="                      <img src=\"../static/images/news1.jpeg\" alt=\"\" class=\"img-responsive\">";
        html+="                  </div>";
        html+="                  <div class=\"carousel-caption\">";
        html+="                      <div class=\"col-md-12 col-xs-12 text-center\">";
        html+="                          <h3> <b>EatMe</b>";
        html+="                          <div class=\"line\"></div>";
        html+="                          <p> I love meat</p>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="              <div class=\"item\">";
        html+="                  <div class=\"overlay-slide\">";
        html+="                      <img src=\"../static/images/news2.jpeg\" alt=\"\" class=\"img-responsive\">";
        html+="                  </div>";
        html+="                  <div class=\"carousel-caption\">";
        html+="                      <div class=\"col-md-12 col-xs-12 text-center\">";
        html+="                          <h4 > We know you are Greats Chiefs </h4>";
        html+="                          <div class=\"line\"></div>";
        html+="                          <p> Our range of flat has been extended!</p>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="              <div class=\"item\">";
        html+="                  <div class=\"overlay-slide\">";
        html+="                      <img src=\"../static/images/news3.jpeg\" alt=\"\" class=\"img-responsive\">";
        html+="                  </div>";
        html+="                  <div class=\"carousel-caption\">";
        html+="                      <div class=\"col-md-12 col-xs-12 text-center\">";
        html+="                          <h3 > See your Days' Matches</h3>";
        html+="                          <div class=\"line\"></div>";
        html+="                          <h5> We never know? Tonight, it might be you that makes you cook </h5>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="";
        html+="           </div> 	 <!-- End Carousel Inner -->";
        html+="";
        html+="          <!-- Controls -->";
        html+="          <div class=\"slides-control \">";
        html+="              <a class=\"left carousel-control\" href=\"#carousel-example-generic\" data-slide=\"prev\">";
        html+="                  <span><i class=\"fa fa-angle-left\"></i></span>";
        html+="              </a>";
        html+="              <a class=\"right carousel-control\" href=\"#carousel-example-generic\" data-slide=\"next\">";
        html+="                  <span><i class=\"fa fa-angle-right\"></i></span>";
        html+="              </a>";
        html+="          </div>";
        html+="      </div>";
        html+="  </section>";
        html+="  <!--/ Slider end -->";
        html+="";
        html+="  <!-- Service Area start -->";
        html+="      <section id=\"service\">";
        html+="          <div class=\"container\">";
        html+="                  <div class=\"row\">";
        html+="                      <div class=\"col-md-12 col-sm-12 col-xs-12\">";
        html+="                          <div class=\"feature_header text-center\">";
        html+="                              <h3 class=\"feature_title\"> <b>WebSite utilisation</b></h3>";
        html+="                              <h4 class=\"feature_sub\">EatMe is dating site between persons who love cuisine, they practice it like nationnal sport, or not at all. Here you could invite members to cook what they like to eat. Or at the contrary it's will be they who invite you !</h4>";
        html+="                              <div class=\"divider\"></div>";
        html+="                          </div>";
        html+="                      </div>  <!-- Col-md-12 End -->";
        html+="                  </div>";
        html+="                  <div class=\"row\">";
        html+="                      <div class=\"main_feature text-center\">";
        html+="                          <div class=\"col-md-3 col-xs-12 col-sm-6\">";
        html+="                                  <div class=\"feature_content\">";
        html+="                                      <i class=\"fa fa-thumbs-o-up\"></i>";
        html+="                                      <h5>Like</h5>";
        html+="                                      <p>You must grade in your like, all the plates you like to eat. It's could be the not ordinary pepperony pizza, or more sophisticated tiramisu!</p>";
        html+="                                  </div>";
        html+="                              </div>";
        html+="                          <div class=\"col-md-3 col-xs-12 col-sm-6\">";
        html+="                                  <div class=\"feature_content\">";
        html+="                                      <i class=\"fa fa-cutlery\"></i>";
        html+="                                      <h5>Cook</h5>";
        html+="                                      <p>Si vous êtes du genre cordon bleu hipster, sur notre site vous pourrez y inscrire ce que vous savez, un peu, beaucoup, pationnement cuisinner. </p>";
        html+="                                  </div>";
        html+="                          </div> <!-- Col-md-4 Single_feature End -->";
        html+="                          <div class=\"col-md-3 col-xs-12 col-sm-6\">";
        html+="                                  <div class=\"feature_content\">";
        html+="                                      <i class=\"fa fa-check\"></i>";
        html+="                                      <h5>Match</h5>";
        html+="                                      <p>Grâce à notre technologie de pointe, EatMe vous permet de mettre en relation les plats que vous savez cuisnier avec les gouts cullinaires de nos membres.</p>";
        html+="                                  </div>";
        html+="                          </div> <!-- Col-md-4 Single_feature End -->";
        html+="                          <div class=\"col-md-3 col-xs-12 col-sm-6\">";
        html+="                                  <div class=\"feature_content\">";
        html+="                                      <i class=\"fa fa-heart\"></i>";
        html+="                                      <h5>Love</h5>";
        html+="                                      <p>Enfin grâce à un système de choix perfectionné vous pourrez choisir les profils de nos membres qui vous interesse et entrez facilement en contact avec eux!</p>";
        html+="                                  </div>";
        html+="                          </div> <!-- Col-md-4 Single_feature End -->";
        html+="                          <!-- <button class=\"btn btn-main\"> Read More</button> -->";
        html+="                      </div>";
        html+="              </div>  <!-- Row End -->";
        html+="          </div>  <!-- Container End -->";
        html+="      </section>";
        html+="{% else %}";
        html+="  <section id=\"testimonial\" class=\"wow fadeInUp\">";
        html+="   <div class=\"container\">";
        html+="      <div class=\"row\">";
        html+="          <div class=\"col-md-12 col-sm-12 col-xs-12\">";
        html+="              <div class=\"feature_header text-center\">";
        html+="                  <h3 class=\"feature_title\">Your matches</h3>";
        html+="                  <h4 class=\"feature_sub\">See your matches of the day </h4>";
        html+="                  <div class=\"divider\"></div>";
        html+="              </div>";
        html+="          </div>  <!-- Col-md-12 End -->";
        html+="      </div>";
        html+="              <div class=\"row\">";
        html+="                  <div id=\"testimonial-carousel\" class=\"owl-carousel owl-theme text-center testimonial-slide\">";
        html+="                          <button type=\"submit\" class=\"btn btn-danger btn-lg\" ><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>";
        html+="                          </button>";
        html+="                       <div class=\"item\">";
        html+="                         <div class=\"testimonial-thumb\">";
        html+="                           <img class=\"img-circle\" src=\"images/pic1.jpg\" alt=\"testimonial\" >";
        html+="                         </div>";
        html+="                         <div class=\"testimonial-content\">";
        html+="                           <h3 class=\"name\">Katee Nureen <span>Exectuive Director</span></h3>";
        html+="                           <p class=\"testimonial-text\">";
        html+="                             iLorem Ipsum as t";
        html+="                           </p>";
        html+="                         </div>";
        html+="                       </div>";
        html+="                  </div>";
        html+="                  <!-- Navigation start -->";
        html+="                  <div class=\"customNavigation cyprass-carousel-controller\">";
        html+="                      <a class=\"prev left\">";
        html+="                          <i class=\"fa fa-chevron-left\"></i>";
        html+="                      </a>";
        html+="                      <a class=\"next right\">";
        html+="                        <i class=\"fa fa-chevron-right\"></i>";
        html+="                      </a>";
        html+="                  </div>";
        html+="                  <!-- Navigation ENd -->";
        html+="              </div>";
        html+="          </div> <!-- Row End -->";
        html+="  </section> <!-- Section Testimonial End -->";
        html+="";
        html+="    </section>  <!-- Section TEam End -->";
        html+="      <section id=\"about\">";
        html+="      <div class=\"container\">";
        html+="          <div class=\"row\">";
        html+="              <div class=\"col-md-12 col-sm-12 col-xs-12\">";
        html+="                  <div class=\"feature_header text-center\">";
        html+="                      <h3 class=\"feature_title\">Vos possibilités du jour</h3>";
        html+="                      <div class=\"divider\"></div>";
        html+="                  </div>";
        html+="              </div>";
        html+="          </div>";
        html+="          <div class=\"row\">";
        html+="              <div class=\"feature-tab\">";
        html+="                 <div class=\"col-md-2 col-sm-3 col-xs-12\">";
        html+="                      <ul class=\"nav nav-tabs main-tab-list text-center\" role=\"tablist\">";
        html+="                            <li role=\"presentation\" class=\"active\">";
        html+="                              <a href=\"#home\" role=\"tab\" data-toggle=\"tab\" >";
        html+="                                <div class=\"single-tab\">";
        html+="                                      <div class=\"f-icon\">";
        html+="                                          <i class=\"fa fa-laptop\"></i>";
        html+="                                      </div>";
        html+="                                  </div>";
        html+="                                   <h4>Plats aimés</h4>";
        html+="                              </a>";
        html+="                            </li>";
        html+="                            <li role=\"presentation\" >";
        html+="                              <a href=\"#profile\" role=\"tab\" data-toggle=\"tab\">";
        html+="                                  <div class=\"single-tab\">";
        html+="                                      <div class=\"f-icon\">";
        html+="                                          <i class=\"fa fa-send\"></i>";
        html+="                                      </div>";
        html+="                                  </div>";
        html+="                              <h4>Plats cuisinés</h4>";
        html+="                          </a>";
        html+="                        </li>";
        html+="                        <li role=\"presentation\" >";
        html+="                          <a href=\"#messages\" role=\"tab\" data-toggle=\"tab\">";
        html+="                              <div class=\"single-tab\">";
        html+="                                  <div class=\"f-icon\">";
        html+="                                      <i class=\"fa fa-heart\"></i>";
        html+="                                  </div>";
        html+="                              </div>";
        html+="                              <h4>Mes matchs</h4>";
        html+="                          </a>";
        html+="                        </li>";
        html+="                      </ul>";
        html+="                  </div>  <!-- col-md-12 end -->";
        html+="                </div>";
        html+="            </div>";
        html+="        </div>";
        html+="    </section>";
        html+="{% endif %}";
        $("#main_container").append(html);
        bindings();
    }
  });
}

function get_profil(id){
    console.log(id);
    var dict={
         "username": id
    };
    var datas=JSON.stringify(dict);
    $.ajax({
      url : "http://localhost:5000/user/profil",
      type : "POST",
      contentType:"application/json",
      data: datas,
      success: function(data){
        display_profil(data);
      }
  });
}


function display_profil(json){
  var html ="";
  $("#main_container").empty();
  html+="<div class='clearfix'></div>";
  html+="</br>";
  html+="</br>";
  html+="<section id='video-fact'>";
  html+="    <div class='container'>";
  html+="         <div class='row'>";
  html+="                 <div class='col-md-6 '>";
  html+="                    <div class='landing-video'>";
  html+="                        <div class='video-embed wow fadeIn' data-wow-duration='1s'>";
  html+="                                <!-- Change the url -->";
  html+="                            <iframe src='"+json.user.img+"' width='350' height='281' allowfullscreen></iframe>";
  html+="                        </div>";
  html+="                    </div>";
  html+="                </div>";
  html+="                <div class='col-md-6 '>";
  html+="                    <div class='video-text'>";
  html+="                        <div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>";
  html+="                          <div class='panel panel-default'>";
  html+="                            <div class='panel-heading active' role='tab' id='headingOne'>";
  html+="                              <h4 class='panel-title'>";
  html+="                                <a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>";
  html+="                                  What like to eat:";
  html+="                                </a>";
  html+="                              </h4>";
  html+="                            </div>";
  html+="                            <div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>";
  html+="                              <div class='panel-body p1'>";
  html+="                                <ul>";
  $.each(json.user.liked, function(i, obj) {
    html+="<li>"+obj+"</li>";
  });
  html+="                                </ul>";
  html+="                              </div>";
  html+="                            </div>";
  html+="                          </div>";
  html+="                      <div class='panel panel-default'>";
  html+="                        <div class='panel-heading ' role='tab' id='headingTwo'>";
  html+="                          <h4 class='panel-title'>";
  html+="                            <a class='accordion-toggle collapsed'  data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>";
  html+="                              What like to cook:";
  html+="                            </a>";
  html+="                          </h4>";
  html+="                        </div>";
  html+="                        <div id='collapseTwo' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>";
  html+="                          <div class='panel-body p1'>";
  html+="                                <ul>";
  $.each(json.user.cooked, function(i, obj) {
    html+="<li>"+obj+"</li>";
  });
  html+="                                </ul>";
  html+="                          </div>";
  html+="                        </div>";
  html+="                      </div>";
  html+="                      <div class='panel panel-default'>";
  html+="                        <div class='panel-heading ' role='tab' id='headingThree'>";
  html+="                          <h4 class='panel-title'>";
  html+="                            <a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>";
  html+="                              Description:";
  html+="                            </a>";
  html+="                          </h4>";
  html+="                        </div>";
  html+="                        <div id='collapseThree' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingThree'>";
  html+="                          <div class='panel-body p1'>";
  html+="                            "+json.user.desc+"";
  html+="                          </div>";
  html+="                        </div>";
  html+="                      </div>";
  html+="                    </div>";
  html+="                    <div class='row'>";
  html+="                      <div class='col-md-1 col-md-push-5'>";
  html+="                       <button id='"+json.user.username+"' onclick='add_love(this.id)' class='btn btn-danger btn-lg'><i class='fa fa-heart' aria-hidden='true'></i></button>";
  html+="                      </div>";
  html+="                    </div>";
  html+="                </div>";
  html+="            </div>";
  html+="        </div><!-- row End -->";
  html+="    </div>";
  html+="</section>";
  $("#main_container").append(html);
}

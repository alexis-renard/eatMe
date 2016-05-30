$(document).ready(function() {
    $("#login").click(function() {
        display_login();
    });
    $("#register").click(function() {
          display_register();
    });
    $("#home").click(function() {
        display_home();
    });
    $("#my_profil").click(function() {
        my_profil();
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

function my_profil(){
    $("#main_container").empty();
    var html = "";
    html+="{% block profil %}";
    html+="<section id=\"profil\" display=None>";
    html+="    <div class=\"container\">";
    html+="        <div class=\"row\">";
    html+="          <div class=\"col-md-12 col-sm-12 col-xs-12\">";
    html+="                  <div class=\"feature_header text-center\">";
    html+="                      <h3 class=\"feature_title\">My Profil <b>Up</b></h3>";
    html+="                      <div class=\"divider\"></div>";
    html+="                  </div>";
    html+="          </div>";
    html+="        </div>";
    html+="        <div class=\"row\">";
    html+="          <form class=\"form-horizontal\" role=\"form\" method=\"POST\" action=\"{{ url_for('register') }}\">";
    html+="              {{ form.hidden_tag() }}";


    html+="              {% if form.username.errors %}";
    html+="                  <div>";
    html+="                      <ul class=\"list-group\">";
    html+="                          {% for e in form.username.errors %}";
    html+="                          <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                          {% endfor %}";
    html+="                      </ul>";
    html+="                  </div>";
    html+="              {% endif %}";
    html+="                  <div class={% if form.username.errors %}";
    html+="                      \"form-group has-error\"";
    html+="                      {% else %}";
    html+="                      \"form-group\"";
    html+="                      {% endif %}";
    html+="                      >";
    html+="                      <label for=\"username\" class=\"col-sm-2 control-label\">";
    html+="                          {{ form.username.label }}";
    html+="                      </label>";
    html+="                      <div class=\"col-sm-10\">";
    html+="                          {{ form.username(size=50, class_=\"form-control\", placeholder=\"Username\") }}";
    html+="                      </div>";
    html+="                  </div>";




    html+="                {% if form.firstName.errors %}";
    html+="                    <div>";
    html+="                        <ul class=\"list-group\">";
    html+="                            {% for e in form.firstName.errors %}";
    html+="                            <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                            {% endfor %}";
    html+="                        </ul>";
    html+="                    </div>";
    html+="                {% endif %}";
    html+="                    <div class={% if form.firstName.errors %}";
    html+="                        \"form-group has-error\"";
    html+="                        {% else %}";
    html+="                        \"form-group\"";
    html+="                        {% endif %}";
    html+="                        >";
    html+="                        <label for=\"firstName\" class=\"col-sm-2 control-label\">";
    html+="                            {{ form.firstName.label }}";
    html+="                        </label>";
    html+="                        <div class=\"col-sm-10\">";
    html+="                            {{ form.firstName(size=50, class_=\"form-control\", placeholder=\"First Name\") }}";
    html+="                        </div>";
    html+="                    </div>";


    html+="                  {% if form.lastName.errors %}";
    html+="                      <div>";
    html+="                          <ul class=\"list-group\">";
    html+="                              {% for e in form.lastName.errors %}";
    html+="                              <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                              {% endfor %}";
    html+="                          </ul>";
    html+="                      </div>";
    html+="                  {% endif %}";
    html+="                      <div class={% if form.lastName.errors %}";
    html+="                          \"form-group has-error\"";
    html+="                          {% else %}";
    html+="                          \"form-group\"";
    html+="                          {% endif %}";
    html+="                          >";
    html+="                          <label for=\"lastName\" class=\"col-sm-2 control-label\">";
    html+="                              {{ form.lastName.label }}";
    html+="                          </label>";
    html+="                          <div class=\"col-sm-10\">";
    html+="                              {{ form.lastName(size=50, class_=\"form-control\", placeholder=\"Last Name\") }}";
    html+="                          </div>";
    html+="                      </div>";


    html+="                      {% if form.email.errors %}";
    html+="                          <div>";
    html+="                              <ul class=\"list-group\">";
    html+="                                  {% for e in form.email.errors %}";
    html+="                                  <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                                  {% endfor %}";
    html+="                              </ul>";
    html+="                          </div>";
    html+="                      {% endif %}";
    html+="                          <div class={% if form.email.errors %}";
    html+="                              \"form-group has-error\"";
    html+="                              {% else %}";
    html+="                              \"form-group\"";
    html+="                              {% endif %}";
    html+="                              >";
    html+="                              <label for=\"email\" class=\"col-sm-2 control-label\">";
    html+="                                  {{ form.email.label }}";
    html+="                              </label>";
    html+="                              <div class=\"col-sm-10\">";
    html+="                                  {{ form.email(size=50, class_=\"form-control\", placeholder=\"Email\") }}";
    html+="                              </div>";
    html+="                          </div>";


    html+="                  {% if form.password.errors %}";
    html+="                      <div>";
    html+="                          <ul class=\"list-group\">";
    html+="                              {% for e in form.password.errors %}";
    html+="                              <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                              {% endfor %}";
    html+="                          </ul>";
    html+="                      </div>";
    html+="                  {% endif %}";
    html+="                  <div class={% if form.password.errors %}";
    html+="                      \"form-group has-error\"";
    html+="                      {% else %}";
    html+="                      \"form-group\"";
    html+="                      {% endif %}";
    html+="                      >";
    html+="                      <label for=\"password\" class=\"col-sm-2 control-label\">";
    html+="                          {{ form.password.label }}";
    html+="                      </label>";
    html+="                      <div class=\"col-sm-10\">";
    html+="                          {{ form.password(size=50, class_=\"form-control\", placeholder=\"Password\") }}";
    html+="                      </div>";
    html+="                  </div>";


    html+="                  {% if form.confirm.errors %}";
    html+="                      <div>";
    html+="                          <ul class=\"list-group\">";
    html+="                              {% for e in form.confirm.errors %}";
    html+="                              <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                              {% endfor %}";
    html+="                          </ul>";
    html+="                      </div>";
    html+="                  {% endif %}";
    html+="                  <div class={% if form.confirm.errors %}";
    html+="                      \"form-group has-error\"";
    html+="                      {% else %}";
    html+="                      \"form-group\"";
    html+="                      {% endif %}";
    html+="                      >";
    html+="                      <label for=\"Repeat Password\" class=\"col-sm-2 control-label\">";
    html+="                          {{ form.confirm.label }}";
    html+="                      </label>";
    html+="                      <div class=\"col-sm-10\">";
    html+="                          {{ form.confirm(size=50, class_=\"form-control\", placeholder=\"Confirm Password\") }}";
    html+="                      </div>";
    html+="                  </div>";


    html+="                  {% if form.desc.errors %}";
    html+="                      <div>";
    html+="                          <ul class=\"list-group\">";
    html+="                              {% for e in form.desc.errors %}";
    html+="                              <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                              {% endfor %}";
    html+="                          </ul>";
    html+="                      </div>";
    html+="                  {% endif %}";
    html+="                      <div class={% if form.desc.errors %}";
    html+="                          \"form-group has-error\"";
    html+="                          {% else %}";
    html+="                          \"form-group\"";
    html+="                          {% endif %}";
    html+="                          >";
    html+="                          <label for=\"desc\" class=\"col-sm-2 control-label\">";
    html+="                              {{ form.desc.label }}";
    html+="                          </label>";
    html+="                          <div class=\"col-sm-10\">";
    html+="                              {{ form.desc(size=50, class_=\"form-control\", placeholder=\"Description\") }}";
    html+="                          </div>";
    html+="                      </div>";

    html+="                  {% if form.img.errors %}";
    html+="                      <div>";
    html+="                          <ul class=\"list-group\">";
    html+="                              {% for e in form.img.errors %}";
    html+="                              <li class=\"list-group-item list-group-item-danger\">{{ e }}</li>";
    html+="                              {% endfor %}";
    html+="                          </ul>";
    html+="                      </div>";
    html+="                  {% endif %}";
    html+="                      <div class={% if form.img.errors %}";
    html+="                          \"form-group has-error\"";
    html+="                          {% else %}";
    html+="                          \"form-group\"";
    html+="                          {% endif %}";
    html+="                          >";
    html+="                          <label for=\"img\" class=\"col-sm-2 control-label\">";
    html+="                              {{ form.img.label }}";
    html+="                          </label>";
    html+="                          <div class=\"col-sm-10\">";
    html+="                              {{ form.img(size=50, class_=\"form-control\", placeholder=\"Picture\") }}";
    html+="                          </div>";
    html+="                      </div>";




    html+="              {% if error %}";
    html+="                  <div>";
    html+="                      <ul class=\"list-group\">";
    html+="                          <li class=\"list-group-item list-group-item-danger\">{{ error }}</li>";
    html+="                      </ul>";
    html+="                  </div>";
    html+="              {% endif %}";
    html+="          </form>";

    html+="        </div>";
    html+="</section>";
    html+="{% endblock %}";
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


function display_home(){
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
    html+="% else %}";
    html+="section id=\"testimonial\" class=\"wow fadeInUp\">";
    html+="  <div class=\"container\">";
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
    html+="        </section> <!-- Section Testimonial End -->";
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

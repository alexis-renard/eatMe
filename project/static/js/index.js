$(document).ready(function() {
    // $("#testimonial").css("background","gray";);
    $("#testimonial").css("background", "#EFEFEF");
    // console.log($("#testimonial"));
    // console.log($("#testimonial").css());
    bindings();
});

 function bindings(){
   $("#login_form").bind("submit", post_login);
   $("#register_form").bind("submit", post_register);
   $("#login").bind("click", display_login);
   $("#register").bind("click",display_register);
   $("#my_profil").bind("click",my_profil);
   $(".plus_like").bind("click", add_user_liked);
   $(".minus_like").bind("click", remove_user_liked);
   $(".plus_cook").bind("click", add_user_cooked);
   $(".minus_cook").bind("click", remove_user_cooked);
   $(".fa-times").bind("click", delete_plate);
   $(".c-tab>div>div>a").bind("click", display_profil_matched);
   $("#editprofil").bind("click", post_modif);
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
        match = json.match;
        if (match) {
            swal({
              title: 'It\'s a match!',
              imageUrl: 'http://missionmariage.com/blog/wp-content/uploads/2015/01/Macaron-coeur-Laduree.png',
              imageWidth: 400,
              imageHeight: 200,
              animation: true,
              time :5000
            })
        }
        window.location.reload();
        bindings();
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
         bindings();
         $.ajax({
                url: "/user",
                type: "POST",
                contentType:"application/json",
                data: datas,
                success: function(json){
                    window.location.reload();
                },
                error: function(json){
                    swal({
                      title: 'Error!',
                      text: 'Password or Username is incorrect.',
                      type: 'error',
                      confirmButtonText: 'Cool'
                    })
                    console.log("test");
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
        bindings();
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
               },
               error: function(json){
                   swal({
                     title: 'Error!',
                     text: 'Something gone wrong, please check your infos',
                     type: 'error',
                     confirmButtonText: 'Cool'
                   })
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


function display_all_plates(category){
    if ( category == 'all') {
      var source="/allplates";
      var choice = "";
    }
    else {
      var source="/plates_by_class/"+category;
      var choice = {"choice" : category};
    }
    $.ajax({
      url : source,
      type : "GET",
      datatype: "json",
      data :choice,
      success: function(data){
        $(this).addClass("active");
        $("#main_container").empty();
        var category=data.plates;
        var html = "";
        html+='<section id="portfolio">';
        html+='        <div class="container">';
        html+='            <div class="row">';
        html+='                <div class="col-md-12 col-sm-12 col-xs-12">';
        html+='                    <div class="feature_header text-center">';
        html+='                        <h3 class="feature_title">Your <b>plates</b></h3>';
        html+='                        <h4 class="feature_sub">Here you can add, or delete plates you like. </h4>';
        html+='                        <div class="divider"></div>';
        html+='                    </div>';
        html+='                </div>  <!-- Col-md-12 End -->';
        html+='            </div>';
        html+='        </div>';
        html+='    <div id="Search">';
        html+='       <input name=\"Search\" placeholder=\"Search\" id=\"inputSearch\"  value=\"\" type=\"text\" class=\"input-block\">';
        html+='       <a id="Search"  href="#" onClick="search_plate(\'all\');" class="">Search</a>';
        html+='    </div>';
        html+='    <div id="isotope-filter" class="skew3 text-center">';
        html+='        <a id="all"  href="#" onClick="display_few_plates(\'all\');" class="">All</a>';
        html+='        <a id="Entrée"  href="#" onClick="display_few_plates(\'Entree\');" class="">Entrée</a>';
        html+='        <a id="Plat" href="#" onClick="display_few_plates(\'Plat\');" class="">Plat</a>';
        html+='        <a id="Dessert"  href="#" onClick="display_few_plates(\'Dessert\');" class="">Dessert</a>';
        html+='        <a id="Apéro"  href="#" onClick="display_few_plates(\'Apéro\');" class="">Apéro</a>';
        html+='    </div>';
        html+='    <div class="clearfix"></div>';
        html+='         <div class="text-center ">';
        html+='              <ul class="portfolio-wrap" id="portfolio_items">';
        // debut li
        for(var i=0; i<category.length; i++){
          html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
          html+='                        <figure>';
          html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
          html+='                            <figcaption>';
          html+='                                <h5>'+category[i]["name"]+'</h5>';
          html+='                                <div class="links">';
        if(category[i]["name"] in data.liked){
            html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
            html+='                                       <i class="fa fa-minus minus_like" onClick="remove_user_liked('+category[i]["id"]+');"></i>';
            html+='                                    </a>';
        }
        else{
            html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
            html+='                                        <i class="fa fa-plus plus_like" onClick="add_user_liked('+category[i]["id"]+');"></i>';
            html+='                                    </a>';
        }
        if (data.admin==1){
          html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
          html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
          html+='                                    </a>';
        };
          html+='                                </div>';
          html+='                            </figcaption>';
          html+='                        </figure>';
          html+='                    </li>';
        }
        //fin li
        html+='                </ul>';
        html+='        </div> <!-- Container Full End -->';
        html+='</section>  <!-- Portfolio Section End -->';
        html+= "<script type='text/javascript' src='/static/js/jquery.easing.1.3.js'></script>";
        $("#main_container").append(html);
    }
  });
}

function display_few_plates(category){
    if ( category == 'all') {
      var source="/allplates";
      var choice = "";
    }
    else {
      var source="/plates_by_class/"+category;
      var choice = {"choice" : category};
    }
    $.ajax({
      url : source,
      type : "GET",
      datatype: "json",
      data :choice,
      success: function(data){
        $("#portfolio_items").empty();
        var category=data.plates;
        var html = "";
        html+='              <ul class="portfolio-wrap" id="portfolio_items">';
        // debut li
        for(var i=0; i<category.length; i++){
          html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
          html+='                        <figure>';
          html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
          html+='                            <figcaption>';
          html+='                                <h5>'+category[i]["name"]+'</h5>';
          html+='                                <div class="links">';
        if(category[i]["name"] in data.liked){
            html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
            html+='                                       <i class="fa fa-minus minus_like" onClick="remove_user_liked('+category[i]["id"]+');"></i>';
            html+='                                    </a>';
        }
        else{
            html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
            html+='                                        <i class="fa fa-plus plus_like" onClick="add_user_liked('+category[i]["id"]+');"></i>';
            html+='                                    </a>';
        }
        if (data.admin==1){
          html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
          html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
          html+='                                    </a>';
        };
          html+='                                </div>';
          html+='                            </figcaption>';
          html+='                        </figure>';
          html+='                    </li>';
        }
        //fin li
        html+='                </ul>';
        $("#portfolio_items").append(html);
    }
  });
}

function add_user_liked(id){
  var dict={
    "id":id
  };
  var datas = JSON.stringify(dict);
  bindings();
  $.ajax({
    url:"http://localhost:5000/user/liked/add",
    type : "PUT",
    contentType : "application/json",
    data: datas,
    success : function(json){
        swal({
          title: 'Food added',
          imageUrl: 'http://1larwpdbnvqpcz84vezsi9nu.wpengine.netdna-cdn.com/wp-content/uploads/2013/02/East_More_Food.png',
          imageWidth: 400,
          imageHeight: 200,
          animation: true,
          timer: 3000
        })
  }
  });
}

function remove_user_liked(id){
  var dict={
    "id":id
  };
  var datas = JSON.stringify(dict);
  bindings();
  $.ajax({
    url:"http://localhost:5000/user/liked/remove",
    type : "PUT",
    contentType : "application/json",
    data: datas,
    success : function(json){
        swal({
          title: 'Food removed',
          imageUrl: 'http://eatchewlive.com/wp-content/uploads/2015/04/tumblr_m6c2kq0jqf1qj19hzo1_500.jpg',
          imageWidth: 400,
          imageHeight: 200,
          animation: false,
          timer: 1500
        })
    }
  });
}

function add_user_cooked(id){
  var dict={
    "id":id
  };
  var datas = JSON.stringify(dict);
  bindings();
  $.ajax({
    url:"http://localhost:5000/user/cooked/add",
    type : "PUT",
    contentType : "application/json",
    data: datas,
    success : function(json){
        swal({
          title: 'Food added',
          imageUrl: 'http://1larwpdbnvqpcz84vezsi9nu.wpengine.netdna-cdn.com/wp-content/uploads/2013/02/East_More_Food.png',
          imageWidth: 400,
          imageHeight: 200,
          animation: false,
          timer: 1500
        })
    }
  });
}

function remove_user_cooked(id){
  var dict={
    "id":id
  };
  var datas = JSON.stringify(dict);
  bindings();
  $.ajax({
    url:"http://localhost:5000/user/cooked/remove",
    type : "PUT",
    contentType : "application/json",
    data: datas,
    success : function(json){
        swal({
          title: 'Food removed',
          imageUrl: 'http://eatchewlive.com/wp-content/uploads/2015/04/tumblr_m6c2kq0jqf1qj19hzo1_500.jpg',
          imageWidth: 400,
          imageHeight: 200,
          animation: false,
          timer: 1500
        })
    }
  });
}

function display_all_cook(category){
    if ( category == 'all') {
      var source="/allplates";
      var choice = "";
    }
    else {
      var source="/plates_by_class/"+category;
      var choice = {"choice" : category};
    }
    $.ajax({
      url : source,
      type : "GET",
      contentType: "application/json",
      data : choice,
      success: function(data){
       $("#main_container").empty();
       var category = data.plates;
       console.log(data);
       console.log(category.length);
       var html = "";
       html+='<section id="portfolio">';
       html+='        <div class="container">';
       html+='            <div class="row">';
       html+='                <div class="col-md-12 col-sm-12 col-xs-12">';
       html+='                    <div class="feature_header text-center">';
       html+='                        <h3 class="feature_title">Your <b>cook</b></h3>';
       html+='                        <h4 class="feature_sub">Here you can add, or delete plates you like. </h4>';
       html+='                        <div class="divider"></div>';
       html+='                    </div>';
       html+='                </div>  <!-- Col-md-12 End -->';
       html+='            </div>';
       html+='        </div>';
       html+='    <div id="Search">';
       html+='        <input name=\"Search\" placeholder=\"Search\" id=\"inputSearch\"  value=\"\" type=\"text\" class=\"input-block\">';
       html+='        <a id="Search"  href="#" onClick="search_cook();" class="">Search</a>';
       html+='    </div>';
       html+='    <div id="isotope-filter" class="skew3 text-center">';
       html+='        <a id="all"  href="#" onClick="display_few_cook(\'all\');" class="">All</a>';
       html+='        <a id="Entrée"  href="#" onClick="display_few_cook(\'Entree\');" class="">Entrée</a>';
       html+='        <a id="Plat" href="#" onClick="display_few_cook(\'Plat\');" class="">Plat</a>';
       html+='        <a id="Dessert"  href="#" onClick="display_few_cook(\'Dessert\');" class="">Dessert</a>';
       html+='        <a id="Apéro"  href="#" onClick="display_few_cook(\'Apéro\');" class="">Apéro</a>';
       html+='    </div>';
       html+='    <div class="clearfix"></div>';
       html+='         <div class="text-center ">';
       html+='              <ul class="portfolio-wrap" id="portfolio_items">';
       // debut li
       for(var i=0; i<category.length; i++){
       html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
       html+='                        <figure>';
       html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
       html+='                            <figcaption>';
       html+='                                <h5>'+category[i]["name"]+'</h5>';
       html+='                                <div class="links">';
       if(category[i]["name"] in data.cooked){
           html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
           html+='                                       <i class="fa fa-minus minus_cook" onClick="remove_user_cooked('+category[i]["id"]+');"></i>';
           html+='                                    </a>';
       }
       else{
         html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
         html+='                                        <i class="fa fa-plus plus_cook" onClick="add_user_cooked('+category[i]["id"]+');"></i>';
         html+='                                    </a>';
       }
       if (data.admin==1){
           html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
           html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
           html+='                                    </a>';
       };
       html+='                                </div>';
       html+='                            </figcaption>';
       html+='                        </figure>';
       html+='                    </li>';
       }
       //fin li
       html+='                </ul>';
       html+='        </div> <!-- Container Full End -->';
       html+='</section>  <!-- Portfolio Section End -->';
       html+= "<script type='text/javascript' src='/static/js/jquery.easing.1.3.js'></script>";
       $("#main_container").append(html);
       bindings();
        //include('jquery.easing.1.3.js');
    }
  });
}

function display_few_cook(category){
    if ( category == 'all') {
      var source="/allplates";
      var choice = "";
    }
    else {
      var source="/plates_by_class/"+category;
      var choice = {"choice" : category};
    }
    $.ajax({
      url : source,
      type : "GET",
      contentType: "application/json",
      data : choice,
      success: function(data){
       $("#portfolio_items").empty();
       var category = data.plates;
       console.log(data);
       console.log(category.length);
       var html = "";
       html+='              <ul class="portfolio-wrap" id="portfolio_items">';
       // debut li
       for(var i=0; i<category.length; i++){
       html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
       html+='                        <figure>';
       html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
       html+='                            <figcaption>';
       html+='                                <h5>'+category[i]["name"]+'</h5>';
       html+='                                <div class="links">';
       if(category[i]["name"] in data.cooked){
           html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
           html+='                                        <i class="fa fa-plus plus_cook" onClick="add_user_cooked('+category[i]["id"]+');"></i>';
           html+='                                    </a>';
       }
       else{
           html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
           html+='                                       <i class="fa fa-minus minus_cook" onClick="remove_user_cooked('+category[i]["id"]+');"></i>';
           html+='                                    </a>';
       }
       if (data.admin==1){
       html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
       html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
    };
       html+='                                </div>';
       html+='                            </figcaption>';
       html+='                        </figure>';
       html+='                    </li>';
       }
       //fin li
       html+='                </ul>';
       $("#portfolio_items").append(html);
       bindings();
        //include('jquery.easing.1.3.js');
    }
  });
}

function search_plate(){
    var search=document.getElementById("inputSearch").value;
    console.log(search);
    $.ajax({
      url : "/addplates/search/"+search,
      type : "GET",
      contentType: "application/json",
      success: function(data){
        $("#portfolio_items").empty();
        var category = data.results;
        html = "";
        html+='              <ul class="portfolio-wrap" id="portfolio_items">';
        // debut li
       $.each(category, function(i, obj) {
       html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
       html+='                        <figure>';
       html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
       html+='                            <figcaption>';
       html+='                                <h5>'+category[i]["name"]+'</h5>';
       html+='                                <div class="links">';
       html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
       html+='                                        <i class="fa fa-plus plus_cook" onClick="add_user_cooked('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
       html+='                                       <i class="fa fa-minus minus_cook" onClick="remove_user_cooked('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
       html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                </div>';
       html+='                            </figcaption>';
       html+='                        </figure>';
       html+='                    </li>';
       });
       //fin li
       html+='                </ul>';
       $("#portfolio_items").append(html);
       bindings();
        //include('jquery.easing.1.3.js');
    }
  });
}

function search_cook(){
    var search=document.getElementById("inputSearch").value;
    console.log(search);
    $.ajax({
      url : "/addcook/search/"+search,
      type : "GET",
      contentType: "application/json",
      success: function(data){
        $("#portfolio_items").empty();
       var category = data.results;
        html = "";
        html+='              <ul class="portfolio-wrap" id="portfolio_items">';
        // debut li
       $.each(category, function(i, obj) {
        console.log(i);
        console.log(obj);
       html+='                    <li class="col-xs-12 col-sm-6 col-md-3 single-portfolio identity web-design">';
       html+='                        <figure>';
       html+='                            <img src="../static/images/food/'+category[i]["img"]+'" alt="" />';
       html+='                            <figcaption>';
       html+='                                <h5>'+category[i]["name"]+'</h5>';
       html+='                                <div class="links">';
       html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive">';
       html+='                                        <i class="fa fa-plus plus_cook" onClick="add_user_cooked('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                    <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
       html+='                                       <i class="fa fa-minus minus_cook" onClick="remove_user_cooked('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                      <a href="#" data-rel="prettyPhoto" class="img-responsive"> ';
       html+='                                         <i class="fa fa-times" onClick="delete_plate('+category[i]["id"]+');"></i>';
       html+='                                    </a>';
       html+='                                </div>';
       html+='                            </figcaption>';
       html+='                        </figure>';
       html+='                    </li>';
       });
       //fin li
       html+='                </ul>';
       $("#portfolio_items").append(html);
       bindings();
        //include('jquery.easing.1.3.js');
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
        html+="                       <iframe src='"+data.user.img+"' width='350' height='281' allowfullscreen></iframe>";
        html +="            </div>";
        html +="            <div class=\"col-md-12 text-center\">";
        html +="                <button id=\"editprofil\" class=\"btn btn-main featured\" onclick=\"post_modif()\" >Change profil</button>";
        html +="            </div>";
        html +="        </div>";
        html +="    </div>";
        html +="</section>";
        $("#main_container").append(html);
      }
    });
}

function post_modif(){
    var dict={
         username: $('input[id="username"]').val(),
         password: $('input[id="password"]').val(),
         firstName: $('input[id="firstName"]').val(),
         lastName: $('input[id="lastName"]').val(),
         email: $('input[id="mail"]').val(),
         picture: $('input[id="img"]').val(),
         desc: $('textarea[id="desc"]').val(),
    };
    bindings();
    var datas=JSON.stringify(dict);
    console.log("test");
    $.ajax({
           url: "/user/profil",
           type: "PUT",
           contentType:"application/json",
           data: datas,
           success: function(json){
               swal({
                 title: 'Profil updated!',
                 imageUrl: 'http://udoit.dance/wp-content/uploads/2016/01/Update.jpg',
                 imageWidth: 400,
                 imageHeight: 200,
                 animation: false
               })
               window.location.reload();
           },
           error: function(json){
               swal({
                 title: 'Error!',
                 text: 'Something gone wrong, please check your infos',
                 type: 'error',
                 confirmButtonText: 'Cool'
               })
           }
       });
   bindings();
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
        html+="  <section id='slider_part'>";
        html+="       <div class='carousel slide' id='carousel-example-generic' data-ride='carousel'>";
        html+="          <!-- Indicators -->";
        html+="           <ol class='carousel-indicators text-center'>";
        html+="              <li data-target='#carousel-example-generic' data-slide-to='0' class='active'></li>";
        html+="              <li data-target='#carousel-example-generic' data-slide-to='1'></li>";
        html+="              <li data-target='#carousel-example-generic' data-slide-to='2'></li>";
        html+="           </ol>";
        html+="          <div class='carousel-inner'>";
        html+="              <div class='item active'>";
        html+="                  <div class='overlay-slide'>";
        html+="                      <img src='../static/images/news1.jpeg' alt='' class='img-responsive'>";
        html+="                  </div>";
        html+="                  <div class='carousel-caption'>";
        html+="                      <div class='col-md-12 col-xs-12 text-center'>";
        html+="                          <h3> <b>EatMe</b>";
        html+="                          <div class='line'></div>";
        html+="                          <p> I love meat</p>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="              <div class='item'>";
        html+="                  <div class='overlay-slide'>";
        html+="                      <img src='../static/images/news2.jpeg' alt='' class='img-responsive'>";
        html+="                  </div>";
        html+="                  <div class='carousel-caption'>";
        html+="                      <div class='col-md-12 col-xs-12 text-center'>";
        html+="                          <h4 > We know you are Greats Chiefs </h4>";
        html+="                          <div class='line'></div>";
        html+="                          <p> Our range of flat has been extended!</p>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="              <div class='item'>";
        html+="                  <div class='overlay-slide'>";
        html+="                      <img src='../static/images/news3.jpeg' alt='' class='img-responsive'>";
        html+="                  </div>";
        html+="                  <div class='carousel-caption'>";
        html+="                      <div class='col-md-12 col-xs-12 text-center'>";
        html+="                          <h3 > See your Days' Matches</h3>";
        html+="                          <div class='line'></div>";
        html+="                          <h5> We never know? Tonight, it might be you that makes you cook </h5>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="           </div> 	 <!-- End Carousel Inner -->";
        html+="          <!-- Controls -->";
        html+="          <div class='slides-control '>";
        html+="              <a class='left carousel-control' href='#carousel-example-generic' data-slide='prev'>";
        html+="                  <span><i class='fa fa-angle-left'></i></span>";
        html+="              </a>";
        html+="              <a class='right carousel-control' href='#carousel-example-generic' data-slide='next'>";
        html+="                  <span><i class='fa fa-angle-right'></i></span>";
        html+="              </a>";
        html+="          </div>";
        html+="      </div>";
        html+="  </section>";
        html+="  <!--/ Slider end -->";
        html+="  <!-- Service Area start -->";
        html+="  <section id='service'>";
        html+="      <div class='container'>";
        html+="              <div class='row'>";
        html+="                  <div class='col-md-12 col-sm-12 col-xs-12'>";
        html+="                      <div class='feature_header text-center'>";
        html+="                          <h3 class='feature_title'> <b>WebSite utilisation</b></h3>";
        html+="                          <h4 class='feature_sub'>EatMe is dating site between persons who love cuisine, they practice it like nationnal sport, or not at all. Here you could invite members to cook what they like to eat. Or at the contrary it's will be they who invite you !</h4>";
        html+="                          <div class='divider'></div>";
        html+="                      </div>";
        html+="                  </div>  <!-- Col-md-12 End -->";
        html+="              </div>";
        html+="              <div class='row'>";
        html+="                  <div class='main_feature text-center'>";
        html+="                      <div class='col-md-3 col-xs-12 col-sm-6'>";
        html+="                              <div class='feature_content'>";
        html+="                                  <i class='fa fa-thumbs-o-up'></i>";
        html+="                                  <h5>Like</h5>";
        html+="                                  <p>You must grade in your like, all the plates you like to eat. It's could be the not ordinary pepperony pizza, or more sophisticated tiramisu!</p>";
        html+="                              </div>";
        html+="                          </div>";
        html+="                      <div class='col-md-3 col-xs-12 col-sm-6'>";
        html+="                              <div class='feature_content'>";
        html+="                                  <i class='fa fa-cutlery'></i>";
        html+="                                  <h5>Cook</h5>";
        html+="                                  <p>Si vous êtes du genre cordon bleu hipster, sur notre site vous pourrez y inscrire ce que vous savez, un peu, beaucoup, pationnement cuisinner. </p>";
        html+="                              </div>";
        html+="                      </div> <!-- Col-md-4 Single_feature End -->";
        html+="                      <div class='col-md-3 col-xs-12 col-sm-6'>";
        html+="                              <div class='feature_content'>";
        html+="                                  <i class='fa fa-check'></i>";
        html+="                                  <h5>Match</h5>";
        html+="                                  <p>Grâce à notre technologie de pointe, EatMe vous permet de mettre en relation les plats que vous savez cuisnier avec les gouts cullinaires de nos membres.</p>";
        html+="                              </div>";
        html+="                      </div> <!-- Col-md-4 Single_feature End -->";
        html+="                      <div class='col-md-3 col-xs-12 col-sm-6'>";
        html+="                              <div class='feature_content'>";
        html+="                                  <i class='fa fa-heart'></i>";
        html+="                                  <h5>Love</h5>";
        html+="                                  <p>Enfin grâce à un système de choix perfectionné vous pourrez choisir les profils de nos membres qui vous interesse et entrez facilement en contact avec eux!</p>";
        html+="                              </div>";
        html+="                      </div> <!-- Col-md-4 Single_feature End -->";
        html+="                      <!-- <button class='btn btn-main'> Read More</button> -->";
        html+="                  </div>";
        html+="          </div>  <!-- Row End -->";
        html+="      </div>  <!-- Container End -->";
        html+="  </section>";
        html+="{% else %}";
        html+="    <section id='testimonial' class='wow fadeInUp '>";
        html+="      <div class='container'>";
        html+="          <div class='row'>";
        html+="              <div class='col-md-12 col-sm-12 col-xs-12'>";
        html+="                  <div class='feature_header text-center'>";
        html+="                      {% if propositions=={} %}";
        html+="                      <h3 class='feature_title'>No match found :(</h3>";
        html+="                      <h4 class='feature_sub'>We're sorry for you</h4>";
        html+="                      <div class='divider'></div>";
        html+="                  </div>";
        html+="              </div>  <!-- Col-md-12 End -->";
        html+="          </div>";
        html+="                  <div class='row'>";
        html+="                      <div id='testimonial-carousel' class='owl-carousel owl-theme text-center testimonial-slide '>";
        html+="                        <h4> Our algorithme hadn't found any matches concerning your plates liked or cooked. <a href='#' onclick='display_all_plates()'> Please add one !</h4> </p>";
        html+="                      {% else %}";
        html+="                              <h3 class='feature_title'>You should like them</h3>";
        html+="                              <h4 class='feature_sub'>Mom, what do we eat tonight ?</h4>";
        html+="                              <div class='divider'></div>";
        html+="                          </div>";
        html+="                      </div>  <!-- Col-md-12 End -->";
        html+="                  </div>";
        html+="                          <div class='row'>";
        html+="                              <div id='testimonial-carousel' class='owl-carousel owl-theme text-center testimonial-slide '>";
        html+="                        {% for user in propositions %}";
        html+="                          <div id ='{{ propositions[user]['User'][0]['username'] }}' class='item'>";
        html+="                            <div class='testimonial-thumb'>";
        html+="                              {% if propositions[user]['User'][0]['img'] != '' %}";
        html+="                                <img id='{{ propositions[user]['User'][0]['username'] }}' onclick='add_love(this.id)' class='img-circle' src='{{ propositions[user]['User'][0]['img'] }}' onerror=this.src='{{ url_for('static', filename='images/default.png')}}' >";
        html+="                              {% else %}";
        html+="                                <img id='{{ propositions[user]['User'][0]['username'] }}' class='img-circle' src='{{ url_for('static', filename='images/default.png')}}' onerror=this.src='{{ url_for('static', filename='images/default.png')}}' >";
        html+="                              {% endif %}";
        html+="                            </div>";
        html+="                            <div class='testimonial-content'>";
        html+="                              <h3 id='{{ propositions[user]['User'][0]['username'] }}' class='name'><a class='get_profil' onclick='get_profil(this.id)' id='{{ propositions[user]['User'][0]['username'] }}' href='#'>{{ propositions[user]['User'][0]['username'] }}</a><span> Eating Rate : {{ propositions[user]['User'][0]['foodLevel'] }}/5</span></h3>";
        html+="                              <p class='testimonial-text'>";
        html+="                                {{ propositions[user]['User'][0]['desc'] }}";
        html+="                              </p>";
        html+="                              <div>";
        html+="                                <div class='proposition_commun'>She likes those of your meals  : {% for plate in propositions[user]['ICook'] %}{{ plate['name'] }},{% endfor %}</div>";
        html+="                                <div class='proposition_commun'>You like those of her meals : {% for plate in propositions[user]['HeCooks'] %}{{ plate['name'] }},{% endfor %}</div>";
        html+="                                <div class='proposition_commun'>You both like eating : {% for plate in propositions[user]['WeLike'] %}{{ plate['name'] }},{% endfor %}</div>";
        html+="                                <div class='proposition_commun'>You both know cooking : {% for plate in propositions[user]['WeCook'] %}{{ plate['name'] }},{% endfor %}</div>";
        html+="                              </div>";
        html+="                            </div>";
        html+="                          </div>";
        html+="                        {% endfor %}";
        html+="                        </div>";
        html+="                        <!-- Navigation start -->";
        html+="                        <div class='customNavigation cyprass-carousel-controller'>";
        html+="                          <a class='prev left'>";
        html+="                            <i class='fa fa-chevron-left'></i>";
        html+="                          </a>";
        html+="                          <!-- <a class='prev center'>";
        html+="                          <button class='btn btn-danger btn-lg' ><i class='fa fa-heart' aria-hidden='true'></i></button>";
        html+="                        </a> -->";
        html+="                        <a class='next right'>";
        html+="                          <i class='fa fa-chevron-right'></i>";
        html+="                        </a>";
        html+="                      </div>";
        html+="                    {% endif %}";
        html+="                    <!-- Navigation ENd -->";
        html+="                  </div>";
        html+="              </div> <!-- Row End -->";
        html+="            </section> <!-- Section Testimonial End -->";
        html+="        </section>  <!-- Section TEam End -->";
        html+="          <section id='about'>";
        html+="          <div class='container'>";
        html+="              <div class='row'>";
        html+="                  <div class='col-md-12 col-sm-12 col-xs-12'>";
        html+="                      <div class='feature_header text-center'>";
        html+="                          <h3 class='feature_title'>Eating Program</h3>";
        html+="                          <div class='divider'></div>";
        html+="                      </div>";
        html+="                  </div>";
        html+="              </div>";
        html+="              <div class='row'>";
        html+="                  <div class='feature-tab'>";
        html+="                     <div class='col-md-2 col-sm-3 col-xs-12'>";
        html+="                          <ul class='nav nav-tabs main-tab-list text-center' role='tablist'>";
        html+="                                <li role='presentation' class='active'>";
        html+="                                  <a href='#matches' role='tab' data-toggle='tab'>";
        html+="                                    <div class='single-tab'>";
        html+="                                      <div class='f-icon'>";
        html+="                                        <i class='fa fa-heart'></i>";
        html+="                                      </div>";
        html+="                                    </div>";
        html+="                                    <h4>Your matches</h4>";
        html+="                                  </a>";
        html+="                                </li>";
        html+="                                <li role='presentation'>";
        html+="                                  <a href='#liked' role='tab' data-toggle='tab' >";
        html+="                                    <div class='single-tab'>";
        html+="                                          <div class='f-icon'>";
        html+="                                              <i class='fa fa-thumbs-up'></i>";
        html+="                                          </div>";
        html+="                                      </div>";
        html+="                                       <h4>What I Like</h4>";
        html+="                                  </a>";
        html+="                                </li>";
        html+="                                <li role='presentation' >";
        html+="                                  <a href='#cooked' role='tab' data-toggle='tab'>";
        html+="                                      <div class='single-tab'>";
        html+="                                          <div class='f-icon'>";
        html+="                                              <i class='fa fa-cutlery'></i>";
        html+="                                          </div>";
        html+="                                      </div>";
        html+="                                  <h4>What I Cook</h4>";
        html+="                              </a>";
        html+="                            </li>";
        html+="                          </ul>";
        html+="                      </div>  <!-- col-md-12 end -->";
        html+="                      <div class='col-md-10 col-sm-9 col-xs-12'>";
        html+="                          <div class='tab-content main-tab-content'>";
        html+="                                <div role='tabpanel' class='tab-pane active ' id='matches'>";
        html+="                                      <div class='col-md-12 col-sm-9'>";
        html+="                                           <img src='images/about/web1.png' alt='' class='img-responsive'>";
        html+="                                      </div>";
        html+="                                      <div class='col-md-12 col-sm-9'>";
        html+="                                          <div class='c-tab'>";
        html+="                                               <h4>Here you cand find the eaters that you loved, and loved you back : contact them !</h4>";
        html+="                                               <div>";
        html+="                                                   <ul>";
        html+="                                                   {% for user in current_user.matched %}";
        html+="                                                    <li>";
        html+="                                                        <a href='#' onclick='get_profil_matched(this.id)' id='{{user.username}}'>{{user.username}}</a> : {{user.email}}";
        html+="                                                    </li>";
        html+="                                                   {% endfor %}";
        html+="                                                   </ul>";
        html+="                                               </div>";
        html+="                                          </div>";
        html+="                                      </div>";
        html+="                                </div>";
        html+="                                <div role='tabpanel' class='tab-pane' id='liked'>";
        html+="                                      <div class='col-md-12 col-sm-9'>";
        html+="                                           <img src='images/about/browse.png' alt='' class='img-responsive'>";
        html+="                                      </div>";
        html+="                                      <div class='col-md-12 col-sm-9'>";
        html+="                                          <div class='c-tab'>";
        html+="                                               <h4>Plates that you like</h4>";
        html+="                                               {% if current_user.liked==None %}";
        html+="                                                 <p>Don't you like any of our plates ?</p>";
        html+="                                                 <a href='#' onclick='display_all_plates()'> See our selection</a>";
        html+="                                               {% else %}";
        html+="                                                 <p>{% for plate in current_user.liked %}{{plate.name}}<br>{% endfor %}</p>";
        html+="                                                 <a href='#' onclick='display_all_plates()'> Add other plates</a>";
        html+="                                               {% endif %}";
        html+="                                          </div>";
        html+="                                      </div>";
        html+="                                </div>";
        html+="                                <div role='tabpanel' class='tab-pane' id='cooked'>";
        html+="                                     <div class='col-md-12 col-sm-9'>";
        html+="                                           <img src='images/about/web1.png' alt='' class='img-responsive'>";
        html+="                                      </div>";
        html+="                                     <div class='col-md-12 col-sm-9'>";
        html+="                                          <div class='c-tab'>";
        html+="                                               {% if current_user.cooked==[] %}";
        html+="                                                 <h4>Apparently nothing?</h4>";
        html+="                                                 <p>We are sure you know how to cook something...</p>";
        html+="                                               {% else %}";
        html+="                                                 <h4>List of all the plate you can propose to your matches !</h4>";
        html+="                                                 <p>{% for plate in current_user.cooked %}{{plate.name}}<br>{% endfor %}</p>";
        html+="                                               {% endif %}";
        html+="                                               <a href='#' onclick='display_all_plates()'> Increase your cooked list </a>";
        html+="                                          </div>";
        html+="                                      </div>";
        html+="                                </div>";
        html+="                          </div>";
        html+="                      </div>";
        html+="                    </div>";
        html+="                </div>";
        html+="            </div>";
        html+="        </section>";
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

function get_profil_matched(id){
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
        display_profil_matched(data);
      }
  });
}

function display_profil_matched(json){
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
  html+="                </div>";
  html+="            </div>";
  html+="        </div><!-- row End -->";
  html+="    </div>";
  html+="</section>";
  $("#main_container").append(html);
}

function delete_plate(id){
  var dict={
    "id":id
  };
  var datas = JSON.stringify(dict);
  $.ajax({
    url:"http://localhost:5000/allplates",
    type : 'DELETE',
    contentType : "application/json",
    data: datas,
    success : function(json){
      swal({
        title: 'Food deleted from DB!',
        imageUrl: 'http://www.hhblife.com/wp-content/uploads/2012/10/hhb-life-10-ways-to-stop-eating-after-dinner-300x200.jpg',
        imageWidth: 400,
        imageHeight: 200,
        animation: false
      })
    },
    error : function(json){
      swal({
        title: 'Error!',
        text: 'Something gone wrong, sorry...',
        type: 'error',
        confirmButtonText: 'Cool'
      })
    }
  });
}

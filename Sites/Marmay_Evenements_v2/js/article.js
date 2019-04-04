$(document).ready(function() {
  var url = $("#file").val();

  json = $.getJSON(`/pro/pages/articles/${url}.json`);

  json.success(function (response) {
    generate(response, $("section.content"));
  });

  json.fail(function (...response) {
    $("header h1").text("Erreur 404");
    $("header").css("background", `red`);
  });


  $("body").on("scroll", reveal);

});

function generate(json, defaultTarget){

  var roll = null; // Dirige vers l'élément si un roll est créé
  var target = defaultTarget;

  $(json).each(function(ix, val){
    var type = val[0];

    if(type==="page"){
      $("header h1").text(val[1]);
      $("header").css("background-image", `url(${val[2]})`);

      if(val[3]) $("header").css("background-position", `${val[3]}`);
    }

    if(type=="texte"){
      var el = $("<p class='app'></p>");
      $(el).html(val[1]);

      $(target).append(el);
    }

    if(type=="image"){
      var el = $(`<div class="img app" style="background-image: url('${val[1]}')"></div>`);
      var text = $("<div></div>");

      if(val[2]){
        var h5 = $(`<h5>${val[2]}</h5><br/>`);
        $(text).append(h5);
      }

      if(val[3]){
        var h6 = $(`<h6>${val[3]}</h6><br/>`);
        $(text).append(h6);
      }

      if(val[4]){
        $(el).css("height", val[4]);
      }

      $(el).append(text);
      $(target).append(el);
    }

    if(type=="roll"){
      var el = $(`<div class="gamme roll"></div>`);
      
      $(el).html(`<h2>${val[1]}</h2>`);
      roll = el;

      var content = $(`<div class="content"></div>`);
      $(el).append(content);

      $(target).append(el);

      target = content;
    }
    if(type=="roll-fin"){
      roll = null;
      target = defaultTarget;
    }

    if(type=="fiche"){
      for(let i = 1; i < val.length; i++){ // Pour chaque fiche (val[0] exclu car c'est le type)
        var el = $(`<div class="bg-img app" style="background-image: url('${val[i]}');"></div>`)
        $(target).append(el);
      }

      if(val.length==2){ // Si une seule fiche, alors centrer
        $(el).addClass("fiche-unique");
      }
    }
  });

  $(".roll:not(.open)").mouseup(function () {
    $(this).addClass("open");
    
    var roll = $(this);
  });
  $(".roll h2").mousedown(function () {
    var roll = $(this).parent();

    if( $(roll).hasClass("open") ){
      setTimeout(function () { $(roll).removeClass("open"); }, 100);
    }
  });

  $("div.bg-img").click(zoomImage);
  $(".imgzoom").click(unzoomImage);
  
  $(".app").css("opacity", 0);
  

  
  reveal();
}

function reveal(){
  var array;
  $(".app").each(function (ix) {
    array = [];

    var el = $(this);
    var distance = ($(el).offset().top);
    var compare = $(window).height()-50;

    if(distance<=compare){
      $(this).animate({opacity: 1}, 400);
      array.push($(this));
    }
  });
}

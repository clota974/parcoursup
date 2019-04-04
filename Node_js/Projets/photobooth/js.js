require = window.nodeRequire;
const fs = require('fs');
const {remote} = require("electron");
const bw = remote.BrowserWindow;
var picIndex = 0;
var uris = [];

const total = 4;
const counter = 3;
const remain = 3000;
const flashTime = 1000;
const path = `${__dirname}/tmp`;

var decorIndex = 1;
var n_template = 0;
var bubble_anim;
var stop_go = false;
var timer = 0;

var _w = 400;
var _h = 280;

fs.watch(".", function() {
  //window.close();
});

$(document).ready(function() {
  // A flag to know when start or stop the camera
  var enabled = false;
  // Use require to add webcamjs
  var Webcam = window.nodeRequire("webcamjs");

  var in_load = false;

  setTimeout(function () {
    start();
  }, 500);


  function IMG(dataString) {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),response = {};

      if (matches.length !== 3) {
          return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer(matches[2], 'base64');

      return response;
  }

  hello = function () {
    picIndex = 0;
    $("section.show").removeClass("show");
    $("section.home").addClass("show");

    clearTimeout(bubble_anim);

    $(".bubble").animate({opacity: 1}, 300);
    $(".bubble").text("Appuyer sur le bouton pour commencer");

    $(".btnCont").animate({opacity: 1}, 300);

    stop_go = false;
    $(".btnCont").one("click", go);
  }


  save = function(name, uri){
    fs.writeFile(`${path}/${name}.png`, IMG(uri).data, function(err) {
      if(err){
        console.warning("Cannot save the file :'( time to cry !");
        console.error(err);
      }
      console.log(`${path}/${name}.png`);
    });
  }

  go = function () {
    if(stop_go==true) return false;

    $(".bubble").animate({opacity: 0}, 300);
    $(".btnCont").animate({opacity: 0.7}, 300);

    picIndex++;
    if(picIndex>total){
      decor();
    }else{
      startCount();
      $("section.taking").addClass("show");
    }
  }

  startCount = function () {
    timer = counter;
    $(".timer").html(`<div class="timeNumber">${timer}</div>`);

    countdown = setInterval(function () {
      if(timer>1){
        timer--;
        $(".timer").html(`<div class="timeNumber">${timer}</div>`);
      }else{
        timer = 0;
        $(".timer").html("");
        clearInterval(countdown);
        if(stop_go) return false;
        snap();
      }
    }, 1000);
  }

  snap = function () {
    Webcam.snap(function(data_uri) {
      showPic(data_uri);
      save("pic"+(picIndex), data_uri);
      uris.push(data_uri);
    });
    flash();
  }
  flash = function () {
    $(".cover").addClass("flash");
    console.log(flashTime);
    setTimeout(function () {
      $(".cover").removeClass("flash");
    }, flashTime);
  }

  showPic = function (data_uri) {
    $("#result").html(`<img src="${data_uri}"/>`);
    $(".btnCont").addClass("load");
    reset();
  }

  reset = function () {
    setTimeout(function () {
      $("#result img, #result div").animate({bottom: "-=100%"},600, function() {
        $(this).remove();
        go();
      });

      $(".btnCont").removeClass("load");
    }, remain);
  }



  // FINAL STEP


  decor = function () {
    $(".btnCont").off("click");

    decorIndex = 1;
    $("section.taking").removeClass("show");
    $("section.decor").addClass("show");

    $("#preview").attr("src", `file://${__dirname}/template/temp${decorIndex}/iframe.html`);

    var list = fs.readdirSync(`${__dirname}/template`);
    n_template = 0;
    $(list).each(function (ix, val) {
      if( /temp/.test(val) ){
        n_template++;
      }
    })

    $(".prev").animate({opacity: 0}, 300);

    $(".bubble").text("Choisissez votre décor");
    $(".bubble").animate({opacity: 1}, 300);
    bubble_anim = setTimeout(function () {
      $(".bubble").animate({opacity: 0}, 300);

    }, 9000);

    $("#print").one("click", function () {
      var win = new bw({focusable:false, transparent:true, show:false});
      var src = $("iframe").attr('src');
      win.loadURL(`file://${__dirname}/template/temp${decorIndex}/iframe.html`);
      console.info(`Impression du décor ${decorIndex}`);

      $(".btnCont").addClass("load");
      $(".home h2").text("Impression en cours…");
      setTimeout(function () {
        hello();
      }, 1000);

      setTimeout(function () {
        $(".home h2").animate({opacity: 0}, 300, function () {
          $(".home h2").text("Faites-vos plus beaux sourires (ou vos plus belles grimaces) !");
          $(".home h2").animate({opacity: 1}, 300);
          $(".btnCont").removeClass("load");
        });
      }, 6000);
    });

  }
  //decor();

  var changeDecor = function () {
    $("iframe").animate({opacity: 0}, 300, function () {
      $("#preview").attr("src", `file://${__dirname}/template/temp${decorIndex}/iframe.html`);

      $("iframe").animate({opacity: 1}, 300);
    });

    if(decorIndex==1){
      $(".prev").animate({opacity: 0}, 300);
    }else{
      $(".prev").animate({opacity: 1}, 300);
    }

    if(decorIndex==n_template){
      $(".next").animate({opacity: 0}, 300);
    }else{
      $(".next").animate({opacity: 1}, 300);
    }
  }
  $(".next").click(function () {
    if(decorIndex==n_template) return false;

    decorIndex++;
    changeDecor();
  });
  $(".prev").click(function () {
    if(decorIndex<=1) return false;
    decorIndex--;
    changeDecor();
  });

  $("#cancel").click(hello);

  window.w = Webcam;

  Webcam.set({
    flip_horiz: true,
    width: _w,
    height: _h,
  });
  start = function(){
     if(!enabled){ // Start the camera !
       enabled = true;
       Webcam.attach('#camdemo');
       console.log("The camera has been started");
     }else{ // Disable the camera !
       enabled = false;
       Webcam.reset();
       console.log("The camera has been disabled");
     }
  }



  $("body").keyup(function (e) {
    if(!e.ctrlKey) return false;

    switch (e.key) {
      case "d":
        decor();
        break;
      case "i":
        $("#print").trigger("click");
        break;
      case "h":
        hello();
        break;
      case "s":
        stop_go = true;
        break;
      case "z":
        picIndex = 0;
        break;
      case "r":
        window.location.reload();
        break;
      case "p":
        var win = new bw({focusable:true, transparent:false, show:true});
        var src = $("iframe").attr('src');
        win.loadURL(`file://${__dirname}/template/temp${decorIndex}/iframe.html`);
        break;
    }
    /*
      Alt + …
      D = choisir le décor
      I = Imprimer
      H = Acceuil
      S = Arrêter
      Z = Reset
      R = Rafraîchir
      P = Paramètres d'impression
    */
  });

  hello();
});

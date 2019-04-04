$(document).ready(function() {
  help = true;
  wizz({
    title: "Mode Upside Down",
    text: "Jouez malicieusement pour que votre adversaire fasse un Squazzio car celui qui en fait un est déclaré perdant.",
    button: "OK"
  });

  busted = function (td) {
    var classe = $(td).children().hasClass("me") ? "1" : "2";

    if(classe==1){
      $("audio.zik").attr("src", `${baseDir}/zik/win.mp3`) .trigger("play");
    }else{
      $("audio.zik").attr("src", `${baseDir}/zik/lost.mp3`) .trigger("play");
    }

    $(".kaptur").addClass("busted");
    $(td).addClass("busted");
    $("h1").addClass("busted");
    _busted = true;

    setTimeout(function () {
      if(classe==1){
        wizz({
          title: "De-Squazzio !",
          text: "You have beated your opponent.",
          button: "Boum !",
          class: ""
        });
      }else{
        wizz({
          title: "You lost",
          text: "You made a Squazzio and lost.",
          button: "OK",
          class: "lost"
        });
      }
    }, 500);

    $("div.dialog button").click(function () { $("div.dialog").removeClass("appear") .removeClass("lost");
  });
  }

  init();
});

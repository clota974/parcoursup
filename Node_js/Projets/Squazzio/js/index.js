const fs = window.nodeRequire('fs');
fs.watch(".", function () {
  window.close();
});
$(document).ready(function() {
  $("audio.fond").prop("volume", 0.5);

  let pref = {};
  /*var nib = $.getScript("../.settings/pref.nib");
  $("body").css("opacity", 0);
  nib.complete(loadPref);*/

  $("ul a li").each(function () {
    $(this).attr("text", $(this).text());
  });
});

var entry = "";
$(document).keypress(function (ev) {
  entry += ev.keyCode;
  if(entry.match(/108115100/)){
    $("audio.wtf").attr("src", "lsd.mp3");
    $("audio.wtf").trigger("play");
    $("*").css("animation", "squazzio_bg 500ms infinite reverse");

    $("audio.wtf").on("ended", function () {
      $("*").css("animation", "inherit");
      $("body").css("background", "#000");
      $("h1").css("color", "#FF0");
    })
  }
});

loadPref = function (pref) {
  pref = ($.parseJSON(pref.responseText));
  theme = pref.theme;
  path = false;
  var type = $("body").attr("id");

  for (var i = 0; i < theme.length; i++) {
    if(theme[i].selected){
      path = theme[i].folder;
    }
  }

  // Style
  if(path){
    try {
      fs.exists(`themes/${path}`, function(res){
        if(!res) return false;
        $("link").remove();
        $("head").prepend(`<link rel="stylesheet" href="themes/${path}/index.css" media="screen" title="no title" charset="utf-8">`);
      });
    } catch (e) {
      alert("Le thème n'a pas pu être chargé");
    } finally {
      setTimeout(function () {
        $("body").css("opacity", 1);
      }, 10);
    }
  }

  // Volumes
  $("audio.fond").trigger("play") .prop("volume", pref.sound.fond/100);
  $("audio.wtf").prop("volume", pref.sound.jukebox/100);
}

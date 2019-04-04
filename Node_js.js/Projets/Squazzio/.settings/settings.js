$(document).ready(function() {
  var nib = $.getJSON("pref.nib");
  pref = {};
  nib.complete(function (r) {
    pref = ($.parseJSON(r.responseText));
    load(pref);
  });

  fs = window.nodeRequire("fs");

});
function load(pref) {
  $("td[data-type]").each(function() {
    var id = $(this).attr("id");
    var type = $(this).attr("data-type");
    $(this).attr("id", "");

    $(this).append(`<input id="${id}" name="${id}" type="${type}">`);
  });

  $("#fond").val(pref.sound.fond);
  $("#moves").val(pref.sound.moves);
  $("#jukebox").val(pref.sound.jukebox);

  if(pref.account.connected){
    $("#account").text(pref.account.infos.pseudo);
    $("#account-btn").text("Paramètres");
    $("#account-btn").click(function () {
      alert("Redirection vers le profil");
    });
  }else{
    $("#account").text("Déconnecté");
    $("#account-btn").text("Connexion");
    $("#account-btn").click(function () {
      alert("Nope");
    });
  }

  $("#fond, #moves, #jukebox").prop("max", 100) .prop("min", 0);

  $(pref.theme).each(function (ix, val) {
    $("#theme").append(`<option value="${ix}">${val.name}</option>`);
    if(val.selected){
      $(`#theme option[value=${ix}]`).prop("selected", true);
    }
  });
}

function save(){

  pref.sound.fond  = +($("#fond").val());
  pref.sound.moves  = +($("#moves").val());
  pref.sound.jukebox  = +($("#jukebox").val());

  $(pref.theme).each(function (ix, value) {
    pref.theme[ix].selected = false;
    pref.theme[$("#theme").val()].selected = true;
  });

  fs.open(`${__dirname}/../.settings/pref.nib`, "r+", function (err) {
    if(err){
      wizz({title: "Erreur", text: `Vos paramètres n'ont pas été sauvegardés, veuillez réessayez plus tard.`, button: "OK", class:"Lost"});
    }else{
      wizz({title: "Sauvegardé", text: "Vos paramètres ont été sauvegardés.", button: "Boum!"});
    }
  })
  fs.writeFile(`${__dirname}/../.settings/pref.nib`, JSON.stringify(pref));
}

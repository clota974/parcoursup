const fs = window.nodeRequire('fs');
const shell = window.nodeRequire("electron").shell;

letr = ["A","B", "C"];
const pad = 2;
bot = true;
const baseRelative = `${__dirname}/../..`;
const baseDir = `file://${baseRelative}`;
const relativeDir = `.`;

help = false;

pions_max = 3;

reversing = false;

tries  = 0;

var inf;

/*
console.group("Hello");
console.log("");
console.debug(`•••   •••
•••   •••`);
console.debug(`
|
|
|
.       .
.     .
. .

`);
// NOPE, THE LINK ISN'T HERE :)
console.log("");
console.info(`I don't have a clue how you came here but you seem pretty impressive.
Want a job ? I hire you, I'll let find the link somewhere. :)`);
console.debug("But don't be naughty");
console.log("");
console.log("");
console.groupEnd();


/**************/


remake = function (_tr) {
  var tr_id = letr[_tr];
  $(this).attr("id", tr_id);

  $($(this).children("td")).each(function(_td) {
    $(this).attr("data-lin", _tr);
    $(this).attr("data-col", _td);
    ////
    var code = data[_tr][_td];
    if(code==1){
      $(this).html(`<div class='me' style="top: ${_tr*100+pad}px; left: ${_td*100+pad}px"></div>`);
      pions++;
    }else if(code==2){
      $(this).html(`<div class='adv' style="top: ${_tr*100+pad}px; left: ${_td*100+pad}px"></div>`);
      pions_bot++;
    }
  });
  var rem_me = pions_max - pions;
  var rem_bot = pions_max - pions_bot;

  /* $(".subhead div.mine, .subhead div.op").html("");
  for (let z = 0; z < rem_me; z++) {
  $(".subhead div.mine").append("<div class='me'></div>");
}
for (let z = 0; z < rem_bot; z++) {
$(".subhead div.op").append("<div class='adv'></div>");
} */

setTimeout(function () {
  $(".subhead > div").each(function () {
    var width = $(this).width();
    $(this).width(width);
  });
}, 1000);
}

move = function (el) {
  /*!MOVE*/
  if(turn!=1) return false;

  if(pions<pions_max && $("td.selected div").length==0){
    addPions($(el));
    return false;
  }

  if($(el).children("div").length==1 || $("td.selected div").length==0 || _busted
  || !$(el).hasClass("movable")){
    $(".selected").removeClass("selected");
    $(".movable").removeClass("movable");
    return false;
  }

  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  $("td.selected div").css("top", 100*lin+pad);
  $("td.selected div").css("left", 100*col+pad);

  setTimeout(function () {
    $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
    .html(`<div class='me' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

    $(".selected").html("");
    $(".selected").removeClass("selected");
    $(`table.kaptur td`).removeClass("movable");
    $(".dot").prop("currentTime", 0) .trigger("play");

    turn = 2;
    update();
  }, 301); /*!*/

  // setTimeout(function () {
  //   if(!_busted) random();
  // }, 1000);
}

squazzio = function (type) {
  var obj = {title: "", p: ""}; // Données à afficher pour l'alert

  switch (type) {
    case 'triple':
    obj = {title: "Triple Squazzio !", text: "Vous avez gagné en créant un Triple Squazzio !"}
    break;
    default:
    obj = {title: "Squazzio !", text: "Vous avez gagné en encerclant votre adversaire !"}
  }
  $("audio.zik").trigger("play");
  $("audio.zik").prop("currentTime", 1);

  console.log("3");
  console.log("2");
  console.log("1");
  console.log("Balançoire");
  _busted = true;

  setTimeout(function () {
    obj.button = "Boum!"
    wizz(obj)
    $(".kaptur").css("background", $("body").css("background-color"));
  }, 5000);

  $("div.dialog button").click(function () {
    setVol(0);
    $("div.dialog").removeClass("appear");

    $(".kaptur td div.me").each(function (ix) {
      var time = Math.ceil(Math.random());
      $(this).css("animation", `squazzio_bg 5s ${(ix/4)+1}s infinite reverse`);
    });
    $(".kaptur td").each(function (ix) {
      var time = Math.ceil(Math.random());
      $(this).css("animation", `squazzio_bg 10s ${(ix/4)}s infinite reverse`);
    });

    $("body").removeClass("squazzio");
  });

  $("body").addClass("squazzio");
  $(".kaptur td").each(function (ix) {
    var time = Math.ceil(Math.random());
    $(this).css("animation", `squazzio_bg 500ms ${(ix/4)}s infinite reverse`);
  });
  $(".kaptur td div.me").each(function (ix) {
    var time = Math.ceil(Math.random());
    $(this).css("animation", `squazzio_bg 500ms ${(ix/4)+1}s infinite reverse`);
  });
}

busted = function (td) {
  $(fond).trigger("pause");
  if(typeof td == "string"){
    squazzio(td);
    return false;
  }

  $(fond).trigger("pause");
  var classe = $(td).children().hasClass("me") ? 1 : 2;

  setVol($(fond), 0);

  if(classe==2){
    $(".kaptur td div.me").each(function (ix) {
      $(this).css("animation", `squazzio_bg 5s ${(ix/3)}s infinite reverse`);
    });
    setTimeout(function () {
      $("audio.zik").attr("src", `${baseDir}/zik/win.mp3`) .trigger("play");
    }, 300);
  }else{
    $("audio.zik").attr("src", `${baseDir}/zik/lost.mp3`) .trigger("play");
  }

  $(".kaptur").addClass("busted");
  $(td).addClass("busted");
  $("h1").addClass("busted");
  _busted = true;

  var winText;
  setTimeout(function () {
    if(classe==2){
      winText = {title: "Squazzio !", text: "Vous avez battu votre adversaire.", button: "Boum !"};
      if(classe==2 && pions_bot<pions_max && $("body").attr("id")!="mystery"){
        winText = {
          title: "Squabusif !",
          text: "Vous avez battu votre adversaire.",
          button: "Je suis un tricheur"};
        };
        win();
      }else{
        winText = {
          title: "Perdu !",
          text: "Votre adversaire vous a battu.",
          button: "OK!",
          class: "lost"
        };
        lost();
      }

      winText.btnClick = function () {
        unwizz();
        checkAchievements();
      }
      wizz(winText);
    }, 2500);
  }

  win = function(){
    // Ajouter 1win au fichier infos.nib

    $("h1").text("Win!")

    //inf.stats.win++;
    //fs.writeFile(`${baseRelative}/.settings/infos.nib`, JSON.stringify(inf));
  }
  lost = function () {
    // Ajouter 1lost au fichier infos.nib
    inf.stats.lost++;
    fs.writeFile(`${baseRelative}/.settings/infos.nib`, JSON.stringify(inf));
  }
  checkAchievements = function () {
    var achieve_id = false; //Par défaut, aucune récompense

    switch (inf.stats.win) {
      case 10:
      achieve_id = "W10";
      break;
      case 50:
      achieve_id = "W50";
      break;
      case 100:
      achieve_id = "W100";
      break;
      case 250:
      achieve_id = "W250";
      break;
      case 500:
      achieve_id = "W500";
      break;
      case 700:
      achieve_id = "W700";
      break;
      case 1000:
      achieve_id = "W1000";
      break;
    }

    if(achieve_id != false){ // Si il y a récompense
      for (var i = 0; i < inf.achievements.length; i++) { // Regarder quelle est la récompense
        if(inf.achievements[i].id == achieve_id && inf.achievements[i].acq==false){
          // Regarder quelle est la récompense et si elle n'a pas déjà été gagnée

          // Récompenser la récompense
          reward(inf.achievements[i]);
          inf.achievements[i].acq = true; // Indiquer qu'à présent la récompense est acquise
          fs.writeFile(`${baseDir}/.settings/infos.nib`, JSON.stringify(inf)); // Enregistrer
        }
      }
    }


  }

  reward = function (obj) {
    // Alert pour la récompense
    setTimeout(function () {

      $("div.dialog").addClass("appear");
      $("div.dialog").addClass("reward");
      $("div.dialog h4").text(`Trophée débloqué : ${obj.name}`);
      $("div.dialog p").text(obj.desc);
      $("div.dialog button").text("Boum !");
      $("div.dialog button").off("click");
      $("div.dialog button").click(function () {
        $("div.dialog").removeClass("appear")
        setTimeout(function () {
          $("div.dialog").removeClass("reward");
        }, 1000);
      })

    }, 1000);
  }

  loadPref = function (pref) {
    pref = ($.parseJSON(pref.responseText));
    theme = pref.theme;
    path = false;
    var type = $("body").attr("id");

    for (var i = 0; i < theme.length; i++) {
      if(theme[i].selected){
        path = (theme[i].folder).toLowerCase();
      }
    }

    // Style
    if(path){
      try {
        fs.exists(`${baseRelative}/themes/${path}`, function(res){
          if(res==false){
            alert("Le thème n'a pas pu être chargé");
            console.error(`Le dossier ${baseRelative}/themes/${path} n'existe pas.`);

            return false;
          }
          $("link").remove();
          var themesDir = `${baseRelative}/themes/${path}/`;
          $("head").append(`<link rel="stylesheet" href="${themesDir}/master.css" media="screen" title="no title" charset="utf-8">`);
          $("head").append(`<link rel="stylesheet" href="${themesDir}/game.css" media="screen" title="no title" charset="utf-8">`);
          if(type!="regular"){
            $("head").append(`<link rel="stylesheet" href="${themesDir}/${type}.css" media="screen" title="no title" charset="utf-8">`);
          }
        });
      } catch (e) {
        alert("Le thème n'a pas pu être chargé");
        console.error(`Exception : Le dossier ${baseRelative}/themes/${path} n'existe pas : ${e}`);
      } finally {
        setTimeout(function () {
          $("body").css("opacity", 1);
        }, 10);
      }
    }

    // Volumes
  }
  loadInf = function () {
    inf = ($.parseJSON(inf.responseText));
  }

  /************/

  check = function () {
    $(Game.players).each(function (ix, list) {
      var coinces = 0;
      var squazzio = false;
      $(list).each(function (iy, player) {
        $(player.pionsPlaced).each(function (iz, pion) {
          var bust = pion.bust();
          if(bust.partiel === 0){
            win(Player);
          }
          if(bust.vide === 0){
            coinces++;;
          }
        });
      });

      if(coinces === 3) $("h1").text("Triple");
    });
  }
  /*****/
  init = function() {
    debugger;


  }


  caseNumber = function (ix) {
    var args = null;

    switch (ix) {
      case 0:
      args = {x: 0, y: 0};
      break;
      case 1:
      args = {x: 1, y: 0};
      break;
      case 2:
      args = {x: 2, y: 0};
      break;
      case 3:
      args = {x: 0, y: 1};
      break;
      case 4:
      args = {x: 1, y: 1};
      break;
      case 5:
      args = {x: 2, y: 1};
      break;
      case 6:
      args = {x: 0, y: 2};
      break;
      case 7:
      args = {x: 1, y: 2};
      break;
      case 8:
      args = {x: 2, y: 2};
      break;
    }
    if(args === null){
      console.error("caseNumber() Aucunes coordonnées correspondantes. ix = ", ix);
    }
    return args;
  }

  moveTo = function (obj) {
    var {ev} = obj
    var destination = {
      html: obj.html,
      ix: -1,
      x: -1,
      y: -1
    }

    destination.ix = $(".kaptur td").index(destination.html)
    destination.coords = caseNumber(destination.ix)
    destination.x = destination.coords.x
    destination.y = destination.coords.y

    Game.selectedPion.move(destination.x, destination.y, true);
  }

tes = "012011022";
strToBoard = function(string){
  if(string.length != 9){
    Game.warn("strToBoard", "Chaine de caractère invalide")
    return "Chaine de caractère invalide"
  }

  var obj = [[0,0,0],[0,0,0],[0,0,0]];

  for (var i = 0; i < 9; i++) {
    var coords = caseNumber(i);

    obj[coords.y][coords.x] = parseInt(string[i]);
  }

  return obj;
}


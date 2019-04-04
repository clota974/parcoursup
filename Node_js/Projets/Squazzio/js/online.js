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

pions = 0;
pions_bot = 0;
reversing = false;

tries  = 0;

_busted = false;
turn = 1;

data = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
];
var inf;

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


remake = function (_tr) {
  var tr_id = letr[_tr];
  $(this).attr("id", tr_id);

  $($(this).children("td")).each(function(_td) {
    $(this).attr("data-lin", _tr);
    $(this).attr("data-col", _td);

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

  $(".subhead div.mine, .subhead div.op").html("");
  for (let z = 0; z < rem_me; z++) {
    $(".subhead div.mine").append("<div class='me'></div>");
  }
  for (let z = 0; z < rem_bot; z++) {
    $(".subhead div.op").append("<div class='adv'></div>");
  }
}

move = function (el) {
  // el = case où le pion se dirige

  if( (pions+pions_bot) < (pions_max*2) && $("td.selected div").length==0){
    // Regarder si tous les pions sont déjà posés

    addPions($(el));
    return false;
  }

  // Annuler la séléction
  if($(el).children("div").length==1 || $("td.selected div").length==0 || _busted
  || !$(el).hasClass("movable")){
    $(".selected").removeClass("selected");

    var _class = turn===1?"me":"adv";
    $(".movable").removeClass(`movable ${_class}`);
    return false;
  }

  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  $("td.selected div").css("top", 100*lin+pad);  // Animation pour bouger le pion
  $("td.selected div").css("left", 100*col+pad); // Animation pour bouger le pion

  setTimeout(function () {
    //Placer le vrai pion
    var _class = turn===1?"me":"adv";
    $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
    .html(`<div class="${_class}" style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

    // Enlever le pion d'origine
    $(".selected").html("");
    $(".selected").removeClass("selected");

    var _class = turn===1?"me":"adv";
    $(`table.kaptur td`).removeClass(`movable ${_class}`);

    var zik = turn===1?"dot":"bot";
    $(`.${zik}`).prop("currentTime", 0) .trigger("play");

    turn = turn===2 ? 1 : 2;
    update();
  }, 301);

}

check = function () {
  var total_busters_me = 0; //Si les 3 pions ne peuvent bouger alors 3 squazzio
  var total_busters_adv = 0; //Si les 3 pions ne peuvent bouger alors 3 squazzio
  $("td div").each(function(index) {
    var el = $(this).parent();
    var classe = $(this).hasClass("me") ? "1" : "2";

    var lin = parseInt($(el).attr("data-lin"));
    var col = parseInt($(el).attr("data-col"));

    var around = []; // Tiles around
    var busters = 0 // ( if = 4 ) { BUSTED ! } ;
    var r_busters = 0; // Tous les objets qu'ils l'entourent même s'ils sont de la même classe. détecte un 3 Squazzio

    around.push([lin+1, col]);
    around.push([lin-1, col]);
    around.push([lin, col+1]);
    around.push([lin, col-1]);
    around.push([lin-1, col+1]);
    around.push([lin+1, col-1]);
    around.push([lin-1, col-1]);
    around.push([lin+1, col+1]);

    for (let i = 0; i < around.length; i++) {

      var code = 3; // Default
      var nLin = around[i][0];
      var nCol = around[i][1];

      if(around[i][0]<3&&around[i][0]>=0){
        if(around[i][1]<3&&around[i][1]>=0){
          code = data[nLin][nCol];
        }
      }
      if(code != 0 && code != classe) {
        busters++;
      }
      if(code!=0){
        r_busters++;
        if(r_busters==8&&classe==="1") total_busters_me++;
        if(r_busters==8&&classe==="2") total_busters_adv++;
      }
    }
    console.log(r_busters);
    if(busters==around.length){
      busted(el);
    }
  });

  if(total_busters_me==3){ // Si les 4 pions roses (me) coincés alors
    busted("triple_adv");  // Triple Squazzio pour les jaunes (adv)
  }
  if(total_busters_adv==3){ // L'inverse d'en haut
    busted("triple_me");
  }
}

where = function(el){
  // el = Cellule du tableau sélectionée

  // IF    la case est vide, est déjà sélectionnée, s'il est coincé, si ce n'est pas à son tour
  // THEN  return false
  if($(el).children("div").length!=1||$(el).hasClass("selected")||_busted){
    return false;
  }

  if(turn==1 && $(el).children("div.me").length!=1){
    return false;
  }
  if(turn==2 && $(el).children("div.adv").length!=1){
    return false;
  }
  // Enlever toutes les classes précédentes
  var _class = turn===1?"me":"adv";
  $(`table.kaptur tbody tr td`).removeClass(`movable ${_class}`);
  $(`table.kaptur tbody tr td`).removeClass("selected");

  // Ajouter .selected à la cellule
  $(el).addClass("selected");

  // Ligne et colonne de la cellule
  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  var around = []; // Tiles around
  var busters = 0 // ( if == 6 ) { BUSTED ! } ;

  // Les cases autour de la cellule
  around.push([lin+1, col]);   // ↓
  around.push([lin-1, col]);   // ↑
  around.push([lin, col+1]);   // →
  around.push([lin, col-1]);   // ←
  around.push([lin-1, col+1]); // ↗︎
  around.push([lin+1, col-1]); // ↙︎
  around.push([lin-1, col-1]); // ↖︎
  around.push([lin+1, col+1]); // ↘︎

  // Pour chaque potentielle cellule autour
  for (let i = 0; i < around.length; i++) {
    // around[i] est une cellule autour de .selected

    var code = 3; // Default : la case n'existe pas
    var nLin = around[i][0];
    var nCol = around[i][1];

    if(around[i][0]<3&&around[i][0]>=0){   // Regarde si la ligne de cellule around[i] existe
      if(around[i][1]<3&&around[i][1]>=0){ // Regarde si la colonne de cellule around[i] existe
        code = data[nLin][nCol]; // Regarde ce que la case contient.
      }
    }

    if(code == 0){ // Si la case est vide
      var _class = turn===1?"me":"adv";
      $(`table.kaptur tbody tr:nth-child(${nLin+1}) td:nth-child(${nCol+1})`)
      .addClass(`movable ${_class}`); // Ajouter la classe .movable
    }

    // Ex : A3 = 1 … Dans la cellule A3, il y a un de mes pion (1).
    $(".data").append((letr[nLin]||"Z")+nCol+" = "+code+"<br/>");
  }

}

squazzio = function (type) {
  var obj; // Données à afficher pour l'alert

  switch (type) {
    case 'triple_me':
      obj = {title: "Triple Squazzio !", text: "Les roses ont gagné en créant un Triple Squazzio !", class:"me"}
      break;
    case 'triple_adv':
      obj = {title: "Triple Squazzio !", text: "Les jaunes ont gagné en créant un Triple Squazzio !", class:"adv"}
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

  var _class = type==="triple_me"?"me":"adv";

  setTimeout(function () {
    obj.button = "Boum!";
    wizz(obj)
    $(".kaptur").css("background", $("body").css("background-color"));
  }, 5000);

  $("div.dialog button").click(function () {
    setVol(0);
    $("div.dialog").removeClass("appear");

    $(`.kaptur td div.${_class}`).each(function (ix) {
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
  $(`.kaptur td div.${_class}`).each(function (ix) {
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

  setTimeout(function () {
    $("audio.zik").attr("src", `${baseDir}/zik/win.mp3`) .trigger("play");
  }, 300);

  $(".kaptur").addClass("busted");
  $(td).addClass("busted");
  $("h1").addClass("busted");
  _busted = true;

  var winText;
  setTimeout(function () {
    if(classe==2){
      winText = {title: "Squazzio !", text: "L'équipe rose a gagné.", button: "Boum !", class: "me"};
      win();
    }else{
      winText = {title: "Squazzio !", text: "L'équipe jaune a gagné.", button: "Boum !", class: "adv"};
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
  return false;
  inf.stats.win++;
  fs.writeFile(`${baseRelative}/.settings/infos.nib`, JSON.stringify(inf));
}
lost = function () {
  // Ajouter 1lost au fichier infos.nib
  return false;
  inf.stats.lost++;
  fs.writeFile(`${baseRelative}/.settings/infos.nib`, JSON.stringify(inf));
}
checkAchievements = function () {
  return false;
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

update = function (stop) {
  var _pi = 0; // Pions
  var _pb = 0; // Pions bots

  $("table.kaptur tbody tr td").each(function(ix) {
    var td = $(this);
    var _td = parseInt($(td).attr("data-col"));
    var _tr = parseInt($(td).attr("data-lin"));

    if($(td).children("div.me").get(0)){
      data[_tr][_td] = 1;
      _pi++;
    }else if($(td).children("div.adv").get(0)){
      data[_tr][_td] = 2;
      _pb++;
    }else{
      data[_tr][_td] = 0;
    }
  });

  if(!stop) check();

  if(turn===1){
    $("h1").removeClass("adv") .addClass("me");
  }else if(turn===2){
    $("h1").removeClass("me") .addClass("adv");
  }

  var rem_me = pions_max - _pi;
  var rem_bot = pions_max - _pb;

  if(rem_me<$(".subhead div.mine").children().length){
    var diff = $(".subhead div.mine").children().length - rem_me;
    for (let z = 0; z < diff; z++) {
      var elm = $(".subhead div.mine div.me")[0];
      var top = parseInt($(elm).css('height'))+10;
      $(elm).css("top", `-${top}px`);
      setTimeout(function () {
        $(elm).remove();
      }, 400);
    }
  }

  if(rem_bot<$(".subhead div.op").children().length){
    var diff = $(".subhead div.op").children().length - rem_bot;
    for (let z = 0; z < diff; z++) {
      var elm = $(".subhead div.op div.adv")[0];
      var top = parseInt($(elm).css('height'))+10;
      $(elm).css("top", `-${top}px`);
      setTimeout(function () {
        $(elm).remove();
      }, 400);
    }
  }
}

addPions = function (el) {
  if($(el).children().length>0) return false;
  if(turn==1 && pions==pions_max) return false;
  if(turn==2 && pions_bot==pions_max) return false;

  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  var _class = turn===1 ? "me" : "adv";

  $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
  .html(`<div class="${_class}" style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

  if(turn==1){
    pions++;
  }else{
    pions_bot++;
  }


  var zik = turn===1?"dot":"bot";
  $(`.${zik}`).prop("currentTime", 0) .trigger("play");
  turn = turn===1 ? 2 : 1;

  update();
}

aroundF = function (el) {
  var lin = parseInt($(el).parent().attr("data-lin"));
  var col = parseInt($(el).parent().attr("data-col"));
  var around = []; // Tiles around
  var busters = 0 // ( if = 4 ) { BUSTED ! } ;

  around.push([lin+1, col]);
  around.push([lin-1, col]);
  around.push([lin, col+1]);
  around.push([lin, col-1]);
  around.push([lin-1, col+1]);
  around.push([lin+1, col-1]);
  around.push([lin-1, col-1]);
  around.push([lin+1, col+1]);

  for (let i = 0; i < around.length; i++) {

    var code = 3; // Default
    var nLin = around[i][0];
    var nCol = around[i][1];

    if(around[i][0]<3&&around[i][0]>=0){
      if(around[i][1]<3&&around[i][1]>=0){
        code = data[nLin][nCol];
      }
    }

    $(".data").append((letr[nLin]||"Z")+nCol+" = "+code+"<br/>");
  }
  console.log("around");
  return around;
}

random = function () {
  if(!bot) return false;
  if(pions_bot<pions_max){
    addPionsBot();
    return false;
  }

  var ran = Math.round(Math.random() * (2 - 0) + 0);

  var el = $($(`.kaptur div.adv`)[ran]);

  var around = aroundF(el);
  var arcode = [];

  for (let i = 0; i < around.length; i++) {
    var nLin = around[i][0];
    var nCol = around[i][1];

    if(around[i][0]<3&&around[i][0]>=0){
      if(around[i][1]<3&&around[i][1]>=0){
        if(data[nLin][nCol]==0){
          arcode.push([nLin, nCol]);
        }
      }
    }
  }

  if(arcode.length==0){
    if(tries==10){
      busted("triple");
      return false;
    }
    tries++;

    random();
    return false;
  }

  var num = Math.round(Math.random() * (arcode.length - 1));

  var lin = arcode[num][0];
  var col = arcode[num][1];

  $(el).css("top", 100*lin+pad);
  $(el).css("left", 100*col+pad);

  $(".bot").prop("currentTime", 0) .trigger("play");
  setTimeout(function () {
    $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
    .html(`<div class='adv' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

    tries = 0;

    $(el).remove();
    $(".selected").removeClass("selected");

    var _class = turn===1?"me":"adv";
    $(`table.kaptur td`).removeClass(`movable ${_class}`);
    turn = 1;
    update();
  }, 301);

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
        $("head").append(`<link rel="stylesheet" href="${themesDir}/multiplayer.css" media="screen" title="no title" charset="utf-8">`);
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
  $("audio.bot, audio.dot").prop("volume", pref.sound.moves/100);
  $("audio.fond").trigger("play") .prop("volume", pref.sound.fond/100);
  $("audio.zik").prop("volume", pref.sound.jukebox/100);
}

loadInf = function () {
  inf = ($.parseJSON(inf.responseText));
  console.log(inf);
}


init = function() {
  let pref = {};
  var nib = $.getScript(baseDir+"/.settings/pref.nib");
  $("body").css("opacity", 0);
  nib.complete(loadPref);

  inf = $.getScript(baseDir+"/.settings/infos.nib");
  $("body").css("opacity", 0);
  inf.complete(loadInf);

  fond = $(`<audio src="${baseDir}/zik/fond.mp3" class='fond'></audio>`);
  $(".zikCont").append(fond);

  setInterval(function () {
    if($(fond).prop("currentTime")>55.7){
      $(fond).prop("currentTime", 0);
    }
  }, 500);

  $(fond).trigger("play") .prop("volume", .7);
  $("audio").prop("loop", false) .prop("volume", .2);
  $("audio.zik").prop("loop", false) .prop("volume", .5);
  $("audio.fond").prop("loop", true);

  setVol = function (_to) {
    vol_int = setInterval(function () {
      if ($("audio.zik").prop("volume")>_to) {
        var v = $("audio.zik").prop("volume");
        $("audio.zik").prop("volume", v-0.01)
      }else if ($("audio.zik").prop("volume")>_to) {
        $("audio.zik").prop("volume", v+0.01)
      }else if ($("audio.zik").prop("volume")==_to) {
        clearInterval(vol_int);
      }
    }, 50);
  }

  $(".subhead div div").attr("data-dis", "false");

  $("table.kaptur tbody tr").each(remake); // Init

  $("td").dblclick(function () { move($(this)) }); // Move
  $("td").click(function () { where($(this), $("td div").length); }); //Select Dot

  setTimeout(function () {
    if(help){
      $("div.dialog").addClass("appear");
      $("div.dialog button").click(function () { $("div.dialog").removeClass("appear") });
    }
  }, 200);

}
load = function () {
  var ajax = $.post("http://localhost/squazzio/desktop/game.php",
  {
    data: {id: 1},
  });
  ajax.complete(function (res) {
    json = JSON.parse(res.responseText);
    infos = JSON.parse(json.infos);

    data = infos.jeu.pions;
    

    $("table.kaptur tbody tr").each(remake); // Init

  });
}

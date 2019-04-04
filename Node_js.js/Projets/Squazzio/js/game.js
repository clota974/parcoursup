const fs = window.nodeRequire('fs');
const shell = window.nodeRequire("electron").shell;
letr = ["A","B","C"];
const pad = 2;
bot = true;
const baseDir = `file://${__dirname}/../..`;
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
  [2,1,0],
  [2,1,0],
  [2,0,0]
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
  }, 301);

  // setTimeout(function () {
  //   if(!_busted) random();
  // }, 1000);
}

check = function () {
  $("td div").each(function(index) {
    var el = $(this).parent();
    var classe = $(this).hasClass("me") ? "1" : "2";

    var lin = parseInt($(el).attr("data-lin"));
    var col = parseInt($(el).attr("data-col"));

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
      if(code != 0 && code != classe) {
        busters++;
      }
    }

    if(busters==around.length){
      busted(el);
    }
  });
}

where = function(el){
  if($(el).children("div.me").length!=1||$(el).hasClass("selected")||_busted||turn!=1){
    return false;
  }

  $(`table.kaptur tbody tr td`).removeClass("movable");
  $(`table.kaptur tbody tr td`).removeClass("selected");
  $(el).addClass("selected");


  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  var around = []; // Tiles around
  var busters = 0 // ( if == 6 ) { BUSTED ! } ;

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

    if(code == 0){
      $(`table.kaptur tbody tr:nth-child(${nLin+1}) td:nth-child(${nCol+1})`)
      .addClass("movable");
    }

    $(".data").append((letr[nLin]||"Z")+nCol+" = "+code+"<br/>");
  }

}

squazzio = function (type) {
  var obj = {title: "", p: ""};

  switch (type) {
    case 'triple':
      obj = {title: "Triple Squazzio !", p: "Vous avez gagné en créant un Triple Squazzio !"}
      break;
    default:
      obj = {title: "Squazzio !", p: "Vous avez gagné en encerclant votre adversaire !"}
  }
  $("audio.zik").trigger("play");
  $("audio.zik").prop("currentTime", 1);
  console.log("3");
  console.log("2");
  console.log("1");
  console.log("Balançoire");
  _busted = true;

  setTimeout(function () {
    $("div.dialog").addClass("appear");
    $("div.dialog h4").text(obj.title);
    $("div.dialog p").text(obj.p);
    $("div.dialog button").text("AWESOME !");
    $(".kaptur").css("background", $("body").css("background-color"));
  }, 5000);

  $("div.dialog button").click(function () {
    setVol($("audio.zik"), 0);
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
  inf.stats.win++;
  fs.writeFile(`${relativeDir}/.settings/infos.nib`, JSON.stringify(inf));
}
lost = function () {
  inf.stats.lost++;
  fs.writeFile(`${relativeDir}/.settings/infos.nib`, JSON.stringify(inf));
}
checkAchievements = function () {
  var achieve_id = false;

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
  if(achieve_id != false){
    for (var i = 0; i < inf.achievements.length; i++) {
      if(inf.achievements[i].id == achieve_id && inf.achievements[i].acq==false){
        reward(inf.achievements[i]);
        inf.achievements[i].acq = true;
        fs.writeFile(`${baseDir}/.settings/infos.nib`, JSON.stringify(inf));
      }
    }
  }else{
    achLen = inf.achievements.length;
    if(inf.achievements[achLen - 1].acq==true){
      reward(inf.achievements[achLen - 1])
    }
  }


}

reward = function (obj) {
  setTimeout(function () {
    wizz({
      title: `Trophée débloqué : ${obj.name}`,
      text: obj.desc,
      button: "Boum !",
      class: "reward"
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

  setTimeout(function () {
    if (turn==2&&!_busted) {
      random();
    }
  }, 700);
}

addPions = function (el) {
  if($(el).children().length>0) return false;

  var lin = parseInt($(el).attr("data-lin"));
  var col = parseInt($(el).attr("data-col"));

  $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
  .html(`<div class='me' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

  pions++;
  turn = 2;
  update();
  $(".dot").prop("currentTime", 0) .trigger("play");

  // setTimeout(function () {
  //   if(!_busted) random();
  // }, 1000);
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

addPionsBot = function () {
  var ran, ran2;

  do {
    ran = Math.round(Math.random() * (data.length - 1));
    ran2 = Math.round(Math.random() * (data[ran].length - 1));
  }while (data[ran][ran2]!=0)

  var lin = ran;
  var col = ran2;

  $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
  .html(`<div class='adv' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

  pions_bot++;
  $(".bot").prop("currentTime", 0) .trigger("play");
  turn = 1;
  update();
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
    $(`table.kaptur td`).removeClass("movable");
    turn = 1;
    update();
  }, 301);

}

init = function() {
  let pref = {};

  var nib = $.getScript(relativeDir+"/.settings/pref.nib");
  $("body").css("opacity", 0);
  nib.complete(loadPref);

  inf = $.getScript("../../.settings/infos.nib");
  $("body").css("opacity", 0);
  inf.complete(loadInf);

  fond = $(`<audio src="../../zik/fond.mp3" class="fond"></audio>`);
  $("body div.zikCont").append(fond);

  setInterval(function () {
    if($(fond).prop("currentTime")>55.7){
      $(fond).prop("currentTime", 0);
    }
  }, 500);

  $(fond).trigger("play") .prop("volume", .7);
  $("audio").prop("loop", false) .prop("volume", .2);
  $("audio.zik").prop("loop", false) .prop("volume", .5);
  $(fond).prop("loop", true);

  setVol = function (obj, _to) {
    vol_int = setInterval(function () {
      if ($(obj).prop("volume")>_to) {
        var v = $(obj).prop("volume");
        $(obj).prop("volume", v-0.01)
      }else if ($(obj).prop("volume")>_to) {
        $(obj).prop("volume", v+0.01)
      }else if ($(obj).prop("volume")==_to) {
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
      wizz({title: $(".dialog h4").text(), text: $(".dialog p").text(), button: "Jouer"});
    }
  }, 200);

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
  if($("link").length>=2 && path){
    try {
      res = fs.existsSync(`${relativeDir}/themes/${path}`);
      if(res==false){
        alert("Le thème n'a pas pu être chargé");

        return false;
      }
      $("link").remove();
      $("head").append(`<link rel="stylesheet" href="${baseDir}/themes/${path}/master.css" media="screen" title="no title" charset="utf-8">`);
      $("head").append(`<link rel="stylesheet" href="${baseDir}/themes/${path}/game.css" media="screen" title="no title" charset="utf-8">`);
      if(type!="regular"){
        $("head").append(`<link rel="stylesheet" href="${baseDir}/themes/${path}/${type}.css" media="screen" title="no title" charset="utf-8">`);
      }

    } catch (e) {
      alert("Le thème n'a pas pu être chargé");
      console.log(e);
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
}
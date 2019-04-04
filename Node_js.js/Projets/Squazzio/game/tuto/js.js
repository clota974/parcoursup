const pad = 2;
$(document).ready(function() {
  const fs = window.nodeRequire('fs');
  const shell = window.nodeRequire("electron").shell;
  const letr = ["A","B", "C"];
  bot = true;

  const pions_max = 3;

  pions = 0;
  pions_bot = 0;

  var tries  = 0;

  var _busted = false;

  data = [
    [0,0,0],
    [2,1,0],
    [0,0,0]
  ]
  fs.watch(".", function () {
    window.close();
  });

  $("table.kaptur tbody tr").each(function(_tr) {
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
  });

  var check = function () {
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
  $("td").click(function () {
    where($(this));
  });

  var where = function(el){
    if($(el).children("div.me").length!=1||$(el).hasClass("selected")||_busted){
      return false;
    }

    $(`table.kaptur tbody tr td`).removeClass("movable");
    $(`table.kaptur tbody tr td`).removeClass("selected");
    $(el).addClass("selected");


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

      if(code == 0){
        $(`table.kaptur tbody tr:nth-child(${nLin+1}) td:nth-child(${nCol+1})`)
        .addClass("movable");
      }

      $(".data").append((letr[nLin]||"Z")+nCol+" = "+code+"<br/>");
    }

  }

  $("td").dblclick(function () {
    if(pions<pions_max && $("td.selected div").length==0){
      addPions($(this));
      return false;
    }

    if($(this).children("div").length==1 || $("td.selected div").length==0 || _busted
    || !$(this).hasClass("movable")){
      $(".selected").removeClass("selected");
      $(".movable").removeClass("movable");
      return false;
    }

    var lin = parseInt($(this).attr("data-lin"));
    var col = parseInt($(this).attr("data-col"));

    $("td.selected div").css("top", 100*lin+pad);
    $("td.selected div").css("left", 100*col+pad);

    setTimeout(function () {
      $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
      .html(`<div class='me' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

      $(".selected").html("");
      $(".selected").removeClass("selected");
      $(`table.kaptur td`).removeClass("movable");
      update();
    }, 301);

    setTimeout(function () {
      if(!_busted) random();
    }, 1000);
  });

  var busted = function (td) {
    $(".kaptur").addClass("busted");
    $(td).addClass("busted");
    $("h1").addClass("busted");
    gotBusted();
    _busted = true;
  }

  update = function () {
    $("table.kaptur tbody tr td").each(function(ix) {
      var td = $(this);
      var _td = parseInt($(td).attr("data-col"));
      var _tr = parseInt($(td).attr("data-lin"));

      if($(td).children("div.me").get(0)){
        data[_tr][_td] = 1;
      }else if($(td).children("div.adv").get(0)){
        data[_tr][_td] = 2;
      }else{
        data[_tr][_td] = 0;
      }
    });

    check();
  }

  var addPions = function (el) {
    if($(el).children().length>0) return false;

    var lin = parseInt($(el).attr("data-lin"));
    var col = parseInt($(el).attr("data-col"));

    $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
    .html(`<div class='me' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

    pions++;
    update();
    gotAdded();

    setTimeout(function () {
      if(!_busted) random();
    }, 1000);
  }

  var aroundF = function (el) {
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
    return around;
  }

  var addPionsBot = function () {
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
    update();
  }

  var random = function () {
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
        busted();
        return false;
      }

      random();
      tries++;
      return false;
    }

    var num = Math.round(Math.random() * (arcode.length - 1));

    var lin = arcode[num][0];
    var col = arcode[num][1];

    $(el).css("top", 100*lin+pad);
    $(el).css("left", 100*col+pad);

    setTimeout(function () {
      $(`table.kaptur tbody tr:nth-child(${lin+1}) td:nth-child(${col+1})`)
      .html(`<div class='adv' style="top: ${lin*100+pad}px; left: ${col*100+pad}px"></div>`);

      $(el).remove();
      $(".selected").removeClass("selected");
      $(`table.kaptur td`).removeClass("movable");
      update();
    }, 301);

  }

  $("h1").click(function () {
    random();
  });
});

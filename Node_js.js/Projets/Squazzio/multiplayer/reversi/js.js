$(document).ready(function() {
  help = true;
  wizz({
    title: "Mode Reversi",
    text: "A la fin de chaque round, les pions changent d'équipe",
    button: "Let's go"
  })

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
      }else{
        setTimeout(function () {
          reversi(index, $("td div").length);
        }, 100);
      }
    });
  }

  update = function (stop) {
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
    if(!stop) check();
  }

  reversi = function (ix, max) {
    if(ix!=max-1) return false;
    if(reversing==false){
      reversing = true;
      return false;
    }else{
      reversing = false;
    }

    $("td.selected").removeClass("selected");

    $("td div.me").attr("data-reversi", "adv");
    $("td div.adv").attr("data-reversi", "me");

    $("td div[data-reversi=adv]").removeClass("me") .addClass("adv");
    $("td div[data-reversi=me]").removeClass("adv") .addClass("me");

    update(true);
  }

  init();
});

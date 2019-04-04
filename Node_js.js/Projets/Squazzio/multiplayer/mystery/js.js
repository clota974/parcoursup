$(document).ready(function() {
  flight = false;
  wizz({
    title: "Mode Mystery",
    text: "A la fin de chaque round, un pion disparaît mystérieusement",
    button: "Let's go"
  })

  data = [
    [0,2,2],
    [1,0,2],
    [1,1,0]
  ]

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
          doFlight(index, $("td div").length);
        }, 100);
      }
    });
  }

  doFlight = function (ix, max) {
    if(ix!=max-1||_busted) return false;

    setTimeout(function () {
    }, 1000);
    if(flight==false){
      flight = true;
      return false;
    }else{
      flight = false;
    }

    _turn = turn;
    turn = 0;

    var pionsN = $("table.kaptur td div").length-1;
    var ran = Math.round(Math.random()*(pionsN-0)+0*10);

    var el = $($("table.kaptur td div")[ran]);
    var classe = $(el).hasClass("me") ? "1" : "2";

    if(classe==1){ pions--; }else{ pions_bot--; }
    $(el).fadeOut(300, function () {
      $(el).remove();
      update(true);
      turn = _turn;
    });
    $(".myst").prop("currentTime", 0) .trigger("play");
  }

  init();
});

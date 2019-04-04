const numCase = 9;
var moves = 0;

$(document).ready(function() {
  var to_add = "";

  for (var i = 0, ix = 0; i < 3; i++) {
    to_add += "<tr>";

    for (var j = 0; j < 3; j++) {
      if(++ix === numCase){
        to_add += `<td><div class="empty"></div></td>`;
        continue;
      }


      to_add += `<td><div>${ix}</div></td>`;
    }

    to_add += "</tr>";
  }

  $("table").html(to_add);

  $("td div").click(move);
});

function move(ev, auto = false){
  var tile;
  if(ev.hasOwnProperty("currentTarget")){
    tile = ev.currentTarget;
  }else{
    tile = ev;
  }

  var empty = {};
  empty.index = (()=> $("td .empty").parent().index("table td")+1).call();
  empty.y =  (()=> $("tr .empty").parents("tr").index("table tr")+1).call();
  empty.x = empty.index % 3;
  empty.x = empty.x || 3;

  var move = {};
  move.index = (()=> $(tile).parent().index("table td")+1).call();
  move.y =  (()=> $(tile).parents("tr").index("table tr")+1).call();
  move.x = move.index % 3;
  move.x = move.x || 3;

  var tileSize = $(tile).height() + 50 + 5;
  // padding: 25px ; 25 * 2 = 50

  var animation = {};
  var sign = "+";

  // Empêcher les déplacements diagonales
  if(move.x != empty.x && move.y != empty.y) return false;

  // Vérifie si le mouvement est horizonatal ou vertical
  // Pour cela on regarde si les planches ont une case d'écart
  if(Math.abs(move.x - empty.x) == 1){
    sign = move.x < empty.x ? "+" : "-";
    animation.left = sign + "=" + tileSize;
  }else if(Math.abs(move.y - empty.y) == 1){
    sign = move.y < empty.y ? "+" : "-";
    animation.top = sign + "=" + tileSize;
  }else{
    return false;
  }
  console.info(move.y, empty.y);

  console.log(animation);

  $(tile).animate(animation, 200, function () {
    $(tile).css("left", 0);
    $(tile).css("top", 0);
    $(".empty").replaceWith(tile);

    newEmptyDiv = $(`tr:nth-child(${move.y}) td:nth-child(${move.x})`)
    $(newEmptyDiv).append(`<div class="empty"></div>`);

    check();
  });

  if(!auto) moves++;
}

function melange(){
  i = 0;
  interval = setInterval(function () {
      var ran = Math.round(Math.random());

      if(ran==1){
        obj = $("td div.empty").parent().next().children();
      }else{
        obj = $("td div.empty").parent().prev().children();
      }

      move(obj);
  }, 201);
}

function check(){
  var correct = 0;
  $("td div").each(function(ix){
    ix++;
    var number = $(this).text();

    console.warn(number, ix);

    if(number==ix) correct++;
    else if(number == "" && ix == 9) correct++;
  });
  if(correct==9) win();
}

function win() {
  var interval = 200;

  // n-1 car l'ordi compte à partir de 0;
  $($("table div").get(1-1)).addClass("win");

  setTimeout(function () {
    $($("table div").get(2-1)).addClass("win");
    $($("table div").get(4-1)).addClass("win");
    $($("table div").get(5-1)).addClass("win");
  }, interval*1);

  setTimeout(function () {
    $($("table div").get(3-1)).addClass("win");
    $($("table div").get(6-1)).addClass("win");
    $($("table div").get(7-1)).addClass("win");
    $($("table div").get(8-1)).addClass("win");
  }, interval*2);

  setTimeout(function () {
    $("*").removeClass("win");
  }, interval*6);

}

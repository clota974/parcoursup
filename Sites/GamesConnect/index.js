//reset();


$(document).ready(function() {
  circles = {};
  circles_arr = [];
  s = Snap("svg");
  path = Snap("#path");
  pLength = path.getTotalLength();

  pad = 20;



  //var reset = $.post("trans.php", {action: "set", value: "0"});



  /* inter = setInterval(function () {
    var req = $.post("trans.php", {action: "get"});

    req.complete(function (response) {
      var distance = (response.responseText);

      if(distance >= pLength){
        win();
      }


      var {x, y} = path.getPointAtLength(distance);
      p.attr({cx: x, cy: y+pad});
    });
  }, 10); */

});

function ajouterCercle(obj){


  var colors = ["#FF2D55", "#5856d6", "#FF9500", "#34AADC", "#FC0", "#4CD964"];
  color = colors[GAME$.usedNames.length-1];

  var nbr = GAME$.usedNames.length;
  var ix = obj.id-1;


  var origin = path.getPointAtLength(0);
  var size = 50 / nbr;
  $$.vars.pionSize = size;
  var pad = (100 - size) * ix;

  $$.vars.pad = pad;

  p = s.circle(origin.x, origin.y+pad, size);
  p.attr({fill: color});
  p.addClass("point");

  circles[name] = {obj: p, pad, length: 0};
  circles_arr.push(name);
  obj.pion = p;

  /* update */
  group = s.selectAll(".point");
  $(group).each(function(ix, val) {
    var origin = path.getPointAtLength(0);
    var pad = ((50 - size) * ix) - 10;
    $$.vars.pad = pad;

    val.attr({cx: origin.x, cy: origin.y+pad, r: size});
  });
}
movePion = function (player, distance) {
return false;
  var ix = player.id;
  var pad = ((50 - $$.vars.pionSize) * ix) - 20*GAME$.usedNames.length;

  var {x, y} = path.getPointAtLength(distance);
  player.pion.attr({cx: x, cy: y+pad});
}

a = true;
var readMessage = function (response) {
  resp = response.responseText;
  var messages = $.parseJSON(resp);

  $(messages).each(function (ix, entry) {
    var title = entry.title;
    GAME$.readId++;

    $$.sendEvt(title, entry);

    /* Enleve le message si le message n'est pas destiné à tous */
    //if(entry.destinataire==="GAME MANAGER") GAME$.removeMessage(entry.id);
  });

}


function reset() {
  $.post("trans.php", {action: "reset", room: "none"});
}

/*** EVENTS FUNCTON ***/

newUserReq = function (entry) {
  var data = $.parseJSON(entry.data);

  var {pseudo} = data;

  if(GAME$.usedNames.indexOf(pseudo) != -1){
    console.log("used name");

    return false;
  }

  var player = new Player(pseudo);
}
$$.registerEvt("newUserReq", newUserReq, "newUserReq");

function win(){
  if(end) return false;
  end = true;

  clearInterval(inter);
  var {x, y} = path.getPointAtLength(pLength);
  p.attr({cx: x, cy: y});


  path.attr({"stroke": "gold"});
}

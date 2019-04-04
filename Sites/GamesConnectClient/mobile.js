$(document).ready(function() {
  $("#a").addClass("active");

  var pseudo = Math.random();
  var active = "a";

  room = "peugeot";
  $.post("trans.php", {action: "newUserReq", pseudo, room});


  var n = 0;

  $("body").on("touchstart click", ".active", function(event) {
    n += 15;

    $.post("trans.php", {action: "setData", data: n, pseudo, room});

    active = active === "a" ? "b" : "a";
    $("*").removeClass("active");
    $("#"+active).addClass("active");
  });
});

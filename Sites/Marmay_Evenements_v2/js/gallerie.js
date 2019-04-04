$(document).ready(function() {
  $(".photos div").each(function (ix) {
    var ran = (Math.random() * 9);
    ran -= 5;
    $(this).css("transform", ` rotateZ(${ran}deg)`);
    $(this).css("animation", `appear ${4+ix/5}s ease forwards`);
  });
  $(".photos div img").on("load", function() {
    alert();
  });

});

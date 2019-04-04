$(document).ready(function() {
  $("#pswd2, #pswd").keyup(function () {
    var pswd = $("#pswd").val();
    var pswd2 = $("#pswd2").val();

    if(pswd.length>=8){
      $("#pswd_chars").text("Votre mot de passe est acceptable") .removeClass("alert");
    }else{
      $("#pswd_chars").text("8 caractères minimum") .addClass("alert");
    }

    if(pswd==pswd2){
      $("#pswd_conf").text("Vos mots de passe sont identiques") .removeClass("alert") .addClass("ok");
    }else{
      $("#pswd_conf").text("Vos mots de passe ne correspondent pas") .removeClass("ok") .addClass("alert");
    }
  });

  $("input").keyup(function () {
    var valObj = {name: $(this).attr("name"), value: $(this).val()}
    var errors = $(this).siblings("span.alertLong").length;

    if(valObj.value.length>100){
      if(errors==0){
        var span = `<span class="alert alertLong">Vous ne pouvez pas dépasser 100 caractères</span>`;
        $(span).insertAfter($(`input[name=${valObj.name}]`).siblings("span").last());
      }
    }else{
      $(`input[name=${valObj.name}]`).siblings("span.alertLong").remove();
    }
  });

  $("#pseudo").keyup(function () {
    var value = $("#pseudo").val();

    if(value.length<3){
      $("#pseudo_dis").text("3 caractères minimum") .removeClass("ok") .addClass("alert");
      return false;
    }
    if(/s(.*)q(.*)u(.*)a(.*)z(.*)z?(.*)[i1](.*)[o0]/ui.test(value)){ //= Squazzio
      $("#pseudo_dis").html(`<a href="#">Pseudo non règlementaire !</a>`) .removeClass("ok") .addClass("alert");
      return false;
    }
    if(/a(.*)d(.*)m(.*)[i1](.*)n/ui.test(value)){ // = Admin
      $("#pseudo_dis").html(`<a href="#">Pseudo non règlementaire !</a>`) .removeClass("ok") .addClass("alert");
      return false;
    }
    if(/w(.*)e(.*)b(.*)m(.*)a(.*)s(.*)t(.*)e(.*)[r]/ui.test(value)){ // = Admin
      $("#pseudo_dis").html(`<a href="#">Pseudo non règlementaire !</a>`) .removeClass("ok") .addClass("alert");
      return false;
    }
    var ajx = $.ajax({
      method: "POST",
      url: "http://127.0.0.1/squazzio/desktop/pseudo.php",
      data: {pseudo: value}
    });

    $("#pseudo_dis").text("Vérification du pseudo") .removeClass("alert ok") .addClass("warning");

    ajx.done(function (msg) {
      $("#pseudo_dis").removeClass("warning");
      if(msg=="0"){
        $("#pseudo_dis").text("Pseudo disponible") .removeClass("alert") .addClass("ok");
      }else{
        $("#pseudo_dis").text("Pseudo indisponible") .removeClass("ok") .addClass("alert");
      }
    });

  });

  $("button").click(function () {
    var form = $("form").serializeArray();
    var correct = true; // Formulaire ne comporte pas d'erreur

    $(form).each(function (ix, valObj) {
      var inputObj = $(`input[name=${valObj.name}]`);
      if(valObj.value.length>100){
        var span = `<span class="alert alertLong">Vous ne pouvez pas dépasser 100 caractères</span>`;
        $(span).insertAfter($(inputObj).siblings("span").last());
        correct = false;
      }else{
        $(inputObj).siblings("span.alertLong").remove();
      }

      var min = 0;
      if($(inputObj).attr("min") != undefined){
        min = parseInt($(inputObj).attr("min"));
      }

      if( $(inputObj).prop("required") && valObj.value.length<min){
        var span = `<span class="alert alertReq">Information requise</span>`;
        $(span).insertAfter($(inputObj).siblings("span").last());
        correct = false;
      }else{
        $(inputObj).siblings("span.alertReq").remove();
      }
    });

    if(!correct) return false;
    var value = $("#pseudo").val();
    var ajx = $.ajax({
      method: "POST",
      url: "http://127.0.0.1/squazzio/desktop/pseudo.php",
      data: {pseudo: value}
    });

    $("#pseudo_dis").text("Vérification du pseudo") .removeClass("alert ok") .addClass("warning");

    ajx.done(function (msg) {

      $("#pseudo_dis").removeClass("warning");
      if(msg=="0"){
        $("#pseudo_dis").text("Pseudo disponible") .removeClass("alert") .addClass("ok");

        if(correct){
          var ajx = $.ajax({
            method: "POST",
            url: "http://127.0.0.1/squazzio/desktop/inscription.php",
            data: jsonify(form)
          });
          ajx.done(function (msg) {
            if(msg=="ok"){
              wizz({title: "Inscrit !", text: "Vous êtes inscrit au Squazzio Club ! ", btnClick: function(){window.location.href = `file://${__dirname}/pages/index.html`;}});
            }else{
              wizz({title: "Erreur !", text: "Votre inscription n'a peut-être pas été réussie. Veuillez réessayer ultérieurement", class: "lost"})
              console.log(msg);
            }
          })
        }
      }else{
        $("#pseudo_dis").text("Pseudo indisponible") .removeClass("ok") .addClass("alert");
        wizz({title: "Pseudo indisponible !", text: "Veuillez changer votre pseudo.", class: "lost"})
      }
    });

  });
});

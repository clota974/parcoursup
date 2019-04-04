$(document).ready(function() {

  $("input[name=proprio]").keyup(function(e){
    var tables = {
      M: "Hibon",
      P: "Clota",
      K: "Moi"
    };

    var code = tables[$(this).val()] || false;

    if(code){
      $(this).val(code);
      $(this).select();
    }

  });

  $("input[name=serial]").keyup(function(e){
    if($(this).val().length==5)
      $("input#0").focus();
    else if($(this).val().length==0&&e.keyCode==8)
      $("input[name=proprio]").focus();
  });

  $("div.numbers input").each(function(i) {
    $(this).attr("placeholder", i);
    $(this).attr("name", "n"+i);
    $(this).attr("id", i);

    if($(this).val().length==0){
      $(this).addClass("error");
    }else{
      $(this).removeClass("error");
    }
  });

  $("div.numbers input").keyup(function(e){
    var key = e.keyCode

    if($(this).val().length==0||$(this).val().length>2){
      $(this).addClass("error");
    }else{
      $(this).removeClass("error");
    }

    if($(this).val().length>=2&&(key<37||key>40)){
      var tabIndex = $(this).attr("id");
      tabIndex++;

      if(tabIndex>=15)
        $("button.ajaxBtn").focus();
      else
        $("input#"+tabIndex).focus();

    }else if($(this).val().length==0&&key==8){
      var tabIndex = $(this).attr("id");
      tabIndex = tabIndex==0?"serial":tabIndex-1;
      $("input#"+tabIndex).focus();
    }
  });

  $("button.ajaxBtn").click(function() {
    var formData = {};

    $("form input").each(function () {
      var name = $(this).attr("name");
      var val = $(this).val();

      formData[name] = val;
    });

    if($("input.error").length==0){
      var ajaxVar = $.post("post.php", formData);
    }else{
      $("div.info").text("Une erreur a été trouvée. Envoi annulé.")
      $("div.info").removeClass("success");
      $("div.info").addClass("error");
    }

    ajaxVar.error(function(data){
      $("div.info").text("Envoi non réussi. Message : "+data.statusText+" #"+data.status);
      $("div.info").removeClass("success");
      $("div.info").addClass("error");
    });
    ajaxVar.success(function(data){
      if(data=="true"){
        $("div.info").text("Envoi réussi.");
        $("div.info").removeClass("error");
        $("div.info").addClass("success");
        $("form").get()[0].reset();
        $("div.numbers input").addClass("error");
        $("#proprio").focus();
      }else{
        $("div.info").text("Erreur ! Message : "+data);
        $("div.info").removeClass("success");
        $("div.info").addClass("error");
      }
    });


  });

  $("button.reset").click(function () {
    var dialog = confirm("Vous allez tout réinitialiser !");
    if(dialog==true){
      var form = $(this).parent("form").get()[0];
      form.reset();

      $("div.info").text("Formulaire réinitialisé.");
      $("div.info").removeClass("error");
      $("div.info").removeClass("success");
    }
  });

});

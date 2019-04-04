$(document).ready(function() {
  var titre = $(".presta h1").text();
  var url = $(".presta h1").attr("data-url");
  var align = $(".presta h1").attr("data-align");

  $(".presta h1").remove();

  $("header h1").text(titre);
  $("header").css("background-image", `url(${url})`);
  $("header").css("background-position", align);

 $("table.command tbody tr[data-code]").click(function(){
    var code = $(this).attr("data-code");
    var poster = $.post("/pro/pages/panier_change.php", {action: "add", code: code},
    function (data, status) {
      if(data=="OK"){
        toast({
          text: "Prestation ajoutée au panier.",
          btn: {text: "Voir le panier", ev: function(){ window.location.href = "/pro/pages/panier.php"; }},
        });
      }else if(data=="ALREADY"){
        dialog({
          title: "Prestation déjà dans le panier",
          text: "<p>Cette prestation est déjà dans le panier, vous ne pouvez la commander qu'une fois.\
          </p><p>Pour consulter ou envoyer la commande, cliquez sur VOIR LE PANIER.</p>",
          btns: [
            {text: "Voir le panier", alt: true, ev: function(){ window.location.href = "/pro/pages/panier.php"; }},
            {text: "Fermer", alt: false, ev: hideDialog}
          ],
          type: "error"
        });
      }else if (data=="MODIFY") {
        dialog({
          title: "Prestation similaire dans le panier",
          text: "<p>Vous avez déjà pris cette prestation avec différents paramètres (ex : Horaire différent).\
          </p><p>Vous devez enlever la prestation afin de pouvoir la modifier.\
          </p><p>Pour consulter ou envoyer la commande, cliquez sur VOIR LE PANIER.</p>",
          btns: [
            {text: "Voir le panier", alt: true, ev: function(){ window.location.href = "/pro/pages/panier.php"; }},
            {text: "Fermer", alt: false, ev: hideDialog}
          ],
          type: "warning"
        });
      }
    });
    $(".loader").addClass("active");
    poster.fail(function () {
      dialog({
        title: "Erreur",
        text: "<p>La prestation n'a pas pu être ajouter au panier.\
        </p><p>Vérifiez votre connexion Internet et réessayez.</p>",
        btns: [
          {text: "Fermer", alt: false, ev: hideDialog}
        ],
        type: "error"
      });
    });

    poster.complete(function () {
      $(".loader").removeClass("active");
    })
  });


  $("#tryaccess").click(function () {
    var trycode = ($("#accesscode").val()).toUpperCase();
    $("#labelaccess").text("Vérification du code en cours…")
    $.ajax({
      url: "/pro/pages/presta/access.php",
      method: "post",
      data: {trycode: trycode}
    }).done(function (data) {
      if(data!="OK"){
        $("#labelaccess").text("Code invalide : veuillez réessayer")
      }else if(data=="OK") {
        window.location.reload();
      }
    });
  });

  $(".addDevis").click(function (ev) {
    var html = $(`<div class="round"></div>`);
    $(this).append(html);

    var pad = $("div.round").height()/2 + 4;
    var left = ev.pageX - $(this).offset().left - pad;
    var top = ev.pageY - $(this).offset().top - pad;

    $(html).css({top, left});

    $(html).height(100);
    $(html).width(100);

    setTimeout(function () {
      $(html).css({transform: "scale(18)"});
    }, 1);

    addDevis();
  });
});

var addDevis = function () {
  $(".addDevis h6").css("opacity", 0);
  /* … */
  setTimeout(function () {
    animDevis("ok");
  }, 1000);
}

var animDevis = function (status) {
  var el = $(".addDevis");
  var h6 = $(".addDevis h6");
  var round = $(".addDevis .round");

  if(status == "ok"){
    $(h6).text("Prestation ajoutée") .css({color: "#FFF", opacity: 1});

    $(el).css("border-color", "#00d442");
    $(round).css("background", "#00d442");
  }
}

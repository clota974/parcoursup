$(document).ready(function() {

 $("table.command tbody tr[data-code]").click(function(){
    var code = $(this).attr("data-code");
    var poster = $.post("/me/pages/panier_change.php", {action: "add", code: code},
    function (data, status) {
      if(data=="OK"){
        toast({
          text: "Prestation ajoutée à la demande de demande de devis.",
          btn: {text: "Voir le devis", ev: function(){ window.location.href = "/me/pages/panier.php"; }},
        });
      }else if(data=="ALREADY"){
        dialog({
          title: "Prestation déjà dans la demande de devis",
          text: "<p>Cette prestation est déjà dans la demande de devis, vous ne pouvez la commander qu'une fois.\
          </p><p>Pour consulter ou envoyer la commande, cliquez sur VOIR LE DEVIS.</p>",
          btns: [
            {text: "Voir le devis", alt: true, ev: function(){ window.location.href = "/me/pages/panier.php"; }},
            {text: "Fermer", alt: false, ev: hideDialog}
          ],
          type: "error"
        });
      }else if (data=="MODIFY") {
        dialog({
          title: "Prestation similaire dans la demande de devis",
          text: "<p>Vous avez déjà pris cette prestation avec différents paramètres (ex : Horaire différent).\
          </p><p>Vous devez enlever la prestation afin de pouvoir la modifier.\
          </p><p>Pour consulter ou envoyer la commande, cliquez sur VOIR LE DEVIS.</p>",
          btns: [
            {text: "Voir le devis", alt: true, ev: function(){ window.location.href = "/me/pages/panier.php"; }},
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
        text: "<p>La prestation n'a pas pu être ajouter au devis.\
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
      url: "/me/pages/presta/access.php",
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

});

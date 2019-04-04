$(document).ready(function() {
  $("td.remove").click(function () {
    var code = $(this).attr("data-code");
    $.post("/pro/pages/panier_change.php", {action: "remove", code: code},
    function (data, status) {
      window.location.reload();
    });
  });

  $("form button").click(function () {
    if(checkForm()){
      securityCheck();
    }
  });

});

checkForm = function () {
  var ret = true;

  if($("tbody tr").length<=0){
    ret = false;

    dialog({
      title: "Aucune prestation",
      text: `Vous n'avez choisi aucune prestation. Vous devez en sélectionner au moins une.<br/>
      Pour commander une prestation cliquer sur le bouton “Commander”, choissez la catégorie,
      puis choisissez la prestation dans le tableau orange.`,
      btns: [{text: "Annuler", alt: false, ev: hideDialog}, {text: "Commander", alt: true, ev: function () {
        window.location.href = "presta.php?command";
      }}],
      type: "error"
    });

    return false;
  }

  $("form div.input.text input, form div.input.textarea textarea").each(function(index) {
    var len = $(this).val().length;
    if($(this).parent().hasClass("not-required")) return false;

    if(len<=0){
      ret = false;
      dialog({
        title: "Renseignements manquants",
        text: `Vous n'avez pas rempli certains champs. <br/> Les champs avec un <span style="color:red">*</span>
        sont obligatoires.</p>`,
        btns: [{text: "Fermer", alt: true, ev: hideDialog}],
        type: "warning"
      });
      return false;
    }
  });

  if(!ret) return false;


  $("form input[type=radio]").each(function () {
    var name = $(this).attr("name");
    var val = $("form input[name="+name+"]:checked").val();
    if(!val){
      ret = false;
      dialog({
        title: "Renseignements manquants",
        text: `Vous n'avez pas cochée certaines cases. <br/> Les champs avec un <span style="color:red">*</span>
        sont obligatoires.</p>`,
        btns: [{text: "Fermer", alt: true, ev: hideDialog}],
        type: "warning"
      });
      return false;
    }
  });

  if(!ret) return false;

  $("form input[type=checkbox]").each(function () {
    var checked = $(this).prop("checked");
    if(!checked){
      ret = false;
      dialog({
        title: "Renseignements manquants",
        text: `Vous n'avez pas confirmé votre âge et votre localisation. <br/> Vous devez avoir au moins 18 ans et habiter à La
        Réunion pour commander.</p>`,
        btns: [{text: "Fermer", alt: true, ev: hideDialog}],
        type: "warning"
      });
      return false;
    }
  });

  var regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var email = $("input[type=email]").val();
  if(!regex.test(email)){
    ret = false;
    dialog({
      title: "Adresse email invalide",
      text: `L'adresse email que vous avez entrée n'est pas valide. <br/>
      Une adresse email valide est requise pour continuer.</p>`,
      btns: [{text: "Fermer", alt: true, ev: hideDialog}],
      type: "warning"
    });
    return false;
  }

  return ret;
}
securityCheck = function() {
  $("form input, textarea").prop("readonly", true);
  dialog({
    title: "Question de sécurité",
    text: `Pour vérifier que vous n'êtes pas un robot veuillez répondre à la question suivante:
    <br/>Quel est votre numéro de téléphone ? <br/>
    <div class="input text" style="padding: 0; margin: 0; margin-top: 15px; width: 100%;">
    <input type="tel" name="conf" style="border-color: #FFF; width: 100%; text-align: center" placeholder="Numéro"/>
    </div>`,
    btns: [{text: "Annuler", alt: false, ev: cancelForm}, {text: "Envoyer", alt: true, ev: send}]
  });
}

cancelForm = function () {
  $("form input, textarea").prop("readonly", false);
  hideDialog();
}

send = function () {
  var tel1 = $("input[name=tel]").val();
  var tel2 = $("input[name=conf]").val();

  tel1 = tel1.replace(/ /g, "");
  tel2 = tel2.replace(/ /g, "");

  if(tel1==tel2){
    $("form").attr("action", "send_panier.php");
    $("form").submit();
  }else{
    hideDialog();
    setTimeout(function () {
      dialog({
        title: "Les numéros de correspondent pas",
        text: `Pour vérifier que vous n'êtes pas un robot veuillez répondre à la question suivante:
        <br/>Quel est votre numéro de téléphone ? <br/>
        <div class="input text" style="padding: 0; margin: 0; margin-top: 15px; width: 100%;">
        <input type="tel" name="conf" style="border-color: #FFF; width: 100%; text-align: center" placeholder="Numéro"/>
        </div>`,
        btns: [{text: "Annuler", alt: false, ev: cancelForm}, {text: "Envoyer", alt: true, ev: send}],
        type: "error"
      });
    },112);
  }
}

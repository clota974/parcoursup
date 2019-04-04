gotBusted = function () { return false };
gotAdded = function () { return false; }
$(document).ready(function() {
  var step = 0;
  setTimeout(function () {
    step1();
  }, 10);

var remake = function () {
  $(".kaptur tbody td").html("");
  $("table.kaptur tbody tr").each(function(_tr) {
    pions = 0;
    const letr = ["A","B", "C"];
    var tr_id = letr[_tr];
    $(this).attr("id", tr_id);

    $(".selected").removeClass("selected");
    $(".movable").removeClass("movable");

    $($(this).children("td")).each(function(_td) {
      $(this).attr("data-lin", _tr);
      $(this).attr("data-col", _td);

      var code = data[_tr][_td];
      if(code==1){
        $(this).html(`<div class='me' style="top: ${_tr*100+pad}px; left: ${_td*100+pad}px"></div>`);
        pions++;
      }else if(code==2){
        $(this).html(`<div class='adv' style="top: ${_tr*100+pad}px; left: ${_td*100+pad}px"></div>`);
        pions_bot++;
      }
    });
  });
}

var step1 = function () {
  if(step==0){ step++; }
  else{ return false; }
  bot = false;

  data = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ];
  remake();

  $("div.tuto p").text("Le cercle au centre est l'un de vos pions.");
  $("div.tuto button").text("Suivant");
  $("div.tuto button").click(step2);
}

var step2 = function(){
  if(step==1){ step++; }
  else{ return false; }

  data = [
    [0,0,0],
    [0,2,0],
    [0,0,0]
  ];
  remake();

  $("div.tuto p").text("Voici l'un des pions adverses.");

  $("div.tuto button").click(step3);
}

var step3 = function () {
  if(step==2){ step++; }
  else{ return false; }

  data = [
    [2,1,0],
    [1,1,0],
    [0,0,0]
  ];

  remake();

  $("div.tuto p").text(`Pour gagner, vous devez encercler un des pions adverses comme ci-dessous.
  Cela s'appelle un Squazzio.`);

  $("div.tuto button").click(step4);
}

var step4 = function () {
  if(step==3){ step++; }
  else{ return false; }

  data = [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ];

  remake();

  $("div.tuto p").text(`Vos pions peuvent aller sur n'importe quelle case libre qui l'entoure. Sélectionnez un pion
  en cliquant dessus et les cases vers lesquelles ce pion peut se déplacer s'éclaireront.`);
    $("div.tuto button").text("Sélectionner votre pion pour continuer") .prop("disabled", true);


    $("div.me").click(step5);
  }

  var step5 = function () {
    if(step==4){ step++; }
    else{ return false; }

    $("div.tuto p").text(`Pour bouger votre pion, double-cliquez sur l'une des cases éclairées.`);
    $("div.tuto button").text("Bouger votre pion pour continuer") .prop("disabled", true);
    $("td").on("dblclick", function () {
      setTimeout(function () {
        step6();
      }, 1000);
    });
  }

  var step6 = function () {
    if(step==5){ step++; }
     else{ return false; }

    data = [
      [0,0,0],
      [1,1,0],
      [2,0,1]
    ];

    remake();

    $("div.tuto p").text(`Cliquez sur l'un de vos pions et double-cliquez sur une des cases éclairées de manière à faire un Squazzio.`);
    $("div.tuto button").text("Faites un Squazzio pour continuer") .prop("disabled", true);

    gotBusted = function () {
      $("div.tuto p").text(``);
      $("div.tuto button").text("Super !") .prop("disabled", true);
      setTimeout(function () {
        $(".busted").removeClass("busted");
        step7();
      }, 2000);
    }
  }

  var step7 = function () {
    if(step==6){ step++; }
     else{ return false; }

    data = [
      [1,1,1],
      [0,0,0],
      [2,2,2]
    ];

    remake();

    $("div.tuto p").text(`Dans le mode classique, vous avez chacun 3 pions.`);
    $("div.tuto button").text("Next") .prop("disabled", false);

    $("button").click(step8);
  }

  var step8 = function () {
    if(step==7){ step++; }

    data = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];
    remake();

    $("div.tuto p").html(`Pour placer un pion, double-cliquez sur n'importe quelle case libre.`);
    $("div.tuto button").text("Placer un pion pour continuer") .prop("disabled", true);

    gotAdded = function () {
      setTimeout(function () {
        step9();
      }, 700);
    }
  }

  var step9 = function () {
    if(step==8){ step++; }
     else{ return false; }

    data = [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ];

    remake();

    bot = true;

    $("div.tuto p").text(`Tout est bon !`);
    $("div.tuto button").text("Quitter") .prop("disabled", false);

    $("div.tuto button").click(function (ev) {
      //ev.preventDefault();
        window.location.href = "../../pages/index.html";
    });
  }
});

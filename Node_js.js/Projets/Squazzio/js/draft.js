// Select un Pion
$("td").click(function (ev) {
        if(thi$.buffering || !thi$.playing) return false;
  
        // Select a dot
        if($(this).children().length >= 1){
          if( $(this).children().data().owner === thi$.turn ){
            var {x, y, id} = $(this).children().data();
            var obj = thi$.pions[id];
  
            obj.select();
  
            return false;
          }
        }
    // Désélectionner (ou pas)
    var test = thi$.selecting && $(this).hasClass("movable")==false;
  
    if(test){
      thi$.unselectAll();
    }
})


// Ajouter un Pion
$("td").dblclick(function (ev) {
    // Add pions or move them

    if(thi$.buffering || !thi$.playing) return false;

    if($(this).children("div").length>0) return false;

    if($(this).hasClass("movable")){
      moveTo({html: this, ev});
      return false;
    }

    var ix = $(".kaptur tr td").index(this);
    var args = caseNumber(ix);

    if(thi$.turn===null) debugger;
    thi$.turn.addPions(args.x, args.y);
  });

//Draw Board
$(this.board).each(function (iy, yLine) {
    $(yLine).each(function (ix, code) {
      if(code === 1){
        p1.addPions(ix, iy, false, true);
      }else if(code == 2){
        p2.addPions(ix, iy, false, true);
      }
    });
  });


//Music init



  //Check
  $(Game.players).each(function (ix, player) {
    var coinces = 0; // Nombre de pions qui ne peuvent pas bougés (points amicaux INCLUS)
    var busted = 0; // Nombre de pions en Squazzio (points amicaux EXCLUS)
    var squazzio = false;

    $(player.pionsPlaced).each(function (iz, pion) {
      if(Game.ended) return false;

      var bust = pion.bust();
      if(bust.partiel === 0){
        thi$.win(pion);
      }

      if(bust.vide === 0){
        coinces++;;
      }
    });

    if(coinces === 3) $("h1").text("Triple");
  });


  
class SystemInterface{
    constructor(){
        this.triggerEvents = true
        this.debug = true
        this.baseRelative = `${__dirname}/../..`;
        this.baseDir = `../..`;
    
        this.buffering = true // Waits for init to finish
        this.events = { /* Voir this.events dans la classe Player */ }
    
        this.musics = {}
        this.baseDir_music = this.baseDir + "/zik"
    
        // Lists
        this.popups = {}
        this.chronos = {}

        var thi$ = this;
        setImmediate(function(){
          thi$.init();
          new Settings();
        });
    }

    init(mode){
        var thi$ = this;
    
        $(".subhead div div").attr("data-dis", "false");

        if(typeof help!="undefined" && help){
            setTimeout(thi$.showHelp, 200);
        }


        this.musics = {
            fond: new Music({
                name: `fond.mp3`,
                id: "fond",
                volume: 50,
            
                autoPlay: true,
                loop: true,
                maxTime: 55.75,
            }),
        
            p1_move: new Music({
                name: `dot.mp3`,
                id: "p1",
                volume: 100,
                channel: "moves"
            }),
            p2_move: new Music({
                name: `bot.mp3`,
                id: "p2",
                volume: 100,
                channel: "moves"
            })
        }
    }

    loadPrefNibs(){
      let pref = {};
        //constd = new ConstantsDictionary({path: baseDir+"/.settings/constants.jsi", version: "v0.1"});
        var nib = $.getScript(baseDir+"/.settings/pref.nib");
        $("body").css("opacity", 0);
        nib.complete(loadPref);
    
        inf = $.getScript(baseDir+"/.settings/infos.nib");
        $("body").css("opacity", 0);
        inf.complete(loadInf);
    }

    showHelp(){
        $("div.dialog").addClass("appear");
        $("div.dialog button").click(function () { $("div.dialog").removeClass("appear") });
    }
}

class Game{

    constructor(){  
      this.playing = false;
      this.buffering = true // Waits for init to finish
      this.ended = false  
      
      this.events = {}
  
      this.turn = null
      this.players = []
      this.pions = {}

      this.selecting = false
      this.selectedPion = null

      this.createPlayers();


      var thi$ = this;
      setImmediate(function(){
        thi$.createBoard();
      })    
    }

    createBoard(){
      new Board({parent: this}); 
    }
  
    createPlayers(mode){
        var thi$ = this;
        
        /*var bot_bool = true
        if(bot_bool){
            p1 = new Player(mode.withBot.p1);
            p2 = new Player(mode.withBot.p2);
        }else{
            p1 = new Player(mode.withoutBot.p1);
            p2 = new Player(mode.withoutBot.p2);
        }*/

        var p1 = new Player({id: 1, name:"L'humain"});
        var p2 = new Player({id: 2, name:"Squazzibot"});

        thi$.players = [p1,p2];
    
        if(window.rootObjects.systemInterface.debug){
            window._h = p1;
            window._b = p2;
        }
  
  
        // Events 
        thi$.whenBoth("turnEnd", function(){
            thi$.changeTurn();
            thi$.board.check();
        });
    
        thi$.when("turnChange", function () {
            console.log(thi$);
            if(thi$.turn.isBot && thi$.playing){
            setTimeout(function () {
                thi$.turn.autoPlay();
            }, 200);
            }
        });

        thi$.when("turnEnd", function () {
            thi$.board.check();
        });
    
        thi$.buffering = false;
        thi$.playing = true;

        // THINKING TEST
        thi$.changeTurn(1); // Set turn to human

        //  if(!thi$.turn.isBot) thi$.changeTurn(0);
        

        /** TODO */
/*        thi$.turn.stats.chrono.start(); //Start chrono of player
    
        thi$.whenBoth("turnEnd", function (player) {
            player.stats.moves++;
            player.stats.chrono.pause();
        });
        thi$.when("turnChange", function (player) {
            player.stats.chrono.start();
        });*/
    }
  
    reinit(newBoard){
      if(typeof newBoard === "object"){
        this.board = newBoard
      }
  
      this.playing = false
      this.triggerEvents = false
  
      //var bot_bool = confirm("Voulez-vous jouer avec un robot ?");
      var bot_bool = true;
      if(this.players.length == 0) new Player({id: 1, name: "L'Humain"})
      if(this.players.length == 1) new Player({id: 2, name: "Squazzibot", isBot: bot_bool})
  
      var p1 = this.players[0];
      var p2 = this.players[1];
  
      for (var i = 0; i < 6; i++) {
        if(i<3 && p1.pions.length > 0){
          if(p1.pions[0].html != -1) p1.pions[0].remove();
        }
        if(i>=3 && p2.pions.length > 0){
          if(p2.pions[0].html != -1) p2.pions[0].remove();
        }
      }
  
      $(this.board).each(function (iy, yLine) {
        $(yLine).each(function (ix, code) {
          if(code === 1){
            p1.addPions(ix, iy, false);
          }else if(code == 2){
            p2.addPions(ix, iy, false);
          }
        });
      });
  
      this.playing = true
      this.triggerEvents = true
      this.changeTurn(-1)
    }
  
    changeTurn(player = 0){
      if(typeof player === "object"){
        turn = player;
      }
  
      /* Toggle players turn. ONLY if it has 2 players*/
      if(player === 0 && this.players.length === 2){
        if(this.turn === this.players[0]){
          this.turn = this.players[1];
        }else{
          this.turn = this.players[0];
        }
      }
  
      if(player === -1){
        //RANDOM
        var ran = Math.floor(Math.random() * this.players.length);
        this.turn = this.players[ran];
      }
  
      if(player > 0){
        this.turn = this.players[player-1];
      }
  
      this.eventLauncher("turnChange", this.turn);
      return this.turn;
    }
    when(name, func){
      if(this.events.hasOwnProperty(name)){
        this.events[name].push(func);
      }else{
        this.events[name] = [func];
      }
    }
  
    check(){
      var thi$ = this;
  
      console.error(":Game:.check --> :Board:.check")
    }
  
    win(...args){
        console.error(":Game:.win --> :Game:.endGame")
    }

    // Win and loss
    endGame(bustedDot){
      var loser = bustedDot.owner
      var winner = _Game.players.indexOf(loser) == 1 ? _Game.players[0] : _Game.players[1];
  
      _Game.playing = false;
      _Game.ended = true;
  
      var lost = false      
      if(winner.isBot) lost = true;
  
      var musicName = lost ? "lost.mp3": "win.mp3"
      _Game.musics.fond.stop();
      var winMusic = new Music({
        id: "winMusic",
        name: musicName,
        channel: "winMusic",
        autoPlay: true,
        volume: 80
      })
  
      var classe = lost ? "lost" : "win";
      var background = lost ? "#FF4136" : "gold";
      $("body").css({"background": background});
  
      // Temps de réflexion des joueurs
      var p0_timeStamp = Math.round(_Game.players[0].stats.chrono.stop() / 1000);
      var p1_timeStamp = Math.round(_Game.players[1].stats.chrono.stop() / 1000);
      var total_timeStamp = p0_timeStamp + p1_timeStamp;
  
      // Convertit les timestamps au format MM:SS
      var p0_mins = Math.floor(p0_timeStamp/60);
      var p0_mins = p0_mins<10 ? "0"+p0_mins : p0_mins;
  
      var p0_secs = p0_timeStamp%60;
      var p0_secs = p0_secs<10 ? "0"+p0_secs : p0_secs;
      var p0_time = p0_mins + ":" + p0_secs;
  
      var p1_mins = Math.floor(p1_timeStamp/60);
      var p1_mins = p1_mins<10 ? "0"+p1_mins : p1_mins;
  
      var p1_secs = p1_timeStamp%60;
      var p1_secs = p1_secs<10 ? "0"+p1_secs : p1_secs;
      var p1_time = p1_mins + ":" + p1_secs;
  
  
      var total_mins = Math.floor(total_timeStamp/60);
      var total_mins = total_mins<10 ? "0"+total_mins : total_mins;
  
      var total_secs = total_timeStamp%60;
      var total_secs = total_secs<10 ? "0"+total_secs : total_secs;
      var total_time = total_mins + ":" + total_secs;
  
      var p0_percentage = Math.round(p0_timeStamp / total_timeStamp * 100);
      var p1_percentage = Math.round(p1_timeStamp / total_timeStamp * 100);
  
      var statsMenu = new StatsMenu({
        title: "Stats",
        text: `${winner.name} a gagné !`,
        classe: classe,
        showNow: true,
        stats:{
          [`Nombre de mouvements total`]: _Game.players[0].stats.moves + _Game.players[1].stats.moves,
          [`Mouvements de ${_Game.players[0].name}`]: _Game.players[0].stats.moves,
          [`Mouvements de ${_Game.players[1].name}`]: _Game.players[1].stats.moves,
  
          // Temps de réflexion de Squazzibot : 10:00 (50%)
          [`Temps total`]: total_time + " (100%)",
          [`Temps de réflexion de ${_Game.players[0].name}`]: p0_time + " (" + p0_percentage +"%)",
          [`Temps de réflexion de ${_Game.players[1].name}`]: p1_time + " (" + p1_percentage +"%)",
        }
      })
    }
  
  
    // Events
    eventLauncher(eventName, params, forceEvent = false){
      if(!this.triggerEvents && !forceEvent) return false;
  
      if(this.events.hasOwnProperty(eventName)){
        $(this.events[eventName]).each(function (ix, val) {
          val(params);
        });
      }
    }
  
    whenBoth(name, func){
      $(this.players).each(function(ix, val){
        val.when(name, func);
      });
    }
  
    unselectAll() {
      var selected = $(".selected").get()[0];
  
      $(".selected").removeClass("selected");
      $(".movable").removeClass("movable");
  
      this.selecting = false;
      this.eventLauncher("unselectedDot", {html: selected})
    }
  
    // ERRORS MANAGER
    warn(title, message){
      console.warn(`${title.toUpperCase()} : ${message}`);
  
      if(this.debug) console.debug();
      // if SETTINGS.displayWarnings then display the warning
    }
  
    debugger(){
      if(this.debug) debugger;
    }
  }
  
  class Player{
  
    constructor(args){
      /* ARGS = {id, name} */
  
      this.id = args.id;
      this.name = args.name;
      this.pionToPlace = 3;
      this.pions = [];
      this.pionsPlaced = [];
      this.pionsPetit = [];
      this.turn = false;
      this.tries = 0;
  
      this.isBot = args.isBot || false;
  
      this.stats = {
        moves: 0,
        //chrono: new Chrono({id: "time"+args.id})
      }
      this.events = {};
      /* this.events = {eventName:
        [function(params){ …function1… },
        function(params){ …function2… }
        ]}
      */
  
      for (let i = 0; i < this.pionToPlace; i++) {
        let obj = new Pion({owner: this, x: -1, y: -1});
        this.pions.push(obj);
      }
    }
  
    pionToPlace_rel(op, nbr){
      if(op==="+") this.pionToPlace += nbr
      if(op==="-") this.pionToPlace -= nbr
    }
  
    addPions(x, y){
      if(this.pionsPetit.length <= 0){
        _Game.warn("Erreur", "Impossible d'ajouter un pion. Tous les pions sont placés.")
        debugger;
        return false;
      }
      (this.pionsPetit[0]).add(x, y, false, true);
      _Game.unselectAll();
  
    }
  
    pionsDispo(){
      return this.pionsPetit.length;
    }
  
    autoPlay(think = false){
      if(_Game.buffering || !_Game.playing) return false;
  
      if(think){
        this.think(); return false;
      }
  
      if(this.pionsDispo()>0){
        /* Ajouter un pion */
  
        var ranX, ranY;
  
        do {
          ranY = Math.round(Math.random() * (_Game.board.length - 1));
          ranX = Math.round(Math.random() * (_Game.board[ranY].length - 1));
        }while (_Game.board[ranY][ranX]!=0) // Tant que la case n'est pas vide;
  
        this.addPions(ranX, ranY);
  
        return "Dot added"; // Arrêter la fonction
      }
  
      /*** Déplacer le pion ***/
      // Choisi un pion au hasard parmi les pions placés
      var ran = Math.round(Math.random() * (this.pionsPlaced.length - 1) + 0);
      var pion = this.pionsPlaced[ran];
  
      var around = pion.around();
      var arcode = []; // Around code
  
      $(around).each(function(ix) {
        if(around[ix].code == 0){
          //$(`table tr:nth-child(${around[ix].y+1}) td:nth-child(${around[ix].x+1})`).addClass("movable");
          arcode.push(around[ix]);
        }
      });
  
      if(arcode.length==0){
        if(this.tries==10){
          busted("triple");
          return "Busted : Triple";
        }
        this.tries++;
  
        this.autoPlay();
        return false;
      }
  
      var num = Math.round(Math.random() * (arcode.length - 1));
      // Get a random number from the array containing the coords of the empty squares.
  
      var _y = arcode[num].y;
      var _x = arcode[num].x;
  
      pion.move(_x, _y);
  
      setTimeout(function () {
        this.tries = 0;
  
        //update();
      }, 301);
    }
  
    think(){
      return new Brain(this, 1);
    }
  
    when(name, func){
      if(this.events.hasOwnProperty(name)){
        this.events[name].push(func);
      }else{
        this.events[name] = [func];
      }
    }
  
    eventLauncher(eventName, params){
      if(this.events.hasOwnProperty(eventName)){
        $(this.events[eventName]).each(function (ix, val) {
          val(params);
        });
      }
    }
  
  }
  
  class Pion{
    constructor(args){
      /* ARGS = {owner, x, y, style} */
/*      this.id = Object.keys(window.rootObjects.game.pions).length;
      Game.pions[this.id] = this;*/
  
      this.owner = args.owner
      this.x = args.x
      this.y = args.y
      this.style = args.style
      this._html = -1
      this.classe = this.owner.id === 1 ? "me" : "adv";
  
      this.pad = 2 // Should be Constant
  
      if(this.x >= 0 || this.y >= 0){
        var showPetit = false
      }
  
      this.petit = new PetitPion(this.owner, showPetit)
  
      if(this.x >= 0 || this.y >= 0){
        _Game.board[this.y][this.x] = this.owner.id;
        _Game.boardObjects[_y][_x] = this;
  
        this.owner.pionsPlaced.push(this);
      }else{
        this.owner.pionsPetit.push(this);
      }
    }
  
    get html(){ return this._html; }
    set html(value){
      this._html = value;
      if(value === -1) return false;
  
      $(value).data(this);
  
      /* var el = this;
      $(value).parent().click(function () {
        console.log("HELLO");
        if( $(this).children("div").length === 0){
          Game.unselectAll();
        }
        el.select();
      }); */
    }
  
    add(_x, _y, triggerEvents = true, force = false){
      if(_Game.buffering && !force) return false;
      _Game.buffering = true;
  
      this.x = _x;
      this.y = _y;

      var pad = this.pad;
  
      var classe = this.owner.id == 1 ? "me" : "adv";
      var html = $(`<div class='${classe}' style="top: ${_y*100+pad}px; left: ${_x*100+pad}px"></div>`);
      $(`table.kaptur tbody tr:nth-child(${_y+1}) td:nth-child(${_x+1})`).html(html);
      this.html = html;
      $(this.html).click(()=>this.select());
  
      var ix = this.owner.pionsPetit.indexOf(this);
      this.owner.pionsPetit.splice(ix, 1);
  
      this.owner.pionsPlaced.push(this);
  
      this.petit.remove();
  
      try {
        _Game.board.codeArray[_y][_x] = this.owner.id;
      } catch (e) {
          console.error(e);
          
        debugger;
      }
      _Game.board.objectArray[_y][_x] = this;
      _Game.buffering = false;
  
      this.owner.eventLauncher("hasAdded", {pion: this});
  
      if(triggerEvents){
        this.owner.eventLauncher("hasPlayed", this.owner);
  
        var owner = this.owner;
        setTimeout(function () {
          owner.eventLauncher("turnEnd", owner);
        }, 301);
      }
  

      this.noise();
    }
  
    remove(turnEnd = false){
      _Game.board[this.y][this.x] = 0;
      _Game.boardObjects[this.y][this.x] = null;
  
      console.log(this.html);
      var a = $(this.html).animate({
        opacity: 0,
      }, 400, ()=>{ $(this.html).remove(); });
  
  
      var array = this.owner.pionsPlaced;
      var ix = array.indexOf(this);
      array.splice(ix, 1);
  
      this.owner.pionsPetit.push(this);
  
      this.petit.putBack();
    }
  
    move(_x, _y, endTurn = false){
      if(_Game.buffering) return false;
      _Game.buffering = true;
  
      var pion = this;
      var {owner} = this;
  
      var {x, y, pad} = pion;
      $(pion.html).css("top", (100 * _y + pad));
      $(pion.html).css("left", (100 * _x + pad));
  
      _Game.board[y][x] = 0; // Mark the current square as empty
      _Game.boardObjects[y][x] = null;
  
      _Game.board[_y][_x] = pion.owner.id; // Mark the new square as taken
      _Game.boardObjects[_y][_x] = this;
  
      owner.eventLauncher("hasPlayed", 1);
  
      setTimeout(function () {
        $(pion.html).remove();
  
        var classe = owner.id == 1 ? "me" : "adv";
        var _html = $(`<div class='${classe}' style="top: ${_y*100+pad}px; left: ${_x*100+pad}px"></div>`);
        $(`table.kaptur tbody tr:nth-child(${_y+1}) td:nth-child(${_x+1})`).html(_html);
        pion.html = _html;
  
        //console.log(Game.board[0], Game.board[1], Game.board[2]);
        pion.x = _x;
        pion.y = _y;
  
        $(".selected").html("");
        $(".selected").removeClass("selected");
        $(`table.kaptur td`).removeClass("movable");
        $(".dot").prop("currentTime", 0) .trigger("play");
  
        _Game.buffering = false;
        owner.eventLauncher("hasMoved", {pion: this});
        owner.eventLauncher("turnEnd", owner);
      }, 301);
  
      this.noise();
    }
  
    around(){
      var x = this.x;
      var y = this.y;
      var around = []; // Tiles around
      var ret = []; // RETURN
      var busters = 0 // ( if = 4 ) { BUSTED ! } ;
  
      around.push([x+1, y]);
      around.push([x-1, y]);
      around.push([x, y+1]);
      around.push([x, y-1]);
      around.push([x-1, y+1]);
      around.push([x+1, y-1]);
      around.push([x-1, y-1]);
      around.push([x+1, y+1]);
  
      for (let i = 0; i < around.length; i++) {
  
        var _code = 3; // Default
        var _x = around[i][0];
        var _y = around[i][1];
  
        if(around[i][0]<3 && around[i][0]>=0){
          if(around[i][1]<3 && around[i][1]>=0 ){
            _code = _Game.board.codeArray[_y][_x];
          }
        }
  
        ret.push({x: _x, y: _y, code: _code});
      }
  
      return ret;
    }
  
    bust(){
      var owner = this.owner;
      var autour = 0;
      var vide = 0;
      var ami = 0;
      var adv = 0;
  
      var around = this.around();
      $(around).each(function (ix, val) {
        if(val.code === 0) {
          autour++;
          vide++;
        }else if(val.code === owner.id) {
          autour++;
          ami++;
        }else if(val.code != 3) {
          adv++;
          autour++;
        }
      });
  
      var impossible = ami + adv;
      var partiel = vide + ami;
      return {autour, vide, ami, adv, partiel, impossible};
    }
  
    select(){
      _Game.unselectAll();
  
      if(this.owner !== _Game.turn) return false;
  
      _Game.selecting = true;
      _Game.selectedPion = this;
  
      var around = this.around();
  
      var html = this.html;
  
      $(html).addClass("selected");
  
      $(around).each(function (ix) {
        var {x,y,code} = around[ix];
        x++; y++;
  
        if(code!=0) return true;
        // `Return true` is the equivalent of `continue` in a `$(…).each(…)` loop
  
        $(`.kaptur tr:nth-child(${y}) td:nth-child(${x})`).addClass("movable");
      });
  
      this.owner.eventLauncher("hasSelected", {pion: this});
    }
  
    noise(){
      var audio = null
      if(this.owner.id===1){
        _SI.musics.p1_move.restart();
      }else{
        _SI.musics.p2_move.restart();
      }
    }
  }
  
  class PetitPion{
    constructor(owner, show = true){
      this.owner = owner;
      this.html = null;
  
      if(owner.id == 1){
        $(".subhead .mine").css("transform", "scaleX(1)");
  
        this.html = $("<div class='me'></div>")[0];
        $(".subhead div.mine").append(this.html);
      }else if(owner.id == 2){
        $(".subhead .op").css("transform", "scaleX(1)");
  
        this.html = $("<div class='adv'></div>")[0];
        $(".subhead div.op").append(this.html);
      }
    }
  
    remove(){
      var elm = this.html;
      var top = $("div.subhead .mine").height();
      $(elm).css("top", `-${top}px`);
  
      setTimeout(function () {
  
        var a = $(elm).animate({
          width: 0,
          "padding-left": 0,
          "padding-right": 0,
          "margin-left": 0,
          "margin-right": 0
        }, 400, ()=>{ $(elm).css("display", "none") });
  
      }, 400);
  
      this.owner.pionToPlace_rel("-", 1);
  
      if(this.owner.pionsDispo() === 0){
        if(this.owner.id === 1){
          setTimeout(function(){ $(".subhead .mine").css("transform", "scaleX(0)") }, 450);
        }else{
          setTimeout(function(){ $(".subhead .op").css("transform", "scaleX(0)") }, 450);
        }
      }
    }
  
    putBack(){
      $(this.html).css({
        display: "",
        width: "",
        top: "",
        "padding-left": "",
        "padding-right": "",
        "margin-left": "",
        "margin-right": "",
      })
  
      this.owner.pionToPlace_rel("+", 1);
  
      if(this.owner.pionsDispo() > 0){
        if(this.owner.id === 1){
          $(".subhead .mine").css("transform", "scaleX(1)")
        }else{
          $(".subhead .op").css("transform", "scaleX(1)")
        }
      }
    }
  }
  
  class GameMode{
    constructor(name){
      this.name = name
      this.path = _Game.baseRelative+"/game/packages/"+this.name+".json";
  
      var request = $.getJSON(this.path);
      this.request = request;
      request.success(this.requestSuccess);
      request.error(this.requestError);
    }
  
  
    requestSuccess(response, code, request){
      this.values = response;
      _Game.mode = this;
  
      _Game.init(response);
    }
  
    requestError(...args){
      console.error(args);
      var thi$ = this;
  
      alert("Erreur : le mode de jeu n'a pas pu être trouvé ! Impossible de démarrer le jeu.")
      document.write(`
        <h1>Erreur <code>v1-2</code></h1>
        <h2>Impossible de trouver le mode de jeu.</h2>
        <h4>Code : v1-2</h4>
        <h4>Version : 1</h4>
        <h4>ErrorID : 2</h4>
        <h4>Details : Le mode de jeu situé à ${thi$.path} n'a pas été trouvé !.</h4>
        <p>
        La requête pour charger le mode de jeu a bien été demandé mais Squazzio n'a pas pu charger ce mode. <br/>
        Le ficher contient toutes les informations nécessaires au démarrage de ce mode de jeu, par conséquent il est impossible de
        démarrer le jeu.
        </p>
        <h3>Suggestions :</h3>
        <p>Fermer le jeu et redémarrer ou copier-coller ce texte dans un forum d'aide en ligne.</p>
        `);
    }
  }
  
  
  // AI
  class Brain{
    constructor(player, depth){
      this.player = player;
      this.depth = depth || 1;
      this.iterator = 0;
  
      this.possibilites = [];
      this.evalList = {};
  
      /* while (this.iterator < this.depth) {
        this.iterator++;
      } */
  
      this.getPossibilities();
    }
  
    getPossibilities(){
      var thi$ = this;
  
      // Liste les cases où l'on pourrait ajouter un pion
      if(this.player.pionsDispo() > 0){
        $(_Game.board).each(function(iy, content) {
          $(content).each(function(ix, code) {
            if(code === 0) thi$.possibilites.push(thi$.player.id+"+"+ix+iy);
          });
        });
      }
  
      // Liste les déplacements que l'on pourrait effectuer
      var pionsPlaced = this.player.pionsPlaced;
      for (let i = 0; i < pionsPlaced.length; i++) {
        var pion = pionsPlaced[i];
        var around = pion.around();
  
        for (var j = 0; j < around.length; j++) {
          if(around[j].code != 0) continue;
  
          thi$.possibilites.push(`${pion.x}${pion.y}M${around[j].x}${around[j].y}`);
        }
      }
      this.evaluateMoves();
      return thi$.possibilites;
    }
  
    evaluateMoves(){
      var thi$ = this;
  
      // Pour chaque action possible
      for (let i = 0; i < thi$.possibilites.length; i++) {
        let content = thi$.possibilites[i];
        var potentialBoard = _Game.board.map(function(arr) {
          return arr.slice();
        });
  
        if(content.match(/(\d)(\d)M(\d)(\d)/)){
          let [full,x,y,_x,_y] = content.match(/(\d)(\d)M(\d)(\d)/);
        }
        if(content.match(/(\d)\+(\d)(\d)/)){
          let [full,id,_x,_y] = content.match(/(\d)\+(\d)(\d)/);
          [id,_x,_y] = [+id,+_x,+_y];
          potentialBoard[_y][_x] = id;
  
          var sim = new Simulation({moveName: full, board: _Game.board, potentialBoard: potentialBoard, player: thi$.player});
        }
      }
    }
  }
  
  class Simulation{
    constructor(obj){
      if(obj.moveName != "2+11"){
        return false;
      }
  
      console.log(obj);
      this.moveName = obj.moveName;
      this.player = obj.player;
      this.board = obj.board; /* Current board */
      this.potentialBoard = obj.potentialBoard; /* Simulated board */
      this.value = 0;
  
      this.evaluate();
  
      /*** Cotations ***/
  
      /* Gagner ou perdre : */
      this.win = 100; //
      this.lost = -100;
  
  
      /* Opportunités : */
  
      // Si un pion est forcer à bouger dans une seule direction.
      // Peut être Négatif ou Positif
      this.paralysieBonus = 15;
  
      // Nombre de case
      this.caseLibre = 3;
      this.caseAmi = 1;
    }
  
    evaluate(){
      var thi$ = this;
  
      // Pour chaque pion…
      $(thi$.board).each(function(iy, content) {
        $(content).each(function(ix, code) {
          if(code===0) return true;
          // Regarde toutes les cases autour du pion
          console.log(code);
        });
      });
    }
    aroundAnalysis(x, y){
      var thi$ = this;
  
      var aroundArr = []; // Tiles around
      var busters = 0 // ( if = 4 ) { BUSTED ! } ;
      var ret = [];
  
      aroundArr.push([x+1, y]);
      aroundArr.push([x-1, y]);
      aroundArr.push([x, y+1]);
      aroundArr.push([x, y-1]);
      aroundArr.push([x-1, y+1]);
      aroundArr.push([x+1, y-1]);
      aroundArr.push([x-1, y-1]);
      aroundArr.push([x+1, y+1]);
  
      // For each tile around a dot…
      for (let i = 0; i < aroundArr.length; i++) {
  
        var _code = 3; // Default
        var _x = aroundArr[i][0];
        var _y = aroundArr[i][1];
  
        if(aroundArr[i][0]<3 && aroundArr[i][0]>=0){
          if(aroundArr[i][1]<3 && aroundArr[i][1]>=0 ){
            _code = thi$.board[_y][_x];
          }
        }
  
        if(_code!=3) ret.push({x: _x, y: _y, code: _code});
      }
  
      return ret;
    }
  }
  
  class Board{
      constructor(args){
        this.gameParent = args.parent;


        this.codeArray = [
            [0,1,1],
            [0,0,0],
            [0,0,0]
        ]
        this.objectArray = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ]

        this.gameParent.board = this;

        var thi$ = this;
        setImmediate(function(){
          thi$.draw();
        });
      }
    
      draw(){
          var thi$ = this;

          $(thi$.codeArray).each(function (iy, yLine) {
            $(yLine).each(function (ix, code) {
                if(code === 1){
                    thi$.gameParent.players[0].addPions(ix, iy, false, true);
                }else if(code == 2){
                    thi$.gameParent.players[1].addPions(ix, iy, false, true);
                }
            });
        });
      }

  }

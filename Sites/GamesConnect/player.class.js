const MSG_RATE = 500;
const PLAY_RATE = 10;

end = false;
room = "peugeot";

class Player{
  constructor(name){

    this.name = name;
    this.id = GAME$.usedNames.length+1;
    this.classement = GAME$.usedNames.length+1;
    this.gameData = 0;


    var ran = Math.floor(Math.random()*GAME$.unusedPerso.length);
    this.perso = GAME$.unusedPerso[ran];

    var data = JSON.stringify({classement: this.classement, personnage: this.perso});

    GAME$.sendMessage({
      title: "userAccepted",
      data: data,

      origine: "GAME MANAGER",
      destinataire: `#${this.name}`
    });

    GAME$.addPlayer(name, this);

  }

  sendMessage(keyword, desc){
    $$.vars.sendMessage(this.name, keyword, desc);
  }

  quit(){
    GAME$.removePlayer(name, this);
  }

  /* Setters and getters */
  gameData__(val = null){
    if(val !== null){
      this.gameData = val;

      $$.sendEvt("gameDataChanged", {name: this.name, val: this.gameData});
    }

    return this.gameData;
  }
}

class GameSystem{
  constructor(){
    this.usedNames = [];
    this.usedPerso = [];
    this.unusedPerso = ["RedSquare", "BlueSquare"];
    this.players = {};
    this.readId = 0;
    this.pion = null;

    var GS = this;

    setInterval(function () {
      GS.getAllMessages();
    }, 1000);
    setInterval(function () {
      GS.update();
    }, PLAY_RATE);
  }

  update(){
    var req = $.post("trans.php", {action: "playersList", room});
    var GS = this;

    req.complete(function (response) {
      var json = $.parseJSON(response.responseText);

      if(json.length===0) return false;

      $(json).each(function (ix, val) {
        var player = GS.players[val.pseudo];
        movePion(player, val.data);
      })
    });
  }


  getAllMessages(){
    var getMessage = $.post("trans.php", {action: "getMessage", id: this.readId, destinataire: "GAME MANAGER", room: room});

    getMessage.complete(readMessage);
  }

  sendMessage(message){
    var sendMessage = $.post("trans.php", {
      action: "sendMessage",
      room,

      title: message.title,
      data: message.data,
      origine: message.origine,
      destinataire: message.destinataire
    });
  }

  removeMessage(id){
    var removeMessage = $.post("trans.php", {action: "removeMessage", room, id});
  }

  addPlayer(name, obj){
    this.usedNames.push(name);
    this.players[name] = obj;

    var addUser = $.post("trans.php", {
      action: "addUser",
      room,

      pseudo: name,
      data: 0,
      personnage: obj.perso,
      classement: obj.classement
    });

    ajouterCercle(obj);
  }

  removePlayer(name, obj){
    this.usedNames.remove(name);
    delete players[name];
  }

  loadGame(name){
    var thi$ = this;
    var folder = `/GamesConnect/games/${name}`;
    var act = $.getScript(`${folder}/activity.js`);

    $("#activityCSS").attr("href", `${folder}/css.css`);

    var htmlContReq = $.get(`${folder}/html.html`);
    htmlContReq.complete(function (response) {
      var resp = response.responseText;

      $("body").html(resp);
    });

    act.complete(function () {
        thi$.loadGameFinished();
    });
  }

  loadGameFinished(){
    Activity();
  }
}
$(document).ready(function() {
  GAME$ = new GameSystem();

  GAME$.loadGame("pedalo");
});

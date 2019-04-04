class MIDIKey {
  constructor(params){
    this.name = params.name;
    this.type = params.type; // Slider / Button / Vinyl
    this.key = params.key; // Midi key number
    this.led = params.led; // BOOL : Is led on ?
    this.deck = params.deck; // 1 or 2
    this.other = params.other;

    if(eventsForKeys.hasOwnProperty(this.name)){
      eventsForKeys[this.name](this);
    }
    this.register();
  }

  register(){
    keyMap[this.name] = this.key;
    keyMap[ this.key ] = this;
  }

  light(bool){
    var voltage = bool ? 127 : 0;
    output.send([0x90, this.key[1], voltage]);
  }

  call(){
    $$.sendEvt(this.name);
  }
}

keyMap = {};

function onMIDIInit( midi ) {
  for (var _input of midi.inputs.values()){
    input = _input;
    input.onmidimessage = midiMessageReceived;
  }

  for (var _output of midi.outputs.values()){
    output = _output;
    allOff();
  }

  $$.vars.lastPush = new Date();
}
function midiMessageReceived( ev ) {
    var {data} = ev;

    $("#r").text(data[0]);
    $("#g").text(data[1]);
    $("#b").text(data[2]);

    $$.sendEvt("keyPushed", ev);
    if(keyMap[ [data[0], data[1]] ] !== undefined){
      $$.sendEvt(keyMap[ [data[0], data[1]] ].name, ev);
    }

    $$.vars.lastPush = new Date();

    clearTimeout($$.vars.safeTimeout);
    $$.vars.safeTimeout = setTimeout(function () {
      $$.sendEvt("keyPushed_safe", ev);
    }, 2000);

    $("body").css("background", "cyan");
    setTimeout(function () {
      $("body").css("background", "");
    }, 50);

}

function allOff(bool = true){
  for (var i = 0; i < 127; i++) {
    output.send([144, i, bool ? 0 : 127]);
  }
}

function play(){
  for (let i = 0; i < 127; i++) {
    setTimeout(function () {
      output.send([144, i, 127]);
    }, i*100);
  }
}

function learn(){
  var ix, typeIx, typeName;
  var typeNames = ["deckButtons", "deckSliders", "deckRoll", "oneSlider"];

  if($$.vars.hasOwnProperty("typeIx")===false){
    $$.vars.typeIx = 0;
    $$.vars.learnIx = 0;
    ix = 0;
    typeIx = 0;
    $$.vars.learning = {};

    typeName = typeNames[typeIx];
  }else{
    typeIx = $$.vars.typeIx;

    typeName = typeNames[typeIx];
    ix = $$.vars.learnIx + 1;

    if(registerKeys[typeName].length === ix){
      typeIx = ++$$.vars.typeIx;
      ix = 0;

      typeName = typeNames[typeIx];
      if(typeName===undefined){
        endLearn();
        return false;
      }

    }
    $$.vars.learnIx = ix;

  }

  var keyName = registerKeys[typeName][ix];
  $("h1").text(`Appuyer sur la touche ${keyName}`);

  var detective = [];

  $$.registerEvt("keyPushed", function (obj) {
    detective.push(obj);

  }, "learn");

  $$.registerEvt("keyPushed_safe", function (obj) {
    analyser(typeName, keyName, detective);

    $$.unregisterEvt("keyPushed", "learn");
    $$.unregisterEvt("keyPushed_safe", "learn");
    learn();
  }, "learn");
}
function analyser(type, name, keys){
  var dataArray = [];
  $(keys).each(function (ix,val) {
    dataArray.push([val.data[0], val.data[1], val.data[2]]);
  });

  var keyData = keys[0].data;
  var arrayModels = $$.uniqueArray(dataArray); // Enleve les répétitions
  var arrayDetails = $$.uniqueArray(dataArray, true); // Enleve les répétitions

  if(arrayModels.length===1){
    key = new MIDIKey({
      name: name,
      type: "deckButtons",
      key: [keyData[0], keyData[1]],
      deck: 1
    });
    alert();
    return false;
  }

  if(keys.length===2){
    var kind = "ressort"; // Bouton poussoir

    var pressed = keyData[0]; // Etat quand il est appuyé
    var released = keys[1].data[0]; // Etat quand il est relâché

    key = new MIDIKey({
      name: name,
      type: "deckButtons",
      key: [keyData[0], keyData[1]],
      deck: 1,
      other: {kind, pressed, released}
    });

    return false;
  }

  if(keys.length>8){
    if(arrayModels.length === 3 && arrayDetails.copies[keys[1].data] > 8){
      /* T1 : Début ; T2 : Actif ; T3 : Arrêt */

      var kind = "3T";
      begin = arrayModels[0];
      active = arrayModels[1];
      end = arrayModels[2];
      key = new MIDIKey({
        name: name,
        type: "deckButtons",
        key: [keyData[0], keyData[1]],
        deck: 1,
        other: {kind, begin, active, end}
      });

      console.log(key);

      return false;
    }else if(arrayModels.length > 12){
      // Slider

      var c0 = []; // c = canal ou channel
      var c1 = [];
      var c2 = [];

      $(arrayModels).each(function (ix, val) {
        c0.push(val[0]);
        c1.push(val[1]);
        c2.push(val[2]);
      });

      var c0_unique = $$.uniqueArray(c0);
      var c0_det = $$.uniqueArray(c0, true);

      var c1_unique = $$.uniqueArray(c1);
      var c1_det = $$.uniqueArray(c1, true);

      var c2_unique = $$.uniqueArray(c2);
      var c2_det = $$.uniqueArray(c2, true);

      var valueChannel = -1;
      /// En bas, on s'assure que le slider n'a pas de hotPoint
      if(c0_unique.length > 8 && c1_unique.length+c2_unique.length === 2) valueChannel = 0;
      if(c1_unique.length > 8 && c0_unique.length+c2_unique.length === 2) valueChannel = 1;
      if(c2_unique.length > 8 && c0_unique.length+c1_unique.length === 2) valueChannel = 2;

      if(valueChannel>=0){
        key = new MIDIKey({
          name: name,
          type: "deckSliders",
          key: [keyData[0], keyData[1]],
          deck: 1,
          other: {kind: "Slider", valueChannel}
        });

        return false;
      }
    }
  }

  key = new MIDIKey({
    name: name,
    type: "deckButtons",
    key: [keyData[0], keyData[1]],
    deck: 1
  });
}

function endLearn(){
  $$.vars.learnIx = 0;
  $$.vars.typeIx = 0;

  keyEventRegister();

  $("h1").text("Apprentissage terminé");

  $$.saveFile("config.json", JSON.stringify(keyMap));
}
function keyEventRegister(){
  $$.registerEvt("keyPushed", function (obj) {
    try {
      keyMap[[obj.data[0], obj.data[1]]](obj);
    } catch (e) {

    } finally {

    }
  }, "keyDetector");
}

var eventsForKeys = {
  "Play": function (MIDIkey) {
    $$.registerEvt("VideoPlay", function () {
      MIDIkey.light(true);
    }, "PlayKeyLedOn");
    $$.registerEvt("VideoPause", function () {
      MIDIkey.light(false);
    }, "PlayKeyLedOff");
  },
  "Cue": function (MIDIkey) {
    $$.registerEvt("VideoPlay", function () {
      MIDIkey.light(false);
    }, "CueKeyLedOff");
    $$.registerEvt("VideoPause", function () {
      MIDIkey.light(true);
    }, "CueKeyLedOn");
  },
}

$(document).ready(function() {
  navigator.requestMIDIAccess().then(onMIDIInit, console.log);

  registerDecksButtons = [
    "Play", "Cue", "IN", "OUT", "Reloop", "Pitch+", "Pitch-", "AutoBPM", "AutoMix",
    "Headset", "TrackPrev", "TrackNext", "FolderPrev", "FolderNext",
    "Cue1", "Cue2", "Cue3", "CueSelect", "Vinyl", "Reverse",
    "KillHigh", "KillMid", "KillLow", "Mute"
  ];

  registerDecksSliders = [
    "Gain", "High", "Mid", "Low", "Volume", "Pitch"
  ];

  /** Simplified key map
  registerDecksButtons = [
    "Play", "Cue"];
    registerDecksSliders = [
      "Volume"
    ];
    /**/

  registerKeys = {
    deckButtons: registerDecksButtons,
    deckSliders: registerDecksSliders,
    deckRoll: ["Disc"],

    oneSlider: ["crossfader"],

  }

  $$.registerEvt("Play", function () {
    $("video").trigger("play");
    $$.sendEvt("VideoPlay");
  }, "play");
  $$.registerEvt("Cue", function () {
    $("video").trigger("pause");
    $$.sendEvt("VideoPause");
  }, "pause");
  $$.registerEvt("Mute", function () {
    $("video").prop("volume", 0);
    $$.sendEvt("VideoMute");
  }, "pause");
  $$.registerEvt("Volume", function (ev) {
    var data = ev.data;
    var key = (keyMap[ [data[0], data[1] ] ]);

    var valueChannel = key.other.valueChannel;
    var value = (data[valueChannel]);

    var vol = value/127;

    $("video").prop("volume", vol);

    $$.sendEvt("VideoMute");
  }, "pause");


  if(fs.existsSync(userPath+"/config.json")){
    var json = $.getJSON(userPath+"/config.json");
    json.complete(function (obj) {
      keyMap = obj.responseJSON;

      for (var prop in keyMap) {
        if( /^\D/.test(keyMap[prop]) ){ // Si le nom de la propriété commence par un chiffre
          var obj = new MIDIKey(keyMap[prop]);
          keyMap[prop] = obj;
        }
      }

      keyEventRegister();
    });
  }else{
    learn();
  }
});


$(document).ready(function() {
  xn = 0;
  reloop();

  $("#video").prop("currentTime", 46);
  $("#video").trigger("play");

});

function reloop(){
  xn++;

  var x = xn == 1 ? 46 : 46.5;
  $("#video").prop("currentTime", 46.5);
  setTimeout(reloop, (54-x)*1000);
}

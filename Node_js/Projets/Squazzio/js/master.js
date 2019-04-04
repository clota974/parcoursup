wizzObj = {
  class: ""
};
var shortcuts = {
  "c": ()=>{ $(document).trigger("click"); console.log("hi"); },
  "d": ()=>{ $(document).trigger("dblclick"); }
}

$(document).ready(function() {
  $(document).keyup(function (e) {
    if(e.metaKey) return false;

    var key = e.key;
    if(e.shiftKey){
      switch (key.toLowerCase()) {
      case "a":
        key = 1;
        break;
      case "z":
        key = 2;
        break;
      case "e":
        key = 3;
        break;
      case "q":
        key = 4;
        break;
      case "s":
        key = 5;
        break;
      case "d":
        key = 6;
        break;
      case "w":
        key = 7;
        break;
      case "x":
        key = 8;
        break;
      case "c":
        key = 9;
        break;
      }
    }else if(isNaN(key)){
      switch (key) {
      case "&":
        key = 1;
        break;
      case "é":
        key = 2;
        break;
      case `"`:
        key = 3;
        break;
      case "'":
        key = 4;
        break;
      case "(":
        key = 5;
        break;
      case "§":
        key = 6;
        break;
      case "è":
        key = 7;
        break;
      case "!":
        key = 8;
        break;
      case "ç":
        key = 9;
        break;
      }
    }

    if(isNaN(key)) return false;

    var el = $("table.kaptur td")[key-1];

    if($(el).hasClass("case") && $(el).children("div").length==0){
      move(el);
    }

    if(e.ctrlKey){
      $(".selected").removeClass("selected");
      $(".movable").removeClass("movable");
      $(".case").removeClass("case");
      $(el).addClass("case");
      return false;
    }

    if($("td.selected").length>0){
      move(el);
    }else if($(el).children("div").length>0){
      $(".selected").removeClass("selected");
      $(".movable").removeClass("movable");
      $(".case").removeClass("case");
      where(el);
    }else{
      $(".selected").removeClass("selected");
      $(".movable").removeClass("movable");
      $(".case").removeClass("case");
      $(el).addClass("case");
    }
  });
});

wizz = function(obj){
  // obj = { title:"Titre", text: "Texte à afficher", button: "Boum!", class: "lost", btnClick: function(){…} , keep: false}

  $("div.abs").fadeIn(300);
  $("div.dialog").addClass("appear");
  $("div.dialog h4").text(obj.title);
  $("div.dialog p").text(obj.text);
  $("div.dialog button").text(obj.button);

  if(obj.class){
    wizzObj.class = obj.class;
    $("div.dialog").addClass(obj.class);
  }

  if(typeof obj.btnClick == "function"){
    $("div.dialog button").click(obj.btnClick);
  }else{
    $("div.dialog button").click(function () {
      unwizz();
    });
  }
}
unwizz = function () {
  $("div.dialog").removeClass("appear");
  $("div.dialog button").off("click");

  setTimeout(function () {
    $("div.abs").fadeOut(300);
    $("div.dialog").removeClass(wizzObj.class);
    wizzObj.class = "";
  },300);
}

jsonify = function (obj) {
  var jsonReturn = {}
  $(obj).each(function (ix, val) {
    jsonReturn[val.name] = val.value;
  });
  return jsonReturn;
}

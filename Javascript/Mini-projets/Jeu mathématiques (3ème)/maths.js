var questions = [
  {matiere: "maths", question: "Combien font 2+2 ?", reponses: [1, 2, 3, 4], correct: 4},
  {matiere: "maths", question: "Quel mot est correctement orthographié ?", reponses: ["Hipopotomonstrosesquipédaliophobie", "Hippopotomonstrosesquipédaliophobie", "Hipoppotomonstrosesquipédaliophobie", "Hippoppotomonstrosesquipédaliophobie"], correct: 2},
  {matiere: "maths", question: "Quel est la racine carrée de 25 ?", reponses: [7, 5, 1, 50], correct: 2},
  {matiere: "maths", question: "Combien de côté a un octogone ?", reponses: [6, 7, 8, 9], correct: 3},
  {matiere: "maths", question: "20 représente combien de pourcent de 100 ?", reponses: [5, 10, 20, 25], correct: 3},
  {matiere: "maths", question: "Quelle est la valeur la plus proche de PI ?", reponses: [Math.PI, Math.PI-(1/(Math.PI.toString()*100)), 3.141592653589567, 3.14], correct: 1},
  {matiere: "maths", question: "Quelle est l'orthographe correcte ?", reponses: ["Cauchemar", "Cauchemare", "Cauchemart", "Cauchemard"], correct: 1},
  {matiere: "maths", question: "Quel est le plus petit nombre ?", reponses: [15, 11, 6, 3], correct: 2},
  {matiere: "maths", question: "20 représente combien de pourcent de 50 ?", reponses: [40, 10, 15, 5], correct: 1},
  {matiere: "maths", question: "Un triangle isocèle a ", reponses: ["Deux côtés égaux", "Trois côtés égaux", "3 angles droits", "2 angle droits"], correct: 1},
  {matiere: "maths", question: "Un triangle rectangle a un...", reponses: ["Angle droit", "Angle carré", "Côté", "Carré"], correct: 1}
];
var questionsDone = [];
var questionId = null;
var wTime = 0;

$(document).ready(function(){
  questionNbr = 0;
  $("#questionNbr").text(questionNbr);
  pts = 0;
  $("#pts").text(pts);

  _questNbr = document.getElementById("questionNbr");
  _pts = document.getElementById("pts");

  $(".answers tr[id] td:first-child").html('<svg class="svg"><circle class="backCircle"/><circle class="checkedCircle"/><circle class="outline" /></svg>');
  $(".svg").attr("data-checked", "false");
  $(".svg").attr("onclick", "check(this)");

  fond = document.getElementById("fond");
  correct = document.getElementById("correct");
  select = document.getElementById("select");
  suspense = document.getElementById("suspense");
  lose = document.getElementById("lose");
  palier = document.getElementById("palier");

  fond.addEventListener("timeupdate", function(){
      if(Math.floor(fond.currentTime)+1==Math.floor(fond.duration)){
        fond.currentTime = 0;
      }
  });
  suspense.addEventListener("timeupdate", function(){
      if(Math.floor(suspense.currentTime)+1==Math.floor(suspense.duration)){
        suspense.currentTime = 0;
      }
  });
  $("button#next").click(function(){
    choose();
  });
  nextQuestion();
});

nextQuestion = function(){
  check(false);
  $("svg").removeAttr("data-choose");
  questionId = Math.floor(Math.random()*questions.length);
  questionNbr += 1;
  $("#questNbr").text(questionNbr);


  var obj = questions[questionId];
  $("#question").text(obj.question);

  for (var i = 0; i < obj.reponses.length; i++) {
    $("#answ"+(i+1)+" td:last-child").text(obj.reponses[i]);
  }
  document.getElementById("next").disabled = false;
  document.body.style.cursor = "default";

  fond.currentTime = 0;
  fond.play();
}

function check(obj){
  if(check==false){
    $("svg").attr("data-checked", "false");
    return false;
  }
  $("svg").attr("data-checked", "false");
  $(obj).attr("data-checked", "true");
}
function choose(){

  $("svg[data-checked=true]").attr("data-choose", "chosen");

  fond.pause()
  select.play();
  select.addEventListener("ended", function(){
    suspense.play();
  });

  wTime = Math.floor(Math.random()*10)*1000+(questionNbr*20);
  wTime = wTime<1000 ? 5000 : wTime;
  setTimeout(function(){
    answer();
  }, wTime);
  $(".next").prop("disabled", true);
  document.getElementById("next").disabled = true;
  // document.body.style.cursor = "none";
}
function answer(){
  $("audio").trigger("pause");

  var answ = $("svg[data-checked=true]").parent().parent().attr("id");
  answ = answ.match(/[1-4]/g);

  suspense.pause();
  suspense.currentTime = 0;
  correct.currentTime = 0;

  if(answ==questions[questionId].correct){
    correct.play();
    pts += 50;
    $("#pts").text(pts);

    $("svg[data-checked=true]").attr("data-choose", "correct");

    setTimeout(function(){
      $("svg[data-checked=true]").attr("data-choose", "none");
      $("svg[data-checked=true]").attr("data-checked", "false");
      $("audio").trigger("pause");
      $("audio").attr("currentTime", "0");
      passerelle();
    }, 5000);

  }else{
    $("audio").trigger("pause");
    $("audio").attr("currentTime", "0");
    lose.play();

    setTimeout(function(){
      $("#answ"+questions[questionId].correct).children("td:first-child").children("svg").attr("data-choose", "correction");
      $("svg[data-checked=true]").attr("data-choose", "wrong");
    }, 2000);
  }
}
function passerelle(){
  if(questionNbr==4){
    changerPalier(1);
    fond.src = "question2.mp3";
    setTimeout(function(){
      nextQuestion();
    }, palier.duration*500);
  }else if(questionNbr==9){
    changerPalier(2);
    fond.src = "question3.mp3";
    setTimeout(function(){
      nextQuestion();
    }, palier.duration*500);
  }else if(questionNbr==14){
    changerPalier(3);
    fond.src = "question_last.mp3";
    setTimeout(function(){
      nextQuestion();
    }, palier.duration*500);
  }else if(questionNbr==20){
    changerPalier(4);
  }else{
    nextQuestion();
  }
}
function changerPalier(palierNbr){
  $("audio").trigger("pause");

  palier.play();
  var t = 300;

  var bgPalier = "#ecf0f1";

  switch (palierNbr) {
    case 1:
        bgPalier = "#7B1FA2";
      break;
    case 2:
        bgPalier = "#512DA8";
      break;
    case 3:
        bgPalier = "#303F9F";
      break;
    case 4:
        bgPalier = "#212121";
      break;
  }

  $("svg").attr("data-checked", "false");
  $("svg").removeAttr("data-choose");
  setTimeout(function(){
    $("svg").attr("data-choose", "wrong");
    $("body").css("background", "#D32F2F");
    $("#theme-color").attr("content", "#D32F2F");
  }, t);
  setTimeout(function(){
    $("svg").removeAttr("data-choose");
    $("body").css("background", "#212121");
    $("#theme-color").attr("content", "#212121");
  }, t*2);
  setTimeout(function(){
    $("svg").attr("data-choose", "correct");
    $("body").css("background", "#388E3C");
    $("#theme-color").attr("content", "#388E3C");
  }, t*3);
  setTimeout(function(){
    $("svg").removeAttr("data-choose");
    $("body").css("background", "#212121");
    $("#theme-color").attr("content", "#212121");
  }, t*4);
  setTimeout(function(){
    $("svg").attr("data-choose", "chosen");
    $("body").css("background", "#FBC02D");
    $("#theme-color").attr("content", "#FBC02D");
  }, t*5);
  setTimeout(function(){
    $("svg").removeAttr("data-choose");
    $("body").css("background", "#212121");
    $("#theme-color").attr("content", "#212121");
  }, t*6);

  setTimeout(function(){
    $("svg").attr("data-checked", "true");
    $("body").css("background", bgPalier);
    $("#theme-color").attr("content", bgPalier);
  }, t*7);
  if(palierNbr==4){
    setTimeout(function(){

      $("#question").text("Merci d'avoir joué !");

      var txt = ["Questions: Les classes de Mme SMITH", "Réalisation: Killian", "Musique : Qui veut gagner des millions - TF1", "Source : YouTube - Millionaire Sound"]

      for (var i = 0; i < txt.length; i++) {
        $("#answ"+(i+1)+" td:last-child").css("font-size", "120%");
        $("#answ"+(i+1)+" td:last-child").text(txt[i]);
      }

    }, t*8);
    setTimeout(function(){
      location.reload();
    }, t*8+15000);
  }
}
$(document).keypress(function(){
  answer();
});

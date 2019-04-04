$(document).ready(function(){
  var nbrSortis = [];

  var getNbrSortis = $.post("change.php", {action: "get"});
  getNbrSortis.success(function (res) {
    var tmp = jQuery.parseJSON(res);
    for (var i = 0; i < tmp.length; i++) {
      nbrSortis.push(parseInt(tmp[i]));
    }
    rewrite();
  });

  var div = document.getElementById("numbers");

  $("table td").each(function () {
    $(this).text($(this).attr("data-value"));
    if($(this).attr("data-checked")==1){
      $(this).addClass("checked");
    }else{
      $(this).removeClass("checked");
    }
  });

  /* EVENTS */

  $("button#add").click(function() {
    add();
  });
  $("button#remove").click(function() {
    enlever();
  });
  $("button#search").click(function() {
    rechercher();
  });
  $("button#reset").click(function() {
    var dialog = prompt("Vous allez tout réinitialiser !\nContinuer ? oUi/NON");
    if(dialog=="oUi"){
      var req = $.post("change.php", {action: "reset"});
      req.success(function () {
        alert("Opération réussie.")
        location.reload();
      });
    }else{
      alert("Opératon annulée.");
    }
  });

  $(document).keydown(function (e) {
    switch (e.keyCode) {
      case 13:
        add();
        break;
      case 114:
        rechercher();
        break;
      case 82:
        rechercher();
        break;
      case 69:
        enlever()
        break;
      case 101:
        enlever()
        break;
    }
  });
  $(document).keyup(function (e) {
    if($("input#nbr").val().length==0&&(e.keyCode==69||e.keyCode==101)){
      $("input#nbr").val("");
    }
  });

  function add(){
    var nbr = parseInt($("input#nbr").val());
    if(isNaN(nbr)){
      alert("NaN");
      return false;
    }
    nbrSortis.push(nbr);
    rewrite();

    var req = $.post("change.php", {action: "add", data: nbr});
    req.error(function (data, status) {
      console.log("ADD : Post failed ! Error : "+data+" #"+status);
      $("button#add").css("background", "#FFCDD2");
      setTimeout(function () {
        $("button#add").css("background", "#C8E6C9");
      }, 700);
    });
    req.success(function (res) {
      if(res!="true"){
        console.log("Erreur : "+res);
        $("button#add").css("background", "#FFCDD2");
        setTimeout(function () {
          $("button#add").css("background", "#C8E6C9");
        }, 700);
      }
    });

    $("input#nbr").focus();
    $("input#nbr").val("");
  }

  function enlever(){
    var nbr = $("input#nbr").val();

    for (var i = 0; i < nbrSortis.length; i++) {
      if(nbrSortis[i]==nbr){
        nbrSortis.splice(i,1);
        console.log("Numéro "+nbr+" enlevé.\t\tENLEVER");
      }
    }

    rewrite();
    var req = $.post("change.php", {action: "remove", data: nbr});
    req.error(function (data, status) {
      console.log("REMOVE : Post failed ! Error : "+data+" #"+status);
      $("button#remove").css("background", "#FFCDD2");
      setTimeout(function () {
        $("button#remove").css("background", "#C8E6C9");
      }, 700);
    });
    req.success(function (data, status) {
      if(data!="true"){
        console.log("Erreur : "+data);
        $("button#remove").css("background", "#FFCDD2");
        setTimeout(function () {
          $("button#remove").css("background", "#C8E6C9");
        }, 700);
      }
    });

    $("input#nbr").focus();
    $("input#nbr").val("");
  }

  function rechercher(){
    var nbr = parseInt($("input#nbr").val());

    var i = nbrSortis.indexOf(nbr);

    if(i==-1){
      $("button#search").css("background", "#FFCDD2");
      setTimeout(function () {
        $("button#search").css("background", "#C8E6C9");
      }, 700);
    }else{
      var txt = div.innerText;
      txt = txt.replace(nbr, "<mark>"+nbr+"</mark>");
      div.innerHTML = txt;

      setTimeout(function () {
        txt = txt.replace("<mark>"+nbr+"</mark>", nbr);
        div.innerHTML = txt;
      }, 2000);
    }
  }

  function rewrite(){
    var tmpValue = "";
    var tour = 1;
    $("td[data-value]").removeClass("checked");
    for (var i = 0; i < nbrSortis.length; i++) {
      if(i%10==0&&i>0){
        tour++;
        tmpValue += "<span class='tour' data-val='"+tour+"'></span> ";
      }

      tmpValue += nbrSortis[i]+" ";

      $("td[data-value="+nbrSortis[i]+"]").addClass("checked");
    }
    $("tr").each(function(index){
      var remaining = 15-($(this).children(".checked").length);
      var last = $(this).children("td:last-child");
      var obj = $(this);
      last.text(remaining);
      if(remaining<=3){
        last.css("background-color", "yellow");
        obj.children("td:first-child").css("background-color", "#E74C3C");
      }else{
        last.css("background-color", "#B9F6CA");
        obj.children("td:first-child").css("background-color", "#8BC34A");
      }

      if(remaining==0){
        obj.children("td:first-child").css("background-color", "#9B59B6");
        alert("Gagné : "+obj.children("td:first-child").text());
      }
    });
    div.innerHTML = tmpValue;
  }

});

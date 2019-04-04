const fs = window.nodeRequire("fs");
const {app} = window.nodeRequire("electron");
const {remote} = window.nodeRequire("electron");
const userPath = remote.getGlobal("userPath");

const $file$ = `${userPath}/data.json`;
console.log($file$);

$(document).ready(function() {
  doesExist = fs.existsSync($file$);
  fs.openSync($file$, "a+");

  if(!doesExist){
    fs.writeFileSync($file$, JSON.stringify( [] ));
  }

  json = {};
  getData =  $.getJSON($file$);
  getData.success(function (responseJson) {
    json = responseJson;
    console.log(json);

    drawTable();
  });
  getData.error(function (...args) {
    alert(`Le fichier ${$file$} n'a pas pu être ouvert`);
    console.log(args);
  });


  dat = new Date();
  y = dat.getFullYear();

  m = dat.getMonth();
  m++; // 0 = Janvier ; 11 = Octobre
  m = m<10 ? `0${m}` : m; // Rajoute un 0. Ex : Mars = 03 au lieu de 3

  d = dat.getDate();
  d = d<10 ? `0${d}` : d;

  $("#date").val(`${y}-${m}-${d}`);

  $("#montant").keyup(function () {
    var value = $("#montant").val();
    value = value.replace(/,/g, ".");
    value = +value; // Convertion en nombre entier

    if(value>0){
      $(this).removeClass("depense");
      $(this).addClass("recette");
    }else{
      $(this).removeClass("recette");
      $(this).addClass("depense");
    }
  });

  // Ajouter
  $("#montant").keydown(function (ev) {
    console.log(ev);
    if(ev.keyCode==13 && ev.altKey){
      add("yes"); // Ajouter puis fermer
    }else if(ev.keyCode==13){
      add();
    }
  });

  $("button").click(add);
});

drawTable = function(afficher = "RD"){
  // "RD" = Afficher Recettes & Dépenses
  // "R"  = Afficher Recettes uniquement
  // "D"  = Afficher Dépenses uniquement

  var total = 0;
  var total_recette = 0;
  var total_depense = 0;


  $("table").html(`<tr>
    <th>×</th>
    <th>Date</th>
    <th>Libellé</th>
    <th>Recette</th>
    <th>Depense</th>
    <th>Solde</th>
  </tr>`); // Reset HTML tables

  var regexp = /(\d{2})\/(\d{2})\/(\d{4})/;
  $(json).each(function (ix, val) {
    // Met les dates aux formats anglais

    var _regexp = (val.date).match(regexp);
    var day = _regexp[1];
    var month = _regexp[2];
    var year = _regexp[3];

    val.objDate = new Date(`${month}/${day}/${year}`);
    console.log(val.objDate);
  });
  json.sort(function(a,b){ return a.objDate-b.objDate; })
  console.log(json);

  for (let i = 0; i < json.length; i++) {
    var _continue = false; // Si TRUE alors sauter cette boucle

    var row = json[i];
    var tr = $("<tr></tr>");

    $(tr).append(`<td>×</td>`);
    $(tr).append(`<td>${row.date}</td>`);
    $(tr).append(`<td>${row.designation}</td>`);

    montant = function() {
      if(afficher=="R" && row.montant<0) _continue = true; // Ne pas afficher les dépenses
      if(afficher=="D" && row.montant>0) _continue = true; // Ne pas afficher les recettes

      if(row.montant>=0){
        // Recette
        total_recette += row.montant;
        $(tr).append(`<td>${row.montant}</td><td></td>`);
      }
      else{
        // Depense
        total_depense += row.montant;
        $(tr).append(`<td></td><td>${row.montant}</td>`);
      }
    } ();

    total += row.montant
    $(tr).append(`<td>${total}</td>`);

    if (_continue) continue;
    $("table").append(tr);

  }

  /* $("table").append(`<tr>
    <th>=<th>
    <th>TOTAL</th>
    <th style="font-size: 120%;">${total_recette}€</th>
    <th style="font-size: 120%;">${total_depense}€</th>
    <th style="font-size: 120%;">${total}€</th>
    </tr>`); /**/

  $("tr td:first-child").click(rmv);
}

add = function (closeNow = false) {

  switch ($("#montant").val().toLowerCase()) {
    case "recette":
      drawTable("R"); // Afficher uniquement recettes
      return false;
      break;
    case "depense":
      drawTable("D"); // Afficher uniquement dépenses
      return false;
      break;
    case "page":
      window.print(); // Imprimer
      return false;
      break;
    case "enlever":
      resetAll(); // Tout supprimer
      return false;
      break;
  }

  var _date = function() {
    // Convertit 2001-10-12 en 12/10/2001

    var value = $("#date").val();
    var reg = value.match(/(\d{4})-(\d{2})-(\d{2})/);

    return `${reg[3]}/${reg[2]}/${reg[1]}`;

  } ();

  var _designation = $("#designation").val();
  var _montant = function(){
    var value = $("#montant").val();
    return +(value.replace(/,/g, "."));
  } ();

  var newData = {
    date: _date,
    designation: _designation,
    montant: _montant
  }

  _json = json.concat(newData);
  a = fs.writeFileSync($file$, JSON.stringify(_json));
  console.log(a);

  if(closeNow=="yes") window.close();
  window.location.reload();
}

rmv = function (ev) {
  ev = ev.currentTarget;
  row = $(ev).parents("tr");
  ix = row.index("table tr");
  ix--; // Pour commencer à compter à partir de 0;

  _json = json;

  _json.splice(ix, 1);
  console.log(_json);
  fs.writeFileSync($file$, JSON.stringify(_json));

  window.location.reload();
}

resetAll = function () {
  conf = confirm("Êtes-vous sûr de vouloir TOUT supprimer. Cette action est définitive");
  if(conf){
    fs.writeFileSync($file$, JSON.stringify( [] ));
    alert("Les données ont été éffacées.");
    window.location.reload();
  }else{
    alert("Action annulée");
  }
}

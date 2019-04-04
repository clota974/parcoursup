<?php
try
{
  $bdd = new PDO('mysql:host=localhost;dbname=quine;charset=utf8', 'root', 'root');
}
catch (Exception $e)
{
  die('Erreur SQL : ' . $e->getMessage());
}

if($_POST["action"]=="add"){
  $add = $bdd->prepare("INSERT INTO sortis(value) VALUES(?)");
  $add->execute(array($_POST["data"]));

  $req = $bdd->prepare("UPDATE numbers SET checked=1 WHERE number=?");
  $req->execute(array($_POST["data"]));

  echo "true";
}else if($_POST["action"]=="remove"){
  $remov = $bdd->prepare("DELETE FROM sortis where value=?");
  $remov->execute(array($_POST["data"]));

  $req = $bdd->prepare("UPDATE numbers SET checked=0 WHERE number=?");
  $req->execute(array($_POST["data"]));

  echo "true";
}else if($_POST["action"]=="get"){
  $getter = $bdd->query("SELECT value FROM sortis");
  $array = array();
  while($d = $getter->fetch()) {
    array_push($array, $d["value"]);
  }

  echo json_encode($array);

}else if($_POST["action"]=="reset"){
  $remov = $bdd->query("DELETE FROM sortis");

  $req = $bdd->query("UPDATE numbers SET checked=0");

  echo "true";
}else{
  echo "false";
}

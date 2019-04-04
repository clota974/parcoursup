<?php

$bdd = null;
try {
  $bdd = new PDO("mysql:host=localhost;dbname=marmay", "root", "root");
  $bdd->exec("ALTER TABLE messages AUTO_INCREMENT = 1;");
  $bdd->exec("ALTER TABLE players AUTO_INCREMENT = 1;");
} catch (Exception $e) {
  die("Fatal error : ". $e->getMessage());
}

function sendMessage($title, $data, $origine, $destinataire){
  global $bdd, $room;
  $req = $bdd->prepare('INSERT INTO messages (title, data, origine, destinataire, room) VALUES(?, ?, ?, ?, ?);');
  $req->execute(array($title, $data, $origine, $destinataire, $room));
}

$action = $_POST["action"] ?? null;

if(strlen($action)<=0){
  $_POST = $_GET;
}

$action = $_POST["action"];
$value = $_POST["value"] ?? 0;
$room = $_POST["room"];

if($action === "playersList"){
  $req = $bdd->prepare('SELECT * FROM players WHERE room = ?');
  $req->execute(array($room));


  $fetched = $req->fetchAll();
  $json = json_encode($fetched, true);
  echo $json;
}

if($action === "newUserReq"){
  $pseudo = $_POST["pseudo"];
  $room = $_POST["room"];

  $pre_req = $bdd->prepare('SELECT count(*) n FROM players WHERE pseudo = ? AND room = ?');
  $pre_req ->execute(array($pseudo, $room));

  $fetched = $pre_req->fetchAll();
  $json = json_encode($fetched[0], true);
  $val = $fetched[0]["n"];

  echo $val;

  if($val == "1"){
    die("ERR pseudoUsed");
  }else{
    $data = array(
      "pseudo" => $pseudo,
      "room" => $room
    );
    sendMessage("newUserReq", json_encode($data, true), "#".$pseudo, "GAME MANAGER");
  }
}
if($action==="addUser"){
  $pseudo = $_POST["pseudo"];
  $personnage = $_POST["personnage"];
  $classement = $_POST["classement"];

  $req = $bdd->prepare('INSERT INTO players (pseudo, room, personnage, classement, data, status) VALUES(?, ?, ?, ?, 0, 0)');
  $req->execute(array($pseudo, $room, $personnage, $classement));
}


if($action === "getMessage"){
  $id = $_POST["id"] ?? 0;
  $destinataire = $_POST["destinataire"] ?? 0;

  $req = $bdd->prepare('SELECT * FROM messages WHERE id > ? AND (destinataire = ? OR destinataire = "all") AND room = ?');
  $req->execute(array($id, $destinataire, $room));

  $fetched = $req->fetchAll();
  $json = json_encode($fetched, true);
  echo $json;
}

if($action === "sendMessage"){
  sendMessage($_POST["title"], $_POST["data"], $_POST["origine"],$_POST["destinataire"], $room);

  /* $fetched = $req->fetchAll();
  $val = $fetched[0]["value"];
  echo $val; */
}
if($action === "removeMessage"){
  $req = $bdd->prepare('DELETE FROM messages WHERE id = ? AND room = ?');
  $req->execute(array($_POST["id"], $room));
}

if($action === "setData"){
  $req = $bdd->prepare('UPDATE players SET data = ? WHERE pseudo = ? AND room = ?');
  $req->execute(array($_POST["data"], $_POST["pseudo"], $room));

  echo $_POST["data"];
}


if($action === "set"){
  $req = $bdd->prepare('UPDATE players SET data = ?');
  $req->execute(array($value));

}
if($action === "get"){
  $req = $bdd->prepare('SELECT * FROM players WHERE id = ?');
  $req->execute(array("1"));

  $fetched = $req->fetchAll();
  $json = json_encode($fetched[0], true);
  $val = $fetched[0]["data"];

  echo $val;
}


if($action==="reset"){
  $req = $bdd->exec('DELETE FROM messages');
  $req2 = $bdd->exec('DELETE FROM players');
}

<?php
  try
  {
  	$bdd = new PDO('mysql:host=localhost;dbname=quine;charset=utf8', 'root', 'root');
  }
  catch (Exception $e)
  {
    die('Erreur SQL : ' . $e->getMessage());
  }

$a = $_POST;
$numbers = array();

foreach ($a as $key => $value) {

  $test = preg_match("#n\d#", $key);

  if($key!="proprio"){
    if(empty($value)){
      die("Info manquante sur la clé $key");
    }elseif($test){
      array_push($numbers, $value);
    }
  }elseif($key=="proprio"&&empty($value)){
    unset($a[$key]);
  }
}

$req = $bdd->prepare("INSERT INTO ticket (serial, proprio) VALUES(?, ?)");
$req->execute(array($a["serial"], $a["proprio"]));

for ($i=0; $i < count($numbers); $i++) {
  $newReq = $bdd->prepare("INSERT INTO numbers (ticket, number) VALUES(?, ?)");
  $newReq->execute(array($a["serial"],$numbers[$i]));
}

echo "true";

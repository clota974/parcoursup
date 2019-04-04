<?php
  $session = session_start();

  #$_SESSION["presta"] = array("MAKI.1", "STR.JOU.2", "STR.CL.1");
  #$_SESSION["presta"] = array();
  if(!isset($_SESSION["presta"])){
    $_SESSION["presta"] = array();
  }

  $prestat = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/me/bread/presta.json");
  $prestat = json_decode($prestat, true);
  $array = $_SESSION["presta"];
  $final = array();

  foreach ($array as $key => $value) {
    $code = $value;
    $nprix = $prestat[$value]['prix'];
    $nname = $prestat[$value]['name'];
    array_push($final, array($nname,$nprix));
  }
?>

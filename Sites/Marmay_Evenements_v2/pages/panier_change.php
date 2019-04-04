<?php
  #header("Location: panier.php");
  $session = session_start();
  if(!isset($_SESSION["presta"])){
    $_SESSION["presta"] = array();
  }
  #$_SESSION["presta"] = array("MAKI.1", "STR.JOU.2", "STR.CL.1");

  $action = isset($_POST["action"]) ? $_POST["action"] : "";
  $code = isset($_POST["code"]) ? $_POST["code"] : "";
  #$action = $_GET["action"]; $code = $_GET["code"];

  $taken = array();
  for ($i=0; $i < count($_SESSION["presta"]); $i++) {
    $txt = preg_replace("#\.(\w+)$#", "", $_SESSION["presta"][$i]);
    if($txt==null) $txt = $_SESSION["presta"][$i];
    $taken[$txt] = $_SESSION["presta"][$i];
  }

  if($action=="remove"){
    if(($key = array_search($code, $_SESSION["presta"])) !== false) {
      array_splice($_SESSION["presta"], $key, 1);
    }
  }

  if($action=="add"){
    $cat = preg_replace("#\.(\w+)$#", "", $code);

    if(in_array($code, $_SESSION["presta"])) {
      echo "ALREADY";
    }elseif(isset($taken[$cat])) {
      echo "MODIFY";
    }else{
      array_push($_SESSION["presta"], $code);
      echo "OK";
    }
  }

  if(isset($_GET["show"])){
    echo "<br /><pre>"; print_r($_SESSION["presta"]); echo "</pre>";
  }
?>

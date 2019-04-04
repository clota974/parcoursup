<?php
session_start();
$trycode = md5($_POST["trycode"]);
$codes = json_decode(file_get_contents("codes.json"));
$ok = false;

for ($i=0; $i < count($codes); $i++) {
  if($trycode==$codes[$i]){
    echo "OK";
    $ok = true;
    $_SESSION["access"] = true;
    break;
  }
}
if(!$ok){
  echo "false";
  $_SESSION["access"] = false;
}

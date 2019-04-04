<?php
 header("Location: contact_termine.php");
  #require_once("../src/before.php");

  $infos = $_POST;

  $body = "";
  $td = "border: 3px solid #000; padding: 5px;";

  $txt = "";
  $txt .= "<table style='width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;'>";
  foreach ($infos as $key => $value){
    $key = htmlspecialchars($key);
    $value = htmlspecialchars($value);

    if($key=="check") continue;
    $txt .= "<tr><td style=' $td text-transform: capitalize;' >$key</td><td style=' $td white-space: pre;' >$value</td></tr>";
  }
  $txt .= "</table>";

  $body .= "<div style='font-family: sans-serif; text-align: center;'>";
  $body .= $prest;
  $body .= "<h1>Contact</h1>";
  $body .= $txt;
  $body .= "<h1>Informations</h1>";
  $body .= "<table style='width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;'>
  <tr><td style='$td'>Date</td><td style='$td'>".date("d/m/Y à G:i")."</td></tr>
  <tr><td style='$td'>IP</td><td style='$td'>".$_SERVER["REMOTE_ADDR"]."</td></tr>
  </table>";
  $body .= "</div>";

  #echo $body;

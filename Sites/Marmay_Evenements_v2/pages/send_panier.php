<?php
  header("Location: devis_termine.php");
  require_once("../src/before.php");
  $infos = $_POST;

  $body = "";
  $td = "border: 3px solid #000; padding: 5px;";

  $prest = "";
  $prest .= "<table style='width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;'>";

  $total = 0;
  for($i = 0; $i < count($final); $i++){
    $prest .= "<tr><td style=' $td text-transform: capitalize;' >".$final[$i][0]."</td><td style=' $td text-align: center;' >".$final[$i][1]."&euro;</td></tr>";
    $total += $final[$i][1];
  }
  $prest .= "<tr><td style=' $td text-transform: capitalize;' >Total</td><td style=' $td text-align: center;' >".$total."&euro;</td></tr>";
  $prest .= "</table>";

  $txt = "";
  $txt .= "<table style='width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;'>";
  foreach ($infos as $key => $value){
    if($key=="check") continue;
    if($key=="date" AND preg_match("#(\d{4})-(\d{2})-(\d{2})#", $value)==1){
      $preg = preg_match("#(\d{4})-(\d{2})-(\d{2})#", $value, $arr);
      $value = "$arr[3]/$arr[2]/$arr[1]";
    }
    $txt .= "<tr><td style=' $td text-transform: capitalize;' >".htmlspecialchars($key)."</td><td style=' $td white-space: pre;' >".htmlspecialchars($value)."</td></tr>";
  }
  $txt .= "</table>";

  $body .= "<div style='font-family: sans-serif; text-align: center;'>";
  $body .= "<h1>Prestations</h1>";
  $body .= $prest;
  $body .= "<h1>Contact</h1>";
  $body .= $txt;
  $body .= "<h1>Informations</h1>";
  $body .= "<table style='width: 100%; border-collapse: collapse; text-align: center; table-layout: fixed;'>
  <tr><td style='$td'>Date</td><td style='$td'>".date("d/m/Y à G:i")."</td></tr>
  <tr><td style='$td'>IP</td><td style='$td'>".$_SERVER["REMOTE_ADDR"]."</td></tr>
  </table>";
  $body .= "</div>";




  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  // More headers
  $headers .= 'From: WebMaster Marmay Evenements <prestations@marmay.re>' . "\r\n";

  mail("marmayevenement@gmail.com","Nouvelle Prestation",utf8_decode($body),$headers);

  echo $body;

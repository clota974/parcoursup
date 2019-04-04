<?php
include_once("paypal_url.php");

$req = array(
    "METHOD"=>"SetExpressCheckout",
    "CANCELURL"=>"http://192.168.0.16/paypal_cancel.php",
    "RETURNURL"=>"http://192.168.0.16/paypal_return.php",
    "AMT"=>"10",
    "CURRENCYCODE"=>"EUR",
    "DESC"=>"Place pour le Alon Fé Internation Dance Festival",
    "LOCALE"=>"FR"
);

$req_url = build_paypal_url($req);

$curl = curl_init($req_url);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); #Desactive certificat SSL car requête HTTPS securisee

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); # Retourne la valeur de la requete au lieu de l'afficher directement

if(curl_exec($curl)){
    echo "Ok";
}else{
    echo "Erreur : ".curl_error($curl);
}

curl_close($curl);
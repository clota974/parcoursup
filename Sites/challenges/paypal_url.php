<?php

function build_paypal_url($params=array()){
    $api = 'https://api-3t.sandbox.paypal.com/nvp?';
    $version = 204;

    $user = "test-marchant-killian_api1.gmail.com";
    $pwd = "RVH5YNH73H2PUQT4";
    $signature = "AclM2lLB3a8JoIabI-JqGpbMwjg5ADspDxbbVRp35NObiKpMRV8mY2i7";

    $url = $api.'VERSION='.$version.'&USER='.$user.'&PWD='.$pass.'&SIGNATURE='.$signature;

    $ext = "";
    foreach ($params as $key => $value) {
        $ext .= "&".$key."=".urlencode($value);
    }

    $url .= $ext;

    return $url;
}
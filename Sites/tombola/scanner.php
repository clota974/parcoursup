<?php
header("Content-type: image/png");
$image = imagecreatefrompng("img.png");

$blanc = imagecolorallocate($image, 255, 255,255);
$orange = imagecolorallocate($image, 255, 128, 0);
$bleu = imagecolorallocate($image, 0, 0, 255);
$bleuclair = imagecolorallocate($image, 156, 227, 254);
$vert = imagecolorallocate($image, 0, 255, 0);
$blanc = imagecolorallocate($image, 255, 255, 255);
$color = 0;

function isBlack($col){
  return ($col<16777215/2); // Vrai si blanc
}
function findSquare($img, $x, $y){
  $black = true;
  $coords = [[$x,$y]];
  while($black == true){
    $black = isBlack(imagecolorat($img, $x++, $y));
  }
  array_push($coords, [$x,$y]);

  $black = true;
  while($black == true){
    $black = isBlack(imagecolorat($img, $x, $y++));
  }
  array_push($coords, [$x,$y]);

  $black = true;
  while($black == true){
    $black = isBlack(imagecolorat($img, $x--, $y));
  }
  array_push($coords, [$x,$y]);

  $black = true;
  while($black == true){
    $black = isBlack(imagecolorat($img, $x, $y--));
  }
  array_push($coords, [$x,$y]);
  return $coords;
}
function draw($img, $tab){
  $orange = imagecolorallocate($img, 255, 128, 0);

  for ($i=0; $i < 4; $i++) {
    ImageLine($img, $tab[$i][0], $tab[$i][1], $tab[$i+1][0], $tab[$i+1][1], $orange);
  }
}

for ($y=0; $y < imagesy($image); $y++) {
  for ($x=0; $x < imagesx($image); $x++) {
    $col = imagecolorat($image, $x, $y);
    if(isBlack($col)){
      // echo "X : $x ; Y : $y";
      $sq = findSquare($image, $x, $y);
      $x = imagesx($image);
      $y = imagesy($image);
      draw($image, $sq);
    }
  }
}
imagepng($image);

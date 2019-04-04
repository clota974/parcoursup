<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Nos prestations</title>
    <script src="/pro/js/presta.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/css/presta.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="/pro/css/article.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <?php require_once("../src/pretty_header.php"); ?>
    <section class="presta">
      <a href="/pro/article/structures" id="structures"><div class="cardP" style="background-image: url('/pro/src/struct.jpg')">
        <h4>Structures gonflables</h4>
      </div></a>
      <a href="/pro/article/presentation"><div class="cardP" style="background-image: url('/pro/src/confiserie.jpg')">
        <h4>Confiseries</h4>
      </div>
      <a href="#"><div class="cardP" style="background-image: url('/pro/src/maki.jpg');">
        <h4>Maquillages</h4>
      </div></a>
      <a href="#"><div class="cardP" style="background-image: url('/pro/src/peluche_ban.jpg'); background-position-y: -40px;">
        <h4>Peluches</h4>
      </div></a>
      <a href="#" id="bois"><div class="cardP" style="background-image: url('/pro/src/bois.jpg'); background-position-y: -155px;">
        <h4>Jeux en bois</h4>
      </div></a>
      <a href="#" id="baby"><div class="cardP" style="background-image: url('/pro/src/baby.png'); background-position-y: -155px;">
        <h4>Baby Foot</h4>
      </div></a>
      <a href="#" id="focus"><div class="cardP" style="background-image: url('/pro/src/peche.png');">
        <h4>Pêche aux canards</h4>
      </div></a>
      <a href="#" id="focus"><div class="cardP" style="background-image: url('/pro/src/JV.jpg'); background-position-y: 0px;">
        <h4>Jeux vidéo</h4>
      </div></a>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

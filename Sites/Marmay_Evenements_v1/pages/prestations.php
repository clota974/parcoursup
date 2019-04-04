<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Nos prestations</title>
    <script src="/me/js/presta.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/css/presta.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <section class="presta">
      <h1>Nos prestations</h1>
      <?php if(isset($_GET["command"])): ?>
      <div class="info">
        Choisissez ce que vous souhaitez commander
      </div>
      <?php endif; ?>
      <div class="cardsC">
        <div class="card maki" id="maki" data-href="presta/maquillages">
          <a href="presta/maquillages">
            <div class="illustr"></div>
            <h3>Maquillages</h3>
          </a>
        </div>
        <div class="card peluche" id="peluche">
          <a href="presta/peluche">
            <div class="illustr"></div>
            <h3>Peluches</h3>
          </a>
        </div>
        <div class="card struct" id="struct">
          <a href="presta/structures">
            <div class="illustr"></div>
            <h3>Structures</h3>
          </a>
        </div>
        <div class="card confiserie" id="confiserie">
          <a href="presta/confiseries">
            <div class="illustr"></div>
            <h3>Confiseries</h3>
          </a>
        </div>
        <div class="card bois" id="bois">
          <a href="presta/bois">
            <div class="illustr"></div>
            <h3>Jeux en bois</h3>
          </a>
        </div>
        <div class="card ballon" id="ballon">
          <a href="presta/ballon">
            <div class="illustr"></div>
            <h3>Sculpture sur ballons</h3>
          </a>
        </div>
        <div class="card jv" id="jv">
          <a href="presta/jv">
            <div class="illustr"></div>
            <h3>Jeux vidéos</h3>
          </a>
        </div>
        <div class="card pac" id="pac">
          <a href="presta/pac">
            <div class="illustr"></div>
            <h3>Pêche aux canards</h3>
          </a>
        </div>
        <div class="card baby" id="baby">
          <a href="presta/baby">
            <div class="illustr"></div>
            <h3>Baby Foot</h3>
          </a>
        </div>
        <div class="card photoselfie" id="photoselfie">
          <a href="presta/photoselfie">
            <div class="illustr"></div>
            <h3>Photoselfie</h3>
          </a>
        </div>
        <div class="card forfaits" id="forfaits">
          <a href="presta/forfaits">
            <div class="illustr"></div>
            <h3>Forfaits</h3>
          </a>
        </div>
      </div>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

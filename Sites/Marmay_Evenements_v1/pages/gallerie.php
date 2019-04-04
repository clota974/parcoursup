<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Nos prestations</title>
    <script src="/me/js/gallerie.js" charset="utf-8"></script>
    <link rel="stylesheet"  href="/me/css/gallerie.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <section class="content">
      <h1>Gallerie</h1>
      <section class="photos">
        <div style='background-image: url("/me/src/baby.png")'></div>
        <div style='background-image: url("/me/src/ballons.jpg")'></div>
        <div style='background-image: url("/me/src/bois.jpg")'></div>
        <div style='background-image: url("/me/src/chien.jpg")'></div>
        <div style='background-image: url("/me/src/confiserie.jpg")'></div>
        <div style='background-image: url("/me/src/bap.jpg")'></div>
      </section>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

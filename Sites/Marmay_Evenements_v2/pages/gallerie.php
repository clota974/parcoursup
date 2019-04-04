<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Nos prestations</title>
    <script src="/pro/js/gallerie.js" charset="utf-8"></script>
    <link rel="stylesheet"  href="/pro/css/gallerie.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <section class="content">
      <h1>Gallerie</h1>
      <section class="photos">
        <div style='background-image: url("/pro/src/baby.png")'></div>
        <div style='background-image: url("/pro/src/ballons.jpg")'></div>
        <div style='background-image: url("/pro/src/bois.jpg")'></div>
        <div style='background-image: url("/pro/src/chien.jpg")'></div>
        <div style='background-image: url("/pro/src/confiserie.jpg")'></div>
        <div style='background-image: url("/pro/src/bap.jpg")'></div>
      </section>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

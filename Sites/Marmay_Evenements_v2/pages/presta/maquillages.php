<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Maquillages</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <script src="/pro/js/kln.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../../src/pretty_header.php"); ?>
    <section class="presta">
      <h1 data-url="/pro/src/maki.jpg" data-align="center">Maquillages</h1>
      <p data-evt="alert">
        Nos maquilleuses disposent d'un catalogue dans lequel
        chaque enfant choisit son maquillage.<br/>
        Nous utilisons du maquillage à l'eau qui sort facilement avec de l'eau.<br />
        Vous pouvez demander d'avoir plusieurs maquilleuses selon le nombre d'enfants prévus.
      </p>
      <div class="illustr" style="background-image: url('/pro/src/maki.jpg')"></div>
      <div class="addDevis_cont">
        <div class="addDevis">
          <h6>Cliquez pour ajouter au devis</h6>
        </div>
      </div>
    </section>
    <footer>
      <?php require_once('../../src/footer.php'); ?>
    </footer>
  </body>
</html>

<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Jeux Vidéos</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #FF4136;
    }
    section.presta div.illustr{
      border-color: #EEE #EEE #FF4136 #FF4136;
    }
    section.presta div.illustr:hover{
      border-color: #FF4136 #FF4136 #EEE #EEE;
    }
    table.command{
      border-color: #FF4136;
    }
    table.command thead{
      background-color: #FF4136;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <h1>Jeux Viéos</h1>
      <div style="min-height: 350px;">
        <p style="min-height: 0px;">
          Pour les jeux vidéos, Marmay Evenements emmènera son matériel.<br />
          Vous pouvez choisir plusieurs jeux, nous changerons de jeu selon vos goûts.
          Les jeux disponibles sont :
        </p>
        <ul>
          <li>Just Dance (Jeu de danse, pas de manette nécessaire).</li>
          <li>Jeux de courses (Moto/Auto)</li>
          <li>Jeux d'arcade</li>
        </ul>
      </div>
      <div class="illustr" style="background-image: url('/pro/src/jv.jpg');"></div>
        <div class="noaccess">
          <label for="accesscode" id="labelaccess">Vous pouvez demander ces prestations en allant sur la page "Demande de devis"</label>
          <button type="button"><a href="/pro/devis">Faire une demande de devis</a></button>
        </div>
    </section>
    <footer>
      <?php require_once('../../src/footer.php'); ?>
    </footer>
  </body>
</html>

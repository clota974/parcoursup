<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Jeux en Bois</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #00B2CA;
    }
    section.presta div.illustr{
      border-color: #F79256 #F79256 #00B2CA #00B2CA;
    }
    section.presta div.illustr:hover{
      border-color: #00B2CA #00B2CA #F79256 #F79256;
    }
    table.command{
      border-color: #00B2CA;
    }
    table.command thead{
      background-color: #00B2CA;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    p{
      min-height: 0 !important;
    }
    #img{
      display: block;
      min-height: 700px;
      width: 100%;
      background-size: contain;
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <h1>Jeux en Bois</h1>
      <p>
        Différents jeux en bois, construits par Marmay Evenements, sont disponibles.<br />
        Nous avons le “clown à tomber” (aussi disponible en version pour les filles), le “chamboule tout”, et le “bipper”.
      </p><br/>
      <p style="text-align: left; font-size: 130%; display: block"><b>Cliquez pour agrandir l'image</b></p>
      <div class="bg-img" style="background-image: url('/pro/src/bois_fiche.jpg');" id="img"></div>
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

<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Pêche aux canards</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #E671B8;
    }
    section.presta div.illustr{
      border-color: #F79256 #F79256 #E671B8 #E671B8;
    }
    section.presta div.illustr:hover{
      border-color: #E671B8 #E671B8 #F79256 #F79256;
    }
    table.command{
      border-color: #E671B8;
    }
    table.command thead{
      background-color: #E671B8;
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
      <h1>Pêche aux canards</h1>
      <p>
        La Pêche aux Canards aussi appelée Pêche à la Ligne est un jeu où les enfants doivent attraper
        les canards grâce à des canne à pêche.
      </p>
      <div class="bg-img" style="background-image: url('/pro/src/pac.jpg');" id="img"></div>
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

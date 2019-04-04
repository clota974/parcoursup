<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Baby Foot</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: blue;
    }
    section.presta div.illustr{
      border-color: #000 #000 blue blue;
    }
    section.presta div.illustr:hover{
      border-color: blue blue #000 #000;
    }
    table.command{
      border-color: blue;
    }
    table.command thead{
      background-color: blue;
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
      <h1>Baby Foot</h1>
      <p>
        Nous disposons d'un Baby Foot. Il n'a pas de monnayeur donc <strong>les parties sont gratuites et illimitées.</strong><br/>
        Le Baby Foot a 4 poignées de chaque côté.<br />
        Il n'y a pas d'âge limite pour y jouer !
      </p>
      <div class="bg-img" style="background-image: url('/pro/src/baby_fiche.jpg');" id="img"></div>
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

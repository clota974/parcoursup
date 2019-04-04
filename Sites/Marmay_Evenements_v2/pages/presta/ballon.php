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
      color: #FFDC00;
    }
    section.presta div.illustr{
      border-color: blue blue #FFDC00 #FFDC00;
    }
    section.presta div.illustr:hover{
      border-color: #FFDC00 #FFDC00 blue blue;
    }
    table.command{
      border-color: #FFDC00;
      color: #444;
    }
    table.command thead{
      background-color: #FFDC00;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <h1>Sculpture sur ballons</h1>
      <p>
        Marmay Evenements vous propose d'offrir de beaux ballons aux enfants et aux parents.<br/>
        Nous pouvons modeler les ballons sur place ou avant de venir.<br/>
        Nos animateurs peuvent <strong>transformer des ballons en coeurs, cygnes, avions, chiens, épées, fleurs, moustiques…</strong>
      </p>
      <div class="illustr" style="background-image: url('/pro/src/ballons.jpg');"></div>
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

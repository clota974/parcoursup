<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Peluches</title>
    <script src="/me/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #FFCB00;
    }
    section.presta p{
      min-height: 1px;
    }
    table.command{
      border-color: #FFCB00;
      color: #444;
    }
    table.command thead{
      background-color: #FFCB00;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    p{
      font-size: 110%;
    }
    #illustr{
      min-width: 400px;
      min-height: 500px;
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <section>
        <h1>Nos forfaits</h1>
        <p>
          Découvrez ici les forfaits en cours
        <br/><br/>
        <b>Cliquez sur les photos pour les agrandir</b>
        </p>
        <div class="imgs">
          <div class="bg-img" style="background-image: url('/me/src/forfait250.jpg');" id="illustr"></div>
        </div>
      </section>
      <div class="noaccess" style="border: 2px solid rgba(255,255,255,0.6); border-radius: 40px;">
        <label for="accesscode" id="labelaccess" style="font-size: 130%;">Contactez-nous pour demander un forfait.</label>
      </div>
    </section>
    <footer>
      <?php require_once('../../src/footer.php'); ?>
    </footer>
  </body>
</html>

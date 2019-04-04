<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Peluches</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
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
        <h1>Photoselfie</h1>
        <p>
          Marmay Evenements vous présente sa nouveauté : le Photoselfie. Un produit effervescent à La Réunion.<br/>
          Faites vos plus beaux sourires (ou vos plus belles grimaces) et imprimez-les immédiatement en un clic.<br/>
          Marmay Evenements crée un décor spécialement pour votre événement qui ornera vos grimaces.<br/>
          Vous pouvez placer votre pub sur la machine afin de promouvoir votre entreprise ou organisation.<br/>
          Les tirages sont illimités et les photos s'imprime immédiatement après avoir été prises sur un papier
          résistant à l'eau de format 10cm sur 15cm.
        <br/><br/>
        <b>Cliquez sur la photo pour l'agrandir</b>
        </p>
        <div class="imgs">
          <div class="bg-img" style="background-image: url('/pro/src/photoselfie.jpg');" id="illustr"></div>
        </div>
      </section>
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

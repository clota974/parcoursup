<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Structures gonflables</title>
    <script src="/pro/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #FF00AD;
    }
    section.presta div.illustr{
      border-color: #F79256 #F79256 #FF00AD #FF00AD;
    }
    section.presta div.illustr:hover{
      border-color: #FF00AD #FF00AD #F79256 #F79256;
    }
    table.command{
      border-color: #FF00AD;
    }
    table.command thead{
      background-color: #FF00AD;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    section.presta p{
      min-height: 1px;
    }
    tr[data-code^='STR.A']{
      color: #000;
    }
    tr[data-code^='STR.B']{
      color: #FF00AD;
    }
    tr[data-code^='STR.C']{
      color: #FFCB00;
    }
    tr[data-code^='STR.D']{
      color: #F79256;
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/pretty_header.php"); ?>
    <section class="presta">
      <h1>Strcutures Gonflables</h1>
      <p>
        Nous divisons nos structures en 3 catégories : de la gamme A à la gamme D.<br />
        <i><b>Cliquez sur le nom des gammes pour afficher/masquer leur contenu.</b></i>
      </p>
      <div class="les_gammes">
        <div class="gamme roll">
          <h2>Gamme A</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/pro/src/structures/arche-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/ballon-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/bleu-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/chattoboggan-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/circus-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/clown-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/happy-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/balles-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/singe-a.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme B</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/pro/src/structures/aquaclown.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/escalier-b.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme C</h2>
          <div class="content">

            <div class="bg-img" style="background-image: url('/pro/src/structures/aqua.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/chateau-elephant.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/couvert-b.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/joutes-b.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme D</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/pro/src/structures/parcours-c.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/pro/src/structures/multiplay-c.jpg');" id="elephant"></div>
          </div>
        </div>
      </div>
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

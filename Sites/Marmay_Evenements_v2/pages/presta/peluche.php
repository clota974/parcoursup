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
      color: #7DCFB6;
    }
    section.presta p{
      min-height: 1px;
    }
    table.command{
      border-color: #7DCFB6;
      color: #444;
    }
    table.command thead{
      background-color: #7DCFB6;
    }
    table.command thead div{
      color: rgba(255, 255, 255, 0.8);
    }
    </style>
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <section>
        <h1>Peluches</h1>
        <p>
          Nous disposons de 12 peluches différentes. <br />
          Vous pouvoir choisir si vous souhaitez voir la peluche danser avec les enfants
          et avec de l'animation, ou sans animation. <br />
          Les peluches nous appartiennent, nous ne sous-traîtons pas et nous ne les louons pas,
          les personnes à l'intérieur des peluches font parti de l'équipe de Marmay Evenements.
          <br/>
        </p>
        <div class="imgs">
          <div class="bg-img" style="background-image: url('/pro/src/peluches/beige.jpg');" id="beige"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/canard.jpg');" id="canard"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/casino.jpg');" id="casino"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/chat.jpg');" id="chat"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/chien.jpg');" id="chien"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/elephant.jpg');" id="elephant"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/lion.jpg');" id="lion"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/ours.jpg');" id="ours"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/pirate.jpg');" id="pirate"></div>
          <div class="bg-img" style="background-image: url('/pro/src/peluches/souris.jpg');" id="souris"></div>
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

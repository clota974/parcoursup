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
          Vous pouvoir choisir la peluche que vous souhaitez (sous réserve des stocks disponibles). <br />
          Les peluches nous appartiennent, nous ne sous-traîtons pas.
          <br/>
        </p>
        <div class="imgs">
          <div class="bg-img" style="background-image: url('/me/src/peluches/beige.jpg');" id="beige"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/canard.jpg');" id="canard"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/casino.jpg');" id="casino"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/chat.jpg');" id="chat"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/chien.jpg');" id="chien"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/elephant.jpg');" id="elephant"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/lion.jpg');" id="lion"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/ours.jpg');" id="ours"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/pirate.jpg');" id="pirate"></div>
          <div class="bg-img" style="background-image: url('/me/src/peluches/souris.jpg');" id="souris"></div>
        </div>
      </section>
      <?php
      if(!$_SESSION["access"]):
        ?>
        <div class="noaccess">
          <label for="accesscode" id="labelaccess">Veuillez entrer le mot de passe pour consulter les prix et commander</label>
          <input type="text" name="accesscode" id="accesscode" value="" placeholder="CODE" style="text-transform: uppercase;"/>
          <button type="button" id="tryaccess">Envoyer</button>
        </div>
      <?php endif;
      if($_SESSION["access"]):
        ?>
        <table class="command">
          <thead>
            <tr>
              <td>Prestations<div>cliquez sur la prestation à ajouter au devis</div></td>
              <!-- La ligne précédente est remplacée par, "cliquez sur la prestation à ajouter au devis"-->
              <td>Prix</td>
            </tr>
          </thead>
          <tbody>
            <?php
            $ids = array("PEL.1");
            for ($i=0; $i < count($ids); $i++):
              ?>
              <tr data-code="<?= $ids[$i]; ?>">
                <td><?= $prestat[$ids[$i]]["name"]; ?></td>
                <td><?= $prestat[$ids[$i]]["prix"]; ?></td>
              </tr>
            <? endfor; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </section>
    <footer>
      <?php require_once('../../src/footer.php'); ?>
    </footer>
  </body>
</html>

<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Pêche aux canards</title>
    <script src="/me/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
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
        les canards grâce à des canne à pêche.<br />
        La prestation est vendu sans animateurs (location de matériel) - Possibilité d'ajouter un animateur.
      </p>
      <div class="bg-img" style="background-image: url('/me/src/pac.jpg');" id="img"></div>
      <?php
      if(!$_SESSION["access"]):
        ?>
        <div class="noaccess">
          <label for="accesscode" id="labelaccess">Veuillez entrer le mot de passe pour consulter les prix et faire un devis</label>
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
              <td>Prix</td>
            </tr>
          </thead>
          <tbody>
            <?php
            $ids = array("PAC.1", "PAC.2");
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

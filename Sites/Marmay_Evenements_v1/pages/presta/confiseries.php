<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Confiseries</title>
    <script src="/me/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
    <style media="screen">
    section.presta h1{
      color: #E3868F;
    }
    section.presta p{
      min-height: 0;
    }
    table.command{
      border-color: #E3868F;
    }
    table.command thead{
      background-color: #E3868F;
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
    <section class="hero-img" style="background-image: url('/me/src/confiserie.jpg')"/></section>
    <section class="presta" style="margin-bottom: 0; padding-bottom: 0;">
      <h1>Confiseries</h1>
      <p style="margin-bottom: -15px;">
        Nous vous proposons de vous régaler grâce à nos confiseries et nos granités.<br/>
        Nous préparons et faisons les barbes à papa (sur des bâtons), le Pop Corn, et les granités sur place.<br/>
        Nous avons différentes saveurs pour les barbes à papa.<br/>
        Nous fournissons les gobelets (40cL) pour le Pop Corn.<br/>
        16 litres de boissons, deux parfums, et 80 à 100 gobelets vous sont proposés pour les granités (aussi appelés granitas).<br/>
        <br/>
      </p>
    </section>
    <div class="bg-img" style="background-image: url('/me/src/confiseries_fiche.jpg');" id="img"></div>
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
            <td>Prix</td>
          </tr>
        </thead>
        <tbody>
          <?php
          $ids = array("BAP", "POP", "GRN");
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

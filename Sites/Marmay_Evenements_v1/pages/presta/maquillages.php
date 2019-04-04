<?php require_once '../../src/before.php';  ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Maquillages</title>
    <script src="/me/pages/presta/command.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/pages/presta/master.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <h1>Maquillages</h1>
      <p>
        Nos maquilleuses disposent d'un catalogue dans lequel
        chaque enfant choisit son maquillage.<br/>
        Nous utilisons du maquillage à l'eau qui sort facilement avec de l'eau.<br />
        Vous pouvez commander 1h à 3h de maquillage ci-dessous.
      </p>
      <div class="illustr" style="background-image: url('/me/src/maki.jpg')"></div>
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
            $ids = array("MAKI.1", "MAKI.2", "MAKI.3");
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

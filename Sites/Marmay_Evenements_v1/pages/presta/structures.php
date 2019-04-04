<?php require_once '../../src/before.php'; ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../../src/head.php"); ?>
    <title>Marmay Evenements - Structures gonflables</title>
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
    <?php require_once("../../src/header.php"); ?>
    <section class="presta">
      <h1>Strcutures Gonflables</h1>
      <p>
        Nous divisons nos structures en 4 catégories : de la gamme A à la gamme D.<br />
        Les structures sont fournies avec un animateur qui installe, surveille, et désinstalle la structure.<br/>
        <i><b>Cliquez sur le nom des gammes pour afficher/masquer leur contenu.</b></i>
      </p>
      <br/>
      <section style="position: static; display: block; overflow: hidden">
        <h1 style="color: red">Nouveautés</h1>
        <br/>
        <h2 style="margin-bottom: 2px; padding-bottom: 0;">Le toboggan aquatique <span style="font-size: 70%; color: #BBB;">(Gamme C)</span> et le parcours circus <span style="font-size: 70%; color: #BBB;">(Gamme D)</span></h2>
        <div class="bg-img" style="position: relative; float: left; background-image: url('/me/src/aqua_ban.jpg'); min-width: 500px;" id="elephant"></div>
        <div class="bg-img" style="position: relative; float: right; background-image: url('/me/src/parcours_circus_preview.jpg'); min-width: 500px;" id="elephant"></div>
      </section>
      <br/>
      <br/>
      <div class="les_gammes">
        <div class="gamme roll">
          <h2>Gamme A</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/me/src/structures/arche-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/ballon-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/bleu-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/chattoboggan-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/circus-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/clown-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/happy-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/balles-a.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/singe-a.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme B</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/me/src/structures/aquaclown.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/escalier-b.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme C</h2>
          <div class="content">

            <div class="bg-img" style="background-image: url('/me/src/structures/aqua.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/escalier-aqua.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/chateau-elephant.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/couvert-b.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/joutes-b.jpg');" id="elephant"></div>
          </div>
        </div>
        <div class="gamme roll">
          <h2>Gamme D</h2>
          <div class="content">
            <div class="bg-img" style="background-image: url('/me/src/structures/parcours-c.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/multiplay-c.jpg');" id="elephant"></div>
            <div class="bg-img" style="background-image: url('/me/src/structures/parcours-circus.jpg');" id="elephant"></div>
          </div>
        </div>
      </div>
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
            $ids = array("STR.A.2", "STR.A.3", "STR.B.2", "STR.C.2", "STR.D.2", "STR.AQ.2");
            for ($i=0; $i < count($ids); $i++):
              if(!isset($prestat[$ids[$i]]["name"])) continue;
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

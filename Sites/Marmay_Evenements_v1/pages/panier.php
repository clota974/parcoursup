<?php require_once('../src/before.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Demande de devis</title>
    <script src="/me/js/panier.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/me/css/panier.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <h2>Demande de devis</h2>
    <section class="presta">
      <?php
      if(isset($_GET["command"])): ?>
      <?php endif; ?>
      <table class="command">
        <thead>
          <tr>
            <td>Prestations</td>
            <td>Prix</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          <?php
          $total = 0;
          for ($i=0; $i < count($final); $i++):
            ?>
            <tr>
              <td><?= $final[$i][0]; ?></td>
              <td><?= $final[$i][1]; ?></td>
              <td class="remove" data-code='<?= $_SESSION['presta'][$i]; ?>'>Enlever</td>
            </tr>
          <?php
          $total += $final[$i][1];
        endfor; ?>
        </tbody>
        <tfoot>
          <tr class="add" onclick="window.location.href = '/me/prestations?command';">
            <td colspan="3">Cliquez pour ajouter une prestation</td>
          </tr>
          <tr class="total">
            <td>Total</td>
            <td colspan="2"><?= $total ?></td>
          </tr>
        </tfoot>
      </table>
    </section>
    <section class="form" id="form">
      <h3>Demande de devis</h3>
      <p>Elles seront utilisées pour vous contacter.<br />
      Les champs avec un <span style="color:red">*</span>
      sont obligatoires.</p>
      <form action="" method="post">
        <div class="input text">
          <label for="nom">Nom</label>
          <input type="text" name="nom"/>
        </div>
        <div class="input text">
          <label for="prenom">Prénom</label>
          <input type="text" name="prenom"/>
        </div>
        <br/>

        <div class="input text">
          <label for="">Date de l'animation</label>
          <input type="date" name="date" placeholder="JJ/MM/AAAA"/>
        </div>
        <br/>
        <div class="input radio">
          <label for="">Début d'animation</label>
          <div class="radBtn">
            <input type="radio" name="horaire" value="14h">
            <label for="">14h</label>
          </div>
          <div class="radBtn">
            <input type="radio" name="horaire" value="14h30">
            <label for="">14h30</label>
          </div>
          <div class="radBtn">
            <input type="radio" name="horaire" value="15h">
            <label for="">15h</label>
          </div>
        </div>
        <br/>

        <div class="input text">
          <label for="">Téléphone</label>
          <input type="tel" name="tel" />
        </div>
        <div class="input text">
          <label for="">Adresse e-mail</label>
          <input type="email" name="email" />
        </div>
        <br/>

        <div class="input textarea">
          <label for="">Adresse complète de l'animation</label>
          <textarea name="adresse"></textarea>
        </div>
        <br/>

        <div class="input textarea not-required">
          <label for="">Message (si nécessaire)</label>
          <textarea name="message"></textarea>
        </div>
        <br />

        <p class="warning">
        Les prix affichés sur la demande de devis sont approximatifs et succeptibles de changés selon
        la disponibilité de l'équipe, les horaires, l'emplacement de l'animation…<br />
        <strong>Ce formulaire est une <mark>demande</mark> de commande, nous devons vérifier la disponibilité des prestations.</strong>
        </p>

        <div class="input check">
          <input type="checkbox" name="check" id="check">
          <label for="check">J'ai au moins 18 ans et j'habite sur l'île de La Réunion (974).</label>
        </div>
        <br />

        <button type="button">Envoyez</button>
      </form>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

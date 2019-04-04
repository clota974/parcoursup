<?php require_once("../src/before.php"); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Contact</title>
    <script src="/pro/js/contact.js" charset="utf-8"></script>
    <link rel="stylesheet" href="/pro/css/contact.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <?php require_once("../src/header.php"); ?>
    <section class="infos">
      <h2>Coordonnées</h2>
      <table>
        <tr>
          <td>Numéro de téléphone</td>
          <td>
            <a href="tel:0692112949">0692 11 29 49</a>
          </td>
        </tr>
        <tr>
          <td>E-mail</td>
          <td>
            <a href="mailto:marmayevenement@gmail.com">marmayevenement@gmail.com</a>
          </td>
        </tr>
        <tr>
          <td class="fb">Facebook</td>
          <td>
            <a href="https://www.facebook.com/marmay.evenement" target="_blank">Marmay Evenements</a>
          </td>
        </tr>
        <tr>
          <td class="twt" id="twt">Twitter</td>
          <td>
            <a href="https://twitter.com/Anniversaire974/" target="_blank">@Annivesaire974</a>
          </td>
        </tr>
      </table>
    </section>
    <section class="form">
      <h2 style="margin-bottom: 50px;">Formulaire de Contact</h2>
      <strong>Ce formulaire est pour envoyer un message. <br />
      Pour demander un devis, cliquez sur “Mon Panier” en haut.</strong>
      <hr style="margin-top: 15px; width: 50%; border: 1px solid #AAA;"/>
      <p>Vos informations utilisées pour vous contacter.<br />
      Les champs avec un <span style="color:red">*</span>
      sont obligatoires.<br />
      </p>
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
          <label for="">Téléphone</label>
          <input type="tel" name="tel" />
        </div>
        <div class="input text">
          <label for="">Adresse e-mail</label>
          <input type="email" name="email" />
        </div>
        <br/>

        <div class="input text large">
          <label for="sujet">Sujet</label>
          <input type="text" name="sujet"/>
        </div>
        <br/>
        <div class="input textarea large">
          <label for="">Message</label>
          <textarea name="message"></textarea>
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

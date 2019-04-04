<?php require_once("../src/before.php"); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php #require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Acceuil</title>
    <link rel="stylesheet" href="/pro/css/master.css" media="screen" title="no title" charset="utf-8">
    <link rel="stylesheet" href="/pro/css/home.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <section class="hero">
      <div class="bg-img" style="background-image: url('/pro/src/logo.png');"></div>
      <h3>Entreprise événementielle réunionnaise</h3>
      <h2>0692 11 29 49</h2>
    </section>
    <section class="nav_">
      <h5>Navigation</h5>
      <nav>
        <a href="/pro/prestations">Prestations</a>
        <a href="#">Demande de devis</a>
        <a href="#">Recrutement</a>
        <a href="/pro/contact">Contact</a>
      </nav>
    </section>
    <section class="actu">
      <h3>Actualités</h3>
      <div class="actu_card">
        <div class="actu_img">
          <div class="bg-img" style="background-image: url('/pro/src/struct_rond.jpg');"></div>
        </div>
        <div class="actu_text">
          <h5>Nouvelles structures</h5>
          <p>
            De nouvelles structures sont arrivées chez
            Marmay Evenements. Des structures aquatiques et un nouveau parcours,
            de quoi rendre heureux les petits.
          </p>
        </div>
        <button type="button" name="button"><a href="/pro/article/nouveautes">Voir plus +</a></button>
      </div>
      <div class="actu_card">
        <div class="actu_img">
          <div class="bg-img" style="background-image: url('/pro/src/struct_rond.jpg');"></div>
        </div>
        <div class="actu_text">
          <h5>Nouvelles structures</h5>
          <p>
            De nouvelles structures sont arrivées chez
            Marmay Evenements. <br/><br/>Des structures aquatiques et un nouveau parcours,
            de quoi rendre heureux les petits.
          </p>
        </div>
        <button type="button" name="button"><a href="/pro/article/nouveautes">Voir plus +</a></button>
      </div>
    </section>
    <section class="follow">
      <h3>Suivez notre actualité</h3>
      <div><a href="#" class="twitter" target="_blank"></a></div>
      <div><a href="https://www.facebook.com/marmayevenements/" class="facebook" target="_blank"></a></div>
      <div><a href="#" class="instagram" target="_blank"></a></div>
    </section>
    <section class="contact">
      <div class="illustr">
        <div class="bg-img" style="background-image: url('/pro/src/fiesta.jpg');"></div>
      </div>
      <div class="text">
        <h3>Ou contactez-nous</h3>
        <div class="bloc">
          <label>Téléphone</label>
          <h1 class="contact-tel">0692 11 29 49</h1>
        </div>
        <div class="bloc">
          <label>Email</label>
          <h1 class="contact-email">marmayevenement@gmail.com</h1>
        </div>
      </div>
    </section>
    <section class="logo">
      <div class="bg-img" style="background-image: url('/pro/src/logo.png'); width: 100%; min-height: 60px;"></div>
      <h6>MARMAY EVENEMENTS ©® 2017</h6>
    </section>
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

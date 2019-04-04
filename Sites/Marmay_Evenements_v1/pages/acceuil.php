<?php require_once("../src/before.php"); ?>
<!DOCTYPE html>
<html>
  <head>
    <?php require_once("../src/head.php"); ?>
    <title>Marmay Evenements - Acceuil</title>
    <link rel="stylesheet" href="/me/css/home.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <!-- FACEBOOK PLUGIN : BEGIN -->
    <div id="fb-root"></div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v3.2&appId=235154743580519&autoLogAppEvents=1"></script>
    <!-- FACEBOOK PLUGIN : END -->
    <?php require_once("../src/header.php"); ?>
    <section class="diapo">
      <div class="control">
        <div class="controlC">
        </div>
      </div>
      <div class="content">
        <!--<div class="diapage d-red" style="background-image: url('/me/src/lutin.jpg'); background-position: center;">
          <div class="desc">
            <span class="caption">Joyeux Noël</span>
            <span class="details">Marmay Evenements ainsi que le Père Noël vous souhaite un Joyeux Noël !</span>
          </div>
        </div>-->
        <div class="diapage d-pink" style="background-image: url('/me/src/photoselfie.jpg'); background-position: center;" data-href="/me/presta/photoselfie">
          <div class="desc">
            <span class="caption museo">Le nouveau photoselfie</span>
            <span class="details">Faites vos plus beaux sourires (ou vos plus belles grimaces) et imprimez-les !</span>
          </div>
        </div>
        <div class="diapage d-cyan" style="background-image: url('/me/src/aqua_ban.jpg'); background-position: top;">
          <div class="desc">
            <span class="caption museo">La structure aquatique</span>
            <span class="details">Une nouvelle structure avec de l'eau est disponible : La structure aquatique</span>
          </div>
        </div>
        <div class="diapage d-purple" style="background-image: url('/me/src/peluche_ban.jpg')" data-href="/me/presta/peluche">
          <div class="desc">
            <span class="caption museo">Nos peluches</span>
            <span class="details">Découvrez notre large variété d'animaux géants.</span>
          </div>
        </div>
        <div class="diapage d-green" style="background-image: url('https://i.ytimg.com/vi/vVzg3PczKKA/maxresdefault.jpg')">
          <div class="desc">
            <span class="caption museo">Contactez-nous</span>
            <span class="details">Restez en contact sur les réseaux, appelez-nous ou envoyez-nous un message</span>
          </div>
        </div>
      </div>
    </section>
    <aside>
    <div class="fb-page" data-href="https://www.facebook.com/marmayevenements/" data-tabs="timeline" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/marmayevenements/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/marmayevenements/">Marmay Evenements</a></blockquote></div>
      <div class="aside--news">
      <h1>Nouveautés</h1>
      <div>
        <h5>Photoselfie</h5>
      </div>
      </div>
    </aside>
    <section class="blog" id="blog">
      <h2>PACK PROMO</h2>
      <div class="news">
        <div class="prev">
          <img class="zoomable" src="/me/src/forfait250.jpg" style="border-radius: 10px; border: 5px solid #FFCB00; max-height: 500px" />
        </div>      
      <h2>Nouveautés</h2>
      <div class="news">
        <div class="prev">
          <img class="zoomable" src="/me/src/photoselfie.jpg" style="border-radius: 10px; border: 5px solid #FFCB00; max-height: 500px" />
        </div>
        <div class="content">
          <h3>Photoselfie</h3>
          <p>Faites vos plus beaux sourires (ou vos plus belles grimaces) et imprimez-les sur un papier étanche de 10cm sur 15cm, et en plus, le tirage est illimité !<br/>
          </p>
          <p><a href="/me/presta/photoselfie">Cliquer pour voir plus</a></p>
        </div>
      </div>
      <div class="news">
        <div class="prev">
          <img src="/me/src/aqua_ban.jpg" style="border-radius: 10px; border: 5px solid #00bfff;" />
        </div>
        <div class="content">
          <h3>La nouvelle structure aquatique</h3>
          <p>C'est l'été, rafraîchissez-vous avec la structure aquatique de Marmay Evenements !<br/>
          </p>
          <p><a href="/me/presta/structures">Cliquer pour découvrir les prix</a></p>
        </div>
      </div>
      <div class="news">
        <div class="prev">
          <img src="/me/src/logo.png" alt="" />
        </div>
        <div class="content">
          <h3>Nouvelle apparence !</h3>
          <p>Marmay Evenements prend une nouvelle apparence : un nouveau logo, un nouveau site, de nouvelles prestations. <br/>
            Marmay Evenements grandit et se modernise, ce nouveau décor vous permet donc de nous identifier plus facilement.
            A part cette apparence rien ne change, un même numéro : 0692 11 29 49.
          </p>
        </div>
      </div>
    </section>
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
        <td class="fb" onclick="window.open('https://www.facebook.com/marmayevenements/')" style="cursor: pointer">Facebook</td>
          <td>
            <a href="https://www.facebook.com/marmayevenements/" target="_blank">Marmay Evenements</a>
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
    <footer>
      <?php require_once('../src/footer.php'); ?>
    </footer>
  </body>
</html>

<!DOCTYPE html>
<html lang="fr">
<head>
    <?php require_once(__DIR__."/../../snippets/head.php") ?>
    <link rel="stylesheet" href="/alonfe/css/event.css">
    <title>Le five - Alon Fé</title>
</head>
<body>
    <input type="hidden" id="load-type" value="lock">
    <?php require_once(__DIR__."/../../snippets/header.php"); ?>
    <section class="loadlock" >
        <div class="loadlock--bg no_opacity loader_ready_show anim_background" data-diviseur="-7" style="background-image: url('/alonfe/src/accueil/five.jpg');"></div>
        <h2 data-subtitle="Tous les lundis">Le Rouge</h2>
        <div class="label transX loader_percent blink">0%</div>
        <img src="/alonfe/src/common/scroll.svg" class="loadlock--scroll transX no_opacity loader_ready_show">
    </section>
    <section class="pad_def">
        <p>Depuis plus d'un an, <br/>Alon Fé vous retrouve au <span class="color_blue">Five</span> tous les jeudis pour ses cours et sa soirée !</p>
    </section>
    <section>
        <h3 class="double--h3">
            Au programme
        </h3>
        <div class="programme" id="test">
            <div class="programme--line">
                <div class="programme--left float_left">
                    <h4>19h30</h4>
                    <h5>5€</h5>
                </div>
                <div class="programme--right float_left">
                    <h4>Initiation</h4>
                    <p>Découvrez des variantes concoctées par Alon Fé (et à utiliser en soirées sans modération)</p>
                </div>
            </div>
            <div class="programme--line">
                <div class="programme--left float_left">
                    <h4>20h30</h4>
                    <h5>Abonnement</h5>
                </div>
                <div class="programme--right float_left">
                    <h4>Cours niv.2</h4>
                    <p>Continuez votre progession en Kizomba (niveau 2 uniquement)</p>
                </div>
            </div>
            <div class="programme--line">
                <div class="programme--left float_left">
                    <h4>22h00</h4>
                    <h5></h5>
                </div>
                <div class="programme--right float_left">
                    <h4>Kiz & Dance</h4>
                    <p>Profitez de la Kizomba en soirée</p>
                </div>
            </div>
            <div class="programme--line programme--small">
                <div class="programme--left float_left">
                    <h4>1h00</h4>
                </div>
                <div class="programme--right float_left">
                    <h4>Fin de la soirée</h4>
                </div>
            </div>
        </div>
    </section>
    <section class="section--renseignements">
        <h3 class="double--h3">Renseignements</h3>
        <div class="infos">
            <h6>Lieu de rendez-vous:</h6>
            <h3>Le Rouge</h3>
            <h4>23 Rue Francois Isautier, 97410, Saint-Pierre</h4>
        </div>
        <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14865.007270961307!2d55.4727702!3d-21.3405603!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xba93c3c5c23c8e4e!2sRouge!5e0!3m2!1sfr!2s!4v1534099758468" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
    </section>
    <section class="section--contact">
        <h3 class="double--h3">Contact</h3><br/>
        <div class="tac">
            <h6>0692 11 22 33</h6> <br/>
            <h6>contactalonfe@gmail.com</h6><br/>
            <p>Voir plus sur la page <a href="#">Contact</a></p>
        </div>
        
    </section>
    <section class="section--seemore pad_def">
        <h3 class="double--h3 ">Voir aussi</h3>
        <div class="tac">
            <a href="#">Cours au Lavoir</a>
            <a href="#">Cours au Rouge Bar</a>
            <a href="#">Soirées 100% Filles</a>
        </div>
    </section>
    <?php require_once(__DIR__."/../../snippets/footer.php") ?>
</body>
</html>
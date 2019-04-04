<!DOCTYPE html>
<html>
<head>
   <?php
        require_once(__DIR__."/../snippets/head.php")
   ?>
</head>
<body>
    <input type="hidden" id="load-type" value="none">
    <div class="loadbox">
        <progress-bar type="page" class="page-loading-bar" loadClass="page-loader" percentage="0"/>
    </div>
    <?php require_once(__DIR__."/../snippets/header.php"); ?>
    <section class="intro anim_background nextToHeader">
        <div>
            <h1>Fred et Claudine</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vestibulum elementum enim ut porta. Quisque cursus turpis odio, a convallis nisl convallis quis. Proin hendrerit, dui a tempus feugiat, ante urna dictum turpis, sit amet ultrices nunc nulla tempus mauris. Fusce euismod euismod lacus a pulvinar. Maecenas gravida fringilla tortor. Maecenas at diam eu nulla vestibulum aliquam. Duis quam eros, volutpat et orci at, suscipit rhoncus ipsum.
            </p>
        </div>
        </section>
    
    <section class="section--event pad--section">
        <h3 class="sided--h3 anim_develop_width">Evenements et cours</h3>
        <div class="event--container">
            <a href="/alonfe/events/five">
                <div class="event" style="background-image: url('/alonfe/src/accueil/five.jpg');">
                    <div class="title">
                        <h2>Le five</h2>
                        <h4>Tous les jeudis</h4>
                    </div>
                    <div class="description">
                        <p>
                        Au programme :
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Cours débutant à 20h
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Initiation à 21h
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - La soirée à 22h
                        </p>
                    </div>
                </div>
            </a>
        </div>
        <div class="event--container" >
            <a href="/alonfe/events/rouge">
                <div class="event" style="background-image: url('/alonfe/src/accueil/event2.jpg'); background-position: 50% 40%;">
                    <div class="title">
                        <h2 class="">Le Rouge Bar</h2>
                        <h4 class="">Tous les lundis</h4>
                    </div>
                    <div class="description">
                        <p>
                        Au programme :
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Initiation à 19h30 (5€)
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Cours niv.2 à 20h30
                        <br/> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; - Soirée Kiz&Dance
                        </p>
                    </div>
                </div>
            </a>
        </div>
            <div class="event--more">
            <img src="/alonfe/src/common/circledots.png" alt="">
            <h6>Voir tous les événements</h6>
        </div>
    </section>
    <section class="section--contact">
        <h3 class="sided--h3 left--sided yellow--h3 anim_develop_width" style="margin-bottom: 50px">Contact</h3>
        <div class="contact--card">
            <img src="/alonfe/src/accueil/contact_illustr.png" class="contact-illustr" style="filter: brightness(130%)">
            <div class="contact-description">
                <h5 class="label--h5">Téléphone</h5>
                <h5 class="value--h5">0693 <span class="color_blue">83 17 43</span></h5>
                <h5 class="label--h5" style="margin-top: 20px;">Email</h5>
                <h5 class="value--h5"><span class="color_blue">contactalonfe</span>@gmail.com</h5>
                <h5 class="label--h5" style="margin-top: 20px;">Facebook</h5>
                <h5 class="value--h5">facebook.com/<span class="color_blue">AlonFé</span> </h5>
            </div>
        </div>
    </section>
    <?php
        require_once(__DIR__."/../snippets/footer.php")
   ?>
</body>
</html>
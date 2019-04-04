class ConstantsDictionary{
  /*
  PATH
  VERSION?
  */
  constructor(obj){
    this.path = obj.path
    this.desiredVersion = this.version
    this.realVersion = null;

    // BOOLEANS
    this.loaded = false;
    this.compatible = false;

    this.values = {}

    var el = this;

    this.request = $.getJSON(this.path);
    this.request.success(function (response, code, request) {
      el.requestSuccess({
        response, code, request,
        obj: el
      });
    });
    this.request.error(this.requestError);
  }

  requestSuccess(args){
    args.obj.values = args.response;
  }

  requestError(response, code){
    alert("ERREUR v1-1 : Dictionnaire des constantes non trouvée.");
    document.write(`
      <h1>Erreur <code>v1-1</code></h1>
      <h2>Impossible de démarrer le jeu.</h2>
      <h4>Code : v1-1</h4>
      <h4>Version : 2</h4>
      <h4>ErrorID : 1</h4>
      <h4>Details : Dictionnaires des constantes introuvée.</h4>
      <p>
      Le jeu n'a pas trouvé le dictionnaire des constantes. <br/>
      Ce dictionnaire comporte tous les noms de tous les fichiers essentiels au jeu, sans celui-ci le jeu ne peut donc pas démarré.
      </p>
      <h3>Suggestions :</h3>
      <p>Fermer le jeu et redémarrer ou faites un copier-coller de ce texte dans un forum d'aide en ligne.</p>
      `);
  }
}


class Music{
  /*
  ID
  NAME

  optionnal:
  CHANNEL
  AUTOPLAY
  LOOP
  */

  constructor(obj){
    var thi$ = this
    this.id = obj.id

    this.name = obj.name
    this.path = _SI.baseDir_music + "/" + this.name
    this.channel = obj.channel || "music"

    this.html = $(`<audio src="${this.path}" class="${this.channel}"></audio>`)
    var html = this.html;

    this.volume = typeof obj.volume === "number" ? obj.volume : 100;
    /// !!!!
    this.volume = 0;
    this.autoPlay = obj.autoPlay || false
    this.loop = obj.loop || false
    this.autoReset = obj.autoReset || true
    this.maxTime = obj.maxTime || false;

    $(html).attr({
      src: this.path,
      channel: this.channel,
      autoPlay: this.autoPlay,
      loop: this.loop
    });

    //_Game.musics[this.id] = this;

    if(this.autoReset){
      $(html).on("ended", function () {
        $(html).prop("currentTime",0);
      })
    }

    if(typeof this.maxTime === "number"){
      setInterval(function () {
        if(thi$.prop("currentTime")>=thi$.maxTime){
          thi$.whenMax();
        }
      }, 1);
    }

    $(document).ready(function() {
      $(".zikCont").append(html);
    });

  }
  play(){
    $(this.html).trigger("play");
  }
  pause(){
    $(this.html).trigger("pause");
  }
  stop(){
    $(this.html).trigger("pause");
    $(this.html).prop("currentTime", 0);
  }
  restart(){
    $(this.html).trigger("pause");
    $(this.html).prop("currentTime", 0);
    $(this.html).trigger("play");
  }
  whenMax(){
    if(this.loop) this.restart()
    else this.stop();
  }

  trigger(action){
    $(this.html).trigger(action);
  }
  prop(name){
    return $(this.html).prop(name);
  }
  setProp(name, val){
    $(this.html).prop(name, val);
  }

  set volume(vol){
    // !! VOL goes from 0 to 100 !!
    $(this.html).prop("volume", vol/100);
  }
  get volume(){
    // !! VOL goes from 0 to 100 !!
    return $(this.html).prop("volume") * 100;
  }
  fadeVolume(_vol){
    var thi$ = this;

    this.volumeInterval = setInterval(function () {
      try {
        if (thi$.volume > _vol) thi$.volume--;
        else if ( thi$.volume > _vol) thi$.volume++;
        else if (thi$.volume == _vol || thi$.volume >= 100 || thi$.volume <= 0) clearInterval(thi$.volumeInterval);
      } catch (e) {
        clearInterval(thi$.volumeInterval);
        thi$.volume = _vol;
      }
    }, 50);
  }
}


class Settings{
  /*
  PATH
  */
  // TODO: RETURN PROMISE
  constructor(obj){
    //this.path = obj.path
    this.desiredVersion = this.version
    this.realVersion = null;

    // BOOLEANS
    this.loaded = false;
    this.compatible = false;

    var el = this;
    var nib = $.getJSON(_SI.baseDir+"/.settings/pref.nib");


    nib.success(function (response, code, request) {
      el.parsePref({response, code, request, self: el});
    });
  }

  requestError(obj){

  }

  parsePref(obj){
  console.log(obj);
  }
}

class Dialog{
  constructor(obj){
    var thi$ = this;

    this.id = obj.id || "dialog";
    this.title = obj.title;
    this.text = obj.text;
    this.classe = obj.classe || "";
    this.button = obj.button || "Boum!";
    this.html = $("<dialog></dialog>");
    this.showNow = obj.showNow;
    this.onClose = obj.onclose || this.close;

    this.showing = false;

    if(this.colors != undefined){
      this.colors.foreground = obj.colors.foreground  || "";
      this.colors.background = obj.colors.background  || "";
      this.colors.center = obj.colors.center  || "";
    }

    if(this.showNow == true) this.show();

    var dialog = this.html;
    $("div.abs").append(dialog);
    $(dialog).addClass(this.classe);
    $(dialog).append(`<h4>${this.title}</h4>`)
      .append(`<p>${this.text}</p>`);
    var button = $(`<button class="interactive"><span>${this.button}</span></button>`);
    $(dialog).append(button);

    $(button).click(function () {
      thi$.close();
    });
  }
  show(){
    _Game.popups[this.id] = this;
    var thi$ = this;
    var container = $("div.abs");

    $(container).css("display", "block");
    setTimeout(function () {
      $(container).css("opacity", "1");
      $(thi$.html).addClass("appear");
      this.showing = true;
    }, 10);
  }

  close(){
    delete _Game.popups[this.id];
    var thi$ = this;
    var container = $("div.abs");

    $(container).css("opacity", "0");
    $(thi$.html).removeClass("appear");

    setTimeout(function () {
      $(container).css("display", "none");
      this.showing = false;
    }, 1000);
  }
}

class StatsMenu{
  constructor(obj){
    var thi$ = this;

    this.id = obj.id || "stats";
    this.title = obj.title || "Stats";
    this.text = obj.text || "Votre partie";
    this.classe = obj.classe || "";
    this.html = $(`<div class="statsMenu"></div>`);
    this.showNow = obj.showNow;
    this.buttons = obj.buttons;
    this.stats = obj.stats;

    this.showing = false;

    if(this.showNow == true) this.show();

    var menu = this.html;
    $("div.abs").append(menu);
    $(menu).addClass(this.classe);
    $(menu).append(`<h2>${this.title}</h2>`)
      .append(`<h3>${this.text}</h3>`);

    var table = $(`<table></table>`);
    var key = null;
    for(key in this.stats){
      $(table).append(`<tr><td>${key}</td><td>${this.stats[key]}</td></tr>`);
    }

    $(menu).append(table);

    if(typeof this.buttons != "object"){
      this.buttons = [{
        text: "Recommencer",
        click: function () {
          window.location.reload()
        }
      },{
        text: "Fermer",
        click: function () {
          thi$.close();
        }
      }]
    }

    $(this.buttons).each(function (ix, val) {
      var btn = $(`<button class="${val.classe || ""} interactive"><span>${val.text}</span></button>`);
      $(btn).click(val.click);
      $(menu).append(btn);
    });
  }
  show(){
    _Game.popups[this.id] = this;

    var thi$ = this;
    var container = $("div.abs");

    $(container).css("display", "block");
    setTimeout(function () {
      $(container).css("opacity", "1");
      $(thi$.html).addClass("appear");
      this.showing = true;
    }, 10);
  }

  close(){
    delete _Game.popups[this.id];
    var thi$ = this;
    var container = $("div.abs");

    $(container).css("opacity", "0");
    $(thi$.html).removeClass("appear");

    setTimeout(function () {
      $(container).css("display", "none");
      this.showing = false;
    }, 1000);
  }
}

class Chrono{
  constructor(obj){
    this.id = obj.id;
    this.autoStart = obj.autoStart || false;
    this.rolling = false;

    _Game.chronos[this.id] = this;

    this.finalTime = 0;
    this.timeStamps = [];
    /*
      [[1223, 1230], [1250, 1254]]
    */

    if(this.autoStart) this.start()
  }
  start(){
    if(this.rolling) return false;
    this.rolling = true;

    var lastIx = this.timeStamps.length;
    var now = new Date();
    this.timeStamps.push([now, -1]);

    return true;
  }
  pause(){
    if(!this.rolling) return false;
    this.rolling = false;

    var lastIx = this.timeStamps.length;
    var now = new Date();

    this.timeStamps[lastIx-1][1] = now;

    return true;
  }
  stop(){
    this.pause();

    var thi$ = this;
    var array = this.timeStamps;

    $(array).each(function (ix, val) {
      console.log(`${val[1]} - ${val[0]} = ${val[1] - val[0]}`);
      thi$.finalTime += val[1] - val[0]
    })

    return this.finalTime;
  }
}

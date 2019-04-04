$(document).ready(function() {

  pro = true;
  displaying = {};

  var portugais = "Teus sinais	Me confundem da cabeça aos pés 	Mas por dentro eu te devoro Teu olhar 	Não me diz exato quem tu és 	Mesmo assim eu te devoro Te devoraria a qualquer preço 	Porque te ignoro ou te conheço Quando chove ou quando faz frio	Noutro plano	Te devoraria tal Caetano A Leonardo DiCaprio É um milagre	Tudo que Deus criou	Pensando em você	Fez a via-láctea	Fez os dinossauros";

  var nwc = "(?:\\\\b|\\\\W)"; // Non-Word Character
  holding = false; // TRUE si un autre fonction attend une confirmation
  // <HOLDING> est global

  /*  !!!
  La fonction EVAL(arg) oblige de mettre 4 Slashs
  pour au final n'en voir qu'un seul
  */

  var prep_array = ["de", "du", "de la"];
  var preps_array = ["de", "du", "de la", "des"];
  var det_array = ["les", "la", "un", "une", "le", "des"];
  var pos_array = ["mon","ma","ton","ta","son","sa","notre","votre","leur"];
  var links = ["papa","maman","pere","mere","mamie","meme","grand-mere","grand-pere","frere","soeur"];

  var toChange = {
    prep: prep_array,
    preps: preps_array,
    det: det_array,
    pos: pos_array,
    links: links
  };

  for (var key in toChange) {
    if (toChange.hasOwnProperty(key)) {
      var toEval = (key+" = `(?: ?(");

      for (var i = 0; i < toChange[key].length; i++) {
        var char = toChange[key][i];

        if(i>=0&&i<toChange[key].length-1){
          toEval += char+`|`;
          console.log(toEval);
        }else{
          if(key==`det`){
            toEval += char+`|`+"l'))`";
            console.info(toEval);
          }else{
            toEval += char+"))`";
          }
        }

      }

      eval(toEval);
    }
  }

  acc = "(?:é|è|ê|î|à|â)";
  accE = "(?:é|è|ê)";
  accI = "(?:î)";
  accA = "(?:à|â)";

  data = changeData("get");

  console.log(data);

  dataReplace = {
    prenom: "prénom"
  };

  countdowns = [];

  var lang = {
    "Chinois": {
      text: "你好我的名字是Bertha而我是仅仅计算机",
      lang: "zh-ZH"
    },
    "(Anglais|English)": {
      text: "Hello, it's me…",
      lang: "en-GB"
    },
    "(Espagnol|Español)": {
      text: "¡Hola¡, ¿Sabes dónde está el baño, por favor?",
      lang: "es-ES",
      voice: "Jorge"
    },
    "(Italien|Italiano)": {
      text: "Ciao, se vogli mangiare spaghetti, possi chiamarmi. Faccio i \
      migliori spaghetti del mondo e tutti cuanti",
      lang: "it-IT"
    },
    "(Allemand|Deutsch)": {
      text: "Guttentag, Guten Tag, mein Name ist Bertha",
      lang: "de-DE"
    },
    "(Portugais|Portugues)": {
      text: portugais,
      lang: "pt-PT"
    }
  }

  tmpExpr = {
    "(?:.+)*Je m'app?ell?es? (.+)": function(reg, txt){
      var tmp = txt.match(reg);
      if(deChar(tmp[1])=="bertha"){
        return "C'est un beau prénom, dommage pour toi que tu ne t'appelles pas ainsi.";
      }
      data.user.prenom = tmp[1];

      changeData("set");

      if(!data.hasOwnProperty(deChar(tmp[1]))){
        return "Ravie de te rencontrer "+data.user.prenom+" ! Moi, c'est Bertha";
      }else{
        return "Contente de te revoir "+data.user.prenom+" !";
      }

    }
    ,"(Bonjour|Bonsoir)": function (reg, txt) {
      if(data.user.prenom==undefined || data.user.prenom==""){
        var reps = [txt+", comment t'appelles-tu ?", "Salut, quel est ton prénom ?", txt+", Bertha, toi c'est quoi ton prénom ?",
        "Qui est là ? Quel est ton prénom ?", "Comment t'appelles-tu ?"];
        var ran = Math.floor(Math.random()*reps.length);

        return reps[ran];
      }else{
        var name = data.user.prenom;
        changeData("set");
        var reps = [txt+" "+name+" !", "Encore "+txt+" ?", "C'est toujours "+name+" ?", "Bonjour, bonsoir, combien de fois vas-tu me le répéter "+name+" ?",
        "Sur le calendrier Bertha, on n'est toujours le même jour. C'est pas le cas sur le calendrier "+name+" apparemment…"];
        var ran = Math.floor(Math.random()*reps.length);
        // ran = reps.length-1;

        return reps[ran];
      }
    }
    ,"(Au revoir|Bye|[àa] la prochaine)": function () {

      setTimeout(function () {
        var n = 21;
        $("body *").fadeOut(1500);
        $("div.info").css("top", "60%");
        setInterval(function () {
          var e = (n-1);
          e = e<10?"0"+e:e.toString();
          if(n>0){
            n--;
          }
          console.log(e);
          $("body, html").css("background", "#"+e+e+e);
        }, 30);
      }, 6000);

      var reps = ["Au revoir…", "A la prochaine…", "Bye…", "Ciao…", "See you…", "GoodBye…",
      "Déjà ?", "Mode dodo activé…", "Hé, tu m'oublies ?", "Et moi ?", "Tchouss…", "Bonne nuit…",
      "Bertha te souhaite un Joyeux Noël…", "¡Hasta la vista!", "Tu vas aux toilettes ?",
      "Je ne comprendrais jamais les humains…", "Ce fut fort intéressant…", "C'est tout, pour le moment…",
      "Toujours Ber, toujours Ta, toujours Bertha !", "Ce n'est qu'un au revoir, j'espère…"];
      display({type: "strict", content: "<h1>😉😘😴</h1>"});
      $("div.info").css("font-size", "600%");
      $("textarea").prop("disabled", true);
      var ran = Math.floor(Math.random()*reps.length);
      // ran = reps.length-1;
      return reps[ran];
    }
    ,"Hello": "¡Hola!", "Ciao": "Ciao amico !", "Hola": "¡Buenos!"
    ,"((Comment )?((?:ç|c)a va)|(vas-tu)|(est(-| )ce que tu vas bien))": function(reg, txt){
      var reps = ["Je me demande si c'est une blague", "Oui et toi ?",
      "Comme un ordinateur…", "…", "J'ai attrapé le virus de la grippe", "Ça ne me fait pas rire !",
      "J'avoue que j'ai un peu mal au pied gauche mais sinon ça va.", "Très drôle",
      "“Bam quoi !”", "Dommage que je ne puisse pas rire."];

      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    }
    ,"[Dd]it (.+)": "$1", "(Tu as? quel [aâ]ge|Quel [aâ]ge as?(-| )tu)": function (reg,txt) {
      var reps = ["C'est un secret", "Je ne te le dirai pas", "L'âge ne compte pas quand on aime", "Ça dépend comment on compte",
      "Je vais faire comme si je n'ai pas compris", "Un, deux, trois, tu ne le sauras pas", "L'âge ne compte pas quand on aime"];
      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    }
    ,"Est?( |-)tu (une fille|un garçon)(?: ou (une fille|un garçon))?": "Ça s'entend, non ?"
    ,"Quel(?:le)?s? (est|sont) (.+)#prep(.+)": function(reg, txt){
      reg = new RegExp(reg.source, "i");

      var CARACT = 2
      var PERS = CARACT+2;

      var tmp = txt.match(reg);

      var caract = deChar(tmp[CARACT]);
      var _caract = undet(tmp[CARACT]);

      var pers = deChar(tmp[PERS]);
      pers = dePronom(pers);
      var _pers = undet(tmp[PERS]);
      console.log("pers = "+pers);

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          reponse = data[pers][caract];
          reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg, txt, reponse)
        }else if(pers=="user"){
          reponse = "Je ne sais pas, tu vas me le dire.";
        }else{
          reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg,txt,false, {pers: _pers, caract: _caract, typeError: "caract"});
        }
      }else{
        reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg,txt,false, {pers: _pers, caract: _caract, typeError: "pers"});
      }

      return reponse;
    }
    ,"Quel(?:le)?s? (est|sont) #pos (.+)": function(reg, txt){
      reg = new RegExp("Quel(?:le)?s? (est|sont) (.+)"+prep+"(.+)", "i");
      var reg2 = new RegExp("Quel(?:le)?s? (est|sont) "+pos+" (.+)", "i");

      var CARACT = 3;
      var PERS = CARACT-1;

      var tmp = txt.match(reg2);
      tmp = dePronom(tmp[0]);

      tmp = tmp.match(reg);

      CARACT = 2;
      PERS = CARACT+2;

      var caract = deChar(tmp[CARACT]);
      var _caract = undet(tmp[CARACT]);

      var pers = deChar(tmp[PERS]);
      pers = dePronom(pers);

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          reponse = data[pers][caract];
          reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg,  tmp[0], reponse)
        }else if(pers=="user"){
          reponse = "Je ne sais pas, tu vas sûrement me le dire";
        }else{
          reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg, tmp[0],false, {pers: pers, caract: _caract, typeError: "caract"});
        }
      }else{
        reponse = sentence({noyau: CARACT, liaison: tmp[CARACT+1] ,carac: CARACT, verbe: 1, pers: PERS}, "perso",reg, tmp[0],false, {pers: pers, caract: _caract, typeError: "pers"});
      }

      return reponse;
    }
    ,"(Comment (est(?:-| )ce que )?((je m|tu t)' ?app?ell?es?|(t|m)' ?ap?pel?les?(-| )?tu))": function(reg, txt){
      if(/je/im.test(txt)){
        pers = "user";
      }else if(/tu/im.test(txt)){
        pers = "moi";
      }else{
        console.error("#KILLIAN pers = user ? moi ?", reg, txt);
        return "Je n'ai pas compris."
      }

      var caract = "prenom";

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(pers=="user"){
          reponse = "Tu t'appelles "+data[pers][caract];
        }else if(pers=="moi"){
          reponse = "Je m'appelle "+data[pers][caract];
        }else{
          console.error("#KILLIAN <pers> n'est pas égal à moi ni user mais à "+pers, reg, txt);
          reponse = "Une erreur vient de survenir !"
        }
      }else{
        console.error("#KILLIAN <DATA> n'a pas la propriété : "+pers, reg, txt);
        reponse = "Une erreur vient de survenir !"
      }

      return reponse;
    }
    ,"Quel(?:le)? (?:â|a)ge (est(?:-| )ce que )?(j'ai(s|e|t)?|tu as?)": function(reg, txt){
      if(/j'/im.test(txt)){
        if(data.user.prenom==undefined){
          return "Je ne sais même pas comment tu t'appelles";
        }else{
          pers = deChar(data.user.prenom);
          console.log(pers);
        }
      }else if(/tu/im.test(txt)){
        return "La, la, la, la"
      }else{
        console.error("#KILLIAN pers = user ? moi ?", reg, txt);
        return "Je n'ai pas compris."
      }

      var caract = "age";

      var reponse;

      if(data.hasOwnProperty(pers)){
        reponse = "Tu as "+data[pers].age+" ans";
      }else{
        console.error("#KILLIAN <DATA> n'a pas la propriété : "+pers, reg, txt);
        reponse = "Une erreur vient de survenir !"
      }

      return reponse;
    }
    ,"(.+)(?: |')ai? (\\d+) ?ans?": function (reg, txt) {
      var _pers = txt.match(reg)[1];
      var _val = txt.match(reg)[2];

      console.log(_pers);
      if( /j/i.test(_pers) ){
        _pers = data.user.prenom;
      }

      var pers = deChar(_pers);
      var val = deChar(_val);

      var caract = "age";

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          if(deChar(data[pers][caract])==val){
            reponse = "Je le savais déjà ! ";
          }else{
            reponse = "Je croyais que "+_pers+" avait "+data[pers][caract]+" ans. Es-tu sûr de ce que tu dis ?";
            data[pers][caract] = _val;
            holding = {
              func: "setPerso",
              args: {
                reg: reg, txt: txt, caract: caract, pers: _pers, val: _val
              }
            };
            changeData("set");
          }
        }else{
          data[pers][caract] = _val;
          changeData("set");
          reponse = "Je ne savais que "+_pers+" avait "+_val+"ans, pourtant je le connais.";
        }
      }else{
        data[pers] = {};
        data[pers][caract] = _val;
        changeData("set");
        reponse = _val+"ans… OK, je retiens que c'est l'âge de "+_pers;
      }

      return reponse;

    }
    ,"(?:Quel(?:le)? [âa]ge (?:(.+) a|a (.+))|(.+) a quel(?:le)? [âa]ge)": function(reg, txt){
      console.log("Age");
      var pers;
      var _pers;

      if(reg.test(txt)){
        pers = txt.match(reg);
        pers = pers[1]||pers[2]||pers[3];
        _pers = data.user.prenom;
        pers = deChar(pers);

      }else{
        console.error("#KILLIAN pers = user ? moi ?", reg, txt);
        return "Je n'ai pas compris."
      }

      var caract = "age";

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          reponse = _pers+" a "+data[pers].age+" ans.";
        }else{
          reponse = "Je ne connais pas assez "+_pers+" pour te le dire.";
        }
      }else{
        reponse = "Je ne connais même pas "+_pers+".";
      }

      return reponse;
    }
    ,"#det *(.+)#prep(.+) (est|sont) (.+)": function (reg, txt) {
      return "A";
      reg = new RegExp(det+"(.+)"+prep+"(.+) est (.+)", "i");
      var CARACT = 2;
      var PERS = CARACT+2;
      var VAL = PERS+1;;

      var tmp = txt.match(reg);

      var caract = deChar(tmp[CARACT]);
      var _caract = undet(tmp[CARACT]);

      var pers = deChar(tmp[PERS]);
      _pers = undet(pers);

      var val = deChar(tmp[VAL]);
      _val = undet(val);

      var det1 = pronom({det: "poss", mod: "s"}, genre(tmp[1]));

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          if(deChar(data[pers][caract])==val){
            reponse = "Je le savais déjà ! ";
          }else{
            det1 = pronom({det: "article", info: "defini"}, genre(tmp[1]));
            reponse = "Je croyais que "+det1+" "+_caract+" de "+_pers+" était "+data[pers][caract]+". Es-tu sûr de ce que tu dis ?";
            data[pers][caract] = _val;
            holding = {
              func: "setPerso",
              args: {
                reg: reg, txt: txt, caract: _caract, pers: _pers, val: _val
              }
            };
          }
        }else{
          data[pers][caract] = _val;
          reponse = "Je connaissais "+_pers+" mais je ne savais pas que "+det1+" "+_caract+" était "+_val;
        }
      }else{
        data[pers] = {};
        data[pers][caract] = _val;
        reponse = "Je ne connaissais pas "+_pers+" mais maintenant je sais que "+det1+" "+_caract+" est "+_val;
      }

      return reponse;
    }
    ,"(?: ?(les|la|un|une|le|des|l')) *(\w+)(?: ?(de|du|de la)) (\w+) s'appelle(?:nt)? (\w+)": function (reg, txt) {
      return "hi";
      /*reg = new RegExp(det+"(.+)"+prep+"(.+) est (.+)", "i");
      var CARACT = 2;
      var PERS = CARACT+2;
      var VAL = PERS+1;;

      var tmp = txt.match(reg);

      var caract = deChar(tmp[CARACT]);
      var _caract = undet(tmp[CARACT]);

      var pers = deChar(tmp[PERS]);
      _pers = undet(pers);

      var val = deChar(tmp[VAL]);
      _val = undet(val);

      var det1 = pronom({det: "poss", mod: "s"}, genre(tmp[1]));

      var reponse;

      if(data.hasOwnProperty(pers)){
        if(data[pers].hasOwnProperty(caract)){
          if(deChar(data[pers][caract])==val){
            reponse = "Je le savais déjà ! ";
          }else{
            det1 = pronom({det: "article", info: "defini"}, genre(tmp[1]));
            reponse = "Je croyais que "+det1+" "+_caract+" de "+_pers+" était "+data[pers][caract]+". Es-tu sûr de ce que tu dis ?";
            data[pers][caract] = _val;
            holding = {
              func: "setPerso",
              args: {
                reg: reg, txt: txt, caract: _caract, pers: _pers, val: _val
              }
            };
          }
        }else{
          data[pers][caract] = _val;
          reponse = "Je connaissais "+_pers+" mais je ne savais pas que "+det1+" "+_caract+" était "+_val;
        }
      }else{
        data[pers] = {};
        data[pers][caract] = _val;
        reponse = "Je ne connaissais pas "+_pers+" mais maintenant je sais que "+det1+" "+_caract+" est "+_val;
      }

      return reponse;*/
    }
    ,"Qui est?(-| )tu": function(reg, txt) {
      var reps = ["“Etre ou ne pas être, telle est la question”", "Moi ?", "Moi, c'est Bertha", "Toi, qui es-tu ?",
      "Quoi, qui, comment, où suis-je ?", "Je suis tout et n'importe quoi.", "Qui est-il, qui est-elle, qui somme-nous, qui êtes-vous, qui sont-ils, qui sont-elles?",
      "J'ai encore du mal à assumer ma personnalité…", "Tu m'acceptes comme je suis.", "Je suis qui je suis.", "Je suis qui je suis. Et toi, es-tu qui tu es?",
      "Bertha 2.0", "Qui, ou quoi ?", "A vrai dire, mwin c'est un boite plastique assemblé", "Pff… Tu sais bien…", "Pff…", "Ça ne sert à rien de me draguer"];
      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    }
    ,"(Chante|(.*)Beat ?box)": function () {
      var reps = ["Pff pff pff, Pff, pff pff, lalalalala, lala, la pff… Pas mal mon Beat Box, non ?", "9.7.4 représente",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ…", "Zzz, Zz", "alalala, alalalalala, alala, la, la"];
      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    }
    ,"Qui est? (.+)": function (reg, txt) {
      var PERS = 1;

      var tmp = txt.match(reg);

      var pers = deChar(tmp[PERS]);
      _pers = undet(pers);

      var det1 = pronom({det: "poss", mod: "s"}, genre(tmp[1]));

      var reponse;

      if(data.hasOwnProperty(pers)){
        reponse = "Voici ce que je sais sur cette personne…";
        display({type: "card", pers: pers});
      }else{
        var reps = ["Je ne sais pas", "Quelqu'un", "Quelqu'un, sûrement", "Bonne question", "Peut-être quelqu'un ?", "C'est… quelqu'un…", "À vrai dire… Je ne sais pas"];
        var ran = Math.floor(Math.random()*reps.length);
        reponse = reps[ran];
      }

      return reponse;
    }
    ,"(Minuteur|Compte à rebours)": function (reg, txt) {
      var temps = 0;
      var mins = txt.match(/(\d+) ?minutes?/im)||0;
      var secs = txt.match(/(\d+) ?secondes?/im)||0;
      var secs = secs==0?(txt.match(/(\d+) ?minutes? (\d+)/im)||0):secs;

      mins = mins[1]||0;
      secs = secs[1]||0;

      mins = (+mins)*60;
      secs = +secs;

      temps = mins+secs;

      if(temps<1){
        holding = {
          func: "countdown",
          args: {
            reg: reg, txt: txt
          }
        };
        return "Pour combien de temps souhaites-tu programmer le minuteur ?";
      }else if(temps>30*60){ //30 Minutes
        return "C'est trop long, la durée maximale est de 30 minutes, j'ai donc tout annulé.";
      }

      console.log(secs);

      mins = mins>0?(mins/60)+" minute"+(mins/60>1?"s":"")+" ":"";
      var liaisonMinSec = mins==""?"":"et ";
      secs = secs>0?(liaisonMinSec+secs+" seconde"+(secs>1?"s":"")):"";

      setTimeout(function(){
        dirSay("Le compte à rebours de "+mins+secs+" est terminé !");
      }, temps*1000);

      countdowns.push(temps);
      display({type: "countdown", index: countdowns.length-1, up: false});

      return "Un minuteur de "+mins+secs+" vient de démarrer.";
    }
    ,"Chrono": function (reg, txt) {
      countdowns.push(0);
      display({type: "countdown", index: countdowns.length-1, up: true});

      var reps = ["Top chrono !", "C'est parti !", "L'heure tourne… Bonne chance !", "Plus le temps de parler…",
      "Go !", "Let's go !", "C'est bon. Tu va faire quoi ?", "Je m'en charge…", "Top à la vachette !"];
      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    },
    "heure": function () {
      d = new Date(Date.now());
      h = d.getHours();
      m = d.getMinutes();
      s = d.getSeconds();

      h = h==1?"une":h;
      m = m==1?"une":m;
      s = s==1?"une":s;

      h__s = h>1 ? "s" : "";
      m__s = m>1 ? "s" : "";
      s__s = s>1 ? "s" : "";

      return (`Il est ${h} heure${h__s}, ${m} minute${m__s} et ${s} seconde${s__s}`);
    }, "Je t'aime" : "pas moi",
    "(.*)(marions-nous|me marier avec toi)(.*)" : "Je te rappelle que je ne t'aime pas",
    "Bertha ?([?|!])*$" : "Tu te calmes avec mon prénom",
    "C('|e n')est pas drôle" : "Tu as raison, c'est hilarant 😂🤣",
    "(.*)pas (.*| )dr[oô]le": function () {
      var reps = ["Tu l'es encore moins que moi", "Merci, toi aussi", "Tu t'es entendu ?", "Au moins, je suis intelligente moi !",
      "Espèce de 📍", "Toi, tu es drôle comme des intercalaires 🗂", "Je vois ton nez qui grandit 🤥",
      "Tant mieux ! Moi je ne ressemble pas à un clown contrairement à toi! 🤡",
      "Je crois que tu es malade, tu dois être atteint de jalousie aiguë"];
      var ran = Math.floor(Math.random()*reps.length);
      return reps[ran];
    },
    "Tu est? (dr[oô]le|rigolote|hilarante)": function () {
      var reps = ["Je sais !", "Je dirais même que je suis à mourir de rire.", "C'est un talent naturel.", "Tu as raison."];
      var ran = Math.floor(Math.random()*reps.length);
      ran = (reps.length-1);
      return reps[ran];
    },
    "Tu est? belle": function () {
      $("body").css("background", "rgba(255, 0, 0, 0.44)");
      setTimeout(function () {
        $("body").css("background", "");
      }, 3000);
      return "J'avoue que tu vas me faire rougir";
    },
  }

  exprCallbacks = {
    "setPerso": function(args){
      var newVal = deChar($("textarea").val()).toLowerCase();
      newVal = undet(newVal);
      var caract = deChar(args.caract);
      var pers = deChar(args.pers);

      console.log(newVal);

      if(/oui/im.test(newVal)){
        data[pers][caract] = args.val;
        dirSay("Ok ! Merci de m'aider !");
      }else{
        dirSay("Opération annulée");
      }

      holding = false;

      $("textarea").val("");
    },
    "countdown": function(args){
      var txt = $("textarea").val();
      var temps = 0;
      var mins = txt.match(/(\d+) ?minutes?/im)||0;
      var secs = txt.match(/(\d+) ?secondes?/im)||0;
      var secs = secs==0?(txt.match(/(\d+) ?minutes? (\d+)/im)||0):secs;
      var annuler = /Annuler/im.test(txt);

      if(annuler==true){
        dirSay("Ok, c'est oublié !");
        holding = false;
        return false;
      }

      mins = mins[1]||0;
      secs = secs[1]||0;

      mins = (+mins)*60;
      secs = +secs;

      temps = mins+secs;

      if(temps<1){
        holding = {
          func: "countdown",
          args: {
            reg: args.reg, txt: args.txt
          }
        };
        dirSay("Non, 0 seconde ce n'est pas assez, pour combien de temps je le programme?");

        return false;
      }else if(temps>30*60){ //30 Minutes
        dirSay("C'est trop long, la durée maximale est de 30 minutes, j'ai donc tout annulé.");

        holding = false;

        return false;
      }

      console.log(secs);

      mins = mins>0?(mins/60)+" minute"+(mins/60>1?"s":"")+" ":"";
      var liaisonMinSec = mins==""?"":"et ";
      secs = secs>0?(liaisonMinSec+secs+" seconde"+(secs>1?"s":"")):"";

      countdowns.push(temps);
      display({type: "countdown", index: countdowns.length-1, up: false});

      dirSay("Un minuteur de "+mins+secs+" vient de démarrer.");

      setTimeout(function(){
        dirSay("Le compte à rebours de "+mins+secs+" est terminé !");
      }, temps*1000);

      holding = false;

      $("textarea").val("");
    }
  };

  expr = {};

  for (var key in tmpExpr) {
    if (tmpExpr.hasOwnProperty(key)) {
      var tmp = key.replace("#prep", prep);
      tmp = tmp.replace("#preps", preps);
      tmp = tmp.replace("#pos", pos);
      tmp = tmp.replace("#det", det);

      expr[tmp] = tmpExpr[key];
    }
  }

  for (var key in lang) {
    if (lang.hasOwnProperty(key)) {
      eval('expr[key] = function(reg, txt){ dirSay("'+lang[key].text+'", {lang: \''+lang[key].lang+'\'}); return false; }');
    }
  }

  $("button").click(function () {
    speak();
  });
  $("textarea").keypress(function (e) {
    if(e.keyCode==13){
      speak();
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });

  setInterval(function () {
    if(pro==true){
      $("div.conv .bot").get()[0].scrollTop++;
    }else{
      $("div.conv").get()[0].scrollTop++;
    }

  }, 100);

  window.requestAnimationFrame(function () {
    setTimeout(function () {
      $("textarea").css("opacity", 1);
    }, 300);
  });

  changeData("get");
});

function display(arg){
  if(arg.type=="hide"){
    if(arg.info==displaying.info&&arg.pers==displaying.pers){
      $("div.info").css("top", "65%");
      $("div.info").css("opacity", "0");
      setTimeout(function () {
        $("div.info").html("");
      }, 1500);
    }else if(arg.info.index==displaying.index && arg.info.type==displaying.type){
      $("div.info").css("top", "65%");
      $("div.info").css("opacity", "0");
    }


    return true;
  }else{
    $("div.info").css("top", "65%");
    $("div.info").css("opacity", "0");
  }

  if(arg.type=="countdown"){
    displaying = {type: "countdown", index: arg.index};
    var time = countdowns[displaying.index];

    setTimeout(function () {
      $("div.info").html('<div class="countdown"><span></span><span></span></div>');

      $("div.info span:first-child").text(Math.floor(time/60));
      $("div.info span:last-child").text(Math.floor(time%60));
    }, 1000);

    var timeout = setInterval(function () {
      if(arg.up==true){
        time++;
      }else{
        time--;

        if(time==0){
          clearInterval(timeout);
          setTimeout(function() {
            display({type: "hide", info: {type: "countdown", index: arg.index}});
          }, 4500);
        }
      }

      if(displaying.type=="countdown" && displaying.index==arg.index){

        var mins = Math.floor(+time/60);
        mins = mins<10 ? "0"+mins : mins;

        var secs = Math.floor(+time%60);
        secs = secs<10 ? "0"+secs : secs;
        $("div.info span:first-child").text(mins);
        $("div.info span:last-child").text(secs);

      }

    }, 1000);
  }else if(arg.type=="card"){
    var pers = arg.pers;
    displaying = {info: "card", pers: pers};
    $("div.info").html('<div class="card"><img src="../Wippee/pages/avatar.png"/><h1>'+data[pers].prenom+'</h1></div>');
    $("div.info div.card").append("<table></table>");

    for (var key in data[pers]) {
      if (data[pers].hasOwnProperty(key)&&key!="prenom"&&key!="links") {
        $("div.info div.card table").append("<tr><td>"+key+"</td><td>"+data[pers][key]+"</td></tr>");
      }
    }

    setTimeout(function () {
      display({type: "hide", info: "card", pers: pers});
    }, 15000);
  }else if(arg.type=="strict"){
    $("div.info").html(arg.content);
  }

  var back = setTimeout(function () {
    $("div.info").css("top", "0%");
    $("div.info").css("opacity", "1");
  }, 2000);
}

function dirSay(txt, options){

  say = txt.toString().replace(/killian/gi, "kiliane");

  var utt = new SpeechSynthesisUtterance;

  utt.lang = "fr-FR";
  utt.text = say;
  console.log(txt);
  bubble("bot", txt);
  utt.onend = function () {
    $("textarea").focus();
    $("button").prop("disabled", false);
  }

  utt.onerror = function(msg){
    console.log(msg);
  }

  if(options!=undefined){
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        utt[key] = options[key];
      }
    }
  }
  console.log("#KILLIAN Fonction DirSay() appelé avec les arguments : ",arguments);
  speechSynthesis.speak(utt);

}
function speak() {

  if(holding!=false){
    $("button").prop("disabled", false);
    bubble("me", $("textarea").val());
    exprCallbacks[holding.func](holding.args);

    return false;
  }

  var txt = $("textarea").val();
  $("button").prop("disabled", true);

  if(txt.length<1||!txt.match(/\w/)){
    $("textarea").val("");

    var utt = new SpeechSynthesisUtterance;

    utt.lang = "fr-FR";
    utt.text = "Tu es assez curieux de savoir ce que ça fait si l'on écrit rien !";
    utt.onend = function () {
      bubble("bot", "Tu es assez curieux de savoir ce que ça fait si l'on écrit rien !");
      $("textarea").focus();
    }

    utt.onerror = function(msg){
      console.log(msg);
    }

    speechSynthesis.speak(utt);
  }else{

    bubble("me", txt);

    txt = txt.replace(RegExp(/\?/gi), "");
    txt = txt.replace(RegExp(/!/gi), "");
    txt = txt.replace(RegExp(/\./gi), "");

    var reps = ["Peux tu reformuler cette phrase pour que je comprenne ?",
    "Je n'ai pas trop compris.", "J'avoue que j'ai pas suivi. Peux-tu reformuler ?",
    "Pas compris", "C'est du Français ça ?", "Y'a un truc que je n'ai pas pigé",
    "Les Bertha comme moi ne peuvent pas comprendre cette phrase", "Je ne comprend pas la phrase…",
    "Pourrais-tu traduire en langue Bertha ?", "C'est-à-dire ?", "Tes phrases ne sont pas compréhensibles cher "+(data.user.prenom||"humain")+".",
    (data.user.prenom||"humain")+", très cher "+(data.user.prenom||"humain")+", je ne comprend rien.", "❔😒🤔😖😣😶❓"];
    var ran = Math.floor(Math.random()*reps.length);
    var answ = reps[ran];

    for (var key in expr) {
      var pat = new RegExp("^\\W*"+key, "im");

      if(pat.test(txt)){

        if(typeof expr[key] == "string"){

          if(/^\$(\d+)/.test(expr[key])){
            n = expr[key].match(/^\$(\d+)/)[1];

            answ = txt.match(key)[n];
          }else{
            answ = expr[key];
          }

        }else if(typeof expr[key] == "function"){
          answ = expr[key](pat, txt);
        }

        break;
      }

    }

    if(answ==false){
      return false;
    }

    console.log(answ);

    say = answ.toString().replace(/killian/gi, "kiliane");

    var utt = new SpeechSynthesisUtterance;

    utt.lang = "fr-FR";
    utt.text = say;

    answ = answ.replace(/\w/i, function(i){ return i.toUpperCase(); });

    if(pro==true){
      bubble("bot", answ);
    }

    utt.onend = function () {

      if(pro==false){
        bubble("bot", answ);
      }

      $("textarea").focus();
      $("button").prop("disabled", false);
    }

    utt.onerror = function(msg){
      bubble("bot", "...");
      console.log(msg);
    }

    speechSynthesis.speak(utt);
  }
}
function undet(txt, options){
  // ROLE :  Enlève les determinants et les espaces inutiles.

  options = options||{};
  var spaces = options.spaces==undefined?true:options.spaces;

  txt = txt.replace(RegExp(det, "gi"), "");

  if(spaces==true)
  txt = txt.replace(RegExp(" ", "gi"), "");

  return txt;
}
function deChar(txt, options){
  // ROLE : Enleve les accents, la ponctuation et les déterminants

  txt = txt.toString();

  txt = undet(txt, options);
  txt = txt.replace(RegExp(/(é)/gi), "e");
  txt = txt.replace(RegExp(/(è)/gi), "e");
  txt = txt.replace(RegExp(/(ê)/gi), "e");
  txt = txt.replace(RegExp(/\?/gi), "");
  txt = txt.replace(RegExp(/!/gi), "");
  txt = txt.replace(RegExp(/\./gi), "");

  txt = txt.toLowerCase();

  return txt;
}

function dePronom(txt, grammar){
  // ROLE : Remplace les pronoms
  // Ex : Ton prénom -> Le prénom de moi (Bertha)
  // Ex : Le papa de Killian -> Camille
  options = typeof options=="object"?options:{};
  options.spaces = false;
  var tmp = deChar(txt, options);
  var det1 = "";

  if(grammar==undefined){
    det1 = "Le";
  }else{
    det1 = grammar.plur?"ses":(grammar.masc?"son":"sa");
  }

  tmp = tmp.replace(/(?:Ton|Ta) (.+)/i, det1+" $1 de moi");
  tmp = tmp.replace(/(?:Mon|Ma) (.+)/i, det1+" $1 de user");

  return tmp;

}
function doPronom(txt, grammar){
  // ROLE : Remplace les pronoms
  // Ex : Le prénom de moi -> Mon prénom

  if(grammar==undefined){
    grammar = {
      masc: false,
      plur: false
    };
  }

  txt = txt.replace(RegExp(det+"(.+) *de *moi", "mi"), pronom({det: "poss", mod: "m"},grammar)+" $2");
  txt = txt.replace(RegExp(det+"(.+) *de *(?:toi|user)", "mi"), pronom({det: "poss", mod: "t"},grammar)+" $2");
  console.log(txt);

  return txt;
}
function pronom(kind, grammar){
  var det1 = false;

  if(typeof grammar != "object"){
    console.error("#KILLIAN La fonction pronom(<object|string>kind, object <grammar>) n'a pas pu être éxécutée car <grammar> n'est pas un objet mais de type "
    + typeof grammar+".\nLa fonction s'est arrêté avec les arguments suivant");
    console.error(arguments);

    return false;
  }

  if(typeof kind=="object"){
    if(kind.det=="article"){
      if(kind.info=="indefini"){
        det1 = grammar.plur?"des":(grammar.masc?"un":"une");
      }else{
        det1 = grammar.plur?"les":(grammar.masc?"le":"la");
      }
    }else if(kind.det=="poss"){
      /* String <KIND->MOD> : (Mod = Modificateur) C'est la racine commune à la PERSONNE.
      M pour MON/MA, T pour TON/TA et S pour SON/SA
      !!! 1 pour notre/nos, 2 pour notre/nos et 3 pour leur/leurs
      */

      if(!isNaN(kind)){
        switch (kind) {
          case 1:
          det1 = grammar.plur?"nos":"notre";
          break;
          case 2:
          det1 = grammar.plur?"vos":"votre";
          break;
          case 3:
          det1 = grammar.plur?"leur":"leurs";
          break;

        }

      }else{
        det1 = kind.mod;
        det1 += grammar.plur?"es":(grammar.masc?"on":"a");
      }
    }
  }

  return det1;
}

function bubble(side, txt, style, options){

  if(pro==false){
    $("textarea").css("opacity", 0);
    setTimeout(function () {
      $("textarea").val("");
      $("textarea").focus();
      $("textarea").css("opacity", 1);
    }, 1000);

    var bubl = document.createElement("div");

    $(bubl).addClass(side);
    $(bubl).text(txt);

    $("div.conv").append(bubl);
  }else{
    $("textarea").css("opacity", 0);
    setTimeout(function () {
      $("textarea").val("");
      $("textarea").focus();
      $("textarea").css("opacity", 1);
    }, 1000);
    $("button").prop("disabled", false);
    var bubl = document.createElement("div");
    $("div.conv .me").css("top", 0);
    $("div.conv .bot").css("left", 0);

    setTimeout(function () {
      if(side=="me"){
        $("div.conv .me").css("opacity",0);
        $("div.conv .me").css("top", -100);
        setTimeout(function(){
          $("div.conv .me").text(txt);
          $("div.conv .me").css("top", 0);
          $("div.conv .me").css("opacity",1);
        }, 1000);
      }else{
        $("div.conv .bot").css("opacity",0);
        $("div.conv .bot").css("left", "100%");
        setTimeout(function(){
          $("div.conv .bot").text(txt);
          $("div.conv .bot").css("left", 0);
          $("div.conv .bot").css("opacity",1);
        }, 1000);
      }
    }, 1);
  }
}

function sentence(syntax, qType, reg, txt, answ, error){
  var tmp = txt.match(reg);

  error = error || false;

  var grammar = genre(tmp[syntax.carac]);

  console.log(grammar);

  var phrase = answ;

  for(var key in dataReplace) {
    if(dataReplace.hasOwnProperty(key)) {
      var pat = new RegExp(key, "i");

      if(pat.test(tmp[syntax.carac])){
        tmp[syntax.carac] = tmp[syntax.carac].replace(pat, dataReplace[key]);
      }
    }
  }

  if(qType=="perso"){

    if(answ==false){
      if(error==false){
        phrase = "";
      }else{
        if(qType=="perso"){
          var det1 = grammar.plur?"ses":(grammar.masc?"son":"sa");
          if(error.typeError=="caract"){
            phrase = "Je ne connais pas suffisament "+error.pers+" pour te donner "+det1+" "+error.caract+".";
          }else if(error.typeError=="pers"){
            phrase = "Déjà que je ne connais pas "+error.pers+", comment veux-tu que j'ai "+det1+" "+error.caract+" ?";
          }
        }else{
          phrase = "Désolé, je n'ai pas trouvé de données sur "+(error|"cette question.");
        }
      }
    }else{
      phrase = tmp[syntax.carac]+" "+syntax.liaison+" "+tmp[syntax.pers]+" "+tmp[syntax.verbe]+" "+answ;
      phrase = doPronom(phrase, grammar);
      phrase = phrase.replace(/\w/i, function(i){ return i.toUpperCase(); });
    }
  }

  if(phrase==answ){
    console.log("Je n'ai pas pu faire de phrase avec ses données : ");
    console.log(arguments);
  }
  // alert(phrase);
  return phrase;
}
function genre(txt){
  var plur;
  var masc;

  if(/(le|la|un|une)/.test(txt)){
    plur = false;
  }else if(/(les|quels|quelles)/.test(txt)){
    plur = true;
  }else{
    plur = false; // Singulier par défault
  }

  if(/(la|une|quelle)/.test(txt)){
    masc = false;
  }else if(/(le|un)/.test(txt)){
    masc = true;
  }else{
    masc = true; // Masculin par défault
  }

  return {plur: plur, masc: masc};
}

function changeData(action){
  if(action=="get"){
    var r = {
      moi:{
        prenom: "Bertha",
      },
      user: {
        prenom: "Killian"
      },
      killian: {
        numero: "0692560465",
        prenom: "Killian",
        age: "14",
        "date de naissance": "12/10/2001",
        links: {
          papa: "camille",
          maman: "sophie"
        }
      }
    };
    return r;
  }
}

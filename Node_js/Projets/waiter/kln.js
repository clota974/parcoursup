class KLN{
  constructor(){
    if($ === undefined){
      console.error("KLN : jQuery not found");
      return false;
    }

    this.vars = {}

    var kln = this;
    this.events = {};
    /*
    {
      exemple: [ {func: function(){ alert(); }, id: "alerte"} ]
    }
    */

    $(document).ready(function() {
      $("*[data-evt]").each(function(ix, val){
        console.log($(this));
        $(this).click(function () {
          let evtName = $(this).attr("data-evt");
          kln.sendEvt(evtName);
        });
      });

      $("body").on("click", "div.slider", function () {
        $(this).toggleClass("shift");

        var id = "#"+$(this).prop("id") || "slider";
        if($(this).hasClass("shift")){
          $$.sendEvt(id + " off");
        }else{
          $$.sendEvt(id + " on");
        }
      });
    });



    /* ARRAYS prototypes */
    Array.prototype.unique =  function (details = false) {
      var array = this;

      var models = [];
      var copies = {};

      $(array).each(function(ix1, val1){
        var already = false;
        var isObject = false;

        if(typeof val1 === 'object') isObject = true;

        $(models).each(function(ix2, val2){
          if(isObject){
            var is_same = (val1.length == val2.length) && val1.every(function(element, index) {
              return element === val2[index];
            });

            if(is_same){already = true; return false; }
          }else{
            if(val1===val2){
              already = true;
            }
          }
        });

        if(!already){
          models.push(val1);
          copies[val1] = 1;
        }else{
          copies[val1] += 1;
        }
      });

      if(details === false) return models;
      return {copies};
    }

    Array.prototype.remove = function(value){
      var ix = this.indexOf(value);
      this.splice(ix, 1);
      return this;
    }
  }

  registerEvt(evtName, func, id){
    var obj = {func, id};

    if( this.events.hasOwnProperty(evtName) === false ){
      this.events[evtName] = [];
    }

    this.events[evtName].push(obj);
    // exemple.push( {func: function(){ alert(); }, id: "alerte"} )
  }
  sendEvt(evtName, params = {}){
    var evt = this.events[evtName];
    // evt = exemple

    $(evt).each(function (ix, val) {
      val.func(params);
    });
  }
  unregisterEvt(evtName, id){
    var evt = this.events[evtName];
    // evt = exemple

    if(evt===undefined){ console.error(`L'écvénement "${evtName}" n'existe pas.`); return false; }
    var ixOf = evt.indexOf(id);
    evt.splice(ixOf, 1);
  }
}

$$ = new KLN();

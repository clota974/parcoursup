const RESSOURCES_STRING = "img, audio, video, link";

class ProgressBar extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: "open"});
        

        this.percentage = 0;
        this.format = "$%"; // "$" is the percentage 
        this.full = false;

        console.log(this.shadowRoot);
    }

    static get observedAttributes() {return ['percentage']; }

    connectedCallback(){
        var $this = this;

        if($($this).attr("percentage")){
            $this.percentage = $($this).attr("percentage");
        }else{
            $($this).attr("percentage", "0");
        }



        var loader = document.createElement("div");
        this.loader = loader;
        this.shadow.appendChild(loader);
        $(loader).attr("style", `
        transition: width 1s ease;

        z-index: 2;
        display: block;
        width: ${$this.percentage}%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        vertical-align: 100%;
    
        background: rgba(0, 32, 255, 0.3);
        `);


        var percentageText = document.createElement("div");
        this.percentageText = percentageText;
        this.shadow.appendChild(percentageText);
        $(percentageText).attr("style", `
            display: inline-block;
            position: relative;
            z-index: 3;
            width: 100%;
            top: 50%;

            text-align: center;
            font-size: 500%;
            color: #FFDE00;

            
            transform: translateY(-50%);            
        `);
        percentageText.innerText = this.percentage+"%";
        console.log('done');
        

        var chargement = document.createElement("div");
        this.chargement = chargement;
        this.shadow.appendChild(chargement);
        $(chargement).attr("style", `
            display: inline-block;
            position: fixed;
            z-index: 3;
            width: 100%;
            top: 80%;

            text-align: center;
            font-size: 150%;
            color: #FFDE00;
            text-transform: uppercase;
            
            transform: translateY(-50%);            
        `);
        chargement.innerText = "Chargement";
    }

    attributeChangedCallback(name, oldVal, newVal){
        var $this = this;

        if($this.full){
            return false;
        }

        if(name=="percentage"){

            if(newVal>=100){
                newVal = 100;
                
                if($($this).attr("percentage")!="100") $($this).attr("percentage", 100);
                
                if($this.full===false) $this.fullCallback();

                $this.full = true;
            }            
            
            try {
                $this.percentageText.innerText = newVal+"%";            
            } catch (error) {
                
            }
            $this.percentage = newVal;
            $($this.loader).css("width", newVal+"%");

        }
    }
}
customElements.define("progress-bar", ProgressBar);


$(document).ready(function(){
    animate();
    loader();

    $("body").scroll(function(){
        animate();
    });

    

    $("div.input").on("focus","input", function (ev) {
        $(this).parent("div").removeClass("filled");
        $(this).parent("div").addClass("focus");
    });
    $("div.input").on("blur","input", function (ev) {
        $(this).parent("div").removeClass("focus");

        if($(this).val().length>0){
            $(this).parent("div").addClass("filled");
        }
    });


    $("div.input").on("keyup","input", function () {
        var id = $(this).attr("id");
        var val = $(this).val();
        var valid = true;

        if(checkForm.hasOwnProperty(id)){
            valid = checkForm[id](val);
        }

        if(!valid){
            $(this).parent("div").addClass("invalid");
        }else if(valid) {
            $(this).parent("div").removeClass("invalid");
        }
    });
});

function loader(){
    var type = $("#load-type").val();

    switch (type) {
        case "full":
            fullLoader();
            break;
        case "lock":
            lockLoader();
    }
}


function fullLoader(){
    var ressources = $(RESSOURCES_STRING);

    var len = ressources.length;
    var loaded = 0;

    $(".loadbox").css("display", "block");

    $(ressources).each(function() {         
        $(this).load(function () { 
            loaded++;   
            var per = Math.floor((loaded/len)*100);

            $(".page-loading-bar").attr("percentage", per);
         });
    });

    $(document).on("readystatechange", function(){
        if(document.readyState == "complete"){
            $(".page-loading-bar").attr("percentage", 100);
        }
    });

    $(".page-loading-bar").get(0).fullCallback = function(){
        setTimeout(function () { 
            $(".loadbox").fadeOut(1000);
        }, 1000);
    }
}

function lockLoader(){
    $("body, html").css("overflow-y", "hidden");

    var ressources = $(RESSOURCES_STRING);
    var percent_label = $(".loader_percent");
    var loaderReady = $(".loader_ready_show");

    $(loaderReady).css("display", "none");

    var len = ressources.length;
    var loaded = 0;

    $(ressources).each(function() {         
        $(this).load(function () { 
            loaded++;   
            var per = Math.floor((loaded/len)*100);

            $(percent_label).text(per+"%");            
         });
    });

    $(document).on("readystatechange", function(){
        if(document.readyState == "complete"){
            $(percent_label).removeClass("blink");
            $(percent_label).addClass("no_opacity");
            $(loaderReady).css("display", "");
            setTimeout(function(){
                $(loaderReady).removeClass("no_opacity");
                $("body, html").css("overflow-y", "auto");
            },10);

        }
    });
}


function animate(){
    $(".anim_develop_width").each(function (ix) {
        if(document.readyState != "complete") return false;

        var top = ($(this).offset().top - $("body").scrollTop())/4;

        $(this).css("width", "");
        $(this).css("width", "+="+top);
    });

    $(".anim_background").each(function(ix){
        var diviseur = parseInt($(this).attr("data-diviseur")) || 2;
        var top = $("body").scrollTop() / diviseur;

        $(this).css("background-position-y", "");
        $(this).css("background-position-y", "+="+top);
    });

    if($("body").scrollTop()<5){
        $("header").addClass("no-bg");
    }else{
        $("header").removeClass("no-bg");
    }
}
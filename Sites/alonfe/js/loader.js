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




$(document).ready(()=>{
    var ressources = $("img, audio, video, script, link");

    var len = $("img").length;
    var loaded = 0;

    $("img").each(function() {         
        $(this).load(function () { 
            loaded++;   
            var per = Math.floor((loaded/len)*100);

            $(".page-loading-bar").attr("percentage", per);
         });
    });

    $(".page-loading-bar").get(0).fullCallback = function(){
        console.log('loaded');
        setTimeout(function () { 
            $(".loadbox").fadeOut(1000);
        }, 1000);
    }
});
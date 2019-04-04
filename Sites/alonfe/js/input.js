$(document).ready(function(){
    class xInput extends HTMLElement{
        constructor(){
            super();
            this.shadow = this.attachShadow({mode: "open"});

            var link = $(`<link rel="stylesheet" href="/alonfe/css/input.css" />`);
            var box = this.box = $("<div class='input_box'></div>");

            $(this.shadow).append(link);
            $(this.shadow).append(box);
        }


    }


    customElements.define('x-input', xInput);
});
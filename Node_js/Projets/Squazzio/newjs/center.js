$(document).ready(function(){
    _Game = new Game({isReal: true, withBot: true});
    setImmediate(function(){
        _Game.changeTurn(1); 
    })   
});
class Game{
    constructor(obj){
        var thi$ = this;
        this.constants = {
            DOTS_QTY: 3
        }

        this.isReal = obj.isReal;

        this.buffering = true;

        this.players = {};
        
        this.board = null;

        this.turn = 0;
        this.lockTurn = false;
        this.botTurn = false;

        this.popups = {};

        setImmediate(function(){
            thi$.init(obj);
        })
    }

    init(obj){
        var board_params = {
            isReal: this.isReal,
            gameParent: this,
            board: undefined
        }
        board_params.board = obj.board || undefined;

        this.board = new Board(board_params)

        new Player({id: 1, name: "L'humain", gameParent: this});
        if(obj.withBot){
            new Bot({id: 2, name: "Squazzibot", gameParent: this});
        }else{
            new Player({id: 2, name: "Squazzibot", gameParent: this});
        }
    }

    changeTurn(alt){
        var thi$ = this;

        if(this.lockTurn) return false;

        if(typeof alt == "undefined"){
            this.turn = this.turn==1?2:1;
        }else{
            this.turn = alt;
        }

        if(this.isGameOver()){
            return false;
        }

        this.playing = this.players[this.turn];
        if(this.playing.isBot){
            setTimeout(function(){
                thi$.playing.think();
            }, 900);
        }
    }

    userCannotPlay(){
        return false;
        if(this.playing.isBot||this.turn<1) return true
        else return false;
    }

    isGameOver(){
        var players = this.players;

        for (const id in players) {
            if (players.hasOwnProperty(id)) {
                const player = players[id];
                const list = player.bigDots_list;
                
                var cannotMove = 0;

                for (let ix = 0; ix < list.length; ix++) {
                    const dot = list[ix];
                    var analysis = dot.analyzeAround();
                    var potential = analysis.stats.potentialSquares;

                    if(potential==0){
                        this.endGame({player, dot});
                        return true;
                    }
                    if(analysis.stats.freeSquares == 0) cannotMove++;
                }

                if(cannotMove>=3){
                    this.endGame({player, type: "triple"});
                    return true;
                }

            }
        }
        
        return false;
    }

    endGame(obj){
        this.lockTurn = true;
        this.turn = -2;

        this.type = obj.type || "default";

        var winnerId = obj.player.id;

        if(this.isReal && this.type=="default"){
            $(".kaptur").addClass("busted");
            $(obj.dot.html).parent().addClass("busted");
        }

        var dialog_params = {
            title: "Jeu terminé",
            text: winnerId==2?"Vous avez gagné":"Squazzibot a gagné",
            showNow: true
        }
        new Dialog(dialog_params);
    }
}
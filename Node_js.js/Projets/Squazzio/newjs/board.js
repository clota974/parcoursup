class Board{
    constructor(obj){
        this.gameParent = obj.gameParent;
        this.codeBoard =
            obj.board ||
            [
                [1,1,1],
                [0,0,0],
                [2,2,2]
            ];
        this.selectedDot = [-1,-1];

        var thi$ = this;
        setImmediate(function(){
            thi$.drawBoard();
        })
       
        if(this.gameParent.isReal) this.setEvents();
    }

    drawBoard(){
        var thi$ = this;
        this.gameParent.lockTurn = true;

        for (let iy = 0; iy < this.codeBoard.length; iy++) {
            const line = this.codeBoard[iy];

            for (let ix = 0; ix < line.length; ix++) {
                const value = line[ix];
                
                if(value!=0){
                    var player = this.gameParent.players[value];
                    player.placeDot(ix,iy);
                }
            }
            
        }

        setTimeout(function(){
            thi$.gameParent.lockTurn = false;
        }, 500);
    }

    setEvents(){
        var thi$ = this;
        var gameParent = thi$.gameParent;

        $(".kaptur td").dblclick(function(ev){
            var playing = gameParent.playing;
            if(gameParent.userCannotPlay()) return false;

            var el = $(ev.currentTarget);
            
            var x = $(this).index();
            var y = $(this).parent().index();
            var dotObj = gameParent.selectedDot;

            if($(el).hasClass("movable")){
                playing.moveDot({dotObj,x,y});
            }else{
                if(thi$.codeBoard[y][x]==0){
                    playing.placeDot(x,y);
                }
            }
       });
       $(".kaptur td").on("click", function(ev){
            if($(this).hasClass("movable") || gameParent.userCannotPlay()) return false;

            var el = $(ev.currentTarget);
            var y = $(this).index();
            var x = $(this).parent().index();

            thi$.unselectAll();

            if($(this).children().length){
                var obj = $(el).children("div").data("obj");

                if(obj.player.id != thi$.gameParent.turn) return false;
            
                obj.selectDot();
                
            }
       });
    }

    putDot(obj){
        var td = $(`.kaptur tr:nth-child(${obj.y+1}) td:nth-child(${obj.x+1})`);

        this.codeBoard[obj.y][obj.x] = obj.player.id;

        $(td).append(obj.html);

        this.gameParent.changeTurn();
    }
    changeBoard(obj){
        var {formerX, formerY, x, y, id} = obj;
        this.codeBoard[formerY][formerX] = 0;
        this.codeBoard[y][x] = id;

        this.gameParent.changeTurn();
    }

    unselectAll(){
        this.selected = [-1,-1];
        $(".selected").removeClass("selected");
        $(".movable").removeClass("movable adv");
    }

    getFreeSquares(){
        var freeSquares = [];
        for (var iy = 0; iy < this.codeBoard.length; iy++) {
            if (this.codeBoard.hasOwnProperty(iy)) {
                const line = this.codeBoard[iy];

                for (var ix = 0; ix < line.length; ix++) {
                    if (line.hasOwnProperty(ix)) {
                        const value = line[ix];
                        
                        if(value==0) freeSquares.push([ix,iy]);
                    }
                }
                
            }
        }

        return freeSquares;
    }

    highlightMovable(movable){
        var thi$ = this;

        for (let key in movable) {
            if (movable.hasOwnProperty(key)) {
                let coords = movable[key];

                let x = coords[0]+1;
                let y = coords[1]+1;
                let sel = `.kaptur tr:nth-child(${y}) td:nth-child(${x})`;
                
                $(sel).addClass("movable");
                if(thi$.gameParent.turn == 2) $(sel).addClass("adv");
            }
        }
    }

    evaluate(debug=false){
        const statsValue = {
            busySquares: -2,
            emptySquares: -1,
            freeSquares: 2,
            friendlySquares: 1
        }

        var game = this.gameParent;
        var value = 0;

        for (const key in game.players) {
            const player = game.players[key];

            let relValue = 0;


            for (let iy = 0; iy < player.bigDots_list.length; iy++) {

                const dot = player.bigDots_list[iy];

                const analysis = dot.analyzeAround();
                const stats = analysis.stats;

                relValue += stats.busySquares*statsValue.busySquares;

                relValue += stats.emptySquares*statsValue.emptySquares;

                relValue += stats.freeSquares*statsValue.freeSquares;
                
                relValue += stats.friendlySquares*statsValue.friendlySquares;


                if(stats.potentialSquares==0) relValue -= 70;
                if(stats.impossibleSquares==8) relValue -= 10;

                //if(debug==true) debugger;


                
            }
            
            if(player.id==1) relValue *= -1;



            value+=relValue;
        }

        return value;

    }
}
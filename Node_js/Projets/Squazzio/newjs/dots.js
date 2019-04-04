class MiniDot{
    constructor(obj){
        var thi$ = this;
        this.player = obj.player;
        
        this.player.miniDots_list.push(this);


        this.miniDotSection = null;
        this.miniDotClass = null;
        if(this.player.id==1){
            this.miniDotSection = $(".subhead .mine");
            this.miniDotClass = "";
        }
        if(this.player.id==2){
            this.miniDotSection = $(".subhead .op");
            this.miniDotClass = "adv";
        }

        if(this.player.gameParent.isReal){
            setImmediate(function(){
                thi$.draw();
            });
        }
    }

    draw(){
        this.html = $(`<div class="${this.miniDotClass}"></div>`)
        $(this.miniDotSection).append(this.html);
    }

    remove(){
        var thi$ = this;
        
        $(this.html).css({top: "-110%"});

        setTimeout(function(){
            $(thi$.html).css({width: "0px", margin: 0});
        }, 500);
        setTimeout(function(){
            $(thi$.html).remove();
        }, 900);
    }
}

class BigDot{
    constructor(obj){
        var thi$ = this;
        this.player = obj.player;
        this.x = obj.x;
        this.y = obj.y;
        this.gameParent = this.player.gameParent;
        
        this.player.bigDots_list.push(this);


        this.bigDotClass = null;

        if(this.player.id==1){
            this.bigDotClass = "me";
        }
        if(this.player.id==2){
            this.bigDotClass = "adv";
        }

        this.html = $(`<div class="${this.bigDotClass}"></div>`);
        $(this.html).data("obj", this);

        if(this.gameParent.isReal == true){
            setImmediate(function(){
                thi$.draw();
            });
        }

    }

    draw(){
        $(this.html).css({top: this.y*100+2, left: this.x*100+2})

        this.gameParent.board.putDot(this);
    }

    selectDot(){
        $(this.html).addClass("selected");                
        this.gameParent.selectedDot = this;

        var analysis = this.analyzeAround();
        this.gameParent.board.highlightMovable(analysis.movable);
    }

    moveTo(x,y){
        var thi$ = this;
        var formerX = this.x;
        var formerY = this.y;

        var targetTd = $(`.kaptur tr:nth-child(${y+1}) td:nth-child(${x+1})`);

        $(this.html).css({top: y*100+2, left: x*100+2});
        this.x = x;
        this.y = y;
        this.gameParent.board.changeBoard({formerX, formerY,x,y,id: this.player.id});
    

        this.gameParent.board.unselectAll();
        setTimeout(function(){
            $(this.html).remove();
            $(targetTd).append(thi$.html);            
        }, 300);
    }

    analyzeAround(){
        var board = this.gameParent.board.codeBoard;

        var calculus = [-1,0,1];
        var {x,y} = this;

        var movable = [];
        var content = {};
        var contentRelative = {};

        for (const cx of calculus) { //cx-> Calculus x

            for (const cy of calculus) {
                let ox = parseInt(x)+cx; // Objective X
                let oy = parseInt(y)+cy;

                let value = null;
                ox = ox<0 ? 3 : ox;
                oy = oy<0 ? 3 : oy;

                if(ox==3 || oy==3){
                    value = -1; // Vide
                }else{
                    value = board[oy][ox]; 
                    if((cx!=0 || cy!=0) && value == 0) movable.push([ox,oy]);
                }


                content[`${ox}${oy}`] = value;
                contentRelative[`${cx}${cy}`] = value;
                
            }
        }

        var playerId = contentRelative["00"];
        var advId = playerId==1 ? 2 : 1;
        
        var stats = {
            freeSquares: 0,
            friendlySquares: 0,
            potentialSquares: 0,
            busySquares: 0,
            emptySquares: 0,
            impossibleSquares: 0
        }

        for (var keys in contentRelative) {
            if (contentRelative.hasOwnProperty(keys)) {

                let value = contentRelative[keys];
                
                if(keys=="00") continue;

                switch(value){
                    case -1:
                        stats.emptySquares++;
                        break;
                    case 0:
                        stats.freeSquares++;
                        break;
                    case playerId:
                        stats.friendlySquares++;
                        break;
                    case advId:
                        stats.busySquares++;
                        break;
                }
            }
        }

        stats.potentialSquares = stats.freeSquares+stats.friendlySquares;
        stats.impossibleSquares = stats.busySquares+stats.emptySquares+stats.friendlySquares;

        var ret = {
            stats,
            movable,
            content,
            contentRelative
        }
        
        return ret;
    }

}
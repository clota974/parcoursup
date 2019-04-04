const SMALL_DOT = 7812876310260;
const BIG_DOT = 7414830637894

class Player{
    constructor(obj){
        this.name = obj.name;
        this.id = obj.id;
        this.gameParent = obj.gameParent;
        this.isBot = false;

        this.miniDots_qty = _Game.constants.DOTS_QTY;
        this.bigDots_qty = 0;

        this.miniDots_list = [];
        this.bigDots_list = [];

        this.gameParent.players[this.id] = this;

        this.init(obj);
    }

    init(obj){
        var thi$ = this;

        for (let ix = 1; ix <= this.miniDots_qty; ix++) {
            let dot = new MiniDot({player: this});           
        }
    }

    placeDot(x,y){
        if(this.bigDots_qty>=_Game.constants.DOTS_QTY) return false;

        this.miniDots_list[0].remove();
        this.miniDots_list.shift();
        
        let dot = new BigDot({player: this, x, y});

        this.bigDots_qty++;
        if(this.bigDots_qty>=_Game.constants.DOTS_QTY){
            let sel = null;
            if(this.id==1){
                sel = ".subhead .mine";
            }else if(this.id==2){
                sel = ".subhead .op";
            }

            $(sel).css("opacity", 0);
        }

    }

    moveDot(obj){
        var {dotObj,x,y} = obj;

        dotObj.moveTo(x,y);
    }

    listMoves(){
        var moves = {
            add: {},
            move: {},
            both: {}
        }

        // Movable dots
        for(let ix = 0; ix < this.bigDots_list.length; ix++){
            let dot = this.bigDots_list[ix];
            let analysis = dot.analyzeAround();

            var currentCoords = `${dot.x}${dot.y}`;

            for (let iy = 0; iy < analysis.movable.length; iy++) {
                let coords = analysis.movable[iy];
                coords = `${coords[0]}${coords[1]}`
                let stringCoords = `M${currentCoords}T${coords}`;

                moves.move[stringCoords] = 0;
                moves.both[stringCoords] = 0;
            };
        }

        // Addable dots
        if(this.bigDots_qty < _Game.constants.DOTS_QTY){
            for (let iy = 0; iy < this.gameParent.board.codeBoard.length; iy++) {
                const line = this.gameParent.board.codeBoard[iy];
                
                for (let ix = 0; ix < this.gameParent.board.codeBoard.length; ix++) {
                    const value = line[ix];
                    if(value==0){
                        var string = "A"+ix+iy;
                        moves.add[string] = 0;
                        moves.both[string] = 0;
                    }
                }
                
            }
        }

        return moves;
    }

    getDotAtCoords(tx,ty){
        // Target x, Target y
        for (let ix = 0; ix < this.bigDots_list.length; ix++) {
            const dot = this.bigDots_list[ix];
            var {x,y} = dot;
            
            if(tx==x && y==ty){
                return dot;
            }
        }

        return -1;
    }
}

class Bot extends Player{
    constructor(obj){
        super(obj);

        this.isBot = true;
        this.brain = {}
    }

    play(){
        var thi$ = this;


        var thinking = true;
        var loops = 0;

        var moves = this.brain.moveList.both;
        var highestMove = "";

        var previousValue = 3.14; // Zero value


        for (const moveName in moves) {
            if (moves.hasOwnProperty(moveName)) {
                const value = moves[moveName];
                
                if(previousValue == 3.14 || value>previousValue){
                    previousValue = value;
                    highestMove = moveName;
                }
                
            }
        }

        this.makeMove(highestMove);
    }

    makeMove(moveName){
        var moveType = moveName[0];

        if(moveType=="A"){
            var x = moveName[1];
            var y = moveName[2];
            this.placeDot(x,y);
        }
        if(moveType=="M"){
            var x = moveName[1];
            var y = moveName[2];
            var tx = moveName[4];
            var ty = moveName[5];

            var dot = this.getDotAtCoords(x,y);


            if(dot != - 1){
                this.moveDot({
                    dotObj: dot,
                    x: tx,
                    y: ty
                });
            }
        }
    }


    playAdd(){
        var freeSquares = this.gameParent.board.getFreeSquares();
        var ran = Math.floor(Math.random()*freeSquares.length)+0;

        var coords = freeSquares[ran];
        
        this.placeDot(coords[0],coords[1]);
    }


    think(){
        var thi$ = this;
        var moves = this.listMoves();
        var board = this.gameParent.board.codeBoard;

        this.brain.moveLength = 0;
        this.brain.achievedMoves = 0;
        this.moveList = moves;


        for (const key in moves.both) {
            if (moves.both.hasOwnProperty(key)) {
                this.brain.moveLength++;
            }
        }
        

        for (const moveName in moves.both) {
            if ((moves.both).hasOwnProperty(moveName)) {
                let simBoard = JSON.parse(JSON.stringify(board));

                var addOrMove = "add"; // Default

                if(moveName[0]=="M"){
                    addOrMove = "move";
                    simBoard[moveName[2]][moveName[1]] = 0;
                    simBoard[moveName[5]][moveName[4]] = this.id;
                }
                if(moveName[0]=="A"){
                    simBoard[moveName[2]][moveName[1]] = this.id;
                }

                let simGame = new Game({isReal: false, withBot: false, board: simBoard});            
                
                setTimeout(function(){
                    moves[addOrMove][moveName] = simGame.board.evaluate()
                    moves.both[moveName] = simGame.board.evaluate()
                    thi$.brain.moveList = moves;

                    thi$.brain.achievedMoves++;

                    if(thi$.brain.achievedMoves==thi$.brain.moveLength){
                        thi$.play();
                    }
                },10);

            }
        }

    }
}
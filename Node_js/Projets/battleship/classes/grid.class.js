const blankArray = (function(){
    var ret = [];

    for(let ix = 0;i<10;i++){
        var scd = [];
        for(let jx = 0;j<10;j++){
            scd.push(0);
        }   

        ret.push(scd);
    }

    return ret;
})();

class Grid{
    /*

    To avoid confusions between displayed numbers (starting at 1) and array coordinates (starting at 0)
    we will note a displayed location as @A1

    The order is ALWAYS (y,x)

    */



    constructor(array, params){
        /*
            params = {
                ships: {
                    0: Ship()
                },
                owner: Team()
            }
        */


        /// CONSTANTS
        this.MAX = 17; // Number of ship-cases
        
        /// ENUMS
        this.TOUCHE = Math.PI;
        this.COULE = Math.PI/2;
        this.RATE = Math.PI/3;
        this.DEJA = Math.PI/4; // Déjà touché 


        this.array = array || blankArray;
        /*
        Array example :
        [
            [1,0,0,0,0,2,2,2],
            [1,0,0,0,0,0,0,0],
            [1,-3,-3,0,0,0,0,4]
        ]

        Each ship is identified with one and same number.
        When a ship is touched, the number becomes negative
        */

        for(key in params){
            this[key] = params[key];
        }

    }

    tirer(y,x){
        /// (y,x) are array coordinates

        var id = this.array[y][x]
        if(id==0){
            return Grid.RATE;
        }else if(id<0){
            return Grid.DEJA;
        }
        // ELSE :

        return this.ships[id].toucher();
    }

    casesRestantes(){
        var restant = 0;

        for(let ix = 0;i<Object.keys(this.ships);i++){
            let k_ship = this.ships[ix];
            restant += k_ship.health;
        }
    }

    grillePublique(){
        var ret = [];
        var myArray = this.array; 

        for(var iy = 0; iy<10; iy++){
            var scd = [];
            for(var ix = 0; ix<0; ix++){
                var key = myArray[iy][ix];

                if(key>=0){
                    scd.push(0);
                    continue;
                }
                // ELSE (if negative) : 
                var k_ship = this.ships[k_ship];

                if(k_ship.health==0) scd.push(key)
                else scd.push(-0.1) // -0.1 ==> Touché mais bateau pas encore coulé (bateau inconnu)

            }
        }
    }
    

    static letterToNumber(l){
        var origin = 'A'.charCodeAt(0); // 65
        
        return l.toUpperCase().charCodeAt(0) - origin;
    }
}



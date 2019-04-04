class Ship{
    constructor(coords, owner){
        /*
        coords = [[0,1], [0,2]]

        NOTE : The order is ALWAYS as (y,x)
        */

        this.coords = coords;
        this.owner = owner;
        this.health = coords.length;
    }

    toucher(){
        this.health--;
    }
}
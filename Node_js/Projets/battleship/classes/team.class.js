class Team{
    constructor(params, gridParams){
        /*
        params = {
            name: "France",
            tag: "FRA",
            peer: socket.peer
        }
        gridParams = {
            ships: {
                0: Ship()
            }
        }

        */

        for(key in params){
            this[key] = params[key];
        }

        gridParams.owner = this;
        this.grid = new Grid(false, gridParams);

    }

    tirer(ennemi, y,x){
        
    }

}
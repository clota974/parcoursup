class Party{
    constructor(){
        /// ENUMS
        // (States)
        this.LOADING = Math.SQRT1_2;
        this.WELCOMING = Math.SQRT1_2/2;
        this.PLAYING = Math.SQRT1_2/3;

        this.state = this.LOADING;

        this.teams = {};

    }

    addUser(user){
        this.teams[user.tag] = user;

        user.peer.send({code: "Y2", text: `L'équipe ${params.name} (${params.tag}) est arrivée` })
    }
}
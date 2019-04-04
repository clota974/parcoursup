superglobal.peers = {};

class Peer{
    constructor(socket){
        var $this = this;
        this.peer = this;
        this.socket = socket;
        this.id = socket.id;

        socket.on("disconnect", (msg)=> this.onDisconnect(msg));
        socket.on("signal", (msg)=> this.onSignal(msg));

        this.send({code: "Y1", text: "Successfully connected"});
    }

    onDisconnect(){
        output("Client disconnected #"+this.id, "gray");

        if(this.hasOwnProperty("user")){
            this.user.delete();
            delete superglobal.peers[this.user.username];
        }

        

        delete this;
        console.log(this)
    }

    register(msg){
        if(msg.code === "C2"){
            if(_Party.users.hasOwnProperty(msg.value)){
                this.send("signal", {code: "E2", text: "Non d'utilisateur déjà pris"});

                return false;
            }

            _Party.team[msg.value.tag] = this;
            this.team = new Team({name: msg.value.name, tag: msg.value.tag, peer: this});

            return true;   
        }

        return false;
    }

    send(msg){
        this.socket.emit("signal", msg);
    }

    
}

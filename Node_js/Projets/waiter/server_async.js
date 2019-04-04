(function(){///Function isolator
    
    require = window.nodeRequire;
    
    const http = require('http');
    const url = require("url");
    const fs = require("fs");
    
    var server = null;
    
    $(document).ready(function() {
        $$.sendEvt("#serverState on")
    });
    
    
    $$.registerEvt("#serverState on", function () {
        startServer();
    });
    $$.registerEvt("#serverState off", function () {
        stopServer();
    });
    
    output = function (text) {
        $("output").html(text);
    }
    
    startServer = function () {
        var port = $("#port").val();
        
        server = http.createServer(function (req, res) {
            var page = req.url;
            
            if(page==="/") page = "/index.sjs";
            output(`A user is connected at ${page}`);
            
            var filePath = __dirname+"/pages"+page;
            
            var fileExists = fs.existsSync(filePath);
            
            if(!fileExists){
                output("404 at "+ page);
                
                var file = processFile(__dirname+"/pages/404.html");
                
                file.then(function (resp) {
                    res.writeHead(404, {"Content-Type": "text/html"});
                    res.write(resp);
                    res.end();
                });
                
                return false;
            };
            
            var file = processFile(__dirname+"/pages"+page);
            
            file.then(function (resp) {
                if(resp===null){
                    res.writeHead(404);
                    res.end();
                    output(`Error at ${page} <br/>${err}`);
                }
                
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(resp);
                res.end();
            })
            
            file.catch(function (errCode) { 
                res.writeHead(errCode);
                res.end();
            });
        });
        
        server.listen(port, function(){
            output("The server is serving. Waiter is waiting for a request.");
        });
    }
    
    stopServer = function () {
        var conf = confirm("L'application va redemarrée. Toutes les modifications non sauvegardées seront perdues.");
        if(conf){
            server.close();
            window.location.reload();
        }else{
            $("#serverState").removeClass("shift");
        }
    }
    
    processFile = function (path) {
        return new Promise(
            function (resolve, reject) {
                fs.readFile(path, function (err, data) {
                    if(err){
                        console.log(err);
                    }
                    
                    var html = "";
                    
                    // Décode le fichier depuis l'array de Bytes
                    $(data).each(function (ix, val) {
                        $(val).each(function (ix, val) {
                            html += String.fromCharCode(val);
                        });
                    });
                    lines = html.split("\n");
                    
                    
                    if(path.match(/\.sjs$/)){ //Compute only if file is a sjs file
                        computing = computeLanguage({
                            html, path, reject
                        });
                        
                        computing.then(function (response) { 
                            resolve(response);
                        });
                    }else{
                        resolve(html);
                    }                    
                })})}
                
            })();///Function isolator
            
            
            var computeLanguage = function(vars){
                var sra = require("string-replace-async");
                var asyncEval  = require("async-eval")
                
                return new Promise(function(resolve, reject){
                    // Change working directory
                    process.chdir(__dirname+"/pages/");
                    
                    with(vars){
                        var serverVars = {
                            document: null,
                            window: {},
                            alert: null, confirm: null, prompt: null,
                            
                            echo: function (text) { serverVars.__output += text },
                            
                            requireMod: function(moduleName){
                                serverVars.__mods[moduleName] = require(moduleName);
                            },

                            __deepFunctions: {
                                await: function(variable){
                                    serverVars.__toWait[variable] = true;
                                },
                                sendPage: function(){
                                    var authorizeSending = true;
                                    for (const key in serverVars.__toWait) {
                                        if(serverVars.__toWait[key] == true){ // If there is vars to await
                                            console.warn(key);
                                            
                                            authorizeSending = false;
                                            break;
                                        }
                                    }

                                    if(!authorizeSending) return false; // If there's var to await, return false
                                    serverVars.__deepFunctions.forceSendPage();
                                },
                                forceSendPage: function(){
                                    resolve(serverVars.__page);
                                    clearInterval(serverVars.__sendInterval);
                                }
                            },

                            __mods: {},
                            __output: "",
                            __functionsList: {},
                            __asyncFunctionsList: {},
                            __toWait: {}, // List of vars we wait to be true before sending request
                            __toEval: {},
                            __page: html,
                            __sendInterval: null
                        };
                        
                        // Compiler;
                        (function(){
                            with(serverVars){
                                
                                // {{variableToBeWritten}} --> Quick Writing Shortcut --> QWS
                                __page = __page.replace(/{{(.+)}}/g, function ($0, $1) {
                                    return `<% echo(${$1}); %>`;
                                });
                                
                                // @exec functionName
                                __page = __page.replace(/@exec (\w+);/, function($0,$1){
                                    return `__toEval["${$1}"]();`
                                });
                                
                                // @eval functionName ...statements @evalEnd
                                __page = __page.replace(/@eval (\w+)([\s\S]*) @evalEnd/, function($0, $1, $2){
                                    serverVars.__toEval[$1] = function(){
                                        eval($2);
                                    }
                                    return "";
                                });
                                
                                // (Async) Functions list for async eval
                                __page = __page.replace(/(async )?@function ([\w$]+)\(.*\) *\{([\s\S]*?)\}@endf;/g, function ($0, $1, $2, $3) {
                                    var statements = /\{([\s\S]*)\}/g.exec($0)[1];
                                    console.log(statements);

                                    if($1){
                                        //// todo : proxy
                                        //debugger;
                                        
                                        //serverVars.__asyncFunctionsList[$2] = eval($2);
                                    }
                                    
                                    serverVars[$2] = function (text) { eval(statements)  }
                                    
                                    return "";
                                });

                                // Await function
                                __page = __page.replace(/@await (\w+);/, function($0, $1){
                                    var valueOf_$1 = (()=> $1)();
                                    serverVars.__deepFunctions.await(valueOf_$1);
                                    return "";
                                });

                                // Resolve function
                                __page = __page.replace(/@resolve (\w+);/, function($0, $1){
                                    return `__toWait["${$1}"] = false;`
                                });

                                console.log(__page);
                                __page = __page.replace(/<% ([\s\S]*?) *%>/g, function ($0, $1) {
                                    serverVars.__output = "";
                                    
                                    try{
                                        var asyncEvalParams = {
                                            asyncFunction: serverVars.__asyncFunctionsList,
                                            context: serverVars
                                        }
                                        
                                        //var codeToEval = `with(serverVars){ $1 }`;
                                        
                                        var evalPromise = eval($1);          
                                    } catch (error) {
                                        output(`Error 500 at ${path} <br/>${error} <br/> in "${$1}"`);   
                                        console.error(`Error 500 at ${path}`, error);         
                                        reject(500);
                                        return "Error"
                                    }
                                });
                                
                                serverVars.__interval = setInterval(function(){
                                    serverVars.__deepFunctions.sendPage();
                                }, 50);
                            }
                        })();
                    }                    
                })
            }
            
            function resolveAfter2Seconds(x) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(x);
                    }, 2000);
                });
            };

$(document).ready(function(){
    var tokens;
    var infos;

    $("button#send").click(function () { 
        var apiURL = "https://api.sandbox.paypal.com/v1/oauth2/token";

        var defaultVars = {
            VERSION: "204.0",
            USER: "test-marchant-killian_api1.gmail.com",
            PWD: "RVH5YNH73H2PUQT4",
            SIGNATURE: "AclM2lLB3a8JoIabI-JqGpbMwjg5ADspDxbbVRp35NObiKpMRV8mY2i7",
            EMAIL: "test-marchant-killian@gmail.com"
        }

        var requestVars = {
            METHOD: "SetExpressCheckout",
            RETURNURL: "http://192.168.0.16:3000",
            CANCELURL: "http://192.168.0.16:3000",
            AMT: "10.0"
        }

        var data = apiURL;

        for (const key in defaultVars) {
            if (defaultVars.hasOwnProperty(key)) {
                requestVars[key] = defaultVars[key];
            }
        }
        /*for (const key in requestVars) {
            if (requestVars.hasOwnProperty(key)) {
                finalURL += encodeURIComponent(key)+"="+encodeURIComponent(requestVars[key])+"&"
            }
        }*/

        var appUser = `AR1r7RP4NFESERQKAhPtASA_g9KuWPOixUJUaNNycHSANIn5ky5s9y0l0HOv4X2rSaXTVyN8E-vw3A7F`;
        var appPwd = `EDGdUX0Cc5be65XMnOD9YREbQTCoajnVpasXcHO3H8wUwz2tdezyj9jl_VPSvDFdEpUd_KwL5Z8N9kaN`

        window.req = req = $.ajax({
            url: apiURL,
            data: `https://api.sandbox.paypal.com/v1/oauth2/token`,
            type: 'POST',
            data: "grant_type=client_credentials",
            headers: {
                Accept: "application/json",
                "Accept-Language": "en_US",
                "Authorization": "Basic " + btoa(appUser+":"+appPwd)
            },
            error: function (res) { 
                console.warn($.parseJSON(res.responseText));
            },
            success: function (res) {
                console.log(res);
                tokens = res;
            }
        })
     });

     $("button#req").click(function () { 
        var dataToSend = {
            "intent": "sale",
            "redirect_urls": {
                "return_url": "http://192.168.0.16",
                "cancel_url": "http://192.168.0.16"
            },
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [{
                "amount": {
                "total": "7.47",
                "currency": "USD"
                }
            }]
        }
        
        var dataToSend = JSON.stringify(dataToSend);
        $.ajax({
            url: "https://api.sandbox.paypal.com/v1/payments/payment",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+tokens.access_token
            },
            type: "POST",
            data: dataToSend,
            success: function (res) { 
                console.info(res);
                infos = res;
            },
            error: function (res) { 
                console.warn(res);
            }
        });
      });

      window.execc = function(payerId){
        $.ajax({
            url: infos.links[2].href,
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer "+tokens.access_token
            },
            type: "POST",
            data: `{"payer_id": "${payerId}"}`,
            success: function (res) { 
                console.info(res);
            },
            error: function (res) { 
                console.warn(res);
            }
        });
      }
});
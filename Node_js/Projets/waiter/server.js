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
          $(data).each(function (ix, val) {
            $(val).each(function (ix, val) {
              html += String.fromCharCode(val);
            });
          });
          lines = html.split("\n");
          
          
          if(path.match(/\.sjs$/)){ //Compute only if file is a sjs file
            html = computeLanguage({
              html, path, reject
            });
          }
          
          
          resolve(html);
        })})}
        
      })();///Function isolator
      
      
      var computeLanguage = function(vars){

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
            __mods: {},
            __output: ""
          };
          
          (function(){
            with(serverVars){
              
              // {{variableToBeWritten}} --> Quick Writing Shortcut
              html = html.replace(/{{(.+)}}/g, function ($0, $1) {
                return `<% document.write(${$1}); %>`;
              });
              
              // Variable asignment
              html = html.replace(/([\w|$]+) = (.+);/g, function ($0, $1, $2) {
                return `(()=>{${$1} = ${$2};})();`;
              });
              
              
              html = html.replace(/<% ([\s\S]*?) *%>/g, function ($0, $1) {
                serverVars.__output = "";

                try{
                  //$1 += `;""`;
                  var scriptedText = eval($1);               
                  return serverVars.__output;
                } catch (error) {
                  output(`Error 500 at ${path} <br/>${error} <br/> in "${$1}"`);   
                  console.error(`Error 500 at ${path}`, error);         
                  reject(500);
                }
              });
              
            }
          })();
        }
        
        return vars.html;
      }

      function resolveAfter2Seconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, 2000);
        });
      };
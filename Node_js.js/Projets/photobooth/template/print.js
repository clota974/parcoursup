$(document).ready(function() {
  r = window.nodeRequire("electron").remote;
  wc = r.getCurrentWebContents();

  $("body").keyup(function (e) {
    if(e.key=="p"){
      wc.print({printBackground: true});
    }
  });

  $(document).on('readystatechange', function(){
    if(document.readyState != 'complete') return false;

    if(wc.isFocused()==false){
      wc.print({silent: true, printBackground: true});
      setTimeout(function () {
        window.close();
      }, 1000);
    }
  });
});

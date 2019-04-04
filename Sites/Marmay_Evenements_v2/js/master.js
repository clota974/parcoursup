$(document).ready(function() {
  $("a[href$='.php']").on("click" ,function () {
    $("div.loading").removeClass("hide");
  });

  hideDialog();

  $("header .headNav li").click(function () {
    var url = $(this).children("a").attr("href");
    window.location.href = url;
  });

  $("input").focus(function () {
    $(this).parent("div.input").addClass("focus");
  });
  $("input").blur(function () {
    $(this).parent("div.input").removeClass("focus");
  });
  $("input").keydown(function () {
    if($(this).val().length>0){
      $(this).parent("div.input").addClass("full");
    }else{
      $(this).parent("div.input").removeClass("full");
    }
  });
  $("input").change(function () {
    if($(this).val().length>0){
      $(this).parent("div.input").addClass("full");
    }else{
      $(this).parent("div.input").removeClass("full");
    }
  });

  $(".diapo").each(function () {
    var diapo = $(this);
    var cont = $(this).children(".content");
    var contC = $(this).children(".control").children(".controlC");
    var page = 1;
    var total = $(cont).children(".diapage").length;

    $(cont).children(".diapage").each(function (ix) {
      $(this).css("left", ix*100+"%");
    });

    for (var i = 0; i < total; i++) {
      var naver = $("<div class='naver'></div>");
      $(contC).prepend(naver);
    }
    $(contC).children(".naver:nth-child(1)").addClass("focus");

    $(cont).children(".diapage[data-href]").css("cursor", "pointer");
    $(cont).children(".diapage[data-href]").click(function () {
      var href = $(this).attr("data-href");
      $("body").css("opacity", 0);
      setTimeout(function () {
        window.location.href = href;
      }, 100);
    });

    setInterval(function () {
      page++;
      if(page>total) page = 1;

      var actual = $(cont).children(".diapage:nth-child("+page+")");
      $(actual).addClass("d-focused");

      var pad = (page-1)*100+"%";
      $(cont).css("left", "-"+pad);

      $(contC).children(".naver").removeClass("focus");
      $(contC).children(".naver:nth-child("+page+")").addClass("focus");
    }, 7000);
  });

  $(".naver").click(function (e) {
    var naver = $(this);
    var ix = $(naver).index() + 1;

    var diapo = $(naver).parent().parent().parent();
    var cont = $(naver).parent().parent().siblings(".content");
    var contC = $(naver).parent();

    var pad = (ix-1)*100+"%";
    $(cont).css("left", "-"+pad);

    $(contC).children(".naver").removeClass("focus");
    $(this).addClass("focus");

  });

  dialog = function(data) {
    $("div.dialog h3").html(data.title);
    $("div.dialog p").html(data.text);
    $("div.dialog div.btns").html("");

    if(data.type){
      $("div.dialog").attr("data-type", data.type);
    }

    var btns = data.btns;
    for (var i = 0; i < btns.length; i++) {
      var el = btns[i];

      var $btn = document.createElement("button");
      $($btn).text(el.text);

      if(el.alt) $($btn).addClass("alt");

      $($btn).click(el.ev);
      $("div.dialog div.btns").append($btn);
    }

    $("div.abs").css("display", "block");
    setTimeout(function () {
      $("div.abs").addClass("active");
    }, 1);
  }

  $(".navBtn").click(showNav);
  $(".asideNav").click(hideNav);
});



hideDialog = function (){
  $("div.abs").removeClass("active");
  setTimeout(function () {
    $("div.abs").css("display", "none");

    $("div.dialog h3").html("Erreur");
    $("div.dialog p").html("Cette boîte de dialogue s'est mal chargée.");
    $("div.dialog div.btns").html("<button class='alt' onclick='hideDialog()'>OK</button>");
    $("div.dialog").removeAttr("data-type");
  }, 110);
  var a = 0;
  toast = function(data){
    var toast = $.parseHTML('<div class="toast"><p></p><div class="btns"><button type="button"></button></div></div>');
    var p = $(toast).children("p");
    var btn = $(toast).children(".btns").children("button");

    $(p).text(data.text);
    $(btn).text(data.btn.text);
    $(btn).click(data.btn.ev);

    // $("div.toast").css("bottom", 0);
    $("div.toaster").prepend(toast);

    setTimeout(function () {
      killToast(toast);
    }, 7000);
  }
  killToast = function (toast) {
    $(toast).css("height", "0");
    $(toast).css("margin-top", "0");

    setTimeout(function () {
      $(toast).remove();
    }, 1000);
  }

  $(".roll:not(.open)").mouseup(function () {
    $(this).addClass("open");
    var roll = $(this);
  });
  $(".roll h2").mousedown(function () {
    var roll = $(this).parent();

    if( $(roll).hasClass("open") ){
      setTimeout(function () { $(roll).removeClass("open"); }, 100);
    }
  });

  $("video:not([poster])").each(function () {
    $(this).trigger("play");
    $(this).trigger("pause");
  });

  zoomImage = function(original){
    original = original.currentTarget;
    console.log(original);
    $(".imgzoom").addClass("show");

    var bg = $(original).css("background-image");
    $(".imgzoom").css("background-image", bg);
  }
  unzoomImage = function () {
    $(".imgzoom").css("background-image", "none");
    $(".imgzoom").removeClass("show");
  }
  $("div.bg-img").click(zoomImage);
  $(".imgzoom").click(unzoomImage);

  $(document).on('readystatechange', function(){
    if(document.readyState == "complete"){
      $("div.loading").addClass("hide");
    }
  });

  var scrollTimes = 0;
  $("body").on("scroll", function () {
    scrollTimes++;

    if(scrollTimes>50) $(".scrollerTip").addClass("small");

    if(scrollTimes>100){
      $(".scrollerTip").animate({opacity: 0}, 1000, function () {
        $(".scrollerTip").css("display", "none");
      });
    }

  })
}

showNav = function () {
  $(".asideNav").css("display", "block");

  setTimeout(function () {
    $(".asideNav").addClass("show");
  }, 10);
}
hideNav = function (e) {
  if(e.target.tagName=="ASIDE"){
    $(".asideNav").removeClass("show");
    setTimeout(function () {
      $(".asideNav").css("display","none");
    }, 500);
  }
}

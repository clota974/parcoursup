const LEFT = "LEFT";
const RIGHT = "RIGHT";

const BOTTOM = "BOTTOM";
const TOP = "TOP";

canvas = {
  width: 550,
  height: 650,
  fill: "#333"
};
block = {
  width: 150,
  height: 35,
  fill: "#FFF",
  step: 1
}


class Block{

  constructor(id){
    var thi$ = this;

    this.width = block.width;
    this.height = block.height;

    this.moveRight = false;
    this.moveLeft = false;

    var elm = svg.rect(0, 0, block.width, block.height);
    elm.attr({fill: block.fill});
    this.el = elm;

    this.x = canvas.width/2 - this.width/2;
    this.y = id===1 ? 0 : canvas.height - this.height;

    this.interval = setInterval(function () {
      thi$.update();
    }, 1);

  }

  set x(val){
    if(this.el) this.el.attr({x: val});
  }
  get x(){
    if(this.el) return +this.el.attr("x");
  }

  set y(val){
    if(this.el) this.el.attr({y: val});
  }
  get y(){
    if(this.el) return +this.el.attr("y");
  }

  set width(val){
    if(this.el) this.el.attr({width: val});
  }
  get width(){
    if(this.el) return +this.el.attr("width");
  }

  move(direction){
    if(direction === RIGHT){
      this.moveRight = true;
    }
    if(direction === LEFT){
      this.moveLeft = true;
    }
  }

  stopMoving(direction){
    if(direction === LEFT){
      this.moveLeft = false;
    }
    if(direction === RIGHT){
      this.moveRight = false;
    }
  }

  update(){
    const max = canvas.width - block.width;
    if(this.x > 0 && this.moveLeft){
      this.x -= block.step;
    }
    if(this.x < max && this.moveRight){
      this.x += block.step;
    }

    this.el.attr({x: this.x})
  }
}

class Ball{

  constructor(){
    var thi$ = this;

    var cy = canvas.height / 2;
    var cx = canvas.width / 2;
    var size = 17;

    this.cy = cy;
    this.cx = cx;
    this.size = size;
    this.speed = 0;
    this.stick = false;
    this.offset = 0;

    var elm = svg.circle(cx, cy, size, size);
    elm.attr({fill: "#FFCB00", stroke: "#000"});

    this.el = elm;

    this.interval = setInterval(function () {
      thi$.update();
    }, 1);
  }

  place(id){
    this.stick = id;
    this.speed = 0;

    var elm = this.el;

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;


    if(id === 1){
      var x = +p1.el.attr("x");
      cy = block.height + this.size + 1;
      cx = x + (block.width/2);
    }else if(id === 2){
      var x = +p2.el.attr("x");

      cy = canvas.height - block.height - this.size - 1;
      cx = x + (block.width/2)
    }

    this.cx = cx;
    this.cy = cy;
    playing = true;
  }

  reset(){
    var thi$ = this;
    this.offset = 0;
    this.el.attr({fill: "#FF00AD"});

    setTimeout(function () {
      thi$.el.animate({cx: canvas.width/2, cy: canvas.height/2, fill: "#FFCB00"}, 100, mina.linear);
    }, 1000);
    setTimeout(function () {
      var ran = Math.round(Math.random()) + 1;
      ball.place(ran);
    }, 2000);
  }

  set cx(val){
    if(this.el) this.el.attr({cx: val});
  }
  get cx(){
    if(this.el) return +this.el.attr("cx");
  }

  set cy(val){
    if(this.el) this.el.attr({cy: val});
  }
  get cy(){
    if(this.el) return +this.el.attr("cy");
  }

  update(){
    if(this.stick){
      this.placeUpdate();
      return false;
    }

    var elm = this.el;

    this.cy += this.speed;
    this.cx += this.offset * this.speed;

    var bottom_max = canvas.height - block.height - this.size;
    if(this.cy >= bottom_max){
      this.check(BOTTOM);
    }else if(this.cy-this.size <= block.height){
      this.check(TOP);
    }

    if(this.cx-this.size <= 0  ||  this.cx+this.size >= canvas.width){
      this.offset *= -1; //Inverse the offset
    }
  }

  placeUpdate(){
    var thi$ = this;
    var {elm} = this;
    var sticker = null;
    if(this.stick == 1) sticker = p1;
    if(this.stick == 2) sticker = p2;

    this.cx = sticker.x + block.width/2;

    $(document).keypress(function (ev) {
      if(ev.key != " ") return false; // Barre d'espace
      if(thi$.stick === 1) thi$.speed = 1;
      if(thi$.stick === 2) thi$.speed = -1;

      thi$.stick = false;
    });
  }

  check(side){
    if(!playing) return false;
    var collision = false;

    if(side === BOTTOM){
      collision = this.cx > p2.x && this.cx < p2.x + p2.width;
    }else if(side === TOP){
      collision = this.cx > p1.x && this.cx < p1.x + p1.width;
    }

    if(!collision){
      this.speed = 0;
      playing = false;
      lose(side);
    }else{
      this.speed *= -1;
      this.bounceOnPlayer(side);
    }
  }

  bounceOnPlayer(side){
    var thi$ = this;

    // Calculate where the ball is on the paddle in percent
    var percent = (100 * (ball.cx - p2.x)) / 150; // Is changed if(side == TOP)
    if(side === TOP) percent = (100 * (ball.cx - p1.x)) / 150;
    $("h1").text(percent);

    var pad = side === BOTTOM ? -100 : 100;
    var x1 = this.cx;
    var y1 = this.cy + this.size;
    var x2 = x1 + pad;
    var y2 = y1 + pad;

    if(!this.line){
      // Used for calculating
      this.circle = svg.circle(x1, y1, 100);
      this.line = svg.path(`M ${x1} ${y1} L ${x2} ${y2}`);
    }

    this.circle.attr({cx: x1, cy: y1, fill: "rgba(0,0,0,0.5)", opacity: 0});
    this.line.attr({d:`M ${x1} ${y1} L ${x2} ${y2}`, stroke: "#FFF", "stroke-width": 3, opacity: 0})


    var deg = (180*percent)/100;
    var a = (deg+180)*Math.PI/180;
    var x = +this.circle.attr("cx") + +this.circle.attr("r") * Math.cos(a);
    var y = +this.circle.attr("cy") + +this.circle.attr("r") * Math.sin(a);
    this.line.attr({d: `M ${x1} ${y1} L ${x} ${y}`});


    var len = this.line.getTotalLength();

    for (var i = 0; i < len; i++) {
      var cy = ball.cy;
      let coords = this.line.getPointAtLength(i);

      if(Math.round(coords.y) === cy){
        this.offset = (this.cx - coords.x)/this.size;
        if(side===TOP) this.offset *= -1;
        break;
      }
    }
  }

}

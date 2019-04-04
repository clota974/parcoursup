$(document).ready(function() {
  playing = true;
  svg = Snap("#svg");

  rect = svg.rect(0, 0, canvas.width, canvas.height);
  rect.attr({fill: canvas.fill});

  var dash = svg.line(0, canvas.height/2, canvas.width, canvas.height/2);
  dash.attr({stroke: "white", "stroke-width": 2, "stroke-dasharray": "5,5"})

  pt = svg.circle(0,0, 10);
  pt.attr({fill: "lime"});

  p1 = new Block(1);
  p2 = new Block(2);


  $("body").keydown(function (ev) {
    if(ev.key === "a") p1.move(LEFT);
    if(ev.key === "z") p1.move(RIGHT);

    if(ev.key === "o") p2.move(LEFT);
    if(ev.key === "p") p2.move(RIGHT);
  });

  $("body").keyup(function (ev) {
    if(ev.key === "a") p1.stopMoving(LEFT);
    if(ev.key === "z") p1.stopMoving(RIGHT);

    if(ev.key === "o") p2.stopMoving(LEFT);
    if(ev.key === "p") p2.stopMoving(RIGHT);

    if(ev.key === "s") ball.speed = -1;
  });

  ball = new Ball();

  var ran = Math.round(Math.random()) + 1;
  ball.place(ran);
});

function lose(side){
  ball.reset();
}

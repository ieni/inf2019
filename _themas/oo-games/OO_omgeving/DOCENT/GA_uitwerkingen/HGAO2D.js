function setup() {
  canvas = createCanvas(910,200);
  canvas.parent('processing');
  noLoop();
  background('gainsboro');
  angleMode(DEGREES);
  rectMode(CENTER);
  stroke('lemonchiffon');
  strokeWeight(5);
  fill('plum');
}

function draw() {
  translate(30 + 40,100);
  rect(0,0,80,80);
  translate(80 + 30,0);
  push();
  rotate(15);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(30);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(45);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(60);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(60);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(75);
  rect(0,0,80,80);
  pop();
  translate(80 + 30,0);
  push();
  rotate(90);
  rect(0,0,80,80);
  pop();
}

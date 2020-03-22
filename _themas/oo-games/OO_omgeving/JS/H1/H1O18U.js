var xPositie = 0;
var yPositie = 30;
var schaal = 0.25;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  frameRate(15);
  colorMode(RGB,255,255,255,1);
  background(0,0,75,1);
}

function draw() {
  background(0,0,75,0.1);
  tekenSter(xPositie,yPositie,schaal);
  yPositie++;
  xPositie += 5;
  schaal += 0.05;
}

function tekenSter(x,y,s) {
  push();
  scale(s);
  strokeWeight(2);
  stroke('white');
  fill('khaki');
  translate(x,y);
  triangle(0,0,80,0,40,65);
  translate(0,40);
  triangle(0,0,80,0,40,-65);
  pop();
}
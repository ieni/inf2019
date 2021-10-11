var stipX = new Array(0,10,20,30,40,50,60,70,80,90);
var stipY = new Array(0,10,20,30,40,50,60,70,80,90);
var diameter = 50;

function setup() {
  canvas = createCanvas(900,255);
  canvas.parent('processing');
  frameRate(10);
  noStroke();
}

function draw() {
  background(240);
  fill(60,50,150);
  ellipse(60,60,diameter);
}
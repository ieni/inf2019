var aantal = 5;
var Nbloemen = 6;

function setup() {
  canvas = createCanvas(1000,200);
  canvas.parent('processing');
  frameRate(10);
  colorMode(RGB, 255, 255, 255, 1);
  angleMode(DEGREES);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background('lavender');
  fill('black');
  text("aantal = " + aantal,10,20);    
  translate(width / (2*Nbloemen),100);
  for (var b = 0;b < Nbloemen;b++) {
    tekenBloem(0.4);
    translate(width / Nbloemen,0);
  }
  
  if (keyIsDown(LEFT_ARROW) && aantal >= 2) {
    aantal--;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    aantal++;
  }   
}

function tekenBloem(s) {
  push();
  scale(s);
  fill(178, 34, 34,.7);
  for (var n = 0;n < aantal;n++) {
    ellipse(0,0,400,50);
    rotate(360 / aantal);
  }
  fill(255, 195, 0,.5);
  for (var n = 0;n < aantal;n++) {
    rect(0,0,75,75)
    rotate(360 / aantal);
  }
  pop();
}


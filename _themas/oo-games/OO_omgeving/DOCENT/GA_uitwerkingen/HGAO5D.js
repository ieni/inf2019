var schaal = 1;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
}

function draw() {
  background('slategrey');
  if (mouseIsPressed == true) {
    schaal *= 1.01;
  }
  else {
    schaal = 1;
  }

  tekenToby(schaal);
}

function tekenToby(s) {
  push();
  translate(225,50);
  scale(s);
  fill('darkslategrey');
  noStroke();
  triangle(0,0,-75,150,75,150);
  fill('white');
  stroke('lightslategrey');
  strokeWeight(10);
  translate(0,50);
  ellipse(-25,0,30);
  ellipse(25,0,30);
  fill('black');
  ellipse(-25,0,3);
  ellipse(25,0,3);
  translate(0,45);
  noStroke();
  fill('orangered');
  rect(-70,0,140,15);
  rect(-65,20,130,20);
  pop();
}



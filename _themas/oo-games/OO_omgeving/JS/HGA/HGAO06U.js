var xToby = 225;
var yToby = 5;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
}

function draw() {
  background('slategrey');
  tekenObstakel();
  tekenToby(xToby,yToby);
}

function tekenToby(x,y) {
  push();
  translate(x,y);
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
  noStroke();
  ellipse(-25,0,5);
  ellipse(25,0,5);  
  translate(0,45);
  noStroke();
  fill('orangered');
  rect(-70,0,140,15);
  rect(-65,20,130,20);  
  pop();
}

function tekenObstakel() {
  push();
  translate(0,420);
  noStroke();
  fill('peachpuff');
  rect(0,0,100,30);
  rect(275,0,175,30);
  pop();
}
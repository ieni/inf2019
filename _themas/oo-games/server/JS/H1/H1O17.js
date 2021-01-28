var schaal;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  noStroke();
}

function draw() {
  background('cornflowerblue');
  schaal = 1 + mouseY / height;

  // teken de grond
  fill('wheat');
  rect(0,250,width,height - 250);  

  tekenHuis();

  tekenBoom(700);
  tekenBoom(900);
}

function tekenHuis() {
  push();
  strokeWeight(4);
  stroke('darkgrey');
  fill('lightgray');
  rect(100,180,100,100);
  fill('gray');
  triangle(100,180,200,180,150,100);
  noStroke();
  rect(120,230,30,50);
  pop();
}

function tekenBoom(x) {
  push();
  noStroke();
  fill('sienna');
  rect(x,130,40,130);
  fill('olive');
  ellipse(x + 20,130,100,150);
  pop();
}
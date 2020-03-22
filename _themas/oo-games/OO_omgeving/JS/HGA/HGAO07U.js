var aantal = 50;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noLoop();
}

function draw() {
  tekenRaster();
  tekenStip(4,1);
}

function tekenRaster() {
  push();
  fill('linen');
  strokeWeight(5);
  stroke(255);
  rect(4*50,1*50,50,50);
  pop();
}

function tekenStip(x,y) {
  var str = 15;
  push();
  noStroke();
  fill('darkgoldenrod');
  translate((x + 0.5)*50,(y + 0.5)*50);
  ellipse(0,0,str*2);
  pop();
}
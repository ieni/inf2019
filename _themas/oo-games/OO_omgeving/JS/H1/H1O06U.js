function setup() {
  canvas = createCanvas(900,200);
  background('lavender');
  canvas.parent('processing');
  noLoop();
}

function draw() {
  noStroke();
  fill('thistle');
  translate(50,50);
  rect(0,0,100,100);
  translate(140,0);
  rect(0,0,100,100);
  translate(140,0);
  rect(0,0,100,100);
  translate(140,0);
  push();
  translate(0,40);
  stroke('cornsilk');
  strokeWeight(20);
  fill('teal');
  rect(0,0,100,100);  
  translate(140,0);
  rect(0,0,100,100);
  pop();  
  translate(140,0);
  rect(0,0,100,100);  
}

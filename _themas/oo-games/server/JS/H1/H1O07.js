function setup() {
  canvas = createCanvas(450,450);
  background('lavender');
  canvas.parent('processing');
  noLoop();
  colorMode(RGB, 255, 255, 255, 1);
  fill(178, 34, 34,.5);
}

function draw() {
  noStroke();
  translate(125,125);
  rect(0,0,200,200);
  
  rotate(0);
  
  rect(0,0,200,200);
}

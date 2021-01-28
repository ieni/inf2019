function setup() {
  canvas = createCanvas(450,450);
  background('white');
  canvas.parent('processing');
  noLoop();
  // colorMode(RGB,255,255,255,1);  
}

function draw() {
  noStroke();
  // fill(0,0,255,0.3);
  fill('red');
  rect(0,150,450,150);
  fill('green');
  rect(0,0,150,450);
  fill('blue');  
  rect(75,0,375,450);
}
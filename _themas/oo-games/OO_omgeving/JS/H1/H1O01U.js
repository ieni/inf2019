function setup() {
  canvas = createCanvas(450,450);
  background('grey');
  canvas.parent('processing');
  noLoop();
}

function draw() {
  noStroke();
  fill('green');
  ellipse(225,225,400);
  fill('white');
  ellipse(225,225,300);
  stroke('green');
  fill('white');
  strokeWeight(10);
  rect(125,125,200,200);  
}

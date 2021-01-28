function setup() {
  canvas = createCanvas(450,450);
  background('silver');
  canvas.parent('processing');
  //noLoop();
}

function draw() {
  noStroke();
  fill('steelblue');
  ellipse(0,0,800);
  fill('deepskyblue');
  ellipse(450,450,400);
}
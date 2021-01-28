function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noLoop();
  background(240,240,240);
}

function draw() {
  noStroke();
  fill(250,225,175);
  triangle(0,150,450,0,300,450);
}

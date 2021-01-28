function setup() {
  canvas = createCanvas(450,450);
  background('cornflowerblue');
  canvas.parent('processing');
  noLoop();
}

function draw() {
  noStroke();
  fill('tan');
  translate(25,25);
  
  rect(0,0,400,400);
  translate(200,50);
  
  fill('peru');
  rect(0,0,150,150);
}

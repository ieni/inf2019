var hoogte = 150;

function setup() {
  canvas = createCanvas(450,300);
  canvas.parent('processing');
  background('gainsboro');
  noStroke();
  fill('silver');
  rect(0,hoogte,450,hoogte);
}

function draw() {
  fill('plum');
  ellipse(mouseX,mouseY,10);
  fill('mediumorchid');
  ellipse(mouseX,mouseY + hoogte,10);
}

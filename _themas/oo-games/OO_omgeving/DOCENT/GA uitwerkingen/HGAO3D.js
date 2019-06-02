var hoogte = 150;

function setup() {
  var myCanvas = createCanvas(450,300);
  myCanvas.parent('processing');
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

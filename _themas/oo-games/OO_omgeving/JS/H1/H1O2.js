function setup() {
  var myCanvas = createCanvas(450,450);
  background('orange');
  myCanvas.parent('processing');
  noLoop();
}

function draw() {
  noStroke();
  fill('darkred');
  triangle(225,0,0,450,450,450);
}

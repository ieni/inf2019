function setup() {
  var myCanvas = createCanvas(450,450);
  background('silver');
  myCanvas.parent('processing');
  noLoop();
}

function draw() {
  noStroke();
  fill('steelblue');
  ellipse(0,0,800);
  fill('deepskyblue');  
  ellipse(450,450,400);
}
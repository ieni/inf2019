var stipX = new Array(0,10,20,30,40,50,60,70,80,90);
var stipY = new Array(0,10,20,30,40,50,60,70,80,90);
var diameter = 50;

function setup() {
  canvas = createCanvas(900,255);
  canvas.parent('processing');
  frameRate(10);
  noStroke();
}

function draw() {
  background(240);
  for (var s = 0; s < stipX.length;s++) {
    fill(stipY[s],50,150);
    ellipse(stipX[s],stipY[s],diameter);
  }
  stipX.push(mouseX);
  stipY.push(mouseY);
  stipX.shift();
  stipY.shift();
}
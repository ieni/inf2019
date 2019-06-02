var strand;
var strandX;

function preload() {
  strand = loadImage("images/backgrounds/strand.jpg");
}

function setup() {
  var myCanvas = createCanvas(600,400);
  myCanvas.parent('processing');
  strandX=0;
  fill('black');
  textFont("Verdana");
  textSize(14);  
}

function draw() {
  background('grey');
  image(strand,strandX,0);
  image(strand,strandX + width,0);

  if (keyIsDown(RIGHT_ARROW)) {
    strandX++;
  }
  else {
    strandX--; 
  }
  text("strandX=" + strandX,20,20);
}
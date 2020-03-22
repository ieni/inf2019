var strand;
var strandX = 0;

function preload() {
  strand = loadImage("images/backgrounds/strand.jpg");
}

function setup() {
  canvas = createCanvas(600,400);
  canvas.parent('processing');
}

function draw() {
  background('grey');
  image(strand,strandX,0);
  // image(strand,strandX + strand.width,0);  

  strandX--;
}
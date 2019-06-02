var strand;
var strandX = 0;

function preload() {
  strand = loadImage("images/backgrounds/strand.jpg");
}

function setup() {
  var myCanvas = createCanvas(600,400);
  myCanvas.parent('processing');
}

function draw() {
  background('grey');
  image(strand,strandX,0);
  image(strand,strandX + strand.width,0);
  strandX--;
  if (strandX == -strand.width) {
    strandX = 0;
  }  
}
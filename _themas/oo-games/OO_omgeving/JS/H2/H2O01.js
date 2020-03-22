var kater,katerKlein,landschap,kever;
var keverX;
var keverY;

function preload() {
  kater = loadImage("images/brieck.jpg");
  bomen = loadImage("images/bomen.jpg");
  kever = loadImage("images/sprites/kever.png");
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  keverX = 150;
  keverY = 100;
}

function draw() {
  background(bomen);  
  // image(katerKlein,0,0);
  keverX+=random(-5,5);
  keverY+=random(-5,5);
  // image(kever,keverX,keverY);
}
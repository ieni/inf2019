var kater,katerKlein,landschap,kever;
var keverX;
var keverY;

function preload() {
  kater = loadImage("images/brieck.jpg");
  bomen = loadImage("images/bomen.jpg");
  kever = loadImage("images/sprites/kever.png");
}

function setup() {
  var myCanvas = createCanvas(450,450);
  myCanvas.parent('processing');
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
var bomen;
var kever;
var keverX;
var keverY;

function preload() {
  bomen = loadImage("images/bomen.jpg");
  kever = loadImage("images/sprites/kever.png");
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  keverX = 150;
  keverY = 100;
}

function draw() {
  background(bomen);
  keverX += random(-5,5);
  keverY += random(-5,5);
  image(kever,keverX,keverY);
  
  fill('cornsilk');
  rect(0,410,450,40);
  fill('black');  
  text("Het keverplaatje heeft breedte " + kever.width + " px en hoogte " + kever.height + " px.",10,435);
}
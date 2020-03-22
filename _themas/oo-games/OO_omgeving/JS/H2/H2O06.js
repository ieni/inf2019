var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;

var spriteJos;
var xJos = 400;
var yJos = 300;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(10);
  celGrootte = width / aantalKolommenRaster;
}

function draw() {
  background(brug);
  tekenRaster();

  if (keyIsDown(RIGHT_ARROW)) {
    xJos += celGrootte;
  }
  
  xJos = constrain(xJos,0,width - celGrootte);
  
  image(spriteJos,xJos,yJos);
}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  for (var rij = 0;rij < aantalRijenRaster;rij++) {
    for (var kolom = 0;kolom < aantalKolommenRaster;kolom++) {
      rect(kolom*celGrootte,rij*celGrootte,celGrootte,celGrootte);
    }
  }
  pop();
}
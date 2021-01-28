var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;

var animatie = [];
var aantalBeeldjes = 6;
var nummer = 3;

var frame;
var xJos = 400;
var yJos = 300;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  frame = loadImage("images/sprites/Jos100px/Jos_0.png");
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

  if (keyIsDown(LEFT_ARROW)) {
    xJos -= celGrootte;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xJos += celGrootte;
  }
  if (keyIsDown(UP_ARROW)) {
    yJos-=celGrootte;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yJos += celGrootte;
  }
  
  xJos = constrain(xJos,0,width - celGrootte);
  yJos = constrain(yJos,0,height - celGrootte);
  
  image(frame,xJos,yJos);
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
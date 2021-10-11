var raster = {
  aantalRijen: 6,
  aantalKolommen: 9,
  celGrootte: null,
  
  berekenCelGrootte() {
    this.celGrootte = width / this.aantalKolommen;
  },
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

var animatie = [];
var aantalBeeldjes = 6;
var nummer = 3;
var frame;
var xJos = 400;
var yJos = 300;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  for (var b = 0;b < aantalBeeldjes;b++) {
    frame = loadImage("images/sprites/Jos100px/Jos_"+b+".png");
    animatie.push(frame);
  }
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(10);
  raster.berekenCelGrootte();
}

function draw() {
  background(brug);
  raster.teken();

  if (keyIsDown(LEFT_ARROW)) {
    xJos -= raster.celGrootte;
    nummer = 2;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xJos += raster.celGrootte;
    nummer = 1;
  }
  if (keyIsDown(UP_ARROW)) {
    yJos -= raster.celGrootte;
    nummer = 4;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yJos += raster.celGrootte;
    nummer = 5;
  }
  
  xJos = constrain(xJos,0,width - raster.celGrootte);
  yJos = constrain(yJos,0,height - raster.celGrootte);
  
  image(animatie[nummer],xJos,yJos,raster.celGrootte,raster.celGrootte);
}
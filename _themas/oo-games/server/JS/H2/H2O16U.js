var spriteSheet;
var rij = 2;
var kolom = 0;
var aantalSpriteRijen = 4;
var aantalSpriteKolommen = 12;

var schaal = 2.0;
var breedte; 
var hoogte; 
var sBr; 
var sHo; 
var br;
var ho; 
var x = 190; 
var y = 100;

function preload() {
  spriteSheet = loadImage("images/sprites/Pony.png");
}

function setup() {
  canvas = createCanvas(460,280);
  canvas.parent('processing');
  textFont("Georgia");
  textSize(18);
  noStroke();
  frameRate(10);
  breedte = spriteSheet.width;
  hoogte = spriteSheet.height;
  sBr = breedte / aantalSpriteKolommen;
  sHo = hoogte / aantalSpriteRijen;
  br = sBr*schaal;
  ho = sBr*schaal;  
}

function draw() {
  background('lavender');
  image(spriteSheet,x,y,br,ho,(kolom % aantalSpriteKolommen)*sBr,rij*sHo,sBr,sHo);

  if (keyIsDown(LEFT_ARROW)) {
    rij = 1;
    x -= 10;
    kolom++;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rij = 2;
    x += 10;
    kolom++;
  }
  if (keyIsDown(UP_ARROW)) {
    rij = 3;
    y -= 10;
    kolom++;
  }
  if (keyIsDown(DOWN_ARROW)) {
    rij = 0;
    y += 10;
    kolom++;
  }
  x = constrain(x,0,width - br);
  y = constrain(y,0,height - ho);
}
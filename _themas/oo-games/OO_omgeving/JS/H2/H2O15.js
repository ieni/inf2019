var spriteSheet;
var rij = 0;
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
var y = 30;

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
  image(spriteSheet,x,y,br,ho,(frameCount % aantalSpriteKolommen)*sBr,rij*sHo,sBr,sHo);

  kolom = frameCount % aantalSpriteKolommen;

  fill('black');
  text("frameCount=" + frameCount,5,20);
  text("kolom=" + kolom,5,40);
  text("rij=" + rij,5,60);
  
  fill('white');
  rect(0,125,width,height - 125);
  image(spriteSheet,0,125,width,width*aantalSpriteRijen / aantalSpriteKolommen);  
}
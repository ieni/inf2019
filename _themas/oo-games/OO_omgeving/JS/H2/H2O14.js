var spriteSheet;
var rij = 0;
var aantalSpriteRijen = 2;
var aantalSpriteKolommen = 9;

var schaal = 0.25;
var breedte; 
var hoogte; 
var sBr; 
var sHo; 
var br; 
var ho; 
var x = 100; 
var y = 30; 

function preload() {
  spriteSheet = loadImage("images/sprites/Alice460px/Alice_LR_460x460_2x9.png");
}

function setup() {
  canvas = createCanvas(460,300);
  canvas.parent('processing');
  textFont("Georgia");
  textSize(18);
  noStroke();
  frameRate(2);
  breedte = spriteSheet.width;
  hoogte = spriteSheet.height;
  sBr = breedte / aantalSpriteKolommen;
  sHo = hoogte / aantalSpriteRijen;
  br = sBr*schaal;
  ho = sBr*schaal;
}

function draw() {
  background('wheat');
  image(spriteSheet,x,y,br,ho,(frameCount % aantalSpriteKolommen)*sBr,rij*sHo,sBr,sHo);
  image(spriteSheet,x + 175,y,115,115,0,0,460,460);

  kolom = frameCount % aantalSpriteKolommen;

  if (kolom == 0) {
    if (rij == 0) {
      rij = 1;
    }
    else {
      rij = 0;
    }
  }

  fill('black');
  text("frameCount=" + frameCount,5,20);
  text("kolom=" + kolom,5,40);
  text("rij=" + rij,5,60);
  
  fill('white');
  rect(0,180,width,120);
  image(spriteSheet,0,180,width,width*aantalSpriteRijen / aantalSpriteKolommen);  
}
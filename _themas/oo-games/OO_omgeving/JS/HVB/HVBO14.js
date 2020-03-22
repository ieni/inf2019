var spriteSheet;
var rij = 0;
var aantalSpriteRijen = 2;
var aantalSpriteKolommen = 9;

// de schaal waarop de sprite wordt afgebeeld t.o.v. het origineel
var schaal = 0.25;
// de volledige breedte van de totale afbeelding
var breedte; 
// de volledige hoogte van de totale afbeelding
var hoogte; 
// de breedte van één frame van de afbeelding
var sBr; 
// de hoogte van één frame van de afbeelding
var sHo; 
// de breedte van de sprite zoals die op het canvas moet komen
var br; 
// de hoogte van de sprite zoals die op het canvas moet komen
var ho; 
// horizontale verplaatsing voordat de sprite wordt getoond
var x = 50; 
// verticale verplaatsing voordat de sprite wordt getoond
var y = 40; 

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
  sBr = breedte/aantalSpriteKolommen;
  sHo = hoogte/aantalSpriteRijen;
  br = sBr*schaal;
  ho = sBr*schaal;
}

function draw() {
  background('orange');
  image(spriteSheet,x,y,br,ho,(frameCount % aantalSpriteKolommen)*sBr,rij*sHo,sBr,sHo);
    // Onderstaande code toont één van de frames uit de spritesheet
  
  image(spriteSheet,x + 125,y,115,115,920,460,460,460);
  
  // Dit werkt ook maar is nog ingewikkelder. Nu zijn alle berekeningen van de setup verwerkt binnen de aanroep van de image-functie. Op die manier heb je alleen nog maar rij, kolom en schaal nodig als variabelen
  
    image(spriteSheet,x + 250,y,spriteSheet.width/aantalSpriteKolommen*schaal,spriteSheet.height/aantalSpriteRijen*schaal,(frameCount % aantalSpriteKolommen)*sBr,rij*spriteSheet.height/aantalSpriteRijen,spriteSheet.width/aantalSpriteKolommen,spriteSheet.height/aantalSpriteRijen);
  // Gebruik modulo-rekenen om van beeldje te wisselen
  
  kolom = frameCount % aantalSpriteKolommen;
  // Als de waarde van kolom teruggaat naar 0, dan zijn we aan het eind van een rij. Ga dan eerst naar de volgende rij
  
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
  
  // toon de volledige afbeelding op een witte achtergrond
  
  fill('white');
  rect(0,180,width,120);
  image(spriteSheet,0,180,width,width*aantalSpriteRijen/aantalSpriteKolommen);  
}
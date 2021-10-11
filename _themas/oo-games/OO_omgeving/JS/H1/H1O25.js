var straal = 20;
var xPositie;
var yPositie;
var xSnelheid = 8;
var ySnelheid = 5;
var onderlingeAfstand;


function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  frameRate(50);
  colorMode(RGB,255,255,255,1);
  background(0,0,75,1);
  noStroke();
  textFont("Verdana");
  textSize(140);
  xPositie = straal;
  yPositie = height / 2;
}

function draw() {
  background(0,0,75,0.05);
  fill(0,0,255,1);
  ellipse(550,height - straal,2*straal);
  xPositie += xSnelheid;
  yPositie += ySnelheid;
  fill(255,255,255,1);
  ellipse(xPositie,yPositie,2*straal);  
  
  // Pas onderstaande regel aan: gebruik de functie dist om de onderlinge afstand te bepalen
  
  onderlingeAfstand = 1;
  if (onderlingeAfstand <= 0) {
    eindScherm();
    noLoop();
  }
  
  // door de slashes weg te halen kun je besturing van de bal inschakelen.
  // Om het wat moeilijker te maken veranderen er bij gebruik van een pijltoets 2 dingen tegelijkertijd.
  
  // gebruikBesturing();

  if (yPositie<straal || yPositie>height-straal) {
    ySnelheid *= -1;
  } 
}

function gebruikBesturing() {
  if (keyIsDown(LEFT_ARROW)) {
    xSnelheid += 1;
    ySnelheid += 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xSnelheid -= 1;
    ySnelheid -= 1;
  }    
}

function eindScherm() {
  background('white');
  fill('black');
  text("GEVANGEN!",75,200);
  noLoop();
}
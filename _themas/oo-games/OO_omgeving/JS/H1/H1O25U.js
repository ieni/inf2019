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
  onderlingeAfstand=round(dist(550,height - straal,xPositie,yPositie)) - 2*straal;
  if (onderlingeAfstand <= 0) {
    eindScherm();
    noLoop();
  }
  
  gebruikBesturing();

  if (yPositie<straal || yPositie>height - straal) {
    ySnelheid *= -1;
  }
  if (xPositie<straal || xPositie>width - straal) {
    xSnelheid *= -1;
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
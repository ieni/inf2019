class Bom {
  constructor() {
    this.x = floor(random(1,raster.aantalKolommen))*raster.celGrootte;
    this.y = floor(random(0,raster.aantalRijen))*raster.celGrootte;
  }
  
  toon() {
    image(bomPlaatje,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

class Jos {
  constructor() {
    this.x = 0;
    this.y = 200;
    this.animatie = [];
    this.frameNummer =  3;
    this.stapGrootte = null;
    this.gehaald = false;
    this.aanDeBeurt = true;
    this.staOpBom = false;
  }
  
  beweeg() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
      this.aanDeBeurt = false;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
      this.aanDeBeurt = false;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
      this.aanDeBeurt = false;
    }
    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height-raster.celGrootte);
    
    if (this.x == canvas.width) {
      this.gehaald = true;
    }
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }
  
  staatOp(bommenLijst) {

    return this.staOpBom;
  }  
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png");
}

var bommenArray = [];

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  
  raster = new Raster(6,9);
  
  raster.berekenCelGrootte();
  bom1 = new Bom();
  
  eve = new Jos();
  eve.stapGrootte=1*raster.celGrootte;
  for (var b = 0;b < 6;b++) {
    frameEve = loadImage("images/sprites/Eve100px/Eve_" + b + ".png");
    eve.animatie.push(frameEve);
  }
  
  alice = new Vijand(700,200);
  alice.stapGrootte = 1*eve.stapGrootte;
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");

  bob = new Vijand(600,400);
  bob.stapGrootte = 1*eve.stapGrootte;
  bob.sprite = loadImage("images/sprites/Bob100px/Bob.png");  
}

function draw() {
  background(brug);
  raster.teken();
  bom1.toon();

  if (eve.aanDeBeurt) {
    eve.beweeg();
  }
  else {
    alice.beweeg();
    bob.beweeg();
    eve.aanDeBeurt = true;
  }
  
  if (alice.x == bob.x && alice == bob.y) {
    bob.beweeg();
  }
  
  eve.toon();
  alice.toon();
  bob.toon();
  
  if (eve.wordtGeraakt(alice) || eve.wordtGeraakt(bob) || eve.staatOp(bommenArray)) {
    background('red');
    fill('white');
    text("Je hebt verloren!",30,300);
    noLoop();
  }

  if (eve.gehaald) {
    background('green');
    fill('white');
    text("Je hebt gewonnen!",30,300);
    noLoop();
  }
}

// deze klasses worden in deze opgave niet gewijzigd

class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij<this.aantalRijen;rij++) {
      for (var kolom = 0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

class Vijand {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = null;
    this.stapGrootte = null;
  }

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}
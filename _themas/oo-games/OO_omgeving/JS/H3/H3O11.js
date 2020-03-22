
/*  **********************************************************
    **                BEGIN klasse Racket                   **
    ********************************************************** */


class Racket {
  constructor() {
    this.breedte = 150;
    this.hoogte = 20;
    this.snelheid = 30;
    this.x = canvas.width / 2 - 0.5 * this.breedte;
    this.y = canvas.height - 2 * this.hoogte;
    this.kleur = 255;
  }
  
  teken() {
      push();
      noStroke();
      fill(this.kleur);
      rect(this.x,this.y,this.breedte,this.hoogte);
      pop();
  }
  
  raaktBal(bal) {
    if (bal.x > this.x && bal.x < this.x + this.breedte && bal.y + bal.straal >= this.y && bal.y + bal.straal < this.y + this.hoogte) {
      return true;
    }
    else {
      return false;
    }
  }
  
  beweeg() {
    if (key == 'a') {
      this.x -= this.snelheid;
    }
    if (key == 'd') {
      this.x += this.snelheid;
    }
    this.x = constrain(this.x,0,canvas.width - this.breedte);
  }
}

/*  **********************************************************
    **  EINDE klasse Racket      BEGIN klasse Tennisbal     **
    ********************************************************** */


class Tennisbal {
  constructor() {
    this.diameter = 20;
    this.straal = this.diameter/2;
    this.x = random(2*this.straal,canvas.width - 2*this.straal);
    this.y = this.straal;
    this.basissnelheid = 5;
    this.snelheidX = random(1,this.basissnelheid);
    this.snelheidY = random(1,this.basissnelheid);
    this.kleur = 0;
  }
  
  botsTegenWand() {
    if (this.x<this.straal || this.x>canvas.width-this.straal) {
      this.snelheidX*=-1;
    }
    if (this.y<this.straal || this.y>canvas.height-this.straal) {
      this.snelheidY*=-1;
    }    
  }
  
  reageerOpRacket(r) {
    this.snelheidY *= -1;
    this.y = r.y - this.straal;
  }
  
  beweeg() {
    this.x+=this.snelheidX;
    this.y+=this.snelheidY;
    this.botsTegenWand();
  }
  
  teken() {
    fill(this.kleur);
    ellipse(this.x,this.y,this.diameter);
  }
}

/*  **********************************************************
    **   EINDE klasse Tennisbal       BEGIN klasse Tennis   **
    ********************************************************** */


class Tennis {
  constructor(racket,bal) {
    this.r = racket;
    this.b = bal;
    this.actief = false;
  }
  
  beginScherm() {
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text("Dit is een simpel tennis-spel. Bestuur je racket met de a (links) en de d (rechts).\n\nDruk op de spatiebalk om het spel te starten.",0,0,canvas.width,canvas.height);
    pop();
  }
  
  update() {
    if (spel.actief) {
      if (this.r.raaktBal(this.b)) {
        this.b.reageerOpRacket(this.r);
      }
      this.b.beweeg();
    }
  }
  
  teken() {
    background(200);
    textFont("Monospace");
    textSize(40);
    fill('white');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      this.b.teken();
      this.r.teken();
    }
  }
}

/*  **********************************************************
    **    EINDE klasse Tennis       BEGIN hoofdprogramma    **
    ********************************************************** */


function setup() {
  // initialisatie
  
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  racket = new Racket();
  bal = new Tennisbal();
  spel = new Tennis(racket,bal);
}

function draw() {
  spel.update();
  spel.teken();
}

function keyTyped() {
  if (!spel.actief && keyCode == 32) {
    spel.actief = true;
  }
  else {
    spel.r.beweeg();
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */

/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(s) {
    this.breedte = 20;
    this.hoogte = 150;
    this.y = canvas.height - 2 * this.hoogte;
    if (s == 1) {
      this.kleur = 'pink';
      this.x = 0.5 * this.breedte;
      this.links = true;
    }
    else {
      this.kleur = 'aquamarine';
      this.x = canvas.width - 1.5 * this.breedte;
      this.links = false;
    }
    this.gewonnen = false;
  }

  teken() {
    push();
    noStroke();
    fill(this.kleur);
    rect(this.x,this.y,this.breedte,this.hoogte);
    pop();
  }

  raaktBal(bal) {
    if ((this.links && bal.x < this.x + this.breedte && bal.y > this.y && bal.y < this.y + this.hoogte) ||
        (!this.links && bal.x > this.x && bal.x < this.x + this.breedte && bal.y > this.y && bal.y < this.y + this.hoogte)) {
      return true;
    }
    else {
      return false;
    }
  }
}

/*  **********************************************************
    **  EINDE klasse Speler      BEGIN klasse Tennisbal     **
    ********************************************************** */


class Tennisbal {
  constructor(x,y,v,richting) {
    this.diameter = 20;
    this.straal = this.diameter / 2;
    this.x = x;
    this.y = y;
    this.basissnelheid = v * richting;
    this.snelheidX = this.basissnelheid;
    this.snelheidY = random(1,this.basissnelheid);
    this.kleur = 0;
    this.factor = 1;
  }

  botsTegenWand() {
    if (this.y < this.straal || this.y >  canvas.height - this.straal) {
      this.snelheidY *= -1;
    }
  }

  reageerOpRacket(r) {
    this.snelheidX *= -1.1;
    this.snelheidX = constrain(this.snelheidX,-40,40);
    if (r.links) {
      this.x = r.x + r.breedte + this.straal;
    }
    else {
      this.x = r.x - this.straal;
    }
    this.factor = 4 * ((r.y + 0.5 * r.hoogte) - this.y) / r.hoogte;
    this.factor = round(100 * this.factor)/100 * Math.sign(this.snelheidY);
    this.snelheidY = this.basissnelheid * this.factor;
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
  constructor() {
    this.speler1 = new Speler(1);
    this.speler2 = new Speler(2);
    this.bal = null;
    this.actief = false;
    this.afgelopen = null;
    this.snelheidSpeler = 50;
    this.snelheidBal = 3;
  }

  nieuw() {
    var x = null;
    var y = null;
    var r = 1;
    if (round(random(0,1)) == 1) {
      x = this.speler1.x + 2 * this.speler1.breedte;
      y = this.speler1.y + this.speler1.hoogte / 2;
    }
    else {
      x = this.speler2.x - this.speler2.breedte;
      y = this.speler2.y + this.speler2.hoogte / 2;
      r = -1;
    }
    this.bal = new Tennisbal(x,y,this.snelheidBal,r);
    this.speler1.gewonnen = false;
    this.speler2.gewonnen = false;
    this.afgelopen = false;
  }

  beginScherm() {
    push();
    textAlign(CENTER,TOP);
    fill(0);
    text("Welkom bij Tennis. Speel dit spel met z'n tweeën:\nLINKS speelt met q en z, RECHTS speelt met i en m.\nKlik om het spel te starten.",0,canvas.height / 4,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    var tekst = 'Rechts';
    if (this.speler1.gewonnen) {
      tekst = 'Links';
    }
    tekst += ' heeft gewonnen :)\n\nKlik met de muis voor\neen nieuw potje.';
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
  }

  update() {
    this.speler1.y = constrain(this.speler1.y,0,canvas.height - this.speler1.hoogte);
    this.speler2.y = constrain(this.speler2.y,0,canvas.height - this.speler2.hoogte);
    if (spel.actief && !spel.afgelopen) {
      if (this.speler1.raaktBal(this.bal)) {
        this.bal.reageerOpRacket(this.speler1);
      }
      if (this.speler2.raaktBal(this.bal)) {
        this.bal.reageerOpRacket(this.speler2);
      }
      this.bal.beweeg();
      if (this.bal.x < 0) {
        this.afgelopen = true;
        this.speler2.gewonnen = true;
      }
      if (this.bal.x > canvas.width) {
        this.afgelopen = true;
        this.speler1.gewonnen = true;
      }
    }
  }

  teken() {
    background(240);
    textFont("Monospace");
    textSize(40);
    fill('white');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      this.bal.teken();
      this.speler1.teken();
      this.speler2.teken();
      if (this.afgelopen) {
        this.eindScherm();
      }
    }
  }
}

/*  **********************************************************
    **    EINDE klasse Tennis       BEGIN hoofdprogramma    **
    ********************************************************** */


function setup() {
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  spel = new Tennis();
  spel.nieuw();
}

function draw() {
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    spel.actief = true;
  }
  else {
    if (spel.afgelopen) {
      spel.nieuw();
      spel.teken();
    }
  }
}

function keyTyped() {
  if (spel.actief && key == 'z') {
    spel.speler1.y += spel.snelheidSpeler;
  }
  if (spel.actief && key == 'q') {
    spel.speler1.y -= spel.snelheidSpeler;
  }
  if (spel.actief && key == 'm') {
    spel.speler2.y += spel.snelheidSpeler;
  }
  if (spel.actief && key == 'i') {
    spel.speler2.y -= spel.snelheidSpeler;
  }
  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
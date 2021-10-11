
/*  **********************************************************
    **                  BEGIN klasse Vogel                  **
    ********************************************************** */


class Vogel {
  constructor(png) {
    this.afbeelding = png;
    this.breedte = 50;
    this.marge = 5;
    this.hoogte = round(this.breedte / this.afbeelding.width * this.afbeelding.height);
    this.x = 50;
    this.y = 100;
    this.vx = 1;
    this.vy = 3;
    this.a = 0.1;
  }

  vlieg() {
    this.vy -= 30 * this.a;
    if (this.y == 0) {
      this.vy = 0;
    }
  }

  beweeg() {
    this.x += this.vx;
    this.vy += this.a;
    this.y += this.vy;
    this.y = constrain(this.y,0,canvas.height);
  }

  teken() {
      push();
      noStroke();
      image(this.afbeelding,this.x,this.y,this.breedte,this.hoogte);
      fill(255,0,0,0.25);
      rect(this.x + this.marge, this.y + this.marge,this.breedte - 2*this.marge,this.hoogte - 2*this.marge);
      pop();
  }
}

/*  **********************************************************
    **     EINDE klasse Vogel      BEGIN klasse Obstakel    **
    ********************************************************** */


class Obstakel {
  constructor(x,y,b,h) {
    this.x = x;
    this.y = y;
    this.b = b;
    this.h = h;
  }

  raakt(vogel) {
    if (vogel.x + vogel.breedte - vogel.marge > this.x && vogel.x + vogel.marge < this.x + this.b &&
        vogel.y + vogel.hoogte - vogel.marge > this.y && vogel.y + vogel.marge < this.y + this.h) {
      return true;
    }
    else {
      return false;
    }
  }

  teken() {
    push();
    noStroke();
    fill(0,0,255,0.7);
    rect(this.x,this.y,this.b,this.h);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Obstakel    BEGIN klasse Bluebird    **
    ********************************************************** */


class Bluebird {
  constructor() {
    this.speler = new Vogel(vogelblauw);
    this.actief = false;
    this.afgelopen = false;
    this.aantalObstakels = 4;
    this.obstakels = [];
    this.maakObstakels();
    this.eindTekst = "HELAAS: je bent AF.";
  }

  maakObstakels() {
    for (var o = 0;o<this.aantalObstakels;o++) {
      this.obstakels.push(new Obstakel(200*(o + 1),random(0,250),30,150));
    }
  }

  beginScherm() {
    push();
    textAlign(CENTER,CENTER);
    noFill();
    stroke(0,0,200,.8);
    strokeWeight(5);
    textSize(150);
    text(" BLUEBIRD",0,0,canvas.width,canvas.height / 2)
    textSize(44);
    strokeWeight(2);
    stroke(0);
    fill(200,200,200,.5);
    text("\nKlik met je muis om te vliegen\nen ontwijk de obstakels.\nKlik NU met je muisWIEL.\n",0,0,canvas.width,canvas.height * 2 / 3)
    pop();
  }

  eindScherm() {
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    stroke('yellow');
    strokeWeight(3);
    text(this.eindTekst+'\nKlik met je muisWIEL.\n',0,0,canvas.width,canvas.height * 1 / 3);
    pop();
  }

  update() {
    if (spel.actief) {
      this.speler.beweeg();
      for (var o = 0;o<this.obstakels.length;o++) {
        if(this.obstakels[o].raakt(this.speler) || this.speler.y >= canvas.height) {
          this.speler.vx = 0;
          this.afgelopen = true;
        }
      }
      if (this.speler.x >= canvas.width - this.speler.breedte - this.speler.marge) {
        this.speler.vx = 0;
        this.speler.vy = 0;
        this.speler.a = 0;
        this.eindTekst = "GEFELICITEERD!";
        this.afgelopen = true;
      }
    }
  }

  teken() {
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      this.speler.teken();
      for (var o = 0;o < this.obstakels.length;o++) {
        this.obstakels[o].teken();
      }
      if (this.afgelopen) {
        this.eindScherm();
      }
    }
  }
}

/*  **********************************************************
    **    EINDE klasse Bluebird     BEGIN hoofdprogramma    **
    ********************************************************** */


var canvasH = 400;
var canvasB;

function preload() {
  vogelblauw = loadImage("images/sprites/bluebird_R.png");
  achtergrond = loadImage("images/backgrounds/city_skyline.svg");
}

function setup() {
  // initialisatie

  canvasB = canvasH * achtergrond.width / achtergrond.height;
  canvas = createCanvas(canvasB,canvasH);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textSize(44);
  textAlign(CENTER,CENTER);
  spel = new Bluebird();
}

function draw() {
  background(achtergrond);
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (!spel.actief && !(mouseButton == LEFT || mouseButton == RIGHT)) {
    spel.actief = true;
  }
  else {
    if (!spel.afgelopen) {
      spel.speler.vlieg();
    }
  }
  if (spel.afgelopen && !(mouseButton == LEFT || mouseButton == RIGHT)) {
    setup();
  }
  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
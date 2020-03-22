/* aanwijzing: gameSettings = [
    onderlinge afstand tussen de obstakels,
    parameter voor de grootte van de obstakels,
    factor voor de verandering van de grootte van de obstakels,
    snelheidsverandering van de obstakels,
    aantal nieuwe obstakels voordat de snelheid wordt verhoogd
    ]

   oorspronkelijke settings:
   var gameSettings = [200,2,0.5,0.2,3];
*/

var gameSettings = [200,2,0.5,0.2,3];

/*  **********************************************************
    **                  BEGIN klasse Vogel                  **
    ********************************************************** */


class Vogel {
  constructor(png) {
    this.afbeelding = png;
    this.breedte = 50;
    this.marge = 5;
    this.hoogte = round(this.breedte / this.afbeelding.width * this.afbeelding.height);
    this.x = 10;
    this.y = 150;
    this.vx = 1;
    this.vy = -2;
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

  beweeg(v) {
      this.x -= v;
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
  constructor(settings) {
    this.speler = new Vogel(vogelblauw);
    this.actief = false;
    this.afgelopen = false;
    this.afstandObstakels = settings[0];
    this.aantalObstakels = floor(canvas.width / this.afstandObstakels);
    this.grootteObstakels = settings[1];
    this.factorObstakels = settings[2];
    this.snelheidObstakels = 0;
    this.snelheidsVeranderingObstakels = settings[3];
    this.veranderingSnelheid = settings[4]; 
    this.obstakels = [];
        for (var o = 0;o<this.aantalObstakels;o++) {
            this.maakObstakel(this.afstandObstakels*(this.obstakels.length + 1));
    }
    this.eindTekst = "HELAAS: je bent AF.";
  }

  maakObstakel(x) {
        var y = 0;
        var hoogte = random(canvas.height / (this.grootteObstakels + 2.5),canvas.height / (this.grootteObstakels + 1.5));
        if (round(random(0,1)) == 0) {
            y = canvas.height - hoogte;
        }
        this.obstakels.push(new Obstakel(x,y,30,hoogte));
  }

  beginScherm() {
    push();
    textAlign(CENTER,CENTER);
    noFill();
    stroke(0,0,200,.8);
    strokeWeight(5);
    textSize(150);
    text(" BLUEBIRD",0,0,canvas.width,canvas.height / 2);
    textSize(44);
    strokeWeight(2);
    stroke(0);
    fill(200,200,200,.5);
    text("\nGebruik SPATIE om te vliegen\nen ontwijk de obstakels.\nDruk ENTER om te starten.\n",0,0,canvas.width,canvas.height * 2 / 3);
    pop();
  }

  eindScherm() {
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    stroke('yellow');
    strokeWeight(3);
    text(this.eindTekst+'\nDruk ENTER voor nieuw spel.\n',0,0,canvas.width,canvas.height * 1 / 3);
    pop();
  }

  update() {
    if (spel.actief) {
      this.speler.beweeg();
      if (this.snelheidObstakels == 0 && this.speler.x >= canvas.width * 0.4) {
          this.speler.vx = 0;
          this.snelheidObstakels = 1;
      }
      fill('red');
      if (this.obstakels[this.obstakels.length - 1].x <= canvas.width - this.afstandObstakels) {
          this.maakObstakel(canvas.width);
          this.grootteObstakels *= this.factorObstakels;
          if (this.obstakels.length % this.veranderingSnelheid == 0) {
              this.snelheidObstakels += this.snelheidsVeranderingObstakels;
          }
      }
      for (var o = 0;o<this.obstakels.length;o++) {
        if(this.obstakels[o].raakt(this.speler) || this.speler.y >= canvas.height) {
          this.speler.vx = 0;
          this.afgelopen = true;
        }
        this.obstakels[o].beweeg(this.snelheidObstakels);
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

  tekenScorebord() {
      push();

      pop();
  }

  teken() {
    background(achtergrond);
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      this.speler.teken();
      for (var o = 0;o < this.obstakels.length;o++) {
        this.obstakels[o].teken();
      }
      this.tekenScorebord();
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
  spel = new Bluebird(gameSettings);
}

function draw() {
  background(255); // svg bug    
  spel.update();
  spel.teken();
}

function keyTyped() {
  if (!spel.actief && keyCode == ENTER) {
    spel.actief = true;
  }
  else {
    if (!spel.afgelopen && keyCode == 32) {
      spel.speler.vlieg();
    }
  }
  if (spel.afgelopen && keyCode == ENTER) {
    setup();
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
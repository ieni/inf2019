/* aanwijzing: gameSettings = [
    diameter: diameter van het te vinden doel
    tijd: de tijd die je krijgt om het doel te vinden
    alfa: mate van transparantie bij de start van het spel
    delta diameter: afname van de diameter na het behalen van een level
    delta alfa: afname van de transparantie na het behalen van een level
    delta t: afname van de tijd die je krijgt om het doel te vinden
    ]

   oorspronkelijke settings:
   var gameSettings = [40,5,0.5,0,0,0.4];
*/

var gameSettings = [40,5,0.5,0,0,0.4];

/*  **********************************************************
    **                  BEGIN klasse Doel                 **
    ********************************************************** */


class Doel {
  constructor(d,a) {
    this.x = null;
    this.y = null;
    this.diameter = d;
    this.straal = d / 2;
    this.alpha = a;
  }
  
  kiesEenPlek() {
    this.x = random(this.diameter,canvas.width - this.diameter);
    this.y = random(this.diameter,canvas.height - this.diameter);
  }

  controleerRaak() {
    var afstandMuisCirkel = dist(mouseX,mouseY,this.x,this.y);
    if (afstandMuisCirkel <= this.straal) {
      return true;
    }
    else {
        return false;
    }
  }

  teken() {
    push();
    noStroke();
    fill(246,181,79,this.alpha);
    ellipse(this.x,this.y,this.diameter);
    pop();
  }
}

/*  **********************************************************
    **  EINDE klasse Doel      BEGIN klasse Zoekspelletje   **
    ********************************************************** */


class Zoekspelletje {
    constructor(settings) {
    this.level = null;
    this.doel = null;
    this.actief = false;
    this.afgelopen = null;
    this.highScore = 0;
    this.diameterDoel = settings[0];
    this.afnameDiameter = settings[3];
    this.alfa = settings[2];
    this.afnameAlfa = settings[4];
    this.timerTijd = settings[1];
    this.afnameTijd = settings[5];
    this.timer = new Timer(canvas.height,0,20,canvas.height,'silver','lightgray','red','red',true,false);
  }
  
  nieuwSpel() {
    this.afgelopen = false;
    this.level = 0;
    this.nieuwLevel();
  }

  nieuwLevel() {
    this.timer.stelIn(this.timerTijd - this.level * this.afnameTijd);
    this.timer.start();
    this.doel = new Doel(this.diameterDoel - this.level*this.afnameDiameter,this.alfa - this.level*this.afnameAlfa);
    this.doel.kiesEenPlek();
    this.level++;
  }

   update() {
    if (spel.actief && !this.afgelopen && mouseIsPressed) {
        if (this.doel.controleerRaak()) {
            this.nieuwLevel();            
        }
    }
    if (this.timer.alarm) {
        this.afgelopen = true;
        if (this.level > this.highScore) {
            this.highScore = this.level;
        }
    }
  }
  
  beginScherm() {
    push();
    background(200);
    noFill();
    stroke(100,100,100,.3);
    strokeWeight(3);
    textSize(50);
    text("Zoekspelletje\nZoekspelletje\nZoekspelletje\nZoekspelletje",0,0,canvas.width,canvas.height / 2);
    textSize(32);
    strokeWeight(2);
    fill(0,0,0,0.75);
    text("Zoek het cirkeltje in de foto en klik er zo snel mogelijk op.\n\nDruk ENTER om te starten.",0,0,canvas.width,canvas.height * 2 / 3);
    pop();
  }
  
  eindScherm() {
    background(200);
    this.doel.alpha = 1;
    this.doel.teken();
    var tekst = 'Helaas. Je bent af.\nJouw score was: '+this.level+'\n(highscore: '+this.highScore+")";
    push();
    fill(50);
    stroke(200);
    strokeWeight(1);
    textSize(30);
    text(tekst + '\n\nDruk ENTER voor nieuw spel.',0,0,canvas.width,canvas.height);
    pop();
  }    
  
  teken() {
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen) {
        this.eindScherm();
      }
      else {
        background(achtergrond);
        this.timer.teken();
        this.doel.teken(); 
      }
    }
  }
}

/*  **********************************************************
    **   EINDE klasse Zoekspelletje   BEGIN hoofdprogramma  **
    ********************************************************** */

laadJavascriptFile('JS/class/Timer.js');

function preload() {
  achtergrond = loadImage("images/choco.jpg");
}

function setup() {
  canvas = createCanvas(470,450);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textAlign(CENTER,CENTER);  
  frameRate(50);
  spel = new Zoekspelletje(gameSettings);
}

function draw() {
  spel.update();
  spel.teken();
  if (keyIsDown(ESCAPE) && spel.actief) {
      background('black');
      spel.doel.teken();
    }
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!spel.actief) {
        spel.actief = true;
        spel.nieuwSpel();
    }
    if (spel.afgelopen) {
      spel.nieuwSpel();
    }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
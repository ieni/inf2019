/* aanwijzing: gameSettings = [
    aantal appels dat je moet vangen om een extra leven te krijgen
    aantal appels per level
    moeilijkheidsgraad van het spel
    grens voor niveau padvinder
    grens voor niveau ninja
    ]

   oorspronkelijke settings:
   var gameSettings = [5,10,15,50,75];   
*/

var gameSettings = [5,10,15,50,75];

/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(el) {
    this.score = null;
    this.aantalVoorExtraLeven = el;
    this.breedte = 100;
    this.hoogte = 60;
    this.hoogteMand = mandje.height *  this.breedte / mandje.width;
    this.x = canvas.width / 2 - this.breedte / 2;
    this.y = canvas.height - this.hoogte - 10;
    this.snelheid = 10;
    this.niveau = null;
  }
  
  verwerkInvoer() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.snelheid;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.snelheid;
    }
    this.x=constrain(this.x,10,canvas.width - this.breedte - 10);
  }
  
  vang(appel) {
    if (appel.x > this.x && appel.x < this.x + this.breedte && appel.y > this.y && appel.y < this.y + appel.d) {
      appel.y = canvas.height + appel.d;
      this.niveau++;
      if (this.niveau % this.aantalVoorExtraLeven == 0) {
          this.score++;
      }
      appel.x = -1000; 
      appel.y = height / 2;
      appel.snelheid = 0;
    }
    if (appel.y > height) {
      this.score--;
      appel.x = -1000;
      appel.y = height / 2;
      appel.snelheid = 0;
    }
  }
  
  teken() {
    push();
    translate(this.x,this.y);
    fill(20,20,20);
    // rect(0,0,this.breedte,this.hoogte); // hitbox
    image(mandje,0,(this.hoogte - this.hoogteMand),this.breedte,this.hoogteMand);
    pop();
  }  
}

/*  **********************************************************
    **     EINDE klasse Speler       BEGIN klasse Appel     **
    ********************************************************** */


class Appel {
  constructor(b) {
    this.d = 20;
    this.bAppel = appel.width *  this.d / appel.height;
    this.x = random(this.d,canvas.width - this.d);
    this.y = random(this.d,50);
    this.basisSnelheid = b;
    this.snelheid = (this.basisSnelheid + random(0,10)) / 10;
  }
  
  val() {
    this.y += this.snelheid;
  }
  
  teken() {
    push();
    fill(100,100,100,.25);
    stroke('red');
    // ellipse(this.x,this.y,this.d); // hitbox
    image(appel,this.x - 0.9 * this.d / 2,this.y - this.d / 2,this.bAppel,this.d);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Appel     BEGIN klasse Appelvanger   **
    ********************************************************** */


class Appelvanger {
  constructor(settings) {
    this.settings = settings;
    this.speler = new Speler(this.settings[0]);
    this.appels = null;
    this.moeilijkheidsGraad = null;
    this.actief = false;
    this.afgelopen = null;
    this.highscore = 0;
    this.level = null;
  }

  nieuw() {
    this.actief = false;
    this.afgelopen = false;
    this.speler.score = 5;
    this.speler.niveau = 0;
    this.level = 1;
    this.appelsPerLevel = this.settings[1];
    this.moeilijkheidsGraad = this.settings[2];
    this.gevorderd = this.settings[3];
    this.nina = this.settings[4];
    this.appels = [];
  }

  maakRegen() {
    if (frameCount % 149 == 0 || frameCount % 197 == 0 || frameCount % 229 == 0 || frameCount % 239 == 0 || frameCount % 269 == 0) {
      this.moeilijkheidsGraad++;
      this.appels.push(new Appel(this.moeilijkheidsGraad));
      if (this.appels.length % this.appelsPerLevel == 0) {
          this.level++;
      }
    }
  } 

  update() {
    if (this.actief && this.speler.score > 0) {
      this.maakRegen();
      for (var d = 0;d < this.appels.length;d++) {
            this.appels[d].val();
      }
      this.speler.verwerkInvoer();
      for (var d = 0;d < this.appels.length;d++) {
          this.speler.vang(this.appels[d]);
      }
      if (this.speler.niveau > this.highscore) {
          this.highscore = this.speler.niveau;
      }
    }
    if (this.speler.score <= 0) {
      this.afgelopen = true;
    }
  }    

  beginScherm() {
    push();
    fill(0, 139, 139,.5);
    rect(0,0,canvas.width,canvas.height);
    textAlign(CENTER,TOP);
    fill(0);
    text("APPELVANGER\n\nProbeer zoveel mogelijk appels op te vangen voor ze op de aarde vallen.\n\nGebruik de pijltjestoetsen voor de besturing. Klik om het spel te starten.",0,canvas.height / 4,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    fill(0, 139, 139,.5);
    rect(0,0,canvas.width,canvas.height);      
    var tekst="jouw score: "+this.speler.niveau+" (highscore = "+this.highscore+")\n\nKlik voor een nieuw spel.";
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
    this.tekenNiveauSpeler();
  }

  tekenNiveauSpeler() {
    var tekst = 'roodkapje';
    var plaatje = beginner;
    push();
    fill(140);
    stroke(20);
    strokeWeight(10);
    textSize(40);
    textAlign(CENTER,CENTER);
    if (this.speler.niveau >= this.settings[3]) {
        tekst = 'padvinder';
        plaatje = gevorderd;
    }
    if (this.speler.niveau >= this.settings[4]) {
        tekst = 'ninja';
        plaatje = ninja;
    } 
    var hoogte = 100;
    var breedte = plaatje.width*hoogte/plaatje.height;
    image(plaatje,(canvas.width - breedte) / 2,10,breedte,hoogte);
    text(tekst,0,0,canvas.width,canvas.height * 2/ 3);
    pop();      
  }  

  tekenScoreBord() {
    push();
    fill(255,255,255,.5);
    rect(0,0,canvas.width,40);
    fill('black');
    textSize(30);
    text("level ",10,30);
    text(this.level,100,30);
    fill('red');
    text("\u2764",130,30);
    fill('black');
    text(this.speler.score,160,30);
    image(appel,210,5,24,26);
    text(this.speler.niveau,240,30);
    text("(high:"+this.highscore+")",300,30);
    pop();
  }

  teken() {
    background('paleturquoise');
    textFont("Monospace");
    textSize(20);
    push();
    fill('white');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen) {
        this.eindScherm();
      }
      else {
        push();
        noStroke();
        fill('sienna');
        rect(0,canvas.height - 50,canvas.width,50);
        image(boom,0,0,canvas.width,canvas.height);
        this.tekenScoreBord();
        this.speler.teken();
        for (var d=0;d<this.appels.length;d++) {
            this.appels[d].teken();
        }
        pop();      
        }
      }
    }
}

/*  **********************************************************
    **   EINDE klasse Appelvanger    BEGIN hoofdprogramma   **
    ********************************************************** */


function preload() {
  boom = loadImage("images/backgrounds/boom.png");
  appel = loadImage("images/sprites/appel_2.png");
  mandje = loadImage("images/sprites/mandje_100px.png");
  beginner = loadImage("images/sprites/roodkapje.png");
  gevorderd = loadImage("images/sprites/padvinder.png");
  ninja = loadImage("images/sprites/ninja2.png");  
}

function setup() {
  canvas = createCanvas(500,400);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  frameRate(50);
  spel = new Appelvanger(gameSettings);
  spel.nieuw();
}

function draw() {
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    spel.actief = true;
    spel.appels = [];
  }
  else {
    if (spel.afgelopen) {
      spel.nieuw();
    }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
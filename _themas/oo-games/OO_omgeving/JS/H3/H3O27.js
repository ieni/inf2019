/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(n) {
    this.naam = n;
    this.score = null;
    this.breedte = 100;
    this.hoogte = 50;
    this.x = canvas.width / 2 - this.breedte / 2;
    this.y = canvas.height - this.hoogte - 10;
    this.snelheid = 10;
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
  
  vang(druppel) {
    if (druppel.x > this.x && druppel.x < this.x + this.breedte && druppel.y > this.y && druppel.y < this.y + druppel.d) {
      druppel.y = canvas.height + druppel.d;
      this.score++;
      druppel.x = -1000; 
      druppel.y = height / 2;
      druppel.snelheid = 0;
    }
    if (druppel.y > height) {
      this.score--;
      druppel.x = -1000;
      druppel.y = height / 2;
      druppel.snelheid = 0;
    }
  }
  
  teken() {
    push();
    translate(this.x,this.y);
    fill(20,20,20);
    rect(0,0,this.breedte,this.hoogte);
    pop();
  }  
}

/*  **********************************************************
    **    EINDE klasse Speler      BEGIN klasse Druppel     **
    ********************************************************** */


class Druppel {
  constructor(b) {
    this.d = 20;
    this.x = random(this.d,canvas.width - this.d);
    this.y = -this.d;
    this.basisSnelheid = b;
    this.snelheid = (this.basisSnelheid + random(0,10)) / 10;
  }
  
  val() {
    this.y += this.snelheid;
  }
  
  teken() {
    push();
    fill(100,100,100,.25);
    ellipse(this.x,this.y,this.d);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Druppel       BEGIN klasse Regen     **
    ********************************************************** */


class Regen {
  constructor() {
    this.speler = new Speler('Evert');
    this.druppels = null;
    this.moeilijkheidsGraad = null;
    this.actief = false;
    this.afgelopen = null;
  }

  nieuw() {
    this.actief = false;
    this.afgelopen = false;
    this.speler.score = 20;
    this.moeilijkheidsGraad = 10;
    this.druppels = [];
    for (var d = 0;d < 2;d++) {
      this.druppels.push(new Druppel(this.moeilijkheidsGraad));
    }  
  }

  maakRegen() {
    if (frameCount % 29 == 0 || frameCount % 59 == 0 || frameCount % 79 == 0 || frameCount % 97 == 0 || frameCount % 103 == 0 || frameCount % 113 == 0) {
      this.moeilijkheidsGraad++;
      this.druppels.push(new Druppel(this.moeilijkheidsGraad));
    }
  } 

  update() {
    if (this.actief && this.speler.score > 0) {
      this.maakRegen();
      for (var d=0;d<this.druppels.length;d++) {
            this.druppels[d].val();
      }
      this.speler.verwerkInvoer();
      for (var d = 0;d < this.druppels.length;d++) {
          this.speler.vang(this.druppels[d]);
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
    text("Welkom bij Zure Regen.\n\nProbeer het leven van de wereld te redden door zoveel mogelijk druppels op te vangen voor ze de aarde bereiken.\nHoe beter je dat doet, hoe langer je de aarde en jezelf in leven houdt.\n\nGebruik de pijltjestoetsen voor de besturing. Klik om het spel te starten.",0,canvas.height / 4,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    fill(0, 139, 139,.5);
    rect(0,0,canvas.width,canvas.height);      
    var tekst="Dit was niet te voorkomen...\nJouw niveau: "+this.moeilijkheidsGraad+"\n\nKlik voor een nieuw spel.";
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
    if (this.moeilijkheidsGraad > 100) {
        tekst = 'padvinder';
        plaatje = gevorderd;
    }
    if (this.moeilijkheidsGraad > 200) {
        tekst = 'ninja';
        plaatje = ninja;
    } 
    var hoogte = 100;
    var breedte = plaatje.width*hoogte/plaatje.height;
    image(plaatje,(canvas.width - breedte) / 2,10,breedte,hoogte);
    text(tekst,0,0,canvas.width,canvas.height * 2/ 3);
    pop();      
  }  

  teken() {
    background(achtergrond);
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
        fill('black');
        textSize(30);
        text(this.speler.score+" levens (niveau: "+this.moeilijkheidsGraad+")",10,30);  
        this.speler.teken();
        for (var d=0;d<this.druppels.length;d++) {
            this.druppels[d].teken();
        }
        pop();      
        }
      }
    }
}

/*  **********************************************************
    **    EINDE klasse Regen       BEGIN hoofdprogramma     **
    ********************************************************** */


function preload() {
  achtergrond = loadImage("images/backgrounds/boom_mist.jpg");
  beginner = loadImage("images/sprites/roodkapje.png");
  gevorderd = loadImage("images/sprites/padvinder.png");
  ninja = loadImage("images/sprites/ninja2.png");  
}

function setup() {
  canvas = createCanvas(500,400);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  frameRate(50);
  spel = new Regen();
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
    }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
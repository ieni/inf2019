/* aanwijzing: gameSettings = [
    tolerantie: een maat voor hoeveel hoe ver je er naast mag zitten qua kleur. Kies waarden tussen 1 (heel streng) en 10 (heel soepel)
    diameter: de grootte van de ring waarmee de speler speelt
    snelheid: de snelheid waarmee de speler van positie kan wisselen
    tijd: de tijd in seconden die je maximaal krijgt om de ring op zijn plek te zetten
    ]

   oorspronkelijke settings:
   var gameSettings = [5,50,5,7];
*/

var gameSettings = [5,50,5,7];


/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(d,v) {
    this.score = null;
    this.x = null;
    this.y = null;
    this.diameter = d;
    this.snelheid = v;
    this.dikte = 5;
  }
  
  verwerkInvoer() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.snelheid;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.snelheid;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.snelheid;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.snelheid;
    }
    this.x = constrain(this.x,(this.diameter + this.dikte) / 2,canvas.width - (this.diameter + this.dikte) / 2);
    this.y = constrain(this.y,(this.diameter + this.dikte) / 2,canvas.height - 50 - (this.diameter + this.dikte) / 2);
  }
   
  teken() {
    push();
    stroke(255,255,255,.5);
    strokeWeight(this.dikte);
    noFill();
    ellipse(this.x,this.y,this.diameter);
    pop();
  }  
}

/*  **********************************************************
    **     EINDE klasse Speler      BEGIN klasse Timer      **
    ********************************************************** */


class Timer {
    constructor(t,b,h) {
        this.ingesteldeTijd = t*50;
        this.verlopenTijd = 0;
        this.resterendeTijd = this.ingesteldeTijd;
        this.breedte = b;
        this.hoogte = h;
        this.x = 0;
        this.y = 0;
    }

    reset() {
        this.verlopenTijd = 0;
    }

    loop() {
        this.verlopenTijd++;
        this.resterendeTijd = this.ingesteldeTijd - this.verlopenTijd;
    }

    teken() {
        push();
        translate(this.x,this.y);
        strokeWeight(5);
        stroke(255);
        fill(255,255,255,.8);
        rect(0,0,this.breedte,this.hoogte);
        noStroke();
        fill(0,255,0,.8);
        rect(0,0,this.breedte *this.verlopenTijd / this.ingesteldeTijd,this.hoogte);
        fill(50);
        pop();
    }
}

/*  **********************************************************
    **     EINDE klasse Timer       BEGIN klasse RGBlik     **
    ********************************************************** */


class RGBlik {
  constructor(settings,b) {
    this.level = null;
    this.tolerantie = settings[0];
    this.actief = null;
    this.afgelopen = null;
    this.levelKlaar = null;
    this.speler = new Speler(settings[1],settings[2]);
    this.timer = new Timer(settings[3],450,50);
    this.afbeeldingen = b;
    this.opgaveKleur = null;
    this.oplossingen = null;
    this.oplossingenMetTolerantie = null;
  }

  nieuw() {
    this.actief = false;
    this.afgelopen = false;
    this.speler.x = canvas.width / 2;
    this.speler.y = canvas.height / 2;
    this.speler.score = 0;
    this.level = 0;
    this.nieuwLevel();
  }

  nieuwLevel() {
    this.level++;
    this.maakOpgave();
    this.timer.reset();
    this.timer.loop();
    this.levelKlaar = false;
  }
  
  maakOpgave() {
      this.beeld = this.afbeeldingen[random(0,this.afbeeldingen.length)];
      this.beeld = this.afbeeldingen[floor(random(0,this.afbeeldingen.length))];
      this.opgaveX = random(0,450);
      this.opgaveY = random(0,450);
      this.maakOplossingen();
      if (this.oplossingen.length > 20) {
          this.maakOpgave();
      }
    this.maakOplossingenMetTolerantie();
  }

  maakOplossingen() {
    this.oplossingen = [];
    this.opgaveKleur = this.beeld.get(this.opgaveX,this.opgaveY);
    var pixelKleur = null;
    for (var k = 0;k < this.beeld.width;k++) {
        for (var r = 0;r < this.beeld.height;r++) {
            pixelKleur = this.beeld.get(k,r);
            if (pixelKleur[0] == this.opgaveKleur[0] && pixelKleur[1] == this.opgaveKleur[1] && pixelKleur[2] == this.opgaveKleur[2]) {
                this.oplossingen.push(new Array(k,r));
            }
      }
    }
  }

  binnenMarge(p,o) {
      if (p > o - this.tolerantie && p < o + this.tolerantie) {
          return true;
      }
      else {
          return false;
      }
  }

  maakOplossingenMetTolerantie() {
    this.oplossingenMetTolerantie = [];
    this.opgaveKleur = this.beeld.get(this.opgaveX,this.opgaveY);
    var pixelKleur = null;
    for (var k = 0;k < 450;k++) {
        for (var r = 0;r < 450;r++) {
            pixelKleur = this.beeld.get(k,r);
           if (this.binnenMarge(pixelKleur[0],this.opgaveKleur[0]) && this.binnenMarge(pixelKleur[1],this.opgaveKleur[1]) && this.binnenMarge(pixelKleur[2],this.opgaveKleur[2])) {
                this.oplossingenMetTolerantie.push(new Array(k,r));
            }
      }
    }
  }  

  toonOplossingen() {
      push();
      noStroke();
      fill(this.opgaveKleur);
      for (var o = 0;o < this.oplossingen.length;o++) {
          ellipse(this.oplossingen[o][0],this.oplossingen[o][1],20);
      }
    pop();
  }  

  toonOplossingenMetTolerantie() {
      push();
      noStroke();
      fill(this.opgaveKleur);
      fill(0,155,0,.5);
      for (var o = 0;o < this.oplossingenMetTolerantie.length;o++) {
          ellipse(this.oplossingenMetTolerantie[o][0],this.oplossingenMetTolerantie[o][1],20);
      }
    pop();
  } 
  
  controleerWinst() {
      this.levelKlaar = true;  
      var gelukt = false;
      for (var o = 0;o < this.oplossingenMetTolerantie.length;o++) {
          if (dist(this.speler.x,this.speler.y,this.oplossingenMetTolerantie[o][0],this.oplossingenMetTolerantie[o][1]) < this.speler.diameter / 2) {
              gelukt = true;             
          }
      }
      if (gelukt) {
          this.speler.score += round(this.timer.resterendeTijd / 50) + 1;
      }
      else {
          this.afgelopen = true;
      }      
  }

  update() {
      if (!this.actief && !this.levelKlaar) {
          return;
      }
      if (!this.levelKlaar) {
          this.speler.verwerkInvoer();
          this.timer.loop();
          if (this.timer.resterendeTijd <= 0) {
              this.levelKlaar = true;
              this.actief = false;
          }
      }
      else {
          if (!this.actief && this.levelKlaar) {
              this.controleerWinst();
              this.actief = true;
          }
      }
  }
 
  beginScherm() {
    push();
    fill(150, 139, 200,1);
    rect(0,0,canvas.width,canvas.height);
    textAlign(CENTER,TOP);
    fill(0);
    text("RGBlik\n\nGebruik de pijltjestoetsen om de ring op een plek in de afbeelding te zetten waar de kleur in het blokje rechtsonder zich volgens jou bevindt. Klik als je denkt dat hij goed staat, want hoe sneller je reageert, des te meer punten je krijgt.\n\nKlik om het spel te starten.\n\nLET OP: Het laden van een opgave kan even duren. (Klik niet dubbel.)",0,canvas.height / 4,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    push();
    image(this.beeld,0,0);
    fill(255,255,255,.5);
    rect(0,0,this.beeld.width,this.beeld.height);
    spel.toonOplossingenMetTolerantie();
    spel.toonOplossingen();
    this.speler.teken();
    if (this.levelKlaar && !spel.afgelopen) {
        fill(0,255,0,1);
        text("GEVONDEN!",200,200);
    }
    else {
        fill(255,0,0,1);
        text("helaas :(",200,200);
    }
    this.tekenScoreBord();
    pop();
  }

  tekenScoreBord() {
    push();
    fill(255,255,255,.5);
    noStroke();
    translate(0,450);
    rect(0,0,canvas.width,canvas.height - 50);
    fill('black');
    if (this.timer.verlopenTijd != this.timer.ingesteldeTijd) {
        this.timer.teken();
    }
    text("score: "+this.speler.score+" level: "+this.level+" ",20,30);
    fill(this.opgaveKleur);
    stroke(0);
    strokeWeight(4);
    rect(canvas.width - 47,5,40,40);
    pop();
  }

  teken() {
    push();
    textFont("Monospace");
    textSize(20);    
    fill('white');
    if (!this.actief && !this.levelKlaar) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen || this.levelKlaar) {
        this.eindScherm();
        this.speler.teken();
      }
      else {
        this.tekenScoreBord();
        this.timer.teken();
        image(this.beeld,0,0);
        this.speler.teken();
        }
      }
    }
}

/*  **********************************************************
    **     EINDE klasse RGBlik      BEGIN hoofdprogramma    **
    ********************************************************** */

var afbeeldingen = [];

function preload() {
  afbeeldingen.push(loadImage("images/bomen_450.jpg"));
  afbeeldingen.push(loadImage("images/bord_450.jpg"));
  afbeeldingen.push(loadImage("images/brieck_450.jpg"));
  afbeeldingen.push(loadImage("images/choco_450.jpg"));
  afbeeldingen.push(loadImage("images/kolibrie_450.jpg"));
  afbeeldingen.push(loadImage("images/piano_450.jpg"));
}

function setup() {
  canvas = createCanvas(450,500);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  frameRate(50);
  spel = new RGBlik(gameSettings,afbeeldingen);
  spel.nieuw();
}

function draw() {
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (!spel.levelKlaar && spel.actief && spel.timer.verlopenTijd > 10) {
    spel.levelKlaar = true;
    spel.actief = false;
    spel.controleerWinst();
  }

  if (!spel.actief) {
    spel.actief = true;
  }
  else {
    if (spel.afgelopen) {
        spel.nieuw();
    }
    else {
        spel.nieuwLevel();
    }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
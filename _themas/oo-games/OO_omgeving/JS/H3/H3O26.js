/*  **********************************************************
    **                 BEGIN klasse Memory                  **
    ********************************************************** */


class Memory {
  constructor(a) {
    this.afbeeldingen = a;
    this.kaarten = null;
    this.geselecteerdeKaartNummers = null;
    this.aantalSets = 1;
    this.nieuw();
    this.geraden = null;
    this.gewonnen = null;
    this.actief = null;
    this.wacht = null;
    this.laatsteKeuze = null;
    this.pogingen = null;
  }
  
  nieuw() {
    this.geraden = 0;
    this.gewonnen = false;
    this.actief = true;
    this.wacht = false;
    this.laatsteKeuze = null;
    this.aantalGedraaid = 0;
    this.pogingen = 0;
    if (this.aantalSets < 6) {
      this.aantalSets++;
    }
    this.geselecteerdeKaartNummers = [];
    this.genereerOpgave()
  }

  selecteerKaart() {
    var rnd = floor(random(0,this.afbeeldingen.length));
    for (var k = 0;k<this.geselecteerdeKaartNummers.length;k++) {
        if (rnd==this.geselecteerdeKaartNummers[k]) {
            this.selecteerKaart();
        }
    }
    this.geselecteerdeKaartNummers.push(rnd);
    return rnd;    
  }
  
  genereerOpgave() {
    this.kaarten = [];
    for (var s = 0; s < this.aantalSets;s++) {
      var rnd = this.selecteerKaart();
      this.kaarten.push(new Kaart(this.afbeeldingen[rnd],this.afbeeldingen[this.afbeeldingen.length - 1],null,null,s));
      this.kaarten.push(new Kaart(this.afbeeldingen[rnd],this.afbeeldingen[this.afbeeldingen.length - 1],null,null,s));
    }
    this.kaarten = this.verwissel(this.kaarten);
    this.kaarten = this.geefPlek(this.kaarten);
  }
  
  verwissel(k) {
    for (var i = k.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [k[i], k[j]] = [k[j], k[i]];
    }
    return k;
  }
  
  geefPlek(k) {
    var marge = 10;
    var x = marge;
    var y = marge;
    for (var i = 0; i < k.length; i++) {
      k[i].x = x;
      k[i].y = y;
      x += k[i].b + marge;
      if (i == k.length / 2 - 1) {
        y += y + k[i].h;
        x = marge;
      }
    }
    return k;
  }

  registreerInvoer() {
    if (this.wacht) {
      this.wacht = false;
      this.draaiKaarten();
    }
    else {
      for (var i = 0;i < this.kaarten.length;i++) {
        if (this.kaarten[i].muisOver() && !this.kaarten[i].gedraaid) {
          this.kaarten[i].gedraaid = true;
          if (this.laatsteKeuze == null) {
            this.laatsteKeuze = this.kaarten[i].setnummer;
          }
          else {
            this.wacht = true;
            if (this.laatsteKeuze == this.kaarten[i].setnummer) {
              this.geraden++; 
              this.registreerGeradenSet(this.laatsteKeuze);
              this.wacht = false;
            }
          this.laatsteKeuze = null;
          this.pogingen++;
          }
        }
      }
    }
  }
  
  registreerGeradenSet(s) {
    for (var k = 0;k < this.kaarten.length; k++) {
      if (this.kaarten[k].setnummer == s) {
        this.kaarten[k].geraden = true;
      }
    }
    if (this.geraden == this.aantalSets) {
      this.gewonnen = true;
    }
  }
  
  draaiKaarten() {
    for (var k = 0;k < this.kaarten.length; k++) {
      if (!this.kaarten[k].geraden) {
        this.kaarten[k].gedraaid = false;
      }
    }  
  }
  
  teken() {
    if (!this.actief) {
      this.beginscherm();
    }
    else {
      background('white');
      if (this.gewonnen) {
        this.eindscherm();
      }
      else {
        background('white');
        for (var k = 0;k < this.kaarten.length; k++) {
          this.kaarten[k].toon();
        }
      }
    }
  }

  beginscherm() {
    push();
    noStroke();
    textFont("Monospace");
    textAlign(CENTER,CENTER);
    textSize(30);
    background('white');
    fill('black');
    text("Welkom bij Memory.\nKlik met je muis om te beginnen.",0,0,canvas.width,canvas.height / 2);
  }
  
  eindscherm() {
    background('white');
    textAlign(CENTER,CENTER);
    textFont("Monospace");
    textSize(30);
    fill('black');
    text("GEWONNEN!\n"+this.aantalSets+" sets gevonden\n in "+this.pogingen+" pogingen.\n\nKlik voor het volgende level.",0,0,canvas.width,canvas.height);
  }
}
/*  **********************************************************
    **      EINDE klasse Memory    BEGIN klasse Kaart       **
    ********************************************************** */

  
class Kaart {
  constructor(v,a,x,y,s) {
    this.setnummer = s;
    this.voorkant = v;
    this.achterkant = a;
    this.afbeelding = this.achterkant;
    this.schaal = 2;
    this.b = this.afbeelding.width / this.schaal;
    this.h = this.afbeelding.height / this.schaal;
    this.x = x;
    this.y = y;
    this.gedraaid = false;
    this.geraden = false;
  }
  
  muisOver() {
    if (mouseX >this.x && mouseX <this.x + this.b && mouseY > this.y && mouseY < this.y + this.h) {
      return true;
    }
    else {
      return false;
    }
  }
  
  toon() {
    push();
    if (this.gedraaid || this.geraden) {
      this.afbeelding = this.voorkant;
    }
    else {
      this.afbeelding = this.achterkant;
    }
    image(this.afbeelding,this.x,this.y,this.b,this.h);
    pop();
  }
}
/*  **********************************************************
    **      EINDE klasse Kaart     BEGIN hoofdprogramma     **
    ********************************************************** */


var speelKaarten = [];
var kaartSoorten = new Array("S","K","H","R");

function preload() {
  for (var s = 0;s < kaartSoorten.length;s++) {
    for (var k = 1;k <= 13;k++) {
      kaart = loadImage("images/speelkaarten/"+kaartSoorten[s]+k+".png");
      speelKaarten.push(kaart);
    }
  }
  kaart = loadImage("images/speelkaarten/achterkant.png");
  speelKaarten.push(kaart);
}

function setup() {
  canvas = createCanvas(750,350);  
  canvas.parent('processing');
  spel = new Memory(speelKaarten);
  spel.afbeeldingen = speelKaarten;
  spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    spel.actief = true;
  }
  else {
    if (spel.gewonnen) {
      spel.nieuw();
    }
    else {
      spel.registreerInvoer();
    }
  }
  spel.teken();
}
/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
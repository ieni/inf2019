
/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(n) {
    this.naam = n;
    this.resterendeBeurten = null;
  }
  
  kiesLetter() {
    // kies een letter
    // DIT WERKT OOK: if (keyCode >= 97 && keyCode <= 122) {
    
    if (key >= 'a' && key <= 'z') {
      spel.controleerInvoer();
    }
  }
}
/*  **********************************************************
    **      EINDE klasse Speler   BEGIN klasse Galgje       **
    ********************************************************** */


class Galgje {
  constructor(s,b) {
    this.speler = s;
    this.maximaalAantalBeurten = 10;
    this.speler.resterendeBeurten = this.maximaalAantalBeurten;
    this.beeldjes = b;
    this.woord = 'fantastischer';
    this.letters = [];
    this.geraden = [];
    this.pogingen = [0];
    this.maakRijLetters();
  }
  
  maakRijLetters() {
    for (var l = 0;l < this.woord.length;l++) {
      this.letters.push(this.woord.substr(l,1));
      this.geraden.push(false);
    }
  }
  
  controleerInvoer() {
    // mag deze invoer?
    
    if (this.speler.resterendeBeurten > 0 && !this.woordIsGeraden()) {
      this.verwerkInvoer();
      this.teken();
    }
  }

  verwerkInvoer() {
    // verwerk de invoer
    
    this.pogingen.push(key);
    var letterZitInWoord = false;
    for (var l = 0;l < this.letters.length;l++) {
      if (this.letters[l] == key) {
        letterZitInWoord = true;
        this.geraden[l] = true;
      }
    }
    if (!letterZitInWoord) {
      this.speler.resterendeBeurten--;
    }
  }

  woordIsGeraden() {
    var geraden = true;
    for (var b = 0;b < this.geraden.length;b++) {
      if (!this.geraden[b]) {
        geraden = false;
      }
    }
    return geraden;
  }
  
  teken() {
    // teken de speltoestand
    
    push();
    background('lightcyan');
    noStroke();
    textFont("Courier");
    textSize(40);
    textAlign(CENTER,CENTER);
    var tekst="";
    for (var l = 0;l < this.letters.length;l++) {
      if (this.geraden[l]) {
        tekst += this.letters[l]+" ";
      }
      else
      {
        tekst += "_ ";
      }
    }
    tekst=tekst.substr(0,tekst.length-1);
    text(tekst,12,0,canvas.width,70);
    image(this.beeldjes[this.maximaalAantalBeurten - this.speler.resterendeBeurten],(canvas.width - 300) / 2,75,300,300);
    textSize(80);
    if (this.speler.resterendeBeurten == 0) {
      fill('red');
      text("VERLOREN :(",0,0,canvas.width,300);
    }
    if (this.woordIsGeraden()) {
      fill('green');
      text("GEWONNEN :)",0,100,canvas.width,300);
    }    
    pop();
  }
}
/*  **********************************************************
    **      EINDE klasse Galgje   BEGIN hoofdprogramma      **
    ********************************************************** */


var beeldjes = [];
var aantalBeeldjes = 11;

function preload() {
  for (var b = 0;b < aantalBeeldjes;b++) {
    nieuw_beeldje = loadImage("images/Galgje/galgje("+b+").jpg");
    beeldjes.push(nieuw_beeldje);
  }
}

function setup() {
  // initialisatie
  
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  noLoop();
  speler = new Speler('Vincent');
  spel = new Galgje(speler,beeldjes);
  spel.teken();
}

function keyTyped() {
  spel.speler.kiesLetter();
}
/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
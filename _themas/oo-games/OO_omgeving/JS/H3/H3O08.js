
/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(n) {
    this.naam = n;
    this.laatsteZet = null;
  }
  
  invoer(key) {
    this.laatsteZet = key;
    spel.invoerCorrect(this.laatsteZet);
  }
}
/*  **********************************************************
    **      EINDE klasse Speler     BEGIN klasse Nim        **
    ********************************************************** */


class Nim {
  constructor(s) {
    this.speler = s;    
    this.aantalMunten = null;
    this.tegenZet = null;
    this.actief = null;
    this.nieuw();
  }
  
  nieuw() {
    this.aantalMunten = 12;
    this.actief = false;
    this.tegenZet = null;
    this.teken();
  }
  
  invoerCorrect(invoer) {
    if (invoer >= 1 && invoer <= 3 && invoer <= this.aantalMunten) {
      spel.verwerkInvoer(invoer);
    }
  } 
  
  verwerkInvoer(invoer) {
    this.aantalMunten -= invoer;
    this.tegenZet = 4 - invoer;
    this.aantalMunten -= this.tegenZet;
    this.teken();
  }
  
  spelerAf() {
    if (this.aantalMunten == 0) {
      this.actief = false;
      return true;
    }
    else {
      return false;
    }
  }
  
  teken() {
    if (!this.actief) {
      this.tekenIntroductiescherm();
    }
    else {
      if (this.spelerAf()) {
        this.tekenEindscherm();
      }
      else {
        this.tekenHuidigeToestand();
      }
    }
  }
  
  tekenIntroductiescherm() {
      push();
      noStroke();
      textFont("Courier");
      textAlign(CENTER,CENTER);
      textSize(20);
      background('steelblue');
      fill('white');
      text("Welkom bij Nim.\n\nEr liggen 12 munten op tafel. Jij mag er 1, 2 of 3 pakken (gebruik het toetsenbord). Daarna pak ik er 1, 2 of 3. Wie de laatste munt pakt heeft gewonnen.\n\nDruk op de spatiebalk om te beginnen.",0,0,canvas.width,canvas.height/2);   
  }
  
  tekenEindscherm() {
    push();
    background('red');
    noStroke();
    textSize(40);
    textAlign(CENTER,CENTER);
    fill('indianred');
    rect(0,0,canvas.width,canvas.height);
    fill('white');
    var tekst="Je hebt verloren :(\n\nDruk op de spatiebalk.";
    text(tekst,0,0,canvas.width,canvas.height);    
    pop();    
  }
  
  tekenHuidigeToestand() {
    background('grey');
    this.tekenMunten();
    push();
    noStroke();
    textSize(40);
    textAlign(CENTER,TOP);
    fill('lightgreen');
    rect(0,height / 2,canvas.width,canvas.height / 2);
    fill('grey');
    var tekst="Er zijn nog "+this.aantalMunten+" munten.";
    if (this.tegenZet != null) {
      tekst += "\n Jij nam "+this.speler.laatsteZet+". Ik nam "+this.tegenZet+".";
    }
    tekst += "\nJij bent aan de beurt, "+this.speler.naam+". Neem 1, 2 of 3 munten.";
    text(tekst,0,canvas.height / 2,canvas.width,canvas.height / 2);
    pop();
  }
  
  tekenMunten() {
    push();
    var diameter = 85;
    var marge = 10;
    translate((canvas.width-7*marge-6*diameter)/2,0);
    translate(diameter/2+marge,diameter/2+marge)
    stroke('slategrey');
    fill('silver');
    strokeWeight(3);
    for (var m = 0;m < this.aantalMunten;m++) {
      if (m == 6) {
        translate(-m * (diameter + marge),diameter + marge);
      }
      ellipse(m * (diameter + marge),0,diameter);
    }
    pop();
  }
}
/*  **********************************************************
    **    EINDE klasse Nim      BEGIN hoofdprogramma        **
    ********************************************************** */


function setup() {
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  speler = new Speler('Ids');
  spel = new Nim(speler);
}

function keyTyped() {
  if (!spel.actief && keyCode == 32) {
    if (spel.aantalMunten == 12) {
      spel.actief = true;
      spel.teken();
    }
    else {
      spel.nieuw();
    }
  }
  else {
    spel.speler.invoer(key);
  }
}
/*  **********************************************************
    **                EINDE hoofdprogramma                  **
    ********************************************************** */
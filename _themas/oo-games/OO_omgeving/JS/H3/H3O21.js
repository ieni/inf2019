/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(naam) {
    this.gewonnen = false;
    this.aanDeBeurt = false;
    this.naam = naam;
  }
}

/*  **********************************************************
    **     EINDE klasse Speler       BEGIN klasse Bord      **
    ********************************************************** */


class Bord {
  constructor() {
    this.x = 20;
    this.y = 20;
    this.Nrij = 6;
    this.Nkolom = 7;
    this.grootte = 50;
    this.marge = 10;
    this.kleuren = ['wheat','yellow','orangered'];
    this.opties = [];
    for (var rij = 0; rij < this.Nrij; rij++) {
      var bordRij = [];
      for (var kolom = 0; kolom < this.Nkolom; kolom++) {
        bordRij.push(0);
      }
      this.opties.push(bordRij);
    }
  }

  muisOver(x,y) {
    var kolnr = -1;
    if (y > this.y && y < this.y + (this.marge + this.grootte) * this.Nrij) {
      kolnr = floor((x - this.x) / (this.grootte + this.marge));
    }
    return kolnr;
  }

  kolomGevuld(kolnr) {
    var antwoord = true;
    for (var rijnr = 0;rijnr < this.Nrij;rijnr++) {
      if (this.opties[rijnr][kolnr] == 0) {
        antwoord = false;
      }
    }
    return antwoord;
  }

  plaatsSteen(s) {
    var kolnr = this.muisOver(mouseX,mouseY);
    for (var rijnr = this.Nrij - 1;rijnr >= 0;rijnr--) {
      if (this.opties[rijnr][kolnr] == 0) {
        this.opties[rijnr][kolnr] = s;
        return;
      }
    }
  }

  linksboven(rij,kolom) {
    var speler = this.opties[rij][kolom];
    if (speler == 0) {
        return false;
    }
    var rijWin = false;
    var kolomWin = false;
    var diagRWin = false;
    var diagLWin = false;
    if (kolom + 3 < this.Nkolom) {
        rijWin = true;
        for (var k = kolom + 1; k <= kolom + 3; k++) {
            rijWin &= this.opties[rij][k] == speler;
        }
    }
    if (rij + 3 < this.Nrij) {
        kolomWin = true;
        for (var r = rij + 1; r <= rij + 3; r++) {
            kolomWin &= this.opties[r][kolom] == speler;
        }
    }
    if (rij + 3 < this.Nrij && kolom + 3 < this.Nkolom) {
        diagRWin = true;
        for (var i = 1; i <= 3; i++) {
            diagRWin &= this.opties[rij + i][kolom + i] == speler;
        }
    }
    if (rij + 3 < this.Nrij && kolom - 3 >= 0) {
        diagLWin = true;
        for (var i = 1; i <= 3; i++) {
            diagLWin &= this.opties[rij + i][kolom - i] == speler;
        }
    }
    return rijWin || kolomWin || diagRWin || diagLWin;
  }

  controleerWinst() {
    // controleer van elke plaats op het bord of het de linker/bovenhoek van een reeks van 4 is.

    for (var rij = 0; rij < this.Nrij; rij++) {
        for (var kolom = 0; kolom < this.Nkolom; kolom++) {
            if (this.linksboven(rij, kolom)) {
                return true;
            }
        }
    }
    return false;
  }

  teken() {
    push();
    fill('steelblue');
    rect(this.x,this.y,this.Nkolom * this.grootte + this.Nkolom * this.marge,this.Nrij * this.grootte + this.Nrij * this.marge);
    noStroke();
    for (var rij = 0; rij < this.Nrij; rij++) {
      for (var kolom = 0; kolom < this.Nkolom; kolom++) {
        fill(this.kleuren[this.opties[rij][kolom]]);
        if (this.muisOver(mouseX,mouseY) == kolom && this.opties[rij][kolom] == 0) {
          fill(200);
        }
        ellipse(this.x + (this.marge + this.grootte) * (kolom + 0.5),
                this.y + (this.marge + this.grootte) * (rij + 0.5), this.grootte);
      }
    }
    pop();
  }
}

/*  **********************************************************
    **   EINDE klasse Bord      BEGIN klasse VierOpEenRij   **
    ********************************************************** */


class VierOpEenRij {
  constructor(s1,s2) {
    this.speler1 = s1;
    this.speler2 = s2;
    this.bord = null;
    this.actief = false;
    this.afgelopen = null;
  }

  nieuw() {
    this.bord = new Bord();
    this.speler1.aanDeBeurt = true;
    this.afgelopen = false;
  }

  controleerZet() {
    var kolom = this.bord.muisOver(mouseX,mouseY);
    if (kolom >= 0 && kolom < this.bord.Nkolom && !this.bord.kolomGevuld(kolom)) {
      return true;
    }
    else {
      return false;
    }
  }

  wisselBeurt() {
    if (this.speler1.aanDeBeurt) {
      this.speler1.aanDeBeurt = false;
      this.speler2.aanDeBeurt = true;
    }
    else {
      this.speler2.aanDeBeurt = false;
      this.speler1.aanDeBeurt = true;
    }
  }

  update() {
    var actief = null;
    if (this.speler1.aanDeBeurt) {
      actief = 1;
    }
    else {
      actief = 2;
    }
    this.bord.plaatsSteen(actief);
    if (this.bord.controleerWinst()) {
      this.afgelopen = true;
      background('red');
    }
    else {
      this.wisselBeurt();
    }
  }

  beginScherm() {
    push();
    textAlign(CENTER,CENTER);
    fill(100);
    textSize(30);
    text("Welkom bij 4 op 'n rij.\n\nSpeel dit spel met z'n tweeën:\nJullie gebruiken allebei de muis.\nKlik om het spel te starten.",0,0,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    var tekst = 'Rechts';
    if (this.speler1.gewonnen) {
      tekst = 'Links';
    }
    tekst += ' heeft gewonnen\nna '+this.aantalSlagen+' slagen.\nKlik met de muis voor\neen nieuw potje.';
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
  }

  teken() {
    textFont("Monospace");
    textSize(20);
    textAlign(CENTER,CENTER);
    background('bisque');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      this.bord.teken();
      push();
      fill('wheat');
      var ix = this.bord.x + (this.bord.marge + this.bord.grootte) * this.bord.Nkolom + this.bord.x;
      rect(ix,this.bord.y,canvas.width - ix - this.bord.x,canvas.height - 2 * this.bord.y);
      fill(100);
      if (this.speler1.aanDeBeurt) {
        var tekst = this.speler1.naam;
      }
      else {
        var tekst = this.speler2.naam;
      }
      if (this.afgelopen) {
        tekst += ' heeft gewonnen.\n\n Klik met je muis om een nieuw spel te beginnen.';
      }
      else {
        tekst += ' is\naan de beurt.';
      }
      text(tekst,ix,this.bord.y,canvas.width - ix - this.bord.marge,canvas.height - 2 * this.bord.y);
      pop();
    }
  }
}

/*  **********************************************************
    ** EINDE klasse VierOpEenRij       BEGIN hoofdprogramma **
    ********************************************************** */


function setup() {
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  bassie = new Speler('Bassie');
  adriaan = new Speler('Adriaan');
  spel = new VierOpEenRij(bassie,adriaan);
  spel.nieuw();
  spel.teken();
}

function draw() {
  // spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    spel.actief = true;
  }
  else {
    if (spel.afgelopen) {
      spel.nieuw();
    }
    else {
      if (spel.controleerZet()) {
        spel.update();
      }
    }
  }
  spel.teken();
}


/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
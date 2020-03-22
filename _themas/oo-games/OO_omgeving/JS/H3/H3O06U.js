
/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(n) {
    this.naam = n;
    this.laatsteGok = null;
    this.budget = null;
  }

  geefInvoer() {
    // kies een getal

    if (key >= 1 && key <= 6) {
      this.laatsteGok = key;
      spel.controleerInvoer();
    }
  }
}
/*  **********************************************************
    **   EINDE klasse Speler   BEGIN klasse Dobbelsteen     **
    ********************************************************** */


class Dobbelsteen {
  constructor() {
  this.x = 275;
  this.y = 225;
  this.grootte = 150;
  this.diameterOgen = 40;
  this.ogen = null;
  this.R = null;
  this.G = null;
  this.B = null;
  }
  gooi() {
    this.ogen = floor(random(0,6)) + 1;

    this.R = round(random(0,255));
    this.G = round(random(0,255));
    this.B = round(random(0,255));
  }

  teken() {
    push();
    fill(this.R,this.G,this.B);
    rect(this.x,this.y,this.grootte,this.grootte);

    fill('white');
    if (this.ogen != 1) {ellipse(this.x + this.grootte / 6 * 1,this.y + this.grootte / 6 * 1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen == 6) {ellipse(this.x + this.grootte / 6 * 3,this.y + this.grootte / 6 * 1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen > 3) {ellipse(this.x + this.grootte / 6 * 5,this.y + this.grootte / 6 * 1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen == 1 || this.ogen == 3 || this.ogen == 5) {ellipse(this.x + this.grootte / 6 * 3,this.y + this.grootte / 6 * 3,this.diameterOgen,this.diameterOgen);}
    if (this.ogen > 3) {ellipse(this.x + this.grootte / 6 * 1,this.y + this.grootte / 6 * 5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen == 6) {ellipse(this.x + this.grootte / 6 * 3,this.y + this.grootte / 6 * 5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen != 1) {ellipse(this.x + this.grootte / 6 * 5,this.y+this.grootte / 6 * 5,this.diameterOgen,this.diameterOgen);}
    pop();
  }
}
/*  **********************************************************
    **   EINDE klasse Dobbelsteen   BEGIN klasse Gokspel    **
    ********************************************************** */


class Gokspel {
  constructor(s,d) {
    this.speler = s;
    this.beginBudget = 5;
    this.speler.budget = null;
    this.beloningGoed = 5;
    this.strafFout = 1;
    this.steen = d;
    this.actief = null;
  }

  nieuw() {
    this.actief = false;
    this.speler.laatsteGok = null;
    this.speler.budget = this.beginBudget;
    this.teken();
  }

  controleerInvoer() {
    // mag deze invoer?

    if (!this.actief) {
      this.actief = true;
    }

    if (this.speler.budget > 0) {
      this.verwerkInvoer();
      this.teken();
    }
  }

  verwerkInvoer() {
    // verwerk de invoer

    this.steen.gooi();
    if (this.speler.laatsteGok == this.steen.ogen) {
      this.speler.budget += this.beloningGoed;
    }
    else {
      this.speler.budget -= this.strafFout;
    }
    if (this.speler.budget <= 0) {
      this.actief = false;
    }
  }

  teken() {
    // teken de speltoestand

    push();
    noStroke();
    textFont("Courier");
    textAlign(CENTER,CENTER);
    textSize(40);
    background('firebrick');
    fill('white');
    if (!this.actief && this.speler.laatsteGok == null) {
      textSize(20);
      text("Dit is een gokspelletje waarbij je moet raden hoeveel er wordt gegooid met een dobbelsteen.\nJe begint met een budget van "+this.speler.budget+". Raad je het goed, dan krijg je er "+this.beloningGoed+" bij. Gok je fout dan kost dat "+this.strafFout+" op je budget. \nBegin het spel door 1, 2, 3, 4, 5 of 6 te kiezen.",0,0,canvas.width,canvas.height / 2);
    }
    if (this.actief) {
      background('forestgreen');
      text("Jij gokte "+this.speler.laatsteGok+" en het werd "+this.steen.ogen+"\njouw budget:"+this.speler.budget,0,0,canvas.width,canvas.height / 2);
      this.steen.teken();
    }

    if (this.speler.budget == 0) {
      text("Jammer, "+this.speler.naam+" :(\nDruk SPATIE voor nieuw spel",0,0,canvas.width,300);
      this.steen.teken();
    }
    pop();
  }
}
/*  **********************************************************
    **      EINDE klasse Gokspel  BEGIN hoofdprogramma      **
    ********************************************************** */

var canvas;

function setup() {
  // initialisatie

  canvas = createCanvas(700,400);
  canvas = canvas;
  canvas.parent('processing');
  speler = new Speler('Ron');
  steen = new Dobbelsteen();
  spel = new Gokspel(speler,steen);
  spel.nieuw();
  spel.teken();
}

function keyTyped() {
  spel.speler.geefInvoer();
  if (spel.speler.budget <= 0 && keyCode == 32) {
    spel.nieuw();
  }
}
/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
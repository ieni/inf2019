
/*  **********************************************************
    **                 BEGIN klasse Button                  **
    ********************************************************** */


class Button {
  constructor(x,y,grootte,volgnummer) {
    this.x = x;
    this.y = y;
    this.nr = volgnummer;
    this.l = grootte;
    this.isGeraakt = false;
  }

  wordtGeraakt(x,y) {
    if (x > this.x && x < this.x + this.l && y > this.y && y < this.y + this.l) {
      return true;
    }
    else {
      return false;
    }
  }

  teken() {
      push();
      strokeWeight(10);
      noFill();
      translate(this.x,this.y);
      if (this.isGeraakt) {
        stroke(200);
      }
      else {
        stroke(100);
      }
      rect(0,0,this.l,this.l);
      pop();
  }

}
/*  **********************************************************
    **    EINDE klasse Button      BEGIN klasse Unlocker    **
    ********************************************************** */


class Unlocker {
  constructor(code,grootte,marge) {
    this.grootte = grootte;
    this.marge = marge;
    this.code = code;
    this.ingevoerdeCode = [0,0,0,0,0,0,0,0,0];
    this.invoerNummer = 1;
    this.invoer = [];
    this.maakInvoer();
  }

  maakInvoer() {
    var x = this.marge;
    var y = -this.grootte;
    for (var c = 0;c < this.code.length;c++) {
      if (c % 3 == 0) {
        x = this.marge;
        y += this.grootte + this.marge;
      }
      this.invoer.push(new Button(x,y,this.grootte,this.code[c]));
      x += this.grootte + this.marge;
    }
  }

  wordtGeraakt(x,y) {
    for (var c = 0;c < this.code.length;c++) {
      if (this.invoer[c].wordtGeraakt(x,y) && !this.invoer[c].isGeraakt) {
        this.ingevoerdeCode[c]=this.invoerNummer;
        this.invoer[c].isGeraakt = true;
        this.invoerNummer++;
      }
    }
  }

  reset() {
    this.invoerNummer = 1;
    for (var c = 0;c < this.code.length;c++) {
      this.invoer[c].isGeraakt = false;
      this.ingevoerdeCode[c] = 0;
    }
  }

  correct() {
    var toegang = true;
    for (var c = 0;c < this.code.length;c++) {
      if (this.code[c]!=this.ingevoerdeCode[c]) {
        toegang = false;
      }
    }
    return toegang;
  }

  teken() {
    for (var c = 0;c < this.code.length;c++) {
      this.invoer[c].teken();
    }
  }
}

/*  **********************************************************
    **  EINDE klasse Unlocker       BEGIN hoofdprogramma    **
    ********************************************************** */


var patroon = [1,0,5,
               0,2,4,
               0,0,3];

var grootte = 100;
var marge = 30;
var lCanvas = 4 * marge + 3 * grootte;

function setup() {
  // initialisatie

  canvas = createCanvas(lCanvas,lCanvas);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textSize(80);
  textAlign(CENTER,CENTER);
  fill('black');
  background(255);
  login = new Unlocker(patroon,grootte,marge);
  login.teken();
}

function touchStarted() {
  login.reset();
  return false;
}

function touchMoved() {
  login.wordtGeraakt(mouseX,mouseY);
  push();
  noStroke();
  fill(255,0,0,0.1);
  ellipse(touches[0].x,touches[0].y,30);
  pop();
  login.teken();
}

function touchEnded() {
  background(255);
  if (login.correct()) {
    fill(0);
    text('WELKOM',0,0,canvas.width,canvas.height);
  }
  else {
    login.teken();
  }
  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */

/*  **********************************************************
    **                BEGIN klasse Cirkel                   **
    ********************************************************** */


class Cirkel {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 10;
    this.snelheid = 0;
    this.kleur = round(this.y / 2);
  }

  teken() {
      push();
      noStroke();
      fill(this.kleur,255 - this.kleur,45 + this.kleur);
      ellipse(this.x,this.y,this.diameter);
      pop();
  }

  beweeg() {
    this.y += this.snelheid;
  }
}
/*  **********************************************************
    **      EINDE klasse Cirkel   BEGIN hoofdprogramma      **
    ********************************************************** */


var cirkels = [];
var aantal = 0;

function setup() {
  // initialisatie

  canvas = createCanvas(700,400);
  canvas.parent('processing');
  textFont("Monospace");
  textSize(60);
  fill('black');
  cirkels.push(new Cirkel(canvas.width / 2,canvas.height / 2));
  cirkels[0].kleur = 'red';
}

function draw() {
  background(127);
  var tekst = '';
  for (var c = 0; c < cirkels.length; c++) {
    cirkels[c].beweeg();
    cirkels[c].teken();
    /*
    if (cirkels[c].y > canvas.height + cirkels[c].diameter / 2) {
      cirkels.splice(c,1);
    }
    */
  }
  fill(255);
  textSize(60);
  text("aantal cirkels: "+cirkels.length,20,50);
  fill(0);
  textSize(30);
  text("Probeer dit uit op een touchscreen!",20,380);
}

function touchStarted() {
  cirkels.push(new Cirkel(touches[touches.length - 1].x,touches[touches.length - 1].y));
  aantal = touches.length;
  return false;
}

function touchMoved() {
  cirkels[cirkels.length - 1].diameter++;
}

function touchEnded() {
  for (var c = 0; c < aantal; c++) {
    cirkels[cirkels.length - 2 - c].snelheid = 2;
  }
  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
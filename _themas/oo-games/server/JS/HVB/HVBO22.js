
/*  **********************************************************
    **                BEGIN klasse Cirkel                   **
    ********************************************************** */


class Cirkel {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.snelheid = 1;
    this.diameter = this.x / 5;
    this.kleur = 'powderblue';
    this.rand = false;
  }

  teken() {
      push();
      if (this.rand) {
        stroke(200);
        strokeWeight(10);
      }
      else {
        noStroke();
      }
      fill(this.kleur);
      ellipse(this.x,this.y,this.diameter);
      pop();
  }

  beweeg() {
    this.x += this.snelheid;
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (mouseIsPressed) {
       this.kleur = 'steelblue';
      this.snelheid *=-1;
    }
    else {
      this.kleur = 'powderblue';
    }
    if (mouseButton == RIGHT) {
      background('midnightblue');
    }
  }
}

/*  **********************************************************
    **      EINDE klasse Cirkel   BEGIN hoofdprogramma      **
    ********************************************************** */


var tekst = '';

function setup() {
  // initialisatie

  canvas = createCanvas(700,400);
  canvas.parent('processing');
  background('pink');
  textFont("Monospace");
  textSize(32);
  fill('black');
  c1 = new Cirkel(canvas.width / 2, canvas.height / 2);
  c2 = new Cirkel(canvas.width / 2, 3 * canvas.height / 4);
}

function draw() {
  background('lightcyan');
  c1.beweeg();
  c2.beweeg();
  c1.teken();
  c2.teken();
  tekst = 'snelheid c1: ' + c1.snelheid + ' | diameter c2: '+round(c2.diameter)+'\n';
  tekst += 'mouseX: '+round(mouseX) + ' | mouseY: '+ round(mouseY);
  text(tekst,20,50);
}

function mousePressed() {
  if (c1.rand) {
    c1.rand = false;
    c2.snelheid *= -1;
  }
  else
  {
    c1.rand = true;
  }
}

function mouseMoved() {
  c2.diameter = mouseY / 3;
}

function mouseDragged() {
  c2.x = mouseX;
}

function mouseWheel(wiel) {
  c1.snelheid -= wiel.delta / 100;
  // return false voorkomt dat je browserscherm gaat scrollen

  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
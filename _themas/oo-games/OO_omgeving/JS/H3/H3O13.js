
/*  **********************************************************
    **                BEGIN klasse Cirkel                   **
    ********************************************************** */


class Cirkel {
  constructor(x,y) {
    this.x = round(x);
    this.y = y;
    this.snelheid = 1;
    this.diameter = round(this.x / 5);
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
  textAlign(CENTER,TOP);
  fill('black');
  c1 = new Cirkel(canvas.width / 3, canvas.height / 4);
  c2 = new Cirkel(canvas.width * 2 / 3, 3 * canvas.height / 4);
  frameRate(5);
}

function draw() {
  background('lightcyan');
  c1.beweeg();
  c2.beweeg();
  c1.teken();
  c2.teken();
  
  // Schakel onderstaande regels in om het programma makkelijker te kunnen testen

  // tekst='c1:'+c1.snelheid+' '+c1.diameter+' '+c1.x+'\n'+'c2:'+c2.snelheid+' '+c2.diameter+' '+c2.x;
  // text(tekst,0,0,canvas.width,canvas.height);  
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
  c2.diameter = round(mouseY / 3);
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
/*  **********************************************************
    **             BEGIN klasse Spel met Levels             **
    ********************************************************** */


class Levels {
    constructor() {
    this.level = null;
    this.maxLevel = 3;
    this.actief = null;
    this.levelGehaald = null;
    this.afgelopen = null;
    this.gewonnen = null;
    this.alfa = 0.5;
  }
  
  nieuwSpel() {
    this.level = 0;
    this.actief = false;
    this.gewonnen = false;
    this.afgelopen = false;
    this.nieuwLevel();
  }

  nieuwLevel() {
    this.level++;
    this.levelGehaald = false;
  }

  update() {
    this.alfa += random(-3,3) / 100;
    if (this.alfa <= 0 || this.alfa >=1) {
        this.alfa = 0.5;
    }
  }

   tekenAnimatie() {
    push();
    noStroke();
    fill(120,130,150,this.alfa);
    rect(10,10,880,580);
    pop();
  }

  tekenScorebord() {
    push();
    fill(0,0,0,.8);
    noStroke();
    textSize(30);
    var marge = 100;
    rect(marge,marge,canvas.width - 2 * marge,canvas.height - 2 * marge);
    fill(255);
    text(" Dit is Level "+this.level+"\nHet spel is actief.\n\nKlik om het level te \"halen\".",marge,marge,canvas.width - 2 * marge,canvas.height - 2 * marge);   
    pop();
  }
  
  beginScherm() {
    push();
    noFill();
    stroke(150,200,255,.7);
    strokeWeight(5);
    textSize(140);
    text(" Spel MET Levels",0,0,canvas.width,canvas.height * 2 / 3);
    textSize(32);
    strokeWeight(2);
    fill(0,0,0,0.75);
    text("Dit voorbeeld laat zien hoe je een spel\nmet levels zou kunnen inrichten.\n\nDruk op een toets om te beginnen.\n",0,canvas.height * 1 / 2,canvas.width,canvas.height * 1 / 3);
    pop();
  }

  levelScherm() {
    push();
    fill(50,80,80,.5);
    stroke(150,200,255,.7);
    strokeWeight(3);
    text('Gefeliciteerd!\nJe hebt level '+this.level+' gehaald!\n\nDruk ENTER om naar level '+(this.level+1)+' te gaan.',0,0,canvas.width,canvas.height / 2);
    pop();
  }   

  eindScherm() {
    var tekst = 'Je hebt het gehaald.';
    if (this.gewonnen) {
      tekst = 'Gefeliciteerd!';
    }
    push();
    fill(0);
    stroke(100,75,50,.8);
    strokeWeight(3);
    text(tekst + '\n\nDruk SPATIE voor nieuw spel.',0,0,canvas.width,canvas.height);
    pop();
  }    
  
  teken() {
    background(achtergrond);
    if (!this.actief) {
        if (this.afgelopen) {
            this.eindScherm();
        }
        else {
            this.beginScherm();
        }
    }
    else {
        if (this.levelGehaald) {
            this.levelScherm();
        }
        else {
            this.tekenScorebord();
            this.tekenAnimatie();
        }
    }
  }
}

/*  **********************************************************
    **  EINDE klasse Spel met Levels  BEGIN hoofdprogramma  **
    ********************************************************** */


function preload() {
  achtergrond = loadImage("images/backgrounds/boom_mist.jpg");
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textSize(44);
  textAlign(CENTER,CENTER);  
  frameRate(50);
  spel = new Levels();
  spel.nieuwSpel();
}

function draw() {
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (spel.actief) {
    spel.levelGehaald = true;
  }
  if (spel.level>=spel.maxLevel) {
    spel.afgelopen = true;
    spel.gewonnen = true;
    spel.actief = false;
  }  
}

function keyTyped() {
  if (!spel.actief && !spel.levelGehaald) {
    // begin spel
    spel.actief = true;
  }
  if ((spel.levelGehaald && !spel.afgelopen) && keyCode == ENTER) {
    // level gehaald tijdens het spel
    spel.nieuwLevel();
  }
  if ((spel.afgelopen) && keyCode == 32) {
    // einde spel
    spel.nieuwSpel();
  }  
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
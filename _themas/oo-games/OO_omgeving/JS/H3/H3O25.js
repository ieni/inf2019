/* aanwijzing: gameSettings = [
    diameter speler,
    springkracht,
    maximale snelheid platforms,
    factor waarmee platforms korter worden,
    aantal levels,
    aantal platforms in level 1
    ]

   oorspronkelijke settings:
   var gameSettings = [50,18,4,0.9975,4,6]; 
*/

var gameSettings = [50,18,5,0.996,5,11];

/*  **********************************************************
    **                BEGIN klasse Speler                   **
    ********************************************************** */


class Speler {
  constructor(x,l,v) {
    this.l = l;
    this.x = x;
    this.y = null;
    this.kleur = 'darkred';
    this.snelheid = 0;
    this.aanHetSpringen = false;
    this.stap = 5;
    this.g = 0.5;
    this.springSnelheid = v;
    this.score = null;
    this.aantalSprongen = null;
  }
  
  verwerkInvoer() {
    if (keyIsDown(LEFT_ARROW))
    {
      this.x -= this.stap;
    }
    if (keyIsDown(RIGHT_ARROW))
    {
      this.x += this.stap;
    }    
  
    if (keyIsDown(32)) {
      this.spring();
    }
  }
  
  spring() {
    if (!this.aanHetSpringen) {
      this.aanHetSpringen = true;
      this.snelheid = -this.springSnelheid;
    }
  }
  
  raakt(pf) {
    var raak = false;
    for (var p = 0; p < pf.length; p++) {
      if (  (this.x + this.l/2) > pf[p].x && 
            (this.x + this.l/2) < (pf[p].x + pf[p].l) && 
            (this.y + this.l) >= pf[p].y && 
            (this.y + this.l) < (pf[p].y + pf[p].d / 2) ) {
        this.y = pf[p].y - this.l;
        raak = true;
        pf[p].geraakt = true;
      }
    }
    if (raak) {
      this.kleur = 'limegreen';
    }
    else {
      this.kleur = 'orange';
    }
    return raak;
  }

  beweeg(pf) {
    this.verwerkInvoer();
    if (this.aanHetSpringen) {
      this.snelheid += this.g;
      this.y += this.snelheid;      
      if (this.raakt(pf) && this.snelheid > 0) {
        this.snelheid = 0;
        this.aanHetSpringen = false;
      }      
      if (this.y >= canvas.height - this.l) {
        this.y = canvas.height - this.l;
        this.snelheid = 0;
        this.aanHetSpringen = false;
      }
    } else {
        if (!this.raakt(pf) && this.y != canvas.height - this.l) {
          this.aanHetSpringen = true;
        }
    }    
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height);
    if (this.y >= canvas.height - 2* this.l) {
        this.kleur = 'darkred';
    }
  }

  teken() {
    push();
    noFill();
    stroke(this.kleur);
    strokeWeight(5);
    ellipse(this.x+this.l/2,this.y+this.l/2,this.l);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Speler      BEGIN klasse Platform    **
    ********************************************************** */


class Platform {
  constructor(x,y,l,v,f) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.d = 50;
    this.snelheid = random(1,v);
    if (random(0,1)<=0.5) {
        this.snelheid *= -1;
    }
    this.factor = f;
    this.kleur = 5;
    this.geraakt = false;
  }

  beweeg() {
      this.y += this.snelheid;
      if (this.y > canvas.height - 100 || this.y < 150) {
          this.snelheid *= -1;
      }
  }

  verkort() {
      this.l *= this.factor;
  }
  
  teken() {
    push();
    if (this.geraakt) {
        this.kleur = 150;
    }
    stroke(this.kleur);
    strokeWeight(5);
    noFill();
    rect(this.x,this.y,this.l,this.d);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Platform     BEGIN klasse Jumper     **
    ********************************************************** */


class Jumper {
    constructor(settings) {
    this.settings = settings;
    this.speler = new Speler(null,this.settings[0],this.settings[1]);
    this.level = 0;
    this.maxLevel = this.settings[4];
    this.maxPlatforms = this.settings[5];
    this.Nplatforms = null;
    this.platforms = null;
    this.actief = null;
    this.levelGehaald = null;
    this.afgelopen = null;
    this.gewonnen = null;
    this.eindscoreVorigLevel = null;
    this.geraaktePlatforms = null;
  }
  
  nieuwSpel() {
    if (this.afgelopen) {
        this.level--;
        this.afgelopen = false;
        this.speler.score = this.eindscoreVorigLevel;
    }
    if (this.gewonnen) {
        this.level = -1;
        this.gewonnen = false;
        this.speler.score = 0;
    }
    this.actief = false;
    this.nieuwLevel();
  }

  nieuwLevel() {
    this.eindscoreVorigLevel = this.speler.score;
    this.speler.aantalSprongen = 0;
    this.level++;
    this.Nplatforms = this.maxPlatforms - 2 * (this.level - 1);
    this.platforms = [];
    this.platforms.push(new Platform(40,floor(random(canvas.height * 1 / 3,canvas.height - 100)),floor(random(25,75)),this.settings[2],this.settings[3]));
    this.speler.x = this.platforms[0].x + this.platforms[0].l / 2 - this.speler.l / 2;
    this.speler.y = 0;
    for (var p = 1; p < this.Nplatforms;p++) {
        this.platforms.push(new Platform(canvas.width * ((p + random(0,0.5)) / this.Nplatforms) ,floor(random(canvas.height * 1 / 3,canvas.height - 100)),floor(random(100,150)),this.settings[2],this.settings[3]));
    }
    if (this.level>this.maxLevel) {
        this.afgelopen = true;
        this.gewonnen = true;
        this.actief = false;
    }
    else {
        this.levelGehaald = false;
    }
  }

  update() {
    if (this.actief && !this.levelGehaald) {
        this.geraaktePlatforms = 0;
        for (var p = 0; p < this.platforms.length;p++) {
            this.platforms[p].beweeg();
            if (this.level > 4 || (this.level > 2 && this.platforms[p].geraakt)) {
                this.platforms[p].verkort();
            }
            if (this.platforms[p].geraakt) {
                this.geraaktePlatforms++;
            }
        this.speler.score = this.eindscoreVorigLevel + 10 - this.geraaktePlatforms - this.speler.aantalSprongen;
        }        
        this.speler.beweeg(this.platforms);
        if (this.speler.x > canvas.width - this.speler.l) {
            this.levelGehaald = true;
            if (this.level == this.maxLevel) {
                this.afgelopen = true;
                this.gewonnen = true;
                this.actief = false;
            }
        }
        if (this.speler.y >= canvas.height - this.speler.l || this.speler.score <=0) {
            this.afgelopen = true;
            this.gewonnen = false;
            this.actief = false;
            this.speler.score = this.eindscoreVorigLevel;
            background('red');
        }
    }
  }

  tekenScorebord() {
    push();
    fill(175);
    noStroke();
    textSize(16);
    var marge = 10;
    var hoogte = 50;
    var breedte = 100
    rect(canvas.width - marge - breedte,marge,breedte,hoogte);
    fill(25);
    text("Level "+this.level+"\nscore = "+this.speler.score,canvas.width - marge - breedte,marge / 3,breedte,hoogte);   
    pop();
  }
  
  beginScherm() {
    push();
    noFill();
    stroke(140);
    strokeWeight(5);
    textSize(140);
    text(" Jumper",0,0,canvas.width,canvas.height * 2 / 3);
    stroke(205);
    textSize(32);
    strokeWeight(2);
    fill(0);
    text("Spring met spatie, beweeg met de pijltoetsen. Je haalt een level als je de overkant bereikt zonder te vallen.\n\nDruk op een toets om te beginnen.",0,canvas.height * 1 / 2,canvas.width,canvas.height * 1 / 3);
    pop();
  }

  levelScherm() {
    push();
    fill(40);
    stroke(205);
    strokeWeight(2);
    textSize(32);
    text('Gefeliciteerd!\nJe hebt level '+this.level+' gehaald!\nJouw score: '+this.speler.score+'\nDruk ENTER om naar level '+(this.level+1)+' te gaan.',0,0,canvas.width,canvas.height / 2);
    pop();
    this.tekenNiveauSpeler();
  }   

  eindScherm() {
    var tekst = '';
    if (this.gewonnen) {
      tekst += 'Je hebt het gehaald. Gefeliciteerd!\nJouw eindscore: '+this.speler.score;
    }
    else {
        tekst += 'Je bent tot level '+this.level+' gekomen. JAMMER :(\nJouw eindscore: '+this.speler.score+'\n';
    }
    push();
    fill(40);
    stroke(205);
    strokeWeight(1);
    textSize(40);
    text(tekst + '\nDruk op een toets voor nieuw spel.',0,0,canvas.width,canvas.height / 2);
    this.tekenNiveauSpeler();
    pop();
  }    

  tekenNiveauSpeler() {
    var tekst = 'beginner';
    var plaatje = beginner;
    push();
    fill(140);
    stroke(20);
    strokeWeight(10);
    textSize(80);
    if (this.speler.score > 7 && this.level > 1) {
        tekst = 'gevorderd';
        plaatje = gevorderd;
    }
    if (this.speler.score > 12) {
        tekst = 'ninja';
        plaatje = ninja;
    }    
    var hoogte = 200;
    var breedte = plaatje.width*hoogte/plaatje.height;
    image(plaatje,(canvas.width - breedte) / 2,canvas.height - hoogte - 10,breedte,hoogte);
    text(tekst,0,canvas.height / 4,canvas.width,canvas.height * 2 / 3);
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
            this.speler.teken();
            for (var p = 0; p < this.platforms.length;p++) {
                this.platforms[p].teken();
            }
            this.tekenScorebord();
        }
    }
  }
}

/*  **********************************************************
    **     EINDE klasse Jumper     BEGIN hoofdprogramma     **
    ********************************************************** */


function preload() {
  achtergrond = loadImage("images/backgrounds/skyline_4.jpg");
  beginner = loadImage("images/sprites/beginner.png");
  gevorderd = loadImage("images/sprites/gevorderd.png");
  ninja = loadImage("images/sprites/ninja.png");
}

function setup() {
  canvas = createCanvas(900,600);  
  canvas.parent('processing');
  textAlign(CENTER,CENTER);  
  frameRate(50);
  spel = new Jumper(gameSettings);
  spel.teken();
}

function draw() {
  spel.update();
  spel.teken();
}

function keyTyped() {
  if (!spel.actief && !spel.levelGehaald) {
    // begin spel
    spel.nieuwSpel();
    spel.actief = true;
  }
  if ((spel.levelGehaald && !spel.afgelopen) && keyCode == ENTER) {
    // level gehaald tijdens het spel
    spel.nieuwLevel();
  }
  if ((spel.afgelopen)) {
    // einde spel
    spel.nieuwSpel();
  }  
}

function keyReleased() {
  if (keyCode == 32) {
    spel.speler.aantalSprongen += 1;
  }
  return false;
}


/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
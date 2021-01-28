
/*  **********************************************************
    **                  BEGIN klasse Raster                 **
    ********************************************************** */


class Raster {
  constructor(r,k) {
    this.aantalRijen = r;
    this.aantalKolommen = k;
    this.celGrootte = null;
  }
  
  berekenCelGrootte() {
    this.celGrootte = canvas.width / this.aantalKolommen;
  }
  
  teken() {
    push();
    noFill();
    stroke('grey');
    for (var rij = 0;rij < this.aantalRijen;rij++) {
      for (var kolom = 0;kolom < this.aantalKolommen;kolom++) {
        rect(kolom * this.celGrootte,rij * this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

/*  **********************************************************
    **      EINDE klasse Raster       BEGIN klasse Bom      **
    ********************************************************** */


class Bom {
  constructor(x,y,l) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.sprite = bomPlaatje;
  }
  
  toon() {
    image(this.sprite,this.x,this.y,this.l,this.l);
  }
}

/*  **********************************************************
    **      EINDE klasse Bom       BEGIN klasse Vijand      **
    ********************************************************** */


class Vijand {
  constructor(x,y,s) {
    this.x = x;
    this.y = y;
    this.sprite = vijandPlaatje;
    this.stapGrootte = s;
  }

  beweeg() {
    this.x += floor(random(-1,2)) * this.stapGrootte;
    this.y += floor(random(-1,2)) * this.stapGrootte;
    this.x = constrain(this.x,0,canvas.width - this.stapGrootte);
    this.y = constrain(this.y,0,canvas.height - this.stapGrootte);
  }
  
  toon() {
    image(this.sprite,this.x,this.y,this.stapGrootte,this.stapGrootte);
  }
}

/*  **********************************************************
    **    EINDE klasse Vijand         BEGIN klasse Jos      **
    ********************************************************** */


class Jos {
  constructor(s) {
    this.x = 0;
    this.y = 200;
    this.animatie = spelerFrames;
    this.frameNummer =  3;
    this.stapGrootte = s;
    this.staOpBom = false;
  }
  
  beweeg() {
    if (keyCode == RIGHT_ARROW) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyCode == UP_ARROW) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyCode == DOWN_ARROW) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }
    this.x = constrain(this.x,0,canvas.width);
    this.y = constrain(this.y,0,canvas.height - this.stapGrootte);
  }
  
  wordtGeraakt(vijand) {
    if (this.x == vijand.x && this.y == vijand.y) {
      return true;
    }
    else {
      return false;
    }
  }
  
  staatOp(bommenLijst) {
    for (var b = 0;b < bommenLijst.length;b++) {
      if (bommenLijst[b].x == this.x && bommenLijst[b].y == this.y) {
        this.staOpBom = true;
      }
    }
    return this.staOpBom;
  }  
  
  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,this.stapGrootte,this.stapGrootte);
  }
}

/*  **********************************************************
    **      EINDE klasse Jos     BEGIN klasse Overloper     **
    ********************************************************** */


class Overloper {
    constructor() {
    this.bommen = null;
    this.vijanden = null;
    this.Nbommen = 40;
    this.Nvijanden = 20;
    this.raster = new Raster(12,18);
    this.raster.berekenCelGrootte();
    this.aantalCellen = 1;
    this.speler = null;
    this.actief = false;
    this.afgelopen = null;
    this.gewonnen = null;
  }
  
  nieuw() {
    this.bommen = [];
    this.maakBommen();
    this.vijanden = [];
    this.maakVijanden();
    this.speler = new Jos(this.aantalCellen * this.raster.celGrootte);
    this.gewonnen = false;
    this.afgelopen = false;
  }
  
  maakBommen() {
    for (var b = 0;b < this.Nbommen;b++) {
       this.bommen.push(new Bom(floor(random(1,this.raster.aantalKolommen)) * this.raster.celGrootte,floor(random(0,this.raster.aantalRijen)) * this.raster.celGrootte,this.raster.celGrootte))
    }
  }
  
  maakVijanden() {
    for (var v = 0; v < this.Nvijanden;v++) {
      this.vijanden.push(new Vijand(floor(random(3,this.raster.aantalKolommen))*this.raster.celGrootte,floor(random(3,this.raster.aantalRijen))*this.raster.celGrootte,this.aantalCellen * this.raster.celGrootte));
    }
  }
  
  update() {
    for (var v = 0; v < this.Nvijanden;v++) {
      if (this.speler.wordtGeraakt(this.vijanden[v])) {
        this.afgelopen = true;
      }
    }
    for (var b = 0;b < this.Nbommen;b++) {
      if (this.speler.wordtGeraakt(this.bommen[b])) {
        this.afgelopen = true;
      }
    }
    
    if (this.speler.x == canvas.width) {
      this.afgelopen = true;
      this.gewonnen = true;
    }
    
    if (!this.afgelopen) {
      for (var v = 0; v < this.Nvijanden;v++) {
        this.vijanden[v].beweeg();
      }
      for (var v = 0; v < this.Nvijanden;v++) {
        if (this.speler.wordtGeraakt(this.vijanden[v])) {
          this.afgelopen = true;
        }
      }
    }
  }
  
  beginScherm() {
    push();
    noFill();
    stroke(50,250,200,.8);
    strokeWeight(5);
    textSize(140);
    text(" OVERLOPER",0,0,canvas.width,canvas.height / 2);
    textSize(32);
    strokeWeight(2);
    fill(0,0,0,0.25);
    text("\nGebruik de pijltjestoetsen om te bewegen\nen ontwijk bommen en vijanden.\nLET OP: je kunt niet (terug) naar links.\n\nDruk op een toets om te beginnen.\n",0,0,canvas.width,canvas.height * 2 / 3);
    pop();
  }
  
  eindScherm() {
    var tekst = 'Helaas. Je bent af.';
    if (this.gewonnen) {
      tekst = 'Gefeliciteerd!';
    }
    push();
    fill(0);
    stroke(50,250,200,.8);
    strokeWeight(3);
    text(tekst + '\n\nDruk ENTER voor nieuw spel.',0,0,canvas.width,canvas.height);
    pop();
  }    
  
  teken() {
    background(achtergrond);
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen) {
        this.eindScherm();
      }
      else {
        //this.raster.teken();
        
        for (var b = 0;b < this.Nbommen;b++) {
          this.bommen[b].toon();
        }
        for (var v = 0; v< this.Nvijanden;v++) {
          this.vijanden[v].toon();
        }
        this.speler.toon();        
      }
    }
  }
}

/*  **********************************************************
    **    EINDE klasse Overloper    BEGIN hoofdprogramma    **
    ********************************************************** */


var spelerFrames = [];

function preload() {
  achtergrond = loadImage("images/backgrounds/blurred_gold.jpg");
  bomPlaatje = loadImage("images/sprites/bom_100px.png");
  vijandPlaatje = loadImage("images/sprites/Bob100px/Bob.png");
  for (var b = 0;b < 6;b++) {
    frameSpeler = loadImage("images/sprites/Eve100px/Eve_"+b+".png");
    spelerFrames.push(frameSpeler);
  }  
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textSize(44);
  textAlign(CENTER,CENTER);  
  spel = new Overloper();
  spel.nieuw();
  spel.teken();
}

function keyTyped() {
  if (!spel.actief) {
    spel.actief = true;
    spel.teken();
  }
  else {
    if (spel.afgelopen && keyCode == ENTER) {
      spel.nieuw();
      spel.teken();
    }
  }
}

function keyReleased() {
  if (spel.actief && (keyCode == RIGHT_ARROW || keyCode == UP_ARROW || keyCode == DOWN_ARROW)) {
    spel.speler.beweeg();
    spel.update();
    spel.teken();
  }
  return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
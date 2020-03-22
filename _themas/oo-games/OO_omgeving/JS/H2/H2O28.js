var raster = {
  aantalRijen: 6,
  aantalKolommen: 9,
  celGrootte: null,

  berekenCelGrootte() {
    this.celGrootte = canvas.width/this.aantalKolommen;
  },
  teken() {
    push();
    noFill();
    stroke('grey');
    for (rij=0;rij<this.aantalRijen;rij++) {
      for (kolom=0;kolom<this.aantalKolommen;kolom++) {
        rect(kolom*this.celGrootte,rij*this.celGrootte,this.celGrootte,this.celGrootte);
      }
    }
    pop();
  }
}

var jos = {
  x: 400,
  y: 300,
  animatie: [],
  aantalFrames: 6,
  frameNummer: 3,
  stapGrootte: null,

  beweeg() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.stapGrootte;
      this.frameNummer = 2;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.stapGrootte;
      this.frameNummer = 1;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.stapGrootte;
      this.frameNummer = 4;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.stapGrootte;
      this.frameNummer = 5;
    }

    this.x = constrain(this.x,0,canvas.width-raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height-raster.celGrootte);
  },

  wordtGeraakt(vijand) {
    return false;
  },

  toon() {
    image(this.animatie[this.frameNummer],this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}

var alice = {
  x: 700,
  y: 200,
  sprite: null,
  stapGrootte: null,

  beweeg() {
    this.x += floor(random(-1,2))*this.stapGrootte;
    this.y += floor(random(-1,2))*this.stapGrootte;

    this.x = constrain(this.x,0,canvas.width - raster.celGrootte);
    this.y = constrain(this.y,0,canvas.height - raster.celGrootte);
  },

  toon() {
    image(this.sprite,this.x,this.y,raster.celGrootte,raster.celGrootte);
  }
}



function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  alice.sprite = loadImage("images/sprites/Alice100px/Alice.png");
  for (var b = 0;b < jos.aantalFrames;b++) {
    frameJos = loadImage("images/sprites/Jos100px/Jos_" + b + ".png");
    jos.animatie.push(frameJos);
  }
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(10);
  raster.berekenCelGrootte();
  jos.stapGrootte= 1*raster.celGrootte;
  alice.stapGrootte= 1*raster.celGrootte;
}

function draw() {
  background(brug);
  raster.teken();
  jos.beweeg();
  jos.toon();
  alice.toon();

  if (jos.wordtGeraakt(alice)) {
    noLoop();
  }
}
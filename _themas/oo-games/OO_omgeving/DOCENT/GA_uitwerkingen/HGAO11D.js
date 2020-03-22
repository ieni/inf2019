var spoor = {
  grijsTint: 150,
  y: 200,
  dikte: 5,

  teken() {
    push();
    fill(this.grijsTint);
    rect(0,this.y,canvas.width,this.dikte);
    pop();
  }
}

var trein = {
  x: null,
  y: 100,
  snelheid: -10,
  schaal: 5,
  sprite: null,

  beweeg() {
    if (keyIsDown(LEFT_ARROW)) {
      this.snelheid -= 1;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.snelheid += 1;
    }
    this.snelheid = constrain(this.snelheid,-25,25);
    this.x += this.snelheid;
    if (this.x <= -1*this.sprite.width / this.schaal) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = -1*this.sprite.width / this.schaal;
    }
  },

  toon() {
    image(this.sprite,this.x,this.y,this.sprite.width / this.schaal,this.sprite.height / this.schaal);
  }
}

function preload() {
  winter = loadImage("images/backgrounds/Winter.png");
  stoomTrein = loadImage("images/sprites/stoomtrein.png");
  trein.sprite = stoomTrein;
}

function setup() {
  canvas = createCanvas(winter.width,winter.height);
  canvas.parent('processing');
  frameRate(10);
  trein.x = canvas.width;
}

function draw() {
  background(255);
  background(winter);
  trein.beweeg();
  trein.toon();
  spoor.teken();
}
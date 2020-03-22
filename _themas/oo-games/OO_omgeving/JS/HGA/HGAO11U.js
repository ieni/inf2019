var spoor = {
  grijsTint: 150,
  y: 200,
  dikte: 5,
  test: null,
  
  teken() {
    push();
    fill(this.grijsTint);
    rect(0,this.y,canvas.width,this.dikte);
    pop();
  }
}

function preload() {
  winter = loadImage("images/backgrounds/Winter.png");
  stoomTrein = loadImage("images/sprites/stoomtrein.png");
}

function setup() {
  canvas = createCanvas(winter.width,winter.height);
  canvas.parent('processing');
  frameRate(10);
}

function draw() {
  background(255);
  background(winter);
  // trein.toon();
  spoor.teken();
}
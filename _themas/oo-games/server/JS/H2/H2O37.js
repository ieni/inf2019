class Knikker {
  constructor() {
    this.diameter = 40;
    this.straal = this.diameter / 2;
    this.x = random(this.straal,canvas.width - this.straal);
    this.y = random(this.straal,canvas.height - this.straal);
    this.snelheidX = random(1,10);
    this.snelheidY = random(1,10);
  }

  beweeg() {
    this.x += this.snelheidX;
    this.y += this.snelheidY;
    
    if (this.x < this.straal || this.x > canvas.width - this.straal) {
      this.snelheidX *= -1;
    }
    if (this.y < this.straal || this.y > canvas.height - this.straal) {
      this.snelheidY *= -1;
    }
  }
  
  teken() {
    fill(255,255,255,1);
    ellipse(this.x,this.y,this.diameter);
  }
}

var knikkerVerzameling = [];

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  frameRate(50);
  colorMode(RGB,255,255,255,1);
  background(0,0,75,1);
  noStroke();
  k1 = new Knikker();
}

function draw() {
  background(0,0,75,0.2);
  k1.beweeg();
  k1.teken();
}
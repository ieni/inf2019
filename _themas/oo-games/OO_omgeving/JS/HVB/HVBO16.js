var bal = {
  diameter: 40,
  straal: null,
  x: null,
  y: null,
  snelheidX: 8,
  snelheidY: 5,
  
  beweeg() {
    this.x += this.snelheidX;
    this.y += this.snelheidY;
    
    if (this.x < this.straal || this.x > canvas.width - this.straal) {
      this.snelheidX *= -1;
    }
    if (this.y < this.straal || this.y > canvas.height - this.straal) {
      this.snelheidY *= -1;
    }
  },
  
  teken() {
    fill(255,255,255,1);
    ellipse(this.x,this.y,this.diameter);
  }
}

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  frameRate(50);
  colorMode(RGB,255,255,255,1);
  background(0,0,75,1);
  noStroke();
  bal.straal = bal.diameter/2;
  bal.x = bal.straal;
  bal.y = canvas.height/4;
}

function draw() {
  background(0,0,75,0.2);
  bal.beweeg();
  bal.teken();
}
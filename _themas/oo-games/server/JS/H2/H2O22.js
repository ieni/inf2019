var bal = {
  diameter: 40,
  straal: null,
  x: null,
  y: 0,
  snelheidX: 8,
  snelheidY: 5,
  demping: 1.0,
  
  beweeg() {
    
    this.x += this.snelheidX;
    this.y += this.snelheidY;
    
    if (this.x <= this.straal || this.x >= canvas.width - this.straal) {
      this.snelheidX *= -this.demping;
    }
    
    if (this.y <= this.straal || this.y >= canvas.height - this.straal) {
      this.snelheidY *= -this.demping;
      this.snelheidX *= this.demping;
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
  textFont("Verdana");
  bal.straal = bal.diameter/2;
  bal.x = bal.diameter;
  bal.y = bal.x;
}

function draw() {
  background(0,0,75,0.2);
  bal.beweeg();
  bal.teken();
}
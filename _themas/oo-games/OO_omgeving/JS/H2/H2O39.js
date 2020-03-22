class Knikker {
  constructor(x,y,kl) {
    this.diameter = 10;
    this.straal = this.diameter / 2;
    this.x = x;
    this.y = y;
    this.snelheidX = random(1,10);
    this.snelheidY = random(1,10);
    this.kleur = kl;
  }
  
  gaNaarMuis(muisX,muisY) {

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
    fill(this.kleur);
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
  for (var k = 0; k < 100; k++) {
    knikkerVerzameling.push(new Knikker(random(20,980),random(20,280),'white'));
  }  
  knikkerVerzameling[99].kleur = 'red';
}

function draw() {
  background(0,0,75,0.2);

  for (var i =0; i < knikkerVerzameling.length; i++) {
    if (mouseIsPressed) {
      knikkerVerzameling[i].gaNaarMuis(mouseX,mouseY);
    }
    else {
      knikkerVerzameling[i].beweeg();    
    }
    knikkerVerzameling[i].teken();
  }
}
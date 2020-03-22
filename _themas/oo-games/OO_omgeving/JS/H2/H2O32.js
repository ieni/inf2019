class Vis {
  constructor() {
    this.x = -170;
    this.y = 100;
    this.snelheid = 10;
    this.gegeten = 0;
  }
  
  zwem() {
    this.x += this.snelheid;
  }
  
  eet(p) {
    if (dist(this.x + 155,this.y + 60,p.x,p.y) < 20) {
      return true;
    }
    else {
      return false;
    }
  }
  
  teken() {
    push();
    noStroke();
    translate(this.x,this.y);
    fill('peachpuff');
    triangle(0,0,0,100,50,50);
    fill('palegoldenrod');
    ellipse(100,50,120,80);
    fill('steelblue')
    triangle(145,60,165,50,165,70);
    fill('orange');
    ellipse(150,40,10,10);
    fill('red');
    pop();
  }
}

class Prooi {
  constructor(d) {
    this.x = random(700,800);
    this.y = random(100,500);
    this.diameter = 30;
  }
  
  beweeg() {
    this.x += random(-15,15);
    this.y += random(-25,25);
    this.x = constrain(this.x,700,800);
    this.y = constrain(this.y,20,580);
  }
  
  teken() {
    push();
    noStroke();
    translate(this.x,this.y);
    ellipse(0,0,20,20);
    pop();
  }
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  frameRate(10);
  textFont("Verdana");
  textSize(90);
  gup = new Vis();
  garnaal = new Prooi(40);
}

function draw() {
  background('steelblue');
  gup.zwem();
  gup.teken();
  
  garnaal.beweeg();
  garnaal.teken();
  
  if (gup.eet(garnaal)) {
    gup.x = -170;
    gup.gegeten++;
  }
  if (gup.x > 800) {
    background('red');
    noLoop();
  }
  
  text(gup.gegeten,5,70);
}
class Boom {
  constructor() {
  this.leeftijd = round(random(1,5));
  this.R = random(100,200);
  this.G = 155;
  this.B = random(0,100);
  this.x = random(50,720);
  }
  
  groei() {
    if (this.leeftijd < 20) {
      this.leeftijd++;
    }
  }

  teken() {
    push();
    translate(this.x,375);
    fill('sienna');
    rect(0,0,20 + 2*this.leeftijd,-100 - 10*this.leeftijd);
    fill(this.R,this.G,this.B);
    ellipse((20 + 2*this.leeftijd) / 2,-90 - 5*this.leeftijd,80 + 4*this.leeftijd,130 + 10*this.leeftijd);
    pop();
  }
}

// we maken een lege array waar alle objecten in komen te staan
var bomen = [];

function setup() {
  canvas = createCanvas(800,400);
  canvas.parent('processing');
  noStroke();
  frameRate(1);
  
  for (var b = 0; b < 10; b++) {
    bomen.push(new Boom());
  }
}

function draw() {
  background('orange');
  fill('wheat');
  rect(0,350,canvas.width,canvas.height-350);
  
  for (var n = 0;n < bomen.length;n++) {
    bomen[n].teken();
    bomen[n].groei();
  }
}
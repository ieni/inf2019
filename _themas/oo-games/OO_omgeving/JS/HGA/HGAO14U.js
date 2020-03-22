class Vijand {
  constructor() {
    this.diameter = 100;
    this.x = canvas.width - this.diameter - 10;
    this.y = canvas.height / 2;
    this.v = 10;
    this.levens = 5;
  }
  
  beweeg() {
    this.y += this.v;
    if (this.y > canvas.height - this.diameter / 2 || this.y < this.diameter / 2) {
      this.v *= -1;
    }
  }
  
  wordtGeraakt(k) {
    if (dist(this.x,this.y,k.x,k.y) <= (k.diameter + this.diameter) / 2) {
      k.y = -100;
      this.levens--;
      return true;
    }
    else {
      return false;
    }
  }
  
  teken() {
    push();
    fill('lightcoral');
    noStroke();
    ellipse(this.x,this.y,this.diameter);
    fill('white');
    text(this.levens,this.x - 10,this.y + 10);
    pop();
  }
}

class Kogel {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 20;
    this.v = 10;
  }
  
  beweeg() {
    this.x += this.v;
  }
  
  teken() {
    push();
    noStroke();
    fill('silver');
    ellipse(this.x,this.y,this.diameter);
    pop();
  }
}

class Kanon {
  constructor() {
    this.x = 40;
    this.y = canvas.height / 2;
    this.l = 50;
    this.h = 20;
    this.v = 5;
    this.geschoten = 0;
    this.kogels = [];
  }

  schiet() {
    if (keyCode == 32) {

      this.geschoten++;
    }
  }  
    
  beweeg() {
      if (keyIsDown(UP_ARROW)) {
        this.y -= this.v;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.y += this.v;
      }      
    }
  
  teken() {
    push();
    noStroke();
    fill('teal');
    rect(this.x,this.y,this.l,this.h);
    pop();
  }
}

function setup() {
  canvas = createCanvas(900,600);
  canvas.parent('processing');
  textSize(40);
  textFont("Monospace");
  k = new Kanon();
  v = new Vijand();
}

function draw() {
  background('linen');
  k.beweeg();
  k.teken();
  v.beweeg();
  v.teken();
  
  text(k.geschoten+'x geschoten',50,50);
}

function keyTyped() {
  k.schiet();
}
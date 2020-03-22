var bal = {
  diameter: 80,
  straal: null,
  x: 0,
  y: null,
  snelheid: 3,
  
  beweeg() {
    this.x += this.snelheid;
    if (this.x > canvas.width + this.diameter) {
      this.x = 0;
    }
  },
  
  teken() {
    fill('dodgerblue');
    ellipse(this.x,this.y,this.diameter);
  }
}

var detectielus = {
  x: 150,
  lengte: 250,
  ikVoelIets: false,
  
  detecteer(voorwerp) {
    this.ikVoelIets = false;
  },
  
  teken() {
    fill('grey');
    rect(this.x,250,this.lengte,30);
  }
}

var stoplicht = {
  stand: 0,
  teller: 0,
  tijd: 0,
  
  bepaalStand(b) {
    if (b) {
      this.stand = 2;
      this.tijd = 0;
    }
    else {
      if (this.tijd>50 && this.tijd < 150) {
        this.stand = 1;
      }
      else if (this.tijd >= 150) {
        this.stand=0;
      } 
    }
  },
  
  teken() {
    push();
    fill('black');
    rect(470,20,60,140);
    if (this.stand == 0) {
      fill('red');
      ellipse(500,45,40);
    }
    else if (this.stand == 1) {
      fill('orange');
      ellipse(500,90,40);
    }
    else {
      fill('green');
      ellipse(500,135,40);
    }
    pop();
    this.tijd++;
  }
}

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  frameRate(50);
  noStroke();
  bal.straal = bal.diameter / 2;
  bal.y = 250 - bal.straal;
}

function draw() {
  background('powderblue');
  fill('wheat');
  rect(0,250,canvas.width,canvas.height - 250); 
  detectielus.teken();
  bal.beweeg();
  bal.teken();
  detectielus.detecteer(bal);
  stoplicht.bepaalStand(detectielus.ikVoelIets);
  stoplicht.teken();
}
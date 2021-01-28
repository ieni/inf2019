var jager = {
  x: 50,
  y: 50,
  zijde: 100,
  stapGrootte: 5,

  beweeg() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.stapGrootte;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.stapGrootte;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.stapGrootte;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.stapGrootte;
    }
    
    this.x = constrain(this.x,0,canvas.width - this.zijde);
    this.y = constrain(this.y,0,canvas.height - this.zijde);
  },
  
  vlakbijRand() {
    if (this.x < 4*this.stapGrootte || this.x > canvas.width - 4*this.stapGrootte - this.zijde) {
      return true;
    }
    else {
      return false;
    }
  },
  
  teken() {
    fill('dodgerblue');
    rect(this.x,this.y,this.zijde,this.zijde);
  }
}


var prooi = {
  x: 800,
  y: 175,
  breedte: 75,
  hoogte: 50,
  benGeraakt: false,
  
  wordJeGeraakt(vijand) {
    if (vijand.x >= this.x - vijand.zijde && vijand.x <= this.x + this.breedte) {
      this.benGeraakt = true;
    }
  },  
  
  teken() {
    if(this.benGeraakt) {
      fill('white');
    }
    else {
      fill('green');
    }
    rect(this.x,this.y,this.breedte,this.hoogte);
  }
}


function setup() {
  canvas = createCanvas(1000,400);
  canvas.parent('processing');
  noStroke();
  frameRate(50);
}

function draw() {
  if (jager.vlakbijRand()) {
    background('red');
  }
  else {
    background('orange');
  }
  
  jager.beweeg();
  prooi.wordJeGeraakt(jager);
  prooi.teken();
  jager.teken();
}
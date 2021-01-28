var raster = {
  Nrij: 6,
  Nkolom: 9,
  aantal: 1,
  grootte: 50,
  
  teken() {
    push();
    fill('linen');
    strokeWeight(5);
    stroke(255);
    for (var rij = 0;rij < this.Nrij;rij++) {
      for (var kolom = 0;kolom < this.Nkolom;kolom++) {
        rect(kolom*this.grootte,rij*this.grootte,this.grootte,this.grootte);
      }
    }
    pop();    
  },
  
  muisOver(x,y) {
    push();
    fill('lightsalmon');
    strokeWeight(5);
    stroke(255);
    rect(floor(x / this.grootte)*this.grootte,floor(y / this.grootte)*this.grootte,this.grootte,this.grootte);
    pop();
  },
  
  plaatsStip(x,y) {
    var raak = false
    for (var a = 0;a < this.aantal;a++) {
      var kolom = floor(random(0,this.Nkolom));
      var rij = floor(random(0,this.Nrij));
      this.tekenStip(kolom,rij);
      if (this.controleerRaak(x,y,kolom,rij)) {
        noLoop();
      }
    }   
    this.aantal++;
  },
  
  controleerRaak(mx,my,k,r) {
    return false;
  },
  
  tekenStip(x,y) {
    var str = 15;
    push();
    noStroke();
    fill(round(random(0,255)),round(random(0,255)),round(random(0,255)));
    translate((x + 0.5)*this.grootte,(y + 0.5)*this.grootte);
    ellipse(0,0,str*2);
    pop();
  }
}

function setup() {
  canvas = createCanvas(450,300);
  canvas.parent('processing');
  frameRate(5);
  textFont("Monospace");
  textSize(30);
}

function draw() {
  background(255);
  raster.teken();
  raster.muisOver(mouseX,mouseY);
  if (mouseIsPressed) {
    raster.plaatsStip(mouseX,mouseY);
  }
  text(raster.aantal,10,35);  
}
var jos = {
  x: null,
  y: 125,
  schaal: 1.0,
  naam: "Jos",
  
  teken(muisPositieX,muisPositieY) {
    this.x = muisPositieX;
    this.y = constrain(muisPositieY,100,150);
    this.schaal = this.x / (0.25*width);
    
    push();
    translate(this.x,this.y);
    scale(this.schaal);
    noStroke();
    fill('indianred');
    ellipse(0,0,50);
    fill('slategray');
    ellipse(-7,-10,17);
    ellipse(7,-10,17);
    fill('white');
    ellipse(-7,-8,7,13);
    ellipse(7,-8,7,13);
    fill('orange');
    ellipse(0,3,17);
    stroke('slategray');
    strokeWeight(3);
    fill('white');
    arc(0, 13, 26, 13, 0, PI, CHORD);
    pop();
  }
};


function setup() {
  canvas = createCanvas(1000,250);
  canvas.parent('processing');
  fill('black');
  textFont("Verdana");
  textSize(14);
  noStroke();
  frameRate(20);
}

function draw() {
  background('lavender');
  jos.teken(mouseX,mouseY);
  
  text(jos.naam + " wordt getekend met schaal = " + jos.schaal + " op x-positie (middelpunt neus) " + jos.x + ".",20,20);
}
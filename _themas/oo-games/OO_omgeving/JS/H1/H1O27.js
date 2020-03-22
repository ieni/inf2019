var aantal = 4;
var breedte;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  noStroke();
  textFont("Verdana");
  textSize(14);
  frameRate(5);
}

function draw() {
  background('lavender');
  fill('black');
  breedte = width / 4;
  text("aantal = " + aantal,10,20);  
  
  push();
  translate(0.5*breedte,150);

  for (var n = 0; n < 4;n++) {
    tekenJos(2);
    translate(breedte,0);
  }
  
  pop();
  
  if (keyIsDown(RIGHT_ARROW)) {
    aantal++;
  }   
}

function tekenJos(s) {
  push();
  scale(s);
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


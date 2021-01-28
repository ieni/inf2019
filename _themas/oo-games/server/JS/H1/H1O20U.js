var zoomNiveau = 3;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(19);
  noStroke();
  frameRate(10);
}

function draw() {
  background('lavender');
  fill('white');
  rect(0,0,width,30);
  fill('black');  
  text("Klik met je muis | huidig zoomniveau: " + round(10*zoomNiveau) / 10,5,20);
  if (mouseIsPressed == true) {
    zoomNiveau += 0.1;
  }
  else {
    zoomNiveau -= 0.1;
  }
  tekenJos(width / 2,height / 2,zoomNiveau);
}

function tekenJos(x,y,s) {
  push();
  translate(x,y);
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
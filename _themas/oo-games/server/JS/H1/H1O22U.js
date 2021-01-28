var kleur = 'indianred';
var afstand;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  frameRate(50);
}

function draw() {
  if (mouseX <= width / 2) {
    background('yellow');
  }
  else
  {
    background('white');
  }
  
  mouseX=constrain(mouseX,25,width - 25);
  mouseY=constrain(mouseY,25,height - 25);
  afstand=dist(width / 2,height / 2,mouseX,mouseY);
  fill('black');  
  text("Beweeg de muis | x = " + round(mouseX) + " en y = " + round(mouseY) + " afstand = " + round(afstand),10,20);
  
  if (mouseX <= 30 || mouseX >= width - 30 || mouseY <= 30 || mouseY >= height - 30 || afstand <= 50 + 25 + 5) {
    kleur='red';
  }
  else {
    kleur='indianred';
  }

  ellipse(width / 2,height / 2,100);
  tekenJos(mouseX,mouseY,kleur);
}

function tekenJos(x,y,kleur) {
  push();
  translate(x,y);
  scale(1); 
  noStroke();
  fill(kleur);
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
var xJager = 50;
var yJager = 50;
var xProoi = 800;
var yProoi = 175;

function setup() {
  canvas = createCanvas(1000,400);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(140);
  noStroke();
  frameRate(50);
}

function draw() {
  background('olive');
  if (keyIsDown(LEFT_ARROW)) {
    xJager -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xJager += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    yJager -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yJager += 5;
  }

  xJager = constrain(xJager,0,width - 100);
  yJager = constrain(yJager,0,height - 100);

  if (xJager >= 700 && xJager <= 875 && yJager >= 75 && yJager <= 225) {
    fill('chartreuse');
  }
  else {
    fill('darkkhaki');
  }
  rect(800,175,75,50);
  fill('moccasin');
  rect(xJager,yJager,100,100);   
}

function eindScherm() {
  background('white');
  fill('black');
  text("GEVANGEN!",75,250);
  noLoop();
}
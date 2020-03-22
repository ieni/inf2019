var x = 50;
var y = 50;

function setup() {
  canvas = createCanvas(1000,400);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  frameRate(50);
}

function draw() {
  background('olive');
  
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }

  y = constrain(y,0,height - 100);

  if (y >= 75 && y <= 225) {
    fill('chartreuse');
  }
  else {
    fill('darkkhaki');
  }
  
  rect(800,175,75,50);
  
  fill('moccasin');
  rect(x,y,100,100);   
}
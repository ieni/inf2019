function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  //noLoop();
}

function draw() {
  background('lavender');
  fill('black');
  text("mouseX:" + round(mouseX) + " mouseY:"+round(mouseY),10,20);
  fill('indianred');
  ellipse(width/2,height/2,10);
}

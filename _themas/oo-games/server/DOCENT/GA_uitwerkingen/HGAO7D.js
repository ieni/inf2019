var aantal = 50;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noLoop();
  // frameRate(10);
}

function draw() {
  tekenRaster();
  for (var a = 0;a < aantal;a++) {
    tekenStip(round(random(0,8)),round(random(0,8)));
  }
}

function tekenRaster() {
  push();
  fill('linen');
  strokeWeight(5);
  stroke(255);
  for (var rij = 0;rij < 9;rij++) {
    for (var kolom = 0;kolom < 9;kolom++) {
      rect(kolom*50,rij*50,50,50);
    }
  }
  pop();
}

function tekenStip(x,y) {
  var str = 15;
  push();
  noStroke();
  fill(round(random(0,255)),round(random(0,255)),round(random(0,255)));
  translate((x + 0.5)*50,(y + 0.5)*50);
  ellipse(0,0,str*2);
  pop();
}
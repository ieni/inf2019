var letterGrootte = 30;
var marge = 20;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  textFont("Courier");
  textSize(letterGrootte);
  textLeading(0.8*letterGrootte);
  //noLoop();
}

function draw() {
  background('orange');
  fill('yellow');
  textAlign(LEFT, TOP);
  text("mouseX:" + round(mouseX) + " mouseY:" + round(mouseY),mouseX,mouseY);
  translate(50,50);
  fill('black');
  text("vensterGrootte:\n" + windowWidth + " x " + windowHeight,0,0);
  text("canvasGrootte:\n " + width + " x " + height,0,120);
  
  translate(500,0);
  fill('dodgerblue');
  stroke('white');
  strokeWeight(10);
  rect(0,0,400,200);

  translate(25,25);
  noStroke();
  fill('white');
  textAlign(RIGHT, BOTTOM);
  text("Deze tekst is erg lang en wordt daarom op meerdere regels weergegeven.",0,0,350,150);
}

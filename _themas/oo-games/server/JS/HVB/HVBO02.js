function setup() {
  canvas = createCanvas(1000,500);
  background('orange');
  canvas.parent('processing');
  noLoop();
}

function draw() {
  // roze vierhoek met rode rand
  
  strokeWeight(10);
  stroke('red');
  fill('pink');
  beginShape();
  vertex(200,25);
  vertex(25,100);
  vertex(25,200);
  vertex(25,400);
  vertex(200,475);
  endShape(CLOSE);
  // blauwe zeshoek met donkerblauwe rand
  
  strokeWeight(10);
  stroke('darkblue');
  fill('dodgerblue');
  beginShape();
  vertex(425,25);
  vertex(250,100);
  vertex(250,200);
  vertex(250,400);
  vertex(425,475);
  vertex(600,400);
  vertex(600,100);
  endShape(CLOSE);
  // dezelfde vorm, maar zonder CLOSE
  
  strokeWeight(10);
  stroke('darkblue');
  fill('dodgerblue');
  beginShape();
  vertex(800,25);
  vertex(625,100);
  vertex(625,200);
  vertex(625,400);
  vertex(800,475);
  vertex(975,400);
  vertex(975,100);
  endShape();
}
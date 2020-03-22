function setup() {
  canvas = createCanvas(450,450);
  background('cornflowerblue');
  canvas.parent('processing');
  noLoop();
}

function draw() {
  // teken de grond
  noStroke();
  fill('wheat');
  rect(0,350,450,100);
  
  translate(0,0);
  // begin teken het huis
  strokeWeight(4);
  stroke('darkgrey');
  fill('lightgray');
  rect(100,280,100,100);
  fill('gray');
  triangle(100,280,200,280,150,200);
  // teken de deur
  noStroke();
  rect(120,330,30,50);
  // einde teken het huis
  // translate(-90,10);
  
  // teken de maan
  fill('khaki');
  ellipse(350,100,150,150);
  // teken de boom
  fill('sienna');
  rect(300,250,40,130);
  fill('olive');
  ellipse(320,230,100,150);
}

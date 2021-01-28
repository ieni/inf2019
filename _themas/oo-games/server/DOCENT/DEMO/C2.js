var instructieTekst = "Dit voorbeeld gebruikt de loopfunctie en toont variabelen en het gebruik van if-else. Het is verder bij een presentatie gebruikt om te motiveren waarom in het begin van de module == true wordt gebruikt.";

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noStroke();
}

var eX = 450;

function draw() {
  background('silver');
  if (eX <= 200) {
      background('black');
  }
  
  // de toevoeging == true is niet nodig
  if (mouseIsPressed == true) {
      fill('khaki');
  }
  else {
      fill('steelblue');
  }
  
  ellipse(0,0,800);
  fill('deepskyblue'); 
  ellipse(eX,450,400);
  eX--;
}
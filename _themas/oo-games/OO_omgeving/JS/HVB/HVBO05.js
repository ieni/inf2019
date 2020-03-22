var horizontaal = 120;
var verticaal = 170;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(30);
  stroke('white');
  strokeWeight(10);
  // Met frameRate regel je hoe vaak de loopfunctie draw per seconde opnieuw wordt uitgevoerd.
  
  frameRate(10);
}

function draw() {
  background('orange');
  fill('white');
  rect(0,0,width,40);
  fill('black');  
  text("Het middelpunt van de cirkel bevindt zich in [x,y] = [" + horizontaal + ","+verticaal + "]",10,30);
  fill('dodgerblue');
  ellipse(horizontaal,verticaal,200);
  // Telkens als de loopfunctie Draw wordt uitgevoerd, wordt de variabele horizontaal met 2 opgehoogd.
  
  horizontaal += 2;
}

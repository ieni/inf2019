var horizontaalA = 120;
var verticaal = 170;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(30);
  stroke('white');
  strokeWeight(10);
  frameRate(10);
}

function draw() {
  background('orange');
  fill('white');
  rect(0,0,width,40);
  fill('black');  
  text("Het middelpunt van de cirkel bevindt zich in [x,y] = [" + horizontaalA + "," + verticaal + "]",10,30);
  fill('dodgerblue');
  ellipse(horizontaalA,verticaal,200);
  horizontaalA += 2;
}
var animatie = [];
var aantalBeeldjes = 6;
var nummer = 0;

function preload() {
  for (var b = 0;b<aantalBeeldjes;b++) {
    nieuw_beeldje = loadImage("images/sprites/Jos_losse_beeldjes/Jos-" + b + ".png");
    animatie.push(nieuw_beeldje);
  }
}

function setup() {
  canvas = createCanvas(460,460);
  canvas.parent('processing');
  noStroke();
  frameRate(2);
  textFont("Georgia");
  textSize(18);
}

function draw() {
  background('orange');
  image(animatie[nummer],0,0);
  
  nummer++;
  // beeldje 5 bestaat, maar beeldje 6 niet. Dus als nummer 6 is, moet hij terug naar 0

  if (nummer==aantalBeeldjes) {
    nummer=0;
  }
  
  text("frameCount=" + frameCount,5,20);
  text("nummer=" + nummer,5,40);
}
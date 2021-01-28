var achtergrond;
var animatie = [];
var aantalBeeldjes = 15;
var nummer;
var flatboyX = -140;
var flatboyBreedte = 258;
var flatboyHoogte = 237;

function preload() {
  achtergrond = loadImage("images/backgrounds/green_grass_landscape.svg");
  for (var b = 1;b <= aantalBeeldjes;b++) {
    nieuw_beeldje = loadImage("images/sprites/flatboy/Jump(" + b + ").png");
    animatie.push(nieuw_beeldje);
  }
}

function setup() {
  canvas = createCanvas(750,435);
  canvas.parent('processing');
  frameRate(20);
}

function draw() {
  background(255);
  background(achtergrond);
  nummer = frameCount % aantalBeeldjes;
  image(animatie[nummer],flatboyX,100,flatboyBreedte,flatboyHoogte);
  flatboyX += 5;
  if (flatboyX >= canvas.width) {
    flatboyX = -140;
  }
}
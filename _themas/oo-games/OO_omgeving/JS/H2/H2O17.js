var bomen;

var kever = {
  x: 100,
  y: 150,
  sprite: null,

  beweeg() {
    this.x += round(random(-5,5));
    this.y += round(random(-5,5));
    image(this.sprite,kever.x,kever.y,this.sprite.width / 2,this.sprite.height / 2);
  }
};

function preload() {
  bomen = loadImage("images/bomen.jpg");
  kever.sprite = loadImage("images/sprites/kever.png");
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(14);
  noStroke();
  frameRate(2);
}

function draw() {
  background(bomen);

  kever.beweeg();


  fill('cornsilk');
  rect(0,410,450,40);
  fill('black');
  text("Het object kever bevindt zich in het punt x = 100 en y = 150",5,435);
}
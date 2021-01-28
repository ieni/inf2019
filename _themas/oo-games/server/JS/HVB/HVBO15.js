var bomen;

var kever = {
  
  // attribuut
  
  x: 100,
  y: 150,
  sprite: null,
  
  
  // methode
  
  beweeg() {
    this.x += random(-5,5);
    this.y += random(-5,5);
    image(this.sprite,kever.x,kever.y);
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
}

function draw() {
  background(bomen);
  
  kever.beweeg();
  
  
  fill('cornsilk');
  rect(0,410,450,40);
  fill('black');  
  text("Dit lijkt voorbeeld 10, maar in de code is kever nu een object.",5,435);
}
var foto;
var pixelKleur;
var rood,groen,blauw;

function preload() {
  foto = loadImage("images/brieck_klein.jpg");
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  textFont("Georgia");
  textSize(18);
  noStroke();
  foto.loadPixels();
}

function draw() {
  background(foto);
  pixelKleur = foto.get(mouseX,mouseY);
  rood = pixelKleur[0];
  groen = pixelKleur[1];
  blauw = pixelKleur[2];
  
  fill(pixelKleur);
  rect(0,410,450,40);
  fill('white');  
  text("RGB-waarden: rood = " + rood + " groen = " + groen+" blauw = " + blauw,10,435);
}
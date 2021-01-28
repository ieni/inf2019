var foto;
var pixelKleur;
var rood,groen,blauw;
var raster = 25;

function preload() {
  foto = loadImage("images/brieck_klein.jpg");
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  noStroke();
  foto.loadPixels();
  noLoop();
}

function draw() {
  background(foto);
  for (var k = 0;k < foto.width;k += raster) {
    for (var r = 0;r < foto.width;r += raster) {
      pixelKleur = foto.get(k,r);
      fill(pixelKleur);
      rect(k,r,raster,raster);
    }
  }
}
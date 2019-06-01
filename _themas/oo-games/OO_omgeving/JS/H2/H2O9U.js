var foto;
var pixelKleur;
var rood,groen,blauw;
var raster = 25;

function preload() {
  foto = loadImage("images/brieck_klein.jpg");
}

function setup() {
  var myCanvas = createCanvas(450,450);
  myCanvas.parent('processing');
  noStroke();
  foto.loadPixels();
  noLoop();
}

function draw() {
  background(foto);
  for (var k = 0;k < foto.width;k += raster) {
    for (r = 0;r < foto.width;r += raster) {
      pixelKleur = foto.get(k,r);
      fill(pixelKleur);
      rect(k,r,raster,raster);
    }
  }
}
var rij = 0;

function setup() {
  var myCanvas = createCanvas(451,451);
  myCanvas.parent('processing');
  background('coral');
  fill('white');
}

function draw() {
    for (var kolom = 0;kolom < 450;kolom += 50) {
      rect(kolom,rij,50,50);
    }
}
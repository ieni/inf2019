var aantalLagen = 10;
var breedte = 90;
var hoogte;

function setup() {
  hoogte = breedte / 2;
  canvas = createCanvas(aantalLagen*breedte+1,aantalLagen*hoogte+1);
  canvas.parent('processing');
  noLoop();
  background('silver');
  fill('lightslategray');
  stroke('darkslategray');
}

function draw() {
  for (var laag = 1;laag <= aantalLagen;laag++) {
    tekenRij(laag);
    translate(0,hoogte);
  }
}

function tekenRij(aantalStenen) {
  inspringen = (aantalLagen - aantalStenen)*0.5*breedte;
  push();
  translate(inspringen,0);
  for (var steen = 0;steen < aantalStenen;steen++) {
    rect(breedte*steen,0,breedte,hoogte);
  }
  pop();
}
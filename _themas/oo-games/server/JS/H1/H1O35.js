var aantalLagen = 5;
var breedte = 90;
var hoogte;

function setup() {
  hoogte = breedte / 2;
  canvas = createCanvas(aantalLagen*breedte + 1,aantalLagen*hoogte + 1);
  canvas.parent('processing');
  noLoop();
  background('silver');
  fill('lightslategray');
  stroke('darkslategray');
}

function draw() {
  tekenRij(4);
}

function tekenRij(aantalStenen) {
  inspringen = 0;
  push();
  translate(inspringen,0);
  for (var steen = 0;steen < aantalStenen;steen++) {
    rect(breedte*steen,0,breedte,hoogte);
  }
  pop();
}
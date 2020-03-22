var aantalLagen = 5;
var breedte = 90;
var hoogte;

function setup() {
  hoogte = breedte/2;
  canvas = createCanvas(aantalLagen*breedte + 1,aantalLagen*hoogte + 1);
  background('silver');
  fill('lightslategray');
  stroke('darkslategray');  
  canvas.parent('processing');
  noLoop();
}

function draw() {
  translate(0,height - hoogte);
  tekenPiramide(aantalLagen);
}

function tekenPiramide(n) {
  if (n > 0) {
    for (var nr = 0;nr < n;nr++) {
      rect(nr*breedte,0,breedte,hoogte);
    }
    translate(breedte/2,-hoogte);
    // verlaag het aantal lagen met 1 
    
    n--;
    tekenPiramide(n);
  }
}

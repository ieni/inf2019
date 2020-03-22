var aantalLagen = 5;
var breedte = 90;
var hoogte;

function setup() {
  hoogte = breedte / 2;
  canvas = createCanvas(800,600);
  canvas.parent('processing');
  noLoop();
}

function draw() {
    tekenKamer(1);
}

function tekenKamer(s) {
    scale(s);
    fill('olive');
    noStroke();
    rect(0,0,800,600);
    fill('darkkhaki');
    rect(0,0,400,600);
    stroke(1);
    fill('saddlebrown');
    rect(50,200,250,400);
    fill('maroon');
    rect(70,220,210,160);
    noStroke();
    fill('black');
    rect(340,90,420,320);
    //
    translate(350,100);
}


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
    fill('pink');
    noStroke();
    rect(0,0,800,600);
    fill('salmon');
    rect(0,0,400,600);
    stroke(1);
    fill('mediumseagreen');
    rect(50,200,250,400);
    fill('lightyellow');
    rect(70,220,210,160);
    noStroke();
    fill('brown');
    ellipse(600,525,150);
    translate(170,100);
    tekenBloem();
    translate(-170,-100);
    fill('black');
    rect(340,90,420,320);
    
    translate(350,100);
    tekenKamer(0.5);
}

function tekenBloem() {
    var aantal = 25;
     push();
     colorMode(RGB, 255, 255, 255, 1);
     fill(178, 34, 34,.7);
     for (var n = 0;n < aantal;n++) {
         ellipse(0,0,150,20);
         rotate(360 / aantal);
     }
     fill(255, 195, 0,.5);
     for (var n = 0;n < aantal;n++) {
         rect(0,0,35,35)
         rotate(360 / aantal);
     }
     pop();
}

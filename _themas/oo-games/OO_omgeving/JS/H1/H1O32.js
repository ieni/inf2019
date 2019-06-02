var R = 255;
var G = 127;
var B = 127;

function setup() {
  var myCanvas = createCanvas(451,451);
  myCanvas.parent('processing');
  frameRate(5);
}

function draw() {
  for (var rij = 0;rij < 450;rij += 50) {
    for (var kolom = 0;kolom < 450;kolom += 50) {
      // R = random(0,255);
      
      fill(R,G,B);
      rect(kolom,rij,50,50);
    }
  }
}
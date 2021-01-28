var speler = {
  getrokkenKaarten: [],
  
  trekKaart(spel) {
      volgNummer = floor(random(0,spel.length));
      this.getrokkenKaarten.push(spel[volgNummer]);
  },
  
  toonKaarten() {
    image(this.getrokkenKaarten[this.getrokkenKaarten.length - 1],0,0);
  }
}

var kaartSpel = [];
var kaartSoorten = new Array("S","K","H","R");

function preload() {
  for (var s = 0;s < kaartSoorten.length;s++) {
    for (var k = 1;k <= 13;k++) {
      kaart = loadImage("images/speelkaarten/"+kaartSoorten[s] + k + ".png");
      kaartSpel.push(kaart);
    }
  }
}

function setup() {
  canvas = createCanvas(226*4,315);
  canvas.parent('processing');
  textFont("Georgia");
  textSize(60);
  textAlign(CENTER,CENTER);
  noStroke();
  frameRate(5);
}

function draw() {
  background('white');
  speler.trekKaart(kaartSpel);
  speler.toonKaarten();
}
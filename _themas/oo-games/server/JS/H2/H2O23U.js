var speler = {
  getrokkenKaarten: [],
  
  trekKaart(spel) {
      volgNummer = floor(random(0,spel.length));
      this.getrokkenKaarten.push(spel[volgNummer]);
  },
  
  toonKaarten() {
    for (var h = 0;h < this.getrokkenKaarten.length;h++) {
      image(this.getrokkenKaarten[h],this.getrokkenKaarten[h].width*h,0);
    }
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
  text("Klik (maximaal) vier keer om willekeurig vier kaarten uit een pakje te selecteren.",0,0,canvas.width,canvas.height);
  
  speler.toonKaarten();
  
  if (mouseIsPressed) {
    if (speler.getrokkenKaarten.length<4) {
      speler.trekKaart(kaartSpel);
    }
    else {
      fill('red');
      rect(0,0,canvas.width,canvas.height);
      fill('white');
      text("ik zei: maximaal VIER keer!!!",0,0,canvas.width,canvas.height);
    }
  }
}
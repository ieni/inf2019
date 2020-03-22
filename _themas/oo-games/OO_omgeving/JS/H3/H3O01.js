class Bal {
  constructor(x,y) {
  this.diameter = 40;
  this.straal = 20;
  this.x = x;
  this.y = y;
  this.R = random(0,255);
  this.G = random(0,255);
  this.B = random(0,255);
  this.alpha = 0.8;
  this.snelheid = 0;
  this.aantalKerenGestuiterd = 0;
  this.geraakt = false;
  }
  
  beweeg() {
    this.snelheid+=9.81/15;
    this.y+=this.snelheid;
    if (this.y>=canvas.height-this.straal) {
      this.snelheid*=-1;
      this.y=canvas.height-this.straal;
      this.aantalKerenGestuiterd++;
    }
  }
  
  teken() {
    push();
    noStroke();
    fill(this.R,this.G,this.B,this.alpha);
    ellipse(this.x,this.y,this.diameter);
    pop();
  }
}

var ballenArray = [];
var erIsNogGeenBalGestuiterd = true;
var score = 0;

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  frameRate(15);
  textFont("Verdana");
  textSize(24);
  ballenArray[0] = new Bal(225,50);

}

function draw() {
  background('salmon');
  text("N:"+ballenArray.length+" score:"+score,5,24);
  if (mouseIsPressed && erIsNogGeenBalGestuiterd) {
    ballenArray.push(new Bal(mouseX,mouseY));
  }
  
  for (b=0;b<ballenArray.length;b++) {
    ballenArray[b].beweeg();
    ballenArray[b].teken();
    if (ballenArray[b].aantalKerenGestuiterd==1) {
      erIsNogGeenBalGestuiterd = false;
      if (dist(mouseX,mouseY,ballenArray[b].x,ballenArray[b].y)<=ballenArray[b].straal && mouseIsPressed && ballenArray[b].geraakt==false) {
        score++;
        ballenArray[b].geraakt = true;
        ballenArray[b].alpha = 0;
      }
    }
    if (ballenArray[b].aantalKerenGestuiterd==2) {
      if (ballenArray.length==score) {
        background('green');
        text("Het is je gelukt! Je score is "+score+" :)",5,24);
        noLoop();
      }
      else {
        background('red');
        text("Helaas. Je hebt verloren :(",5,24);
        noLoop();
      }
    }
  }
}
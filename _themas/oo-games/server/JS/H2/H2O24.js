var dobbelSteen = {
  x: 25,
  y: 25,
  grootte: 400,
  ogen: null,
  diameterOgen: 50,
  R: null,
  G: null,
  B: null,
  
  gooi() {
    this.ogen = floor(random(0,6)) + 1;
    this.R = round(random(0,255));
    this.G = round(random(0,255));
    this.B = round(random(0,255));    
  },
  
  teken() {
    push();
    fill(this.R,this.G,this.B);
    rect(this.x,this.y,this.grootte,this.grootte);

    // hieronder volgt code om de stippen op de juiste plek te krijgen
    
    fill('white');    
    if (this.ogen!=1) {ellipse(this.x+this.grootte/6*1,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==6) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen>3) {ellipse(this.x+this.grootte/6*5,this.y+this.grootte/6*1,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==1 || this.ogen==3 || this.ogen==5) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*3,this.diameterOgen,this.diameterOgen);}
    if (this.ogen>3) {ellipse(this.x+this.grootte/6*1,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen==6) {ellipse(this.x+this.grootte/6*3,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    if (this.ogen!=1) {ellipse(this.x+this.grootte/6*5,this.y+this.grootte/6*5,this.diameterOgen,this.diameterOgen);}
    pop();
  }
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  noStroke();
  textFont("Georgia");
  textSize(80);  
  frameRate(10);
  dobbelSteen.gooi();
}

function draw() {
  background('lightcyan');
  if (mouseIsPressed) {
    dobbelSteen.gooi();
  }
  dobbelSteen.teken();
}
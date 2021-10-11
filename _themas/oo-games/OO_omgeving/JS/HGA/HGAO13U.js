var speler = {
  x: 225,
  y: 60,
  loopMarge: 35,
  afstandMiddenTotVoet: 25,
  snelheid: 10,
  sx: 0,
  sy: 0,
  lr: 8,
  fr: 6,
  sprites: sprites,

  loop() {
    if (keyIsDown(LEFT_ARROW)) {
      this.lr = (this.lr - 1) % 8;
      if (this.lr < 0) {
        this.lr += 8;
      }
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.lr = (this.lr + 1) % 8;
    }
    this.sx = 0;
    this.sy = 0;
    if (this.lr == 7 || this.lr == 0 || this.lr == 1) {this.sy = -1*this.snelheid;}
    if (this.lr == 1 || this.lr == 2 || this.lr == 3) {this.sx = this.snelheid;}
    if (this.lr == 3 || this.lr == 4 || this.lr == 5) {this.sy = this.snelheid;}
    if (this.lr == 5 || this.lr == 6 || this.lr == 7) {this.sx = -1*this.snelheid;}
    this.x += this.sx;
    this.y += this.sy;
    if (this.lr != 8) {
      this.fr = (this.fr + 1) % 8;
    }
  },
  
  raakt(b) {
    return false;
  },
  
  toon() {
    push();
    imageMode(CENTER);
    image(sprites[this.lr][this.fr],this.x,this.y);
    fill(0,255,0,0.25);
    stroke(0,255,0,0.75);
    ellipse(this.x,this.y + this.afstandMiddenTotVoet,2*this.loopMarge);   
    fill(255,0,0,1);
    stroke(255,0,0,1);
    ellipse(this.x,this.y,5);
    pop();
  }
}

var sprites;

function preload() {
  var staan = [];
  var noord = [];
  var noordoost = [];
  var oost = [];
  var zuidoost = [];
  var zuid = [];
  var zuidwest = [];
  var west = [];
  var noordwest = [];
  for (var b = 1;b <= 8;b++) {
    n = loadImage("images/sprites/lopen/Walking/n_p" + b + ".png");
    ne = loadImage("images/sprites/lopen/Walking/ne_p" + b + ".png");
    e = loadImage("images/sprites/lopen/Walking/e_p" + b + ".png");
    se = loadImage("images/sprites/lopen/Walking/se_p" + b + ".png");
    s = loadImage("images/sprites/lopen/Walking/s_p" + b + ".png");
    sw = loadImage("images/sprites/lopen/Walking/sw_p" + b + ".png");
    w = loadImage("images/sprites/lopen/Walking/w_p" + b + ".png");
    nw = loadImage("images/sprites/lopen/Walking/nw_p" + b + ".png");
    st = loadImage("images/sprites/lopen/Standing/" + (b - 1) + ".png");    
    noord.push(n);
    noordoost.push(ne);
    oost.push(e);
    zuidoost.push(se);
    zuid.push(s);
    zuidwest.push(sw);
    west.push(w);
    noordwest.push(nw);
    staan.push(st);
  }
  sprites = [noord,noordoost,oost,zuidoost,zuid,zuidwest,west,noordwest,staan];
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  frameRate(10);
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textSize(80);
  textAlign(CENTER,CENTER);
  // baan = new Circuit(75,100);
  // speler = new Man(225,60,sprites);
}

function draw() {
  background(255);
  // baan.teken();
  speler.loop();
  speler.toon();
  
  /*
  if (speler.raakt(baan)) {
    baan.kleur = 100;
  }
  else {
    baan.kleur = 200;
  }
  */
  
  if (mouseIsPressed) {
    if (speler.snelheid == 0) {
      speler.snelheid = 10;
    }
    else {
      speler.snelheid = 0;
    }
  }
}
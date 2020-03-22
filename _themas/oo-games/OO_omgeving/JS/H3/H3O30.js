/* aanwijzing: gameSettings = [
    speltype: met 3 speel je op een 3x3-veld, met 4 op een 4x4-veld
    speeltijd: hoeveel seconden mag een speler maximaal over de puzzel doen?
    ontwerpmodus? Bij true krijg je in level 1 tijdelijk een opdracht met alleen blauwe vakjes,
                    zodat je door te 'proberen' een nieuwe opdracht kunt verzinnen.
    ]

   oorspronkelijke settings:
   var gameSettings = [3,30,false];
*/

var gameSettings = [3,30,false];

/*  **********************************************************
    **                 BEGIN klasse Tegel                   **
    ********************************************************** */


class Tegel {
  constructor(x,y,l) {
  this.lengte = l;
  this.x = x;
  this.y = y;
  this.kleurenLijst = new Array('white','red','orange','green','yellow','blue','black');
  this.Ngeraakt = 0;
  this.actief = false;
  }
  
    muisOver(x,y) {
    if (x > this.x && x < this.x + this.lengte && y > this.y && y < this.y + this.lengte) {
      return true;
    } 
    else {
      return false;
    }
  }

  teken() {
    push();
    fill(this.kleurenLijst[this.Ngeraakt]);
    rect(this.x,this.y,this.lengte,this.lengte);
    pop();
  }
  
  tekenVB(kleurcode) {
    push();
    fill(this.kleurenLijst[kleurcode]);
    rect(this.x,this.y,this.lengte,this.lengte);
    pop();
  }  
}

/*  **********************************************************
    **    EINDE klasse Tegel     BEGIN klasse Tegelzetter   **
    ********************************************************** */

class Tegelzetter {
  constructor(settings,x3,x4) {
    this.margeCanvas = 20;
    this.lengteSpeelveld = null;
    this.lengteTegel = null;
    this.tegelLijst = [];  
    this.spelType = settings[0];
    this.speelTijd = settings[1];
    this.ontwerpModus = settings[2];
    this.opdracht = null;    
    this.score = null;      
    this.level = null;
    this.actief = null;
    this.afgelopen = null;
    this.levelGehaald = null;
    this.O3 = x3;
    this.O4 = x4;
    this.nieuwLevelButton = new Button(400,100,100,60,'limegreen','palegreen','volgend level');
    this.nieuwSpelButton = new Button(400,250,100,60,'steelblue','powderblue','nieuw spel');
  }

  nieuw() {
    this.actief = false;
    this.bepaalLengteTegel();
    this.maakTegelLijst();
    this.timer = new Timer(canvas.width - 4*this.margeCanvas - this.lengteSpeelveld,this.margeCanvas,2*this.margeCanvas,this.lengteSpeelveld,'grey','yellow','red','yellow',true,false);
    this.level = 0;
    this.score = 0;
    this.volgendLevel();
  }
  
  resetSpeelveld() {
    for (var t = 0;t < this.spelType * this.spelType;t++) {
      this.tegelLijst[t].Ngeraakt = 0;
    }
  }
  
  volgendLevel() {
    this.timer.stelIn(this.speelTijd);
    this.resetSpeelveld();
    if (this.spelType == 3) {
        this.opdracht = this.O3[this.level][floor(random(0,this.O3[this.level].length))];
        if (this.ontwerpModus) {
            this.opdracht = new Array(5,5,5,5,5,5,5,5,5);
        }
    }    
    if (this.spelType == 4) {
        this.opdracht = this.O4[this.level][floor(random(0,this.O4[this.level].length))];
        if (this.ontwerpModus) {
            this.opdracht = new Array(5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5);
        }        
    }
    this.levelGehaald = false;
    this.afgelopen = false;
    if (this.level<5) {
        this.level++;
    }
  }

  bepaalLengteTegel() {
    this.lengteSpeelveld = canvas.height - 2*this.margeCanvas;
    this.lengteTegel = this.lengteSpeelveld / this.spelType;
  }
  
  maakTegelLijst() {
    for (var rij = 0;rij < this.spelType;rij++) {
      for (var kol = 0;kol < this.spelType;kol++) {
        this.tegelLijst.push(new Tegel(kol*this.lengteTegel,rij*this.lengteTegel,this.lengteTegel));
      }
    }
  }
  
  tekenSpeelveld() {
    push();
    translate(this.margeCanvas,this.margeCanvas);
    for (var t = 0;t < this.spelType*this.spelType;t++) {
      this.tegelLijst[t].teken();
    }
    pop();
  }
  
  tekenOpdracht() {
    push();
    translate(canvas.width - this.margeCanvas - this.lengteSpeelveld,this.margeCanvas);
    for (var t = 0;t < this.spelType*this.spelType;t++) {
      this.tegelLijst[t].tekenVB(this.opdracht[t]);
    }
    pop();
  }
  
  muisInSpeelveld() {
    if (mouseX > this.margeCanvas && mouseX < this.margeCanvas + this.lengteSpeelveld && mouseY > this.margeCanvas && mouseY < this.margeCanvas + this.lengteSpeelveld) {
      return true;
    }
    else {
      return false;
    }
  }

  controleerMuis() {
    for (var t = 0;t < this.spelType*this.spelType;t++) {
      if (this.tegelLijst[t].muisOver(mouseX - this.margeCanvas,mouseY - this.margeCanvas)) {
        if (!this.tegelLijst[t].actief) {
          this.tegelLijst[t].actief = true;
          this.tegelLijst[t].Ngeraakt++;
        }
      }
      else
      {
        this.tegelLijst[t].actief = false;
      }
    }
  }
  
  opdrachtGehaald() {
      var gehaald = true;
      for (var t = 0;t < this.spelType*this.spelType;t++) {
          if (this.opdracht[t] != this.tegelLijst[t].Ngeraakt)
          {
              gehaald = false;
          }
      }
      return gehaald;
  }
  
  opdrachtOnhaalbaar() {
      var onhaalbaar = false;
      for (var t = 0;t < this.spelType*this.spelType;t++) {
          if (this.opdracht[t] < this.tegelLijst[t].Ngeraakt)
          {
              onhaalbaar = true;
              this.tegelLijst[t].Ngeraakt = 6;
          }
      }
      return onhaalbaar;
  }

  tekenScorebord() {
    push();
    translate(this.margeCanvas*2 + this.lengteSpeelveld,this.margeCanvas);
    fill('white');
    rect(0,0,canvas.width - 2*this.lengteSpeelveld - 4*this.margeCanvas,height - 2*this.margeCanvas);
    fill('black');
    var tekstMarge = 10;
    var letterGrootte = 28;
    textSize(letterGrootte);
    textLeading(1.2*letterGrootte);
    textAlign(LEFT, TOP);
    var tekst = "level:"+this.level+"\nscore:"+this.score;
    text(tekst,0 + tekstMarge,0 + tekstMarge,width - 2*this.lengteSpeelveld - 4*this.margeCanvas - 2*tekstMarge,height - 2*this.margeCanvas - 2*tekstMarge);
    pop();
  }

  update() {
      if (!this.actief) {
          return;
      }
      if (this.muisInSpeelveld() && !this.timer.loopt && !this.afgelopen) {
          this.timer.start();
      }
      if (this.timer.loopt) {
          if (!this.muisInSpeelveld() || this.timer.resterendeTijd == 0) {
              this.timer.stop(); 
              this.afgelopen = true;
          }
          this.controleerMuis();
          if (this.opdrachtOnhaalbaar() || this.opdrachtGehaald()) {
              this.timer.stop();
              this.afgelopen = true;
              if (this.opdrachtGehaald()) {
                  this.score++;
                  this.levelGehaald = true;
              }
          }
      }
  }

  beginScherm() {
    push();
    textAlign(CENTER,TOP);
    fill('navy');
    text("TEGELZETTER\n\nBij dit spel moet je het puzzelpatroon aan de rechterkant nabouwen door met je muis te bewegen. Elke keer dat je naar een ander hokje gaat, verandert de kleur. In welke volgorde? Ontdek dat zelf door te spelen. \n\n Pas op: je mag het speelveld niet verlaten als je eenmaal begonnen bent.\nEn denk aan de tijd!",0,canvas.height / 10,canvas.width,canvas.height)
    this.nieuwSpelButton.teken();
    pop();
  }

 eindScherm() {
    background('indianred');
    this.tekenSpeelveld();
    this.tekenOpdracht();  
    this.tekenScorebord();
    this.nieuwSpelButton.teken();
    if (this.levelGehaald) {
        this.nieuwLevelButton.teken();
    }
  }

  teken() {
    background('dodgerblue');
    textFont("Monospace");
    textSize(20);
    push();
    fill('white');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen && !this.levelGehaald) {
        this.eindScherm();
      }
      else {
        push();
        this.tekenSpeelveld();
        this.tekenOpdracht();
        this.tekenScorebord();
        if (this.levelGehaald) {
            this.nieuwLevelButton.teken();
            this.nieuwSpelButton.teken();
        }
        if (this.timer.loopt) {
            this.timer.teken();
        }
        pop();      
        }
      }
    }  
}

/*  **********************************************************
    **   EINDE klasse Tegelzetter    BEGIN hoofdprogramma   **
    ********************************************************** */


laadJavascriptFile('JS/class/Timer.js');
laadJavascriptFile('JS/class/Button.js');
laadJavascriptFile('JS/H3/H3O30_puzzels.js');

function setup() {
  canvas = createCanvas(900,360);
  canvas.parent('processing');
  spel = new Tegelzetter(gameSettings,O3,O4);
  spel.nieuw();
}

function draw() {
    spel.update();
    spel.teken();
}

function mousePressed() {
  if (spel.nieuwLevelButton.muisOver() && spel.levelGehaald) {
      spel.volgendLevel();
  }
  if (spel.nieuwSpelButton.muisOver()) {
      if (spel.actief && spel.afgelopen) {
          spel.nieuw();
      }
      else {
          spel.actief = true;
      }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
/* aanwijzing: gameSettings = [
    tijd: tijd per level
    afname tijd: hoeveel minder tijd krijg je bij een volgend level?
    zichtbare letters: hoeveel letters zie je tegelijkertijd in beeld?
    letterdoel: minimaal aantal letters dat je goed moet typen om een level te halen
    toename letterdoel: hoeveel letters moet je bij een volgend level extra goed hebben?
    ]

   oorspronkelijke settings:
   var gameSettings = [15,2,3,10,0];
*/

var gameSettings = [15,2,3,10,0];

/*  **********************************************************
    **                BEGIN klasse Typerend                 **
    ********************************************************** */


class Typerend {
    constructor(settings) {
    this.level = null;
    this.actief = false;
    this.afgelopen = null;
    this.score = null;
    this.highScore = 0;
    this.timerTijd = settings[0];
    this.afnameTijd = settings[1];
    this.zichtbareLetters = settings[2];
    this.startDoel = settings[3];
    this.doel = this.startDoel;
    this.toenameDoel = settings[4];
    this.letters = null;
    this.invoerLijst = null;
    this.timer = new Timer(canvas.height,0,20,canvas.height,'silver','lightgray','silver','silver',true,false);
  }
  
  nieuwSpel() {
    this.afgelopen = false;
    this.level = 0;
    this.score = 0;
    this.letters = [];
    this.nieuwLevel();
  }

  nieuwLevel() {
    this.doel = this.startDoel + this.level*this.toenameDoel;
    this.timer.stelIn(this.timerTijd - this.level * this.afnameTijd);
    this.maakLetterLijst();
    this.invoerLijst = [];
    this.timer.start();
    this.level++;
  }

  maakLetterLijst() {
      for (var n = 0;n < 100; n++) {
          var letter = String.fromCharCode(floor(random(97,123)));
          if (n > 0 && letter == this.letters[n-1]) {
              letter = String.fromCharCode(floor(random(97,123)));              
          }
          this.letters.push(letter);
      }
  }

  updateLetterLijst() {
      var letter = String.fromCharCode(floor(random(97,123)));
      this.letters.shift();
      this.letters.push(letter);
      this.invoerLijst.push(keyCode);
      type.play();
      if (this.invoerLijst.length % 17 == 0) {
        ping.play();
      }
  }

   update() {
    if (this.actief && !this.afgelopen) {
        if (keyCode >= 65 && keyCode <= 90) {
            if (key == this.letters[0]) {
                this.updateLetterLijst();
                this.doel--;
                if (this.doel < 0) {
                    this.doel = 0;
                    this.score++;
                }
            }
        }
    }
    if (this.timer.alarm) {
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }        
        if (this.doel == 0) {
            this.nieuwLevel();
        }
        else {
            this.afgelopen = true;
        }
    }
  }
  
  beginScherm() {
    push();
    noFill();
    stroke(100,100,100,.3);
    strokeWeight(3);
    textSize(80);
    text(" TYPEREND",0,0,canvas.width,canvas.height / 2);
    textSize(32);
    strokeWeight(2);
    fill(0,0,0,0.75);
    text("Typ alle getoonde letters in de juiste volgorde in. Blijf binnen de tijd!\nDruk op ENTER om te starten.",0,canvas.height * 1 / 3,canvas.width,canvas.height * 1 / 2);
    pop();
  }
  
  eindScherm() {
    var tekst = 'Jouw score is: '+this.score+'\n(highscore: '+this.highScore+")";
    push();
    fill(50);
    stroke(200);
    strokeWeight(1);
    textSize(30);
    text(tekst + '\n\nDruk ENTER voor nieuw spel.',0,0,canvas.width,canvas.height);
    pop();
  }    
  
  teken() {
    background(200);
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen) {
        this.eindScherm();
      }
      else {
        push(); 
        image(typemachine,canvas.width / 2 - typemachine.width / (4),100,typemachine.width / 2,typemachine.height / 2);
        this.timer.teken();
        textSize(70);
        var tekst=" ";
        for (var l = 0;l < this.zichtbareLetters;l++) {
            tekst += this.letters[l];
        }
        text(tekst,0,0,canvas.width,canvas.height / 4);
        fill(150);
        textAlign(LEFT,TOP);
        text(this.doel,25,23);
        fill(0);
        textSize(30);
        text("score: "+this.score,175,105);
        textSize(20);
        translate(130,150);
        fill('white');
        noStroke();
        rect(0,0,206,60);
        fill('black');
        tekst="";
        for (var l = 0;l < this.invoerLijst.length;l++) {
            if (l == 50) {
                tekst = "";
            }
            tekst += String.fromCharCode(this.invoerLijst[l]);
            if (l % 17 == 0 && l > 0) {
                tekst += " ";
            }
        }        
        text(tekst,0,0,200,250);
        pop();
      }
    }
  }
}

/*  **********************************************************
    **   EINDE klasse Zoekspelletje   BEGIN hoofdprogramma  **
    ********************************************************** */

laadJavascriptFile('JS/P5/addons/p5.sound.js');
laadJavascriptFile('JS/class/Timer.js');

function preload() {
  typemachine = loadImage("images/backgrounds/typemachine.png");
  type = loadSound("sounds/effects/typemachine.ogg");
  ping = loadSound("sounds/effects/typemachine_ping.ogg");
  woehoe = loadSound("sounds/effects/woehoe.ogg");
  achtergrondmuziek = loadSound("sounds/background/game_muziek_1.mp3");
}

function setup() {
  canvas = createCanvas(470,450);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  textAlign(CENTER,CENTER);  
  frameRate(50);
  spel = new Typerend(gameSettings);
  achtergrondmuziek.loop();
}

function draw() {
  spel.update();
  spel.teken();
}

function keyPressed() {
  if (keyCode == ENTER) {
    if (!spel.actief) {
        spel.actief = true;
        spel.nieuwSpel();
    }
    if (spel.afgelopen) {
      spel.nieuwSpel();
    }
  }
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
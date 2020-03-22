
/*  **********************************************************
    **              BEGIN klasse kleurCode                  **
    ********************************************************** */


class kleurCode {
  constructor(reeks,k) {
  this.kleuren = k;
  this.code = reeks;
  this.geraden = new Array(false,false,false,false);
  }

  teken() {
    push();
    noStroke();
    for (n = 0;n < this.code.length;n++) {
      if (this.geraden[n]) {
        fill(this.kleuren[this.code[n]]);
      }
      else {
        fill('black');
      }
      ellipse(0,0,50,50);
      translate(60,0);
    }
    pop();
  }
}
/*  **********************************************************
    **  EINDE klasse kleurCode   BEGIN klasse kleurInvoer   **
    ********************************************************** */


class kleurInvoer {
  constructor(x,k) {
    this.x = 400 + 60 * x;
    this.y = 30;
    this.kleur = k;    
    this.diameter = 50;
  }
  
  muisOver() {
    if (dist(this.x,this.y,mouseX,mouseY) < this.diameter / 2) {
      return true;
    }
    else {
      return false;
    }
  }
  
  teken() {
    push();
    noStroke();
    fill(this.kleur);
    ellipse(this.x,this.y,this.diameter);
    pop();    
  }
}
/*  **********************************************************
    **  EINDE klasse kleurInvoer   BEGIN klasse codeKraker  **
    ********************************************************** */


class codeKraker {
  constructor() {
    this.pogingen = [];
    this.invoerButtons = [];
    this.opgave = [];
    this.poging = [];
    this.kleurenLijst = new Array('red','green','blue','purple','yellow','orange');
    this.gekraakt = false;
    this.genereerOpgave();
    this.maakInvoerButtons();
    this.actief = false;
  }
  
  maakInvoerButtons() {
    for (var k = 0;k < this.kleurenLijst.length;k++) {
      this.invoerButtons.push(new kleurInvoer(k,this.kleurenLijst[k]));
    }    
  }
  
  genereerOpgave() {
    for (var o = 0;o < 4;o++) {
      this.opgave[o]=floor(random(0,6));
    }
    this.pogingen.push(new kleurCode(this.opgave,this.kleurenLijst));    
  }
  
  registreerInvoer() {
    for (var i = 0;i < this.invoerButtons.length;i++) {
      if (this.invoerButtons[i].muisOver()) {
        this.poging.push(i);
      }
    }
  }
  
  teken() {
    if (!this.actief) {
      this.beginscherm();
    }
    else {
      background('grey');
      if (this.poging.length == 4) {
        this.voegVolledigePogingToe();
        this.controleerPoging();
        this.tekenOpgave();
        if (this.gekraakt || this.pogingen.length == 6) {
          spel.actief = false;
          this.eindscherm();
        }
      }
      else {
        this.tekenInvoer();
      } 
      this.tekenOpgave();
      this.tekenButtons();
      this.tekenPogingen();
    }
  }
  
  tekenButtons() {
    for (var i = 0;i < this.invoerButtons.length;i++) {
      this.invoerButtons[i].teken();
    }
  }
  
  tekenOpgave() {
    push();
    translate(30,30);
    this.pogingen[0].teken();
    translate(0,70);
    fill('black');
    rect(-25,-40,230,10);
    pop();    
  }
  
  tekenInvoer() {
    push();
    noStroke();
    translate(420,height/2);
    for (var p = 0;p < this.poging.length;p++) {
      fill(this.kleurenLijst[this.poging[p]]);
      ellipse(130*p,0,100);
    }
    pop();
  }
  
  tekenPogingen() {
    push();
    translate(30,100);
    for (var p = 1;p < this.pogingen.length;p++) {
      this.pogingen[p].teken();
      translate(0,60);
    }
    pop();    
    }
    
    voegVolledigePogingToe() {
      this.pogingen.push(new kleurCode(this.poging,this.kleurenLijst));      
    }
    
    controleerPoging() {
      var gelijk = 0;
        for (var p = 0;p < this.poging.length;p++) {
          if (this.pogingen[0].code[p] == this.pogingen[this.pogingen.length-1].code[p]) {
            this.pogingen[this.pogingen.length-1].geraden[p] = true;
            gelijk++;
          }
        }
        if (gelijk == 4) {
          this.gekraakt = true;
        }
        this.poging = [];
    }


    beginscherm() {
      push();
      noStroke();
      textFont("Courier");
      textAlign(CENTER,CENTER);
      textSize(40);
      background('steelblue');
      fill('white');
      text("Welkom bij Codekraker.\n\nKlik met je muis om te beginnen.",0,0,canvas.width,canvas.height / 2);
    }

    eindscherm() {
      if (this.gekraakt) {
        var kleur = 'darkgreen'
        var tekst = 'GEWONNEN :)';
      }
      else {
        var kleur = 'indianred'
        var tekst = 'VERLOREN :(';       
      }
      background(kleur);
      for (var p = 0;p < 4;p++) {
        this.pogingen[0].geraden[p] = true;
      }
      this.tekenPogingen();
      this.tekenOpgave();
      
      textAlign(CENTER,CENTER);
      textSize(60);
      fill('white');
      text(tekst,canvas.width/2,0,canvas.width/2,canvas.height);
    }
}
/*  **********************************************************
    **   EINDE klasse codeKraker    BEGIN hoofdprogramma    **
    ********************************************************** */


function setup() {
  canvas = createCanvas(740,400);
  canvas.parent('processing');
  spel = new codeKraker();
  spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    if (spel.pogingen.length == 1) {
      spel.actief = true;
    }
    else {
      setup();
    }
  }
  else {
    spel.registreerInvoer();
  }
  spel.teken();  
}
/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
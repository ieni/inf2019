
/*  **********************************************************
    **                BEGIN klasse Vijand                   **
    ********************************************************** */


class Vijand {
  constructor() {
    this.diameter = 50;
    this.x = null;
    this.y = null;
    this.vy = null;
    this.vx = null;
    this.levens = 5;
    this.kleur = 'deeppink';
  }

  beweeg() {
    this.x += this.vx;
    if (this.x > canvas.width - this.diameter / 2 || this.x < canvas.width / 3 + this.diameter / 2) {
      this.vx *= -1;
    }
    this.y += this.vy;
    if (this.y > canvas.height - this.diameter / 2 || this.y < this.diameter / 2) {
      this.vy *= -1;
    }
  }

  wordtGeraakt(k) {
    if (dist(this.x,this.y,k.x,k.y) <= (k.diameter + this.diameter) / 2) {
      k.y = -100;
      this.levens--;
    }
  }

  teken() {
    push();
    fill(this.kleur);
    noStroke();
    ellipse(this.x,this.y,this.diameter);
    fill('white');
    text(this.levens,this.x,this.y);
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Vijand      BEGIN klasse Kogel       **
    ********************************************************** */


class Kogel {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = 20;
    this.v = 10;
    this.kleur = 'hotpink';
  }

  beweeg() {
    this.x += this.v;
  }

  teken() {
    push();
    stroke('pink');
    fill(this.kleur);
    ellipse(this.x,this.y,this.diameter);
    pop();
  }
}

/*  **********************************************************
    **     EINDE klasse Kogel       BEGIN klasse Kanon      **
    ********************************************************** */


class Kanon {
  constructor() {
    this.x = 40;
    this.y = canvas.height / 2;
    this.l = 50;
    this.h = 20;
    this.v = 10;
    this.geschoten = null;
    this.kogels = null;
    this.kleur = 'indianred';
  }

  schiet() {
    if (keyCode == 32) {
      this.kogels.push(new Kogel(this.x + this.l,this.y + 0.5 * this.h))
      this.geschoten++;
    }
  }

  teken() {
    push();
    noStroke();
    fill(this.kleur);
    rect(this.x,this.y,this.l,this.h);
    pop();
  }
}

/*  **********************************************************
    **     EINDE klasse Kanon       BEGIN klasse Hitme      **
    ********************************************************** */


class Hitme {
  constructor() {
    this.k = new Kanon();
    this.v = new Vijand();
    this.actief = false;
    this.afgelopen = null;
  }

  nieuw() {
    this.afgelopen = false;
    this.v.x = canvas.width - this.v.diameter - 10;
    this.v.y = canvas.height / 2;
    this.v.vy = 5;
    this.v.vx = 0;
    this.v.levens = 5;
    this.k.kogels = [];
    this.k.geschoten = 0;
  }

  beginScherm() {
    push();
    textAlign(CENTER,TOP);
    fill(0);
    text("Welkom bij Hitme! Speel dit spel met z'n tweeën:\n\nHet kanon LINKS beweegt met q en z en schiet met de spatiebalk.\n\nHij probeert de vijand RECHTS te raken. Deze ontwijkt kogels door met i en m de snelheid te veranderen (ontdek zelf hoe dat werkt!).\n\nKlik om het spel te starten.",0,canvas.height / 4,canvas.width,canvas.height)
    pop();
  }

  eindScherm() {
    var tekst = 'De vijand is gedood in '+this.k.geschoten+' schoten. Klik voor een nieuw spel.';
    push();
    textAlign(CENTER,CENTER);
    fill(0);
    text(tekst,0,0,canvas.width,canvas.height);
    pop();
  }

  verwerkInvoer() {
    if (this.actief && key == 'z') {
        this.k.y+=this.k.v;
    }
    if (this.actief && key == 'q') {
        this.k.y-=this.k.v;
    }
    this.k.y=constrain(this.k.y,0,canvas.height - this.k.h);

    if (this.actief && key == 'm') {
        this.v.vy++;
    }
    if (this.actief && key == 'i') {
        this.v.vx++;
    }
    if (keyCode == 32) {
        this.k.kogels.push(new Kogel(this.k.x + this.k.l,this.k.y + 0.5 * this.k.h))
        this.k.geschoten++;
    }
  }

  update() {
    this.v.beweeg();
    for (n = 0; n< this.k.kogels.length; n++) {
        this.k.kogels[n].beweeg();
        this.k.kogels[n].teken();
        this.v.wordtGeraakt(this.k.kogels[n]);
    }
    if (this.v.levens <= 0) {
        this.afgelopen = true;
    }
  }

  teken() {
    background('pink');
    textFont("Monospace");
    textSize(20);
    push();
    fill('white');
    if (!this.actief) {
      this.beginScherm();
    }
    else {
      if (this.afgelopen) {
        this.eindScherm();
      }
      else {
        fill('hotpink');
        noStroke();
        rect(0,0,canvas.width / 3,canvas.height);
        this.k.teken();
        this.v.teken();
        for (var n = 0; n< this.k.kogels.length; n++) {
            this.k.kogels[n].teken();
        }
      }
    }
    pop();
  }
}

/*  **********************************************************
    **    EINDE klasse Hitme       BEGIN hoofdprogramma     **
    ********************************************************** */


function setup() {
  canvas = createCanvas(700,400);
  canvas.parent('processing');
  spel = new Hitme();
  spel.nieuw();
}

function draw() {
  spel.update();
  spel.teken();
}

function mousePressed() {
  if (!spel.actief) {
    spel.actief = true;
  }
  else {
    if (spel.afgelopen) {
      spel.nieuw();
      spel.teken();
    }
  }
}

function keyTyped() {
    spel.verwerkInvoer();
    return false;
}

/*  **********************************************************
    **               EINDE hoofdprogramma                   **
    ********************************************************** */
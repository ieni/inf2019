var instructieTekst = "Dit voorbeeld is bij een presentatie gebruikt om standpunten uit te delen rond afgeleide eigenschappen, return-waardes en het gebruik van een klasse als hiervan maar één instantie wordt gemaakt.";

class Planeet {
    constructor() {
        this.x = 0;
        this.y = 225;
        this.diameter = 100;
        // afgeleide eigenschap: mag dat?
        this.straal = this.diameter / 2;
    }
    
    controleerPositie() {
        if (this.x > 225) {
            return true;
        }
        // dit deel maakt het duidelijker
        else {
            return false;
        }
    }
    
    beweeg() {
        this.x += 3;
    }
    
    teken() {
        push();
        noStroke();
        if (this.controleerPositie()) {
            fill('deepskyblue');
        }
        else {
            fill('steelblue');
        }
        ellipse(this.x,this.y,this.diameter);
        pop();
    }
}

function setup() {
  canvas = createCanvas(450,450);
  canvas.parent('processing');
  frameRate(25);
  // werken vanuit een klasse met maar één instantie
  aarde = new Planeet();
}

function draw() {
    background('silver');    
    aarde.beweeg();
    aarde.teken();
}
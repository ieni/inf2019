/*  **********************************************************
    **                  BEGIN klasse Klok                   **
    ********************************************************** */


class Klok {
    constructor(xpos,ypos,gw,kw) {
        this.groteWijzer = gw;
        this.kleineWijzer = kw;
        this.rand = 10;
        this.d = 2*(this.groteWijzer + 15);

        this.r = this.d / 2;
        this.hoek;
        this.x = null;
        this.y = null;
        this.px = xpos + this.rand / 2;
        this.py = ypos + this.rand / 2;
    }

    teken() {
        push();
        translate(this.r,this.r);
        textFont("Courier");
        textSize(48);
        fill('#FFF');
        strokeWeight(this.rand);
        stroke('black');
        ellipse(this.px,this.py,this.d,this.d);  
        stroke('grey');
        this.hoek = TWO_PI*minute()/60-HALF_PI;
        this.x=this.groteWijzer*cos(this.hoek);
        this.y=this.groteWijzer*sin(this.hoek);
        line(this.px,this.py,this.px+this.x,this.py+this.y);  
        this.hoek = TWO_PI*hour()/12-HALF_PI;
        this.x=this.kleineWijzer*cos(this.hoek);
        this.y=this.kleineWijzer*sin(this.hoek);
        line(this.px,this.py,this.px+this.x,this.py+this.y);
        stroke('black');
        ellipse(this.px,this.py,10,10);
        pop();
    }
}

/*  **********************************************************
    **                 BEGIN klasse Display                 **
    ********************************************************** */


class Display {
    constructor(x,y,b,h,d) {
        this.x = x;
        this.y = y;
        this.breedte = b;
        this.hoogte = h;
        this.dikte = d;
        this.hoek = null;
        this.kleur = null;
        var aan = 'white';
        var uit = 'black';

        this.nul = new Array(aan,aan,aan,aan,aan,aan,uit);
        this.een = new Array(uit,aan,aan,uit,uit,uit,uit);
        this.twee = new Array(aan,aan,uit,aan,aan,uit,aan);
        this.drie = new Array(aan,aan,aan,aan,uit,uit,aan);
        this.vier = new Array(uit,aan,aan,uit,uit,aan,aan);
        this.vijf = new Array(aan,uit,aan,aan,uit,aan,aan);
        this.zes = new Array(uit,uit,aan,aan,aan,aan,aan);
        this.zeven = new Array(aan,aan,aan,uit,uit,uit,uit);
        this.acht = new Array(aan,aan,aan,aan,aan,aan,aan);
        this.negen = new Array(aan,aan,aan,uit,uit,aan,aan);
        this.dec = new Array(this.nul,this.een,this.twee,this.drie,this.vier,this.vijf,this.zes,this.zeven,this.acht,this.negen);
    }

    tekenElement(kleur) {
        fill(kleur);
        beginShape();
        vertex(0,0);
        vertex(this.breedte,0);
        vertex(this.breedte,this.dikte);
        vertex(this.breedte-this.hoogte,this.dikte+this.hoogte);
        vertex(this.hoogte,this.dikte+this.hoogte);
        vertex(0,this.dikte);
        endShape(CLOSE);
    }

    tekenMiddenElement(kleur) {
        fill(kleur);
        beginShape();
        vertex(0,0);
        vertex(this.hoogte,-this.hoogte);
        vertex(this.breedte-this.hoogte,-this.hoogte);
        vertex(this.breedte,0);
        vertex(this.breedte-this.hoogte,this.hoogte);
        vertex(this.hoogte,this.hoogte);
        endShape();
    }

    tekenDisplay(lijst) {
        this.tekenElement(lijst[0]);
        translate(this.breedte+this.dikte,2*this.dikte);
        rotate(HALF_PI);
        this.tekenElement(lijst[1]);
        translate(2*this.dikte+this.breedte,0);
        this.tekenElement(lijst[2]);
        translate(this.breedte+2*this.dikte,this.dikte);  
        rotate(HALF_PI);
        this.tekenElement(lijst[3]);
        translate(this.breedte+this.dikte,2*this.dikte);  
        rotate(HALF_PI);
        this.tekenElement(lijst[4]);
        translate(this.breedte+2*this.dikte,0);  
        this.tekenElement(lijst[5]);
        rotate(HALF_PI);  
        translate(this.dikte,this.dikte);
        this.tekenMiddenElement(lijst[6]);  
    }

    teken() {
        var dec1 = second() % 10;
        var dec2 = (second()-dec1)/10;
        push();
        translate(2*this.dikte+this.x,this.dikte+this.y);
        this.tekenDisplay(this.dec[dec2]);
        pop();
        
        push();
        translate(this.breedte+6*this.dikte+this.x,this.dikte+this.y);
        this.tekenDisplay(this.dec[dec1]); 
        pop();
    }
}

/*  **********************************************************
    **                 BEGIN hoofdprogramma                 **
    ********************************************************** */


laadJavascriptFile('JS/class/Timer.js');

var klok;
var display;
var maand = new Array('januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december');
var timer;

function setup() {
  canvas = createCanvas(800,350);
  canvas.parent('processing');
  colorMode(RGB,255,255,255,1);
  textFont("Monospace");
  frameRate(50);
  klok = new Klok(10,10,60,40);
  display = new Display(10,180,65,10,4);
  timer1 = new Timer(canvas.width * 2/3,70,canvas.width / 3 - 10,canvas.height - 80,'dimgray','darkslategray','darkred','white',true,true);
  timer2 = new Timer(canvas.width * 2/3,10,canvas.width / 3 - 10,50,'#2F2F2F','salmon','red','yellow',false,true);
  timer1.stelIn(3);
  timer2.stelIn(4);
}

function draw() {
    background('#2F2F2F');
    fill(200);
    textSize(32);
    text(hour()+" h "+minute()+" min "+second()+" s",200,100);
    klok.teken();
    text(day()+" "+maand[month()-1]+" "+year(),200,270);
    display.teken();
    timer1.teken();
    timer2.teken();
    fill('gray');
    text("click!!  click!!",200,310);
}

function mousePressed() {
    timer1.reageer();
    timer2.reageer();
  }
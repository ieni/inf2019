class Timer {
  constructor(x,y,b,h,ag,tk,ak,tkl,verticaal,tekst) {
    this.beginTijd = null;
    this.ingesteldeTijd = null;
    this.t = null;
    this.resterendeTijd = null;
    this.verlopenTijd = null;
    this.x = x;
    this.y = y;
    this.b = b;
    this.h = h;
    this.achtergrond = ag;
    this.timerKleur = tk;
    this.alarmKleur = ak;
    this.tekstKleur = tkl;
    this.loopt = null;
    this.alarm = null;
    this.verticaal = verticaal;
    this.toonTekst = tekst;
  }

  stelIn(t) {
    this.t = t;
    this.ingesteldeTijd = this.t*1000;
    this.resterendeTijd = this.ingesteldeTijd;
    this.verlopenTijd = 0;
    this.beginTijd = millis();
    this.loopt = false;
    this.alarm = false;      
  }
  
  start() {
    this.loopt = true;
    if (this.alarm) {
          this.stelIn(this.t);
      }
      else {
          this.beginTijd = millis() - this.verlopenTijd;
      }
  }

  stop() {
      this.loopt = false;
  }

  reageer() {
      if (this.loopt) {
          this.stop();
      }
      else {
          this.start();
      }
  }

  verwerktTijd() {
      if (this.loopt) {
          this.resterendeTijd = this.ingesteldeTijd - (millis() - this.beginTijd);
          this.verlopenTijd = this.ingesteldeTijd - this.resterendeTijd;
          if (this.resterendeTijd <= 0) {
              this.resterendeTijd = 0;
              this.alarm = true;
              this.loopt = false;
          }
      }
  }
  
  teken() {
      this.verwerktTijd();
      push();
      var th = this.resterendeTijd / this.ingesteldeTijd*this.h;
      var tb = this.resterendeTijd / this.ingesteldeTijd*this.b;
      if (this.alarm && round(millis()/100) % 10 <= 4) {
          fill(this.alarmKleur);
      }
      else {
          fill(this.achtergrond);
      }
      rect(this.x,this.y,this.b,this.h);
      fill(this.timerKleur);
      if (this.verticaal) {
          rect(this.x,this.y+(this.h-th),this.b,th);
      }
      else {
          rect(this.x+(this.b-tb),this.y,tb,this.h);
      }
      if (this.toonTekst && this.loopt) {
          textAlign(CENTER,CENTER);
          fill(this.tekstKleur);
          text(round(this.resterendeTijd/100)/10,this.x,this.y,this.b,this.h);
      }
      pop();
  }
}
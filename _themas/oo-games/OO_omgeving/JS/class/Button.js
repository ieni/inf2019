class Button {
  constructor(x,y,l,b,k,ko,t) {
  this.lengte = l;
  this.breedte = b;
  this.kleur = k;
  this.kleurOver = ko;
  this.x = x;
  this.y = y;
  this.buttonTekst = t;
  }
  
  muisOver() {
    if (mouseX > this.x && mouseX < this.x + this.lengte && mouseY > this.y && mouseY < this.y + this.breedte) {
      return true;
    } 
    else {
      return false;
    }
  }

  teken() {
    push();
    if (this.muisOver()) {
      fill(this.kleurOver);
    }
    else {
      fill(this.kleur);
    }
    rect(this.x,this.y,this.lengte,this.breedte);
    fill('black');
    textSize(20);
    textAlign(CENTER,CENTER);    
    text(this.buttonTekst,this.x,this.y,this.lengte,this.breedte);
    pop();
  }
}
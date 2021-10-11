class Bal {
    constructor() {
        this.diameter = 75;
        this.straal = this.diameter / 2;
        this.x = random(this.straal,canvas.width - this.straal);
        this.y = random(this.straal,canvas.height - this.straal);
        this.kleur = 200;
        this.vx = random(-20,20);
        this.vy = this.vx + random(-5,5);
        this.actief = false;
    }

    beweeg() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < this.straal || this.x > canvas.width - this.straal) {
            this.vx *= -1;
        }
        if (this.y < this.straal || this.y > canvas.height - this.straal) {
            this.vy *= -1;
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
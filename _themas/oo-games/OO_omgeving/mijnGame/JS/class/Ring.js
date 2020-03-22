class Ring {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.radius = diameter / 2;
    }

    teken() {
        push();
        noFill();
        stroke(40);
        strokeWeight(8);
        ellipse(this.x, this.y, this.diameter);
        pop();
    }
}
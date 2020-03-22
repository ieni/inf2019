function setup() {
  canvas = createCanvas(729,330);
  canvas.parent('processing');
  noLoop();
  background('silver');
  textFont("Courier");
  textSize(20);
  textAlign(CENTER,CENTER);
}

function draw() {
    cantor(0,0,width);
}

function cantor(x,y,lengte) {
    if (lengte >= 1) {
        fill('black');
        rect(x,y,lengte,30);
        fill('yellow');
        text("lengte = " + lengte,0,y - 8,width,50);
        lengte /= 3;
        y += 50;
         cantor(x,y,lengte);
        // 
    }
}
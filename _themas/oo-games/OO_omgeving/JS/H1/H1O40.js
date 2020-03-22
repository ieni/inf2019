var N = 1;
var grijstint = 0;

var Tx,Ty,Lx,Ly,Rx,Ry;
var breedteCanvas = 500;
var hoogteCanvas = null;

function setup() {
    hoogteCanvas = breedteCanvas*sqrt(3) / 2;
    canvas = createCanvas(breedteCanvas,hoogteCanvas);
    canvas.parent('processing');
    noLoop();
    background('white');
    fill('black');
    noStroke();
    N = constrain(N,1,10);
}

function draw() {
    Tx = width / 2;
    Ty = 0;
    
    Lx = 0;
    Ly = height;
    
    Rx = width;
    Ry = height; 

    // met onderstaande regel kun je N=0 laten zien
    // triangle(Tx,Ty,Lx,Ly,Rx,Ry);
    sierpinski(Tx,Ty,Lx,Ly,Rx,Ry,N);  
}

function sierpinski(Tx,Ty,Lx,Ly,Rx,Ry,n) {
    if (n > 0) {
        var Ax = (Tx + Lx) / 2;
        var Ay = (Ty + Ly) / 2;
        
        var Bx = (Tx + Rx) / 2;
        var By = (Ty + Ry) / 2;
        
        var Cx = (Lx + Rx) / 2;
        var Cy = (Ly + Ry) / 2;

        sierpinski(Tx,Ty,Ax,Ay,Bx,By,n - 1);
        // 
        // 
    }
    else {
        // veranderKleur();
        grijstint += 9;        
        triangle(Tx,Ty,Lx,Ly,Rx,Ry);
    }
}

function veranderKleur(tint) {
    var x = grijstint;
    fill(x);    
}
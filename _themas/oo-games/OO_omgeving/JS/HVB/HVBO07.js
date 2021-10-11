var x = 120;
var snelheid = 5;

function setup() {
  canvas = createCanvas(1000,300);
  canvas.parent('processing');
  textFont("Verdana");
  textSize(30);
  stroke('white');
  strokeWeight(10);
  frameRate(50);
}

function draw() {
  background('orange');
  fill('white');
  rect(0,0,width,40);
  fill('black');  
  text("De bol beweegt heen en weer (snelheid = " + snelheid + "). | Klik met je muis!",10,30);
  // Met if stel je een voorwaarde in: iets gebeurt alleen als aan de voorwaarde is voldaan
  
  if (mouseIsPressed == true && snelheid == 5) {
      fill('green');
  }
  // Met else kun je (het hoeft dus niet) aangeven wat er moet gebeuren als NIET aan die voorwaarde is voldaan
  
  else {
    fill('dodgerblue');
  }
  
  if (x>880) {
    snelheid = -1*snelheid;
  }
  if (x<120) {
    snelheid = -1*snelheid;
  }

  x+=snelheid;
  ellipse(x,170,200);
}

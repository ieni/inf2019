var aantalRijenRaster = 6;
var aantalKolommenRaster = 9;
var celGrootte;

var spriteJos;
var xJos;
var yJos;

function preload() {
  brug = loadImage("images/backgrounds/dame_op_brug_1800.jpg");
  spriteJos = loadImage("images/sprites/Jos100px/Jos_0.png");
}

function setup() {
  canvas = createCanvas(901,601);
  canvas.parent('processing');
  celGrootte = width / aantalKolommenRaster;
}

function draw() {
  
  tekenRaster();
}

function tekenRaster() {
  push();
  noFill();
  stroke('grey');
  /*
  Maak hieronder een dubbele herhaling om een raster te maken.
  HINT: je kunt terugkijken naar het raster dat je in H1 hebt gemaakt.
  Maak gebruik van de variabelen die bovenaan zijn gedeclareerd.
  */
  
      rect(4*celGrootte,2*celGrootte,celGrootte,celGrootte);

  pop();
}
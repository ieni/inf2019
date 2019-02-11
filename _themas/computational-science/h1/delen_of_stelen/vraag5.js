var tegenstander;

class Speler {
	constructor(beschrijving, deelt) {
		this.beschrijving = beschrijving;
		this.deelkans = deelt;
	}
	
	deelt(){
		return this.deelkans >= Math.random() * 100;
	}
}

var tegenstanders = [
					 new Speler("een jonge vrouw", 48),
					 new Speler("een vrouw van gemiddelde leeftijd", 62),
					 new Speler("een oudere dame", 54),
					 new Speler("een jonge man", 34),
					 new Speler("een man van gemiddelde leeftijd", 61),
					 new Speler("een oudere man", 88)
];

function setup(){
	// selecteer tegenstander
	tegenstander = tegenstanders[Math.floor(Math.random() * tegenstanders.length)];
	
	// presenteer scenario en keuze
	document.getElementById("situation-tekst").innerHTML = "Voor je zit " + tegenstander.beschrijving + ".";
	document.getElementById("controls").style.display = 'block';
	document.getElementById("resetdiv").style.display = 'none';
	document.getElementById("situation-tekst").style.backgroundColor = "lightyellow";
}

function delen(){
	document.getElementById("controls").style.display = 'none';
	document.getElementById("resetdiv").style.display = 'block';
	if (tegenstander.deelt()){
		document.getElementById("situation-tekst").innerHTML = "Jullie hebben beide gedeelt, dat is heel sympathiek van jullie!";
		document.getElementById("situation-tekst").style.backgroundColor = "green";
	} else {
		document.getElementById("situation-tekst").innerHTML = "Je tegenstander heeft gestolen, helaas je had deze tegenstander niet moeten vertrouwen...";
		document.getElementById("situation-tekst").style.backgroundColor = "red";
	}
}

function stelen(){
	document.getElementById("controls").style.display = 'none';
	document.getElementById("resetdiv").style.display = 'block';
	if (tegenstander.deelt()){
		document.getElementById("situation-tekst").innerHTML = "Je tegenstander had gedeeld, nu heb jij alles gekregen!";
		document.getElementById("situation-tekst").style.backgroundColor = "green";
	} else {
		document.getElementById("situation-tekst").style.backgroundColor = "red";
		document.getElementById("situation-tekst").innerHTML = "Jullie hebben beide gestolen! Nu krijgen jullie allebij niks...";
	}
}

setup();
document.getElementById("delen").addEventListener("click", delen);
document.getElementById("stelen").addEventListener("click", stelen);
document.getElementById("reset").addEventListener("click", setup);

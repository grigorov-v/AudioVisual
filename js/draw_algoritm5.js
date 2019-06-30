var drawAlgoritm5 = {
	pieces: 0,
	radius: 0,
	mapMouseX: 0,
	mapMouseY: 0,
	colorPalette: ["#02073c", "#5b0ff5", "#f50fac", "#f50fac"]
}

drawAlgoritm5.draw = function () {
    background(this.colorPalette[0]);

    translate(windowWidth / 2, windowHeight / 2);

    level = analyzer.getLevel();
    fft.analyze();

    var bass = fft.getEnergy(100, 150);
	var treble = fft.getEnergy(150, 250);
    var mid = fft.getEnergy("mid");
    
    var mapMid = map(mid, 0, 255, -100, 200);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, 200, 350);
	var scaleTreble = map(treble, 0, 255, 0, 1);

	var mapbass = map(bass, 0, 255, 50, 200);
	var scalebass = map(bass, 0, 255, 0.05, 1.2);

	this.mapMouseX = map(mouseX, 0, width, 1, 50);
	var mapMouseXbass = map(mouseX, 0, width, 1, 5);
    this.mapMouseY = map(mouseY, 0, height, 2, 6);
    
    this.pieces = 20;
    this.radius = 100;
    
    for (i = 0; i < this.pieces; i += 0.1) {

		rotate(TWO_PI / (this.pieces / 2));
		noFill();

		/*----------  BASS  ----------*/
		push();
		stroke(this.colorPalette[1]);
		rotate(frameCount * 0.002);
		strokeWeight(0.5);
		polygon(mapbass + i, mapbass - i, mapMouseXbass * i, 3);
		pop();


		/*----------  MID  ----------*/
		push();
		stroke(this.colorPalette[2]);
		strokeWeight(0.2);
		polygon(mapMid + i / 2, mapMid - i * 2, this.mapMouseX * i, 7);
		pop();


		/*----------  TREMBLE  ----------*/
		push();
		stroke(this.colorPalette[3]);
		strokeWeight(0.6);
		scale(mouseX * 0.0005);
		rotate((mouseX * 0.002));
		polygon(mapTreble + i / 2, mapTreble - i / 2, this.mapMouseY * i / 2, 3);
		pop();
	}
}
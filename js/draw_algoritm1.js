var drawAlgoritm1 = {
	pieces: 0,
	radius: 0,
	mapMouseX: 0,
	mapMouseY: 0,
	colorPalette: ["#000", "rgba(22, 59, 72, 0.5)", "#00a6e0", "#002a38"]
}

drawAlgoritm1.draw = function () {
	background(this.colorPalette[0]);
	noFill();
	fft.analyze();
	var bass = fft.getEnergy("bass");
	var treble = fft.getEnergy("treble");
	var mid = fft.getEnergy("mid");

	var mapMid = map(mid, 0, 255, -this.radius, this.radius);
	var scaleMid = map(mid, 0, 255, 1, 1.5);

	var mapTreble = map(treble, 0, 255, -this.radius, this.radius);
	var scaleTreble = map(treble, 0, 255, 1, 1.5);

	var mapbass = map(bass, 0, 255, -100, 800);
	var scalebass = map(bass, 0, 255, 0, 0.8);

	this.mapMouseX = map(mouseX, 0, width, 4, 10);
	this.mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);

	this.pieces = this.mapMouseX;
	this.radius = this.mapMouseY;

	translate(windowWidth / 2, windowHeight / 2);
	strokeWeight(1);

	for (i = 0; i < this.pieces; i += 0.5) {
		rotate(TWO_PI / this.pieces);

		/*----------  BASS  ----------*/
		push();
		strokeWeight(5);
		stroke(this.colorPalette[1]);
		scale(scalebass);
		rotate(frameCount * -0.5);
		line(mapbass, this.radius / 2, this.radius, this.radius);
		line(-mapbass, -this.radius / 2, this.radius, this.radius);
		pop();

		/*----------  MID  ----------*/
		push();
		strokeWeight(0.5);
		stroke(this.colorPalette[2]);
		scale(scaleMid);
		line(mapMid, this.radius / 2, this.radius, this.radius);
		line(-mapMid, -this.radius / 2, this.radius, this.radius);
		pop();

		/*----------  TREMBLE  ----------*/
		push();
		stroke(this.colorPalette[3]);
		scale(scaleTreble);
		line(mapTreble, this.radius / 2, this.radius, this.radius);
		line(-mapTreble, -this.radius / 2, this.radius, this.radius);
		pop();
	}
}
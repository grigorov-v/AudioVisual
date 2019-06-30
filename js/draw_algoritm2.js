var drawAlgoritm2 = {
	pieces: 0,
	radius: 0,
	mapMouseX: 0,
	mapMouseY: 0,
	colorPalette: ["#0f0639", "#ff006a", "#ff4f00", "#00f9d9"]
}

drawAlgoritm2.draw = function () {
    
    // this.pieces = 4;
    // this.radius = windowHeight / 4;
	
	background(this.colorPalette[0]);

	fft.analyze();
    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(100, 150);
	var mid = fft.getEnergy("mid");
	
	var mapbass = map(bass, 0, 255, -100, 800);
	var scalebass = map(bass, 0, 255, 0.5, 1.2);
	
	var mapMid = map(mid, 0, 255, -this.radius / 4, this.radius * 4);
	var scaleMid = map(mid, 0, 255, 1, 1.5);
	
	var mapTreble = map(treble, 0, 255, -this.radius / 4, this.radius * 4);
	var scaleTreble = map(treble, 0, 255, 1, 1.5);
	
	this.mapMouseX = map(mouseX, 0, width, 2, 0.1);
	this.mapMouseY = map(mouseY, 0, height, windowHeight / 8, windowHeight / 6);
	
	this.pieces = this.mapMouseX;
    this.radius = this.mapMouseY;

    var mapScaleX = map(mouseX, 0, width, 1, 0);
	var mapScaleY = map(mouseY, 0, height, 0, 1);
	
	translate(width / 2, height / 2);

    for (i = 0; i < this.pieces; i += 0.01) {

        rotate(TWO_PI / this.pieces);

        /*----------  BASS  ----------*/
        push();
        strokeWeight(1);
        stroke(this.colorPalette[1]);
        scale(scalebass);
        rotate(frameCount * -0.5);
        line(mapbass, this.radius / 2, this.radius, this.radius);
        line(-mapbass, -this.radius / 2, this.radius, this.radius);
        pop();


        /*----------  MID  ----------*/
        push();
        strokeWeight(1);
        stroke(this.colorPalette[2]);
        line(mapMid, this.radius, this.radius * 2, this.radius * 2);
        pop();


        /*----------  TREMBLE  ----------*/
        push();
        stroke(this.colorPalette[3]);
        scale(this.scaleTreble);
        line(mapTreble, this.radius / 2, this.radius, this.radius);
        pop();
    }
}
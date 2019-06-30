var drawAlgoritm3 = {
	pieces: 0,
	radius: 0,
	mapMouseX: 0,
	mapMouseY: 0,
    
    bgColor: "#0c0f27",
    bassColor: ["#313e9b", "#1200b3"],
    midColor: "#da1500",
    trembleColor: "#728d0d"
}

drawAlgoritm3.draw = function () {
	background(this.bgColor);
	strokeWeight(1);

    fft.analyze();
    
    var bass = fft.getEnergy("bass");
	var treble = fft.getEnergy(50, 110);
    var mid = fft.getEnergy("mid");
    
    var mapMid = map(mid, 0, 255, -this.radius, this.radius);
    var scaleMid = map(mid, 0, 255, 1, 1.5);
    
    var mapTreble = map(treble, 0, 255, -this.radius / 2, this.radius * 2);
    var scaleTreble = map(treble, 0, 255, 0.5, 2);
    
    var mapbass = map(bass, 0, 255, 0, 200);
    var scalebass = map(bass, 0, 255, 0, 0.8);
    
    this.mapMouseX = map(mouseX, 0, width, 100, 200);
	mapMouseScale = map(mouseX, 0, width, 0.35, 0.2);
    this.mapMouseY = map(mouseY, 0, height, windowHeight / 4, windowHeight);
    
    this.pieces = 9;
    this.radius = 200;
    
    translate(windowWidth / 2, windowHeight / 2);

    for ( i = 0; i < this.pieces; i += 1 ) {
        rotate(TWO_PI / this.pieces);
        noFill();
        
        /*----------  BASS  ----------*/
		push();
		strokeWeight(8);
		stroke(this.bassColor[0]);
		scale(scalebass + mapMouseScale);
		rotate(-frameCount * 0.05);
		point(mapbass, this.radius / 2);
		stroke(this.bassColor[1]);
		strokeWeight(2.2);
		line(this.mapMouseX, mouseY, this.radius, this.radius);
        pop();
        
        /*----------  MID  ----------*/
		push();
		stroke(this.midColor);
		strokeWeight(4);
		rotate(-frameCount * 0.01);
		point(mapMid, this.radius);
        pop();
        
        /*----------  TREMBLE  ----------*/
		push();
		stroke(this.trembleColor);
		strokeWeight(4);
		scale(scaleTreble);
		rotate(frameCount * 0.01);
		point(-100, this.radius / 2);
		point(100, this.radius / 2);
		pop();
    }
}
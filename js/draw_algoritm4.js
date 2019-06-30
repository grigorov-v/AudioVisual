var drawAlgoritm4 = {
	pieces: 0,
	radius: 0,
	mapMouseX: 0,
	mapMouseY: 0,
	colorPalette: ["#676767", "#232D22", "#C1C1C2", "#FFF903"]
}

drawAlgoritm4.draw = function () {
    background(this.colorPalette[0]);
    translate(windowWidth / 2, windowHeight / 2);

    level = analyzer.getLevel();
    fft.analyze();

    var bass = fft.getEnergy("bass");
    var treble = fft.getEnergy(2, 250);
    var mid = fft.getEnergy(1, 250);

    if (!audio.isPlaying()) {
        var mapBassX = map(mouseX, 0, width, 400, 1200);

        for (var b = 0; b < 70; b++) {

            push();
            noFill();
            stroke(this.colorPalette[1]);
            rotate(b);
            var mapScale = map(b, 0, 100, 0, 3);
            strokeWeight(1);
            bezier(mapBassX - b, 20, 10, 20, 100, 50, mouseY, mouseY);
            pop();
        } 
    } else {

        /*----------  BASS  ----------*/
        var _mapBassX = map(mouseX, 0, width, 400, 1200);
        for (var b = 0; b < bass; b++) {
            var _mapScale = map(b, 0, bass, 0, 3);
            push();
            noFill();
            stroke(this.colorPalette[1]);
            rotate(b * frameCount);
            strokeWeight(_mapScale);
            bezier(_mapBassX - b, 20, 10, 20, 100, 50, mouseY, mouseY);
            pop();
        }


        /*----------  MID  ----------*/
        for (var m = 0; m < mid; m += 20) {

            var angle = m * 3 * random();
            strokeWeight(1);
            push();

            fill(random(100, 255), random(100, 255), random(100, 255), random(0, 255));
            fill(this.colorPalette[2]);
            rotate(angle * 5);
            scale(level / 2);

            if (audio.currentTime() > 5) {
                rect(mouseX + m * 10, mouseY + m * 50, m * 7, m * 7);
            }
            pop();
        }


        /*----------  TREMBLE  ----------*/
        for (var j = 5; j < treble; j += 20) {

            var angleT = j * 3 * random();
            strokeWeight(1);
            push();
            fill(this.colorPalette[3]);
            rotate(angleT * 5);
            scale(level / 4);

            if (audio.currentTime() > 7) {
                rect(mouseX * j + 10, mouseY * j, 200 * j, j * 5);
            }
            pop();
        }
    }
}
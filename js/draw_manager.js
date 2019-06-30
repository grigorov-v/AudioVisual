var fft, analyzer, toggleBtn, audio, uploadBtn, uploadedAudio, uploadAnim;
var uploadLoading = false;

var numberAlg = 0;

function preload() {
	audio = loadSound("https://api.soundcloud.com/tracks/42328219/stream?client_id=b1495e39071bd7081a74093816f77ddb");
}

function uploaded(file) {
	uploadLoading = true;
	uploadedAudio = loadSound(file.data, uploadedAudioPlay);
}

function uploadedAudioPlay(audioFile) {
	uploadLoading = false;

	if (audio.isPlaying()) {
		audio.pause();
	}

	audio = audioFile;
	audio.loop();
}

function setup() {

	uploadAnim = select('#uploading-animation');

	createCanvas(windowWidth, windowHeight);

	toggleBtn = createButton("Play / Pause");

	uploadBtn = createFileInput(uploaded);

	uploadBtn.addClass("upload-btn");

	toggleBtn.addClass("toggle-btn");
	
	toggleBtn.mousePressed(toggleAudio);

	fft = new p5.FFT();
	analyzer = new p5.Amplitude();

	audio.loop();
}

function polygon(x, y, radius, npoints) {
	var angle = TWO_PI / npoints;
	beginShape();
	for (var a = 0; a < TWO_PI; a += angle) {
		var sx = x + cos(a) * radius;
		var sy = y + sin(a) * radius;
		vertex(sx, sy);
	}
	endShape(CLOSE);
}

function toggleAudio() {
	if (audio.isPlaying()) {
		audio.pause();
	} else {
		audio.play();
	}
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // Add a loading animation for the uploaded track
	if (uploadLoading) {
		uploadAnim.addClass('is-visible');
	} else {
		uploadAnim.removeClass('is-visible');
	}

	switch(numberAlg) {
		case 0: {
	    	drawAlgoritm1.draw();
		  	break
		}
		case 1: {
	    	drawAlgoritm2.draw();
		  	break
		}
		case 2: {
	    	drawAlgoritm3.draw();
		  	break
		}
		case 3: {
	    	drawAlgoritm4.draw();
		  	break
		}
		case 4: {
	    	drawAlgoritm5.draw();
		  	break
		}
		default: {
			background("#000");
			break;
		}
	}
}
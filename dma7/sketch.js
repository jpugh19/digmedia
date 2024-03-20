function preload() {
  spy = loadImage('assets/Blackspy.png');
  boom = loadImage('assets/Boom.png');
}

let fuse = new Tone.Noise("brown");
let hifilter = new Tone.Filter(10000, "highpass");
let bomb = new Tone.Noise("white");
let lofilter =  new Tone.Filter(10000, "lowpass");

fuse.connect(hifilter);
hifilter.toDestination();
bomb.connect(lofilter);
lofilter.toDestination();

function setup() {
  createCanvas(500, 700);
}

function draw() {
  if (mouseIsPressed === true) {
    background(spy);
    fuse.start();
    hifilter.frequency.rampTo(1001, 2);
    if (hifilter.frequency.value > 1000.5) {
      fuse.stop();
      background(boom);
      bomb.start();
      lofilter.frequency.rampTo(100, 3);
    }
  }
  else if (mouseIsPressed === false) {
    background(220, 20, 20);
    textSize(64);
    text ('Press mouse.', 50, 100);
    fuse.stop();
    bomb.stop();
    hifilter.frequency.value = 1000;
    lofilter.frequency.value = 1000;
  }
}

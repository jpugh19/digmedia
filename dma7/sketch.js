function preload() {
  spy = loadImage('assets/Blackspy.png');
  boom = loadImage('assets/Boom.png');
}

let timer = 0;
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
    timer += deltaTime / 1000;
    if (timer > 3) {
      background(boom);
      fuse.stop();
      bomb.start();
      lofilter.frequency.rampTo(100, 4);
      if (lofilter.frequency.value === 100) {
        bomb.stop();
        lofilter.frequency.value = 1000;
      }
    }
  }
  else if (mouseIsPressed === false) {
    background(220, 20, 20);
    textSize(64);
    text ('Press mouse.', 50, 100);
    fuse.stop();
    bomb.stop();
    lofilter.frequency.value = 1000;
    timer = 0;
  }
}

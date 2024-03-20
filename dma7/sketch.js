function preload() {
  spy = loadImage('assets/Blackspy.png');
  boom = loadImage('assets/Boom.png');
}

let time = 0;
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
    time += deltaTime/1000;
    background(spy);
    fuse.start(time);
    hifilter.frequency.rampTo(1001, 2);
    if (hifilter.frequency.value > 1000.5) {
      fuse.stop(time);
      background(boom);
      bomb.start(time);
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
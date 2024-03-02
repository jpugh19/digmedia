
let sine = new Tone.Synth({
  oscillator: {
    type: 'sine'
  },
  envolope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toDestination();



function setup() {
  createCanvas(400, 400);
}

function keyPressed() {
  if (key === 'q') {
    sine.triggerAttackRelease('c4', 1);
  }
}

function draw() {
  background(220);
}

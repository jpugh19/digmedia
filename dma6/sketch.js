
let synth = new Tone.PolySynth(Tone.Synth);
let bend = new Tone.PitchShift();
let notes;

bend.pitch = 0;
synth.connect(bend);
bend.toDestination();


// function preload() {

// }




function setup() {
  createCanvas(500, 500);
  notes = {
    'a' : 'C4',
    's' : 'D4',
    'd' : 'E4',
    'f' : 'F4',
    'g' : 'G4',
    'h' : 'A4',
    'j' : 'B4',
    'k' : 'C5'
  }

  pitchSlider = createSlider(-12, 12, 0, 0.1);
  pitchSlider.position (120, 100);
  pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());
}


function keyPressed() {
  let playNotes = notes[key];
  synth.triggerAttack(playNotes);
}

function keyReleased() {
  let playNotes = notes[key];
  synth.triggerRelease(playNotes, '+0.02');
}


function draw() {
  background(220, 22, 56);
  text ('play a-k for synth', 100, 200);
}

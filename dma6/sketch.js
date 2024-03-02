let synth1 = new Tone.PolySynth(Tone.Synth);
let synth2 = new Tone.PolySynth(Tone.DuoSynth);
let bend = new Tone.PitchShift();
let delay = new Tone.FeedbackDelay("8n", 0.5);
let notes;

bend.pitch = 0;
synth1.connect(bend);
synth2.connect(bend);
bend.connect(delay);
delay.toDestination();

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

  mySelect = createSelect();
  mySelect.position(250, 35);
  mySelect.option('Simple Synth');
  mySelect.option('Duo Synth');

  pitchSlider = createSlider(-12, 12, 0, 0.1);
  pitchSlider.position (175, 150);
  pitchSlider.mouseMoved(()=> bend.pitch = pitchSlider.value());

  delaySlider = createSlider(0, 1, 0.5, 0.05);
  delaySlider.position(175, 250);
  delaySlider.mouseMoved(() => delay.delayTime.value = delaySlider.value());
}

function keyPressed() {
  if (mySelect.selected() === 'Simple Synth') {
    let playNotes = notes[key];
    synth1.triggerAttack(playNotes);
  }
  else if (mySelect.selected() === 'Duo Synth') {
    let playNotes = notes[key];
    synth2.triggerAttack(playNotes);
  }
}

function keyReleased() {
  if (mySelect.selected() === 'Simple Synth') {
    let playNotes = notes[key];
    synth1.triggerRelease(playNotes, '+0.02');
  }
  else if (mySelect.selected() === 'Duo Synth') {
    let playNotes = notes[key];
    synth2.triggerRelease(playNotes, '+0.02');
  }
}

function draw() {
  background(220, 22, 56);
  textSize(20);
  text('Play a-k for: ', 135, 50);
  text('Move slider for pitch bend', 120, 200);
  text('Move slider for delay', 150, 300);
}
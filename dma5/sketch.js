let sounds;
let button1;
let button2;
let button3;
let button4;
let distort;
let distSlider;

function preload (){
  sounds = new Tone.Players ({
    cat : "assets/cat.mp3",
    fire : "assets/fire.mp3",
    robot : "assets/robot.mp3",
    water : "assets/water.mp3"
  });

  distort = new Tone.Distortion(0.5);

  sounds.connect(distort);
  distort.toDestination();
}

function setup() {
  createCanvas(400, 400);

  button1 = createButton('Cat');
  button1.position(90, 100);
  button1.mousePressed (() => sounds.player ('cat').start());

  button2 = createButton('Fire');
  button2.position(285, 100);
  button2.mousePressed (() => sounds.player ('fire').start());

  button3 = createButton('Robot');
  button3.position(80, 250);
  button3.mousePressed (() => sounds.player ('robot').start());

  button4 = createButton('Water');
  button4.position(280, 250);
  button4.mousePressed (() => sounds.player ('water').start());

  distSlider =  createSlider(0, 0.9, 0, 0.05);
  distSlider.position(140, 150);
  distSlider.mouseMoved (() => distort.distortion = distSlider.value());
}

function draw() {
  background(253, 208, 35);
  text("Press Buttons for Sound", width/3, 50);
  text("Move Slider for Distortion", width/3, 200);
}
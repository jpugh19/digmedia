// youtube link: https://youtu.be/ek0J1JXXrBo

let bugs = [];
let aim;
let num = 0;
let numBugs = 0;
let speed = 1;
let rotations = [0, 90, 180, 270];
let score = 0;
let prevScore = 0;
let timeRemaining = 30;
let gameOver = false;
let animations;
let curse;
let go = false;
let delay = 10;
let going;
let stopped;
let square;
let soundFX;
let playMusic = ["A4", "B4", "A4", ["C3", "B4"], "E5", ["F4", "C3", "D4"], "A4", "G4"];
let endMusic = ["B4", ["C4", "B4"], "D4", "A5"];
let port;
let joyX = 0;
let joyY = 0;
let sw = 0;
let circleX;
let circleY;
let usedPorts;

square = new Tone.Synth({
  oscillator: {
    type: "sawtooth"
  },
  envelope: {
    attack: 0.1,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toDestination();

going = new Tone.Sequence (function (time, note) {
  square.triggerAttackRelease(note, 0.8);
}, playMusic, "4n");

stopped = new Tone.Sequence (function (time, note) {
  square.triggerAttackRelease(note, 0.8);
}, endMusic, "4n");

function preload() {
  animations = {
    walk: { row: 0, col: 0, frames: 4 },
    squish: { row: 0, col: 4, frames: 1 }
  };
  soundFX = new Tone.Players ({
    squish: "assets/Squish.mp3"
  }).toDestination();

  
  curse = {
    target: { row: 0, col: 0, frames: 1 }
  };
}

Tone.Transport.start();
Tone.Transport.bpm.value = 90;

function setup() {
  port = createSerial();
  createCanvas(1200, 800);
  circleX = width / 2;
  circleY = height / 2;

  usedPorts = usedSerialPorts();
  frameRate(90);

  while (numBugs < 50) {
    bugs.push(new Insect(random(40, width - 40), random(40, height - 40), 80, 80, 'assets/Bug.png', animations, delay, random(rotations)));
    numBugs++;
  }

  aim = new Sprite(width / 2, height / 2, 20, 20);
  aim.spriteSheet = 'assets/Cursor.png';
  aim.collider = 'none';
  aim.addAnis(curse);
  aim.changeAni('target');
}

function draw() {
  background(220);

  let str = port.readUntil("\n");
  let values = str.split(",");
  if (values.length > 2) {
    joyX = values[0];
    joyY = values[1];
    sw = Number(values[2]);

    if (joyX > 0) {
      aim.x += joyX / 100;
      circleX += joyX / 100;
    }
    else if (joyX < 0) {
      aim.x += joyX / 100;
      circleX += joyX / 100;
    }

    if (joyY > 0) {
      aim.y += joyY / 100;
      circleY += joyY / 100;
    }
    else if (joyY < 0) {
      aim.y += joyY / 100;
      circleY += joyY / 100;
    }
  }

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move(speed);
    if (sw == 1) {
      if (contains(bugs[i], aim.x, aim.y) && num == 0) {
        bugs[i].squished();
        num++;
      }
    }
    else if (sw == 0) {
      num = 0;
      if (port.opened()) {
        let message = "0\n";
        port.write(message);
      }
    }
  }
  
  fill("lightGreen");
  circle(circleX, circleY, 25);
  fill("black");

  if (gameOver) {
    gameDone();
  }
  else if (go){
    playing();
  }
  else {
    textSize(24);
    text("Click on the canvas to start the game.", width/2 - 200, 50);
  }
}

function mousePressed() {
  go = true;
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
}

function contains(crawley, x, y) {
  let insideX = (x >= crawley.sprite.x - 40 && x <= crawley.sprite.x + 40);
  let insideY = (y >= crawley.sprite.y - 40 && y <= crawley.sprite.y + 40);
  return insideX && insideY;
}

function playing() {
  textSize(24);
  text("Score: " + score, 20, 25); 
  text("Time: " + ceil(timeRemaining), width - 100, 25);

  Tone.start();
  going.start();
 
  timeRemaining -= deltaTime / 1000;
  if (timeRemaining < 0) {
    gameOver = true;
  }
}

function gameDone() {
  going.stop();
  stopped.start();
  const final = score;
  text("Time's Up!", 100, 100);
  text("Score: " + final, 100, 150);
  text("Refresh to restart.", 100, 200);
  timeRemaining = 0;
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  }
  else {
    port.close();
  }
}

class Insect {
  constructor(x, y, width, height, spriteSheet, animations, delay, roto) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = delay;
    this.sprite.rotation = roto;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('walk');
    this.sprite.squash = false;
  }

  move(velo) {
    if (this.sprite.rotation == 90) {
      this.walkRight(velo);
      if (this.sprite.x + this.sprite.width/3 >= width) {
        this.walkLeft(velo);
      }
    }
    else if (this.sprite.rotation == 270) {
      this.walkLeft(velo);
      if (this.sprite.x - this.sprite.width/3 <= 0) {
        this.walkRight(velo);
      }
    }
    else if (this.sprite.rotation == 0) {
      this.walkUp(velo);
      if (this.sprite.y - this.sprite.height/3 <= 0) {
        this.walkDown(velo);
      }
    }
    else if (this.sprite.rotation == 180) {
      this.walkDown(velo);
      if (this.sprite.y + this.sprite.height/3 >= height) {
        this.walkUp(velo);
      }
    }
  }

  walkRight(velo) {
    this.sprite.rotation = 90;
    this.sprite.vel.x = velo;
    this.sprite.vel.y = 0;
    this.sprite.anis.frameDelay = delay;
  }

  walkLeft(velo) {
    this.sprite.rotation = 270;
    this.sprite.vel.x = -velo;
    this.sprite.vel.y = 0;
    this.sprite.anis.frameDelay = delay;
  }
  
  walkUp(velo) {
    this.sprite.rotation = 0;
    this.sprite.vel.y = -velo;
    this.sprite.vel.x = 0;
    this.sprite.anis.frameDelay = delay;
  }
  
  walkDown(velo) {
    this.sprite.rotation = 180;
    this.sprite.vel.y = velo;
    this.sprite.vel.x = 0;
    this.sprite.anis.frameDelay = delay;
  }

  squished() {
    if (!this.sprite.squash && timeRemaining > 0 && go) {
      if (port.opened()) {
        let message = "50\n";
        port.write(message);
      }
      this.sprite.changeAni('squish');
      this.sprite.collider = 'static';
      score++;
      speed += 0.5;
      delay--;
      this.sprite.squash = true;
      soundFX.player('squish').start();
      Tone.Transport.bpm.value += 5;
    }
  }
}
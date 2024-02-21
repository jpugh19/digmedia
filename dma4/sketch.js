let bugs = [];
let num = 0;
let numBugs = 0;
let speed = 1;
let rotations = [0, 90, 180, 270];
let score = 0;
let prevScore = 0;
let timeRemaining = 30;
let gameOver = false;
let animations;
let click = false;
let delay = 10;

function preload() {
  animations = {
    walk: { row: 0, col: 0, frames: 4 },
    squish: { row: 0, col: 4, frames: 1 }
  };
}

function setup() {
  createCanvas(1200, 800);
}

function draw() {
  background(220);

  while (numBugs < 50) {
    bugs.push(new Insect(random(40, width - 40), random(40, height - 40), 80, 80, 'Sprites/Bug.png', animations, delay, random(rotations)));
    numBugs++;
  } 

  for (let i = 0; i < bugs.length; i++) {
    bugs[i].move(speed);
    if (contains(bugs[i], mouseX, mouseY) && mouseIsPressed && click) {
      bugs[i].squished();
    }
  }

  if (gameOver) {
    gameDone();
  }
  else {
    playing();
  }
}

function mouseClicked() {
  click = true;
}

function mouseDragged() {
  click = false;
}

function contains(crawley, x, y) {
  let insideX = x >= crawley.sprite.x - 40 && x <= crawley.sprite.x + 40;
  let insideY = y >= crawley.sprite.y - 40 && y <= crawley.sprite.y + 40;
  return insideX && insideY;
}

function playing() {
  textSize(24);
  text("Score: " + score, 20, 25); 
  text("Time: " + ceil(timeRemaining), width - 100, 25);
 
  timeRemaining -= deltaTime / 1000;
  if (timeRemaining < 0) {
    gameOver = true;
  }
}

function gameDone() {
  const final = score;
  text("Time's Up!", 100, 100);
  text("Score: " + final, 100, 150);
  timeRemaining = 0;
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
    if (!this.sprite.squash && timeRemaining > 0) {
      this.sprite.changeAni('squish');
      this.sprite.collider = 'static';
      score++;
      speed += 0.5;
      delay--;
      this.sprite.squash = true;
      console.log(numBugs);
    }
  }
}
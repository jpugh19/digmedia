let spelunkyguy = new Array(3);
let ninja = new Array(3);
let green = new Array(3);
let viking = new Array(3);
let a = 100;
let b = 300;
let c = 500;
let d = 425;

function preload() {
  let animations = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 8 },
    walkUp: {row: 5, frames: 6 },
    walkDown: {row: 5, col: 6, frames: 6}
  };

  for (let i = 0; i < 3; i++) {
    spelunkyguy[i] = new Sprite(a, a, 80, 80);
    spelunkyguy[i].spriteSheet = 'assets/SpelunkyGuy.png';
    spelunkyguy[i].anis.frameDelay = 8;
    spelunkyguy[i].addAnis(animations);
    spelunkyguy[i].changeAni('stand');

    ninja[i] = new Sprite(b, b, 80, 80);
    ninja[i].spriteSheet = 'assets/Ninja.png';
    ninja[i].anis.frameDelay = 8;
    ninja[i].addAnis(animations);
    ninja[i].changeAni('stand');

    green[i] = new Sprite(a, c, 80, 80);
    green[i].spriteSheet = 'assets/Green.png';
    green[i].anis.frameDelay = 8;
    green[i].addAnis(animations);
    green[i].changeAni('stand');

    viking[i] = new Sprite(a, d, 80, 80);
    viking[i].spriteSheet = 'assets/Viking.png';
    viking[i].anis.frameDelay = 8;
    viking[i].addAnis(animations);
    viking[i].changeAni('stand');

    a += 200;
    b += 100;
    c -= 140;
    d -= 100;
  }
}

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
  for (let j = 0; j < 3; j++) {
    move(spelunkyguy[j]);
    move(ninja[j]);
    move(green[j]);
    move(viking[j]);
  }
}

function move(sprite) {
  if (kb.pressing(RIGHT_ARROW) && !(sprite.x + sprite.width/3 > width)) {
    walkRight(sprite);
  }
  else if (kb.pressing(LEFT_ARROW) && !(sprite.x - sprite.width/3 < 0)) {
    walkLeft(sprite);
  }
  else if (kb.pressing(UP_ARROW) && !(sprite.y - sprite.height/2 < 0)) {
    walkUp(sprite);
  }
  else if (kb.pressing(DOWN_ARROW) && !(sprite.y + sprite.height/2 > height)) {
    walkDown(sprite);
  }
  else {
    stand(sprite);
  }
}

function walkRight(sprite) {
  sprite.changeAni('walkRight');
  sprite.vel.x = 1;
  sprite.vel.y = 0;
  sprite.scale.x = 1;
}

function walkLeft(sprite) {
  sprite.changeAni('walkRight');
  sprite.vel.x = -1;
  sprite.vel.y = 0;
  sprite.scale.x = -1;
}

function walkUp(sprite) {
  sprite.changeAni('walkUp');
  sprite.vel.x = 0;
  sprite.vel.y = -1;
}
function walkDown(sprite) {
  sprite.changeAni('walkDown');
  sprite.vel.x = 0;
  sprite.vel.y = 1;
}

function stand(sprite) {
  sprite.vel.x = 0;
  sprite.vel.y = 0;
  sprite.changeAni('stand');
}

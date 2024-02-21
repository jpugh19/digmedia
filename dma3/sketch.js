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
    spelunkyguy[i] = new Character(a, a, 80, 80, 'assets/SpelunkyGuy.png', animations);
    // spelunkyguy[i] = new Sprite(a, a, 80, 80);
    // spelunkyguy[i].spriteSheet = 'assets/SpelunkyGuy.png';
    // spelunkyguy[i].anis.frameDelay = 8;
    // spelunkyguy[i].addAnis(animations);
    // spelunkyguy[i].changeAni('stand');

    // ninja[i] = new Sprite(b, b, 80, 80);
    // ninja[i].spriteSheet = 'assets/Ninja.png';
    // ninja[i].anis.frameDelay = 8;
    // ninja[i].addAnis(animations);
    // ninja[i].changeAni('stand');

    // green[i] = new Sprite(a, c, 80, 80);
    // green[i].spriteSheet = 'assets/Green.png';
    // green[i].anis.frameDelay = 8;
    // green[i].addAnis(animations);
    // green[i].changeAni('stand');

    // viking[i] = new Sprite(a, d, 80, 80);
    // viking[i].spriteSheet = 'assets/Viking.png';
    // viking[i].anis.frameDelay = 8;
    // viking[i].addAnis(animations);
    // viking[i].changeAni('stand');

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
  // for (let j = 0; j < 3; j++) {
  //   move(spelunkyguy[j]);
  //   // move(ninja[j]);
  //   // move(green[j]);
  //   // move(viking[j]);
    
  // }
  spelunkyguy.forEach((sprite) => {
    if (kb.pressing(RIGHT_ARROW) && !(sprite.x + sprite.width/3 > width)) {
      sprite.walkRight(sprite);
    }
    else if (kb.pressing(LEFT_ARROW) && !(sprite.x - sprite.width/3 < 0)) {
      sprite.walkLeft(sprite);
    }
    else if (kb.pressing(UP_ARROW) && !(sprite.y - sprite.height/2 < 0)) {
      sprite.walkUp(sprite);
    }
    else if (kb.pressing(DOWN_ARROW) && !(sprite.y + sprite.height/2 > height)) {
      sprite.walkDown(sprite);
    }
    else {
      sprite.stand(sprite);
    }
  })
}

// function move(sprite) {
  
// }

class Character {
  constructor(x, y, width, height, sheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = sheet;
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('stand');
  }


  walkRight(sprite) {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = 1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = 1;
  }

  walkLeft(sprite) {
    this.sprite.changeAni('walkRight');
    this.sprite.vel.x = -1;
    this.sprite.vel.y = 0;
    this.sprite.scale.x = -1;
  }

  walkUp(sprite) {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = -1;
  }
  walkDown(sprite) {
    this.sprite.changeAni('walkDown');
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 1;
  }

  stand(sprite) {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('stand');
}
}
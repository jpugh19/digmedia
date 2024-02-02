let hue;
let r;
let palette;

function setup() {
  createCanvas(600, 400);
  hue = color('white');
  r = 25;
  palette = [new Square(0, 0, color('red')),
             new Square(0, 20, color('orange')),
             new Square(0, 40, color('yellow')),
             new Square(0, 60, color('green')),
             new Square(0, 80, color('cyan')),
             new Square(0, 100, color('blue')),
             new Square(0, 120, color('magenta')),
             new Square(0, 140, color('brown')),
             new Square(0, 160, color('white')),
             new Square(0, 180, color('black'))];
}

function draw() {
  for(let i = 0; i < palette.length; i++) {
    palette[i].draw();
  }
  if (mouseIsPressed) {
    noStroke();
    fill(hue);
    circle(mouseX, mouseY, r);
  }
}

function mousePressed() {
  for(let i = 0; i <  palette.length; i++) {
    if(palette[i].contains(mouseX, mouseY)) {
      hue = palette[i].fill;
    }
  }
}


class Square {
  constructor(x, y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    stroke(255);
    fill(this.fill);
    square(this.x, this.y, 20);
  }

  contains(x, y) {
    let insideX = x >= this.x && x <= this.x + 20;
    let insideY = y >= this.y && y <= this.y + 20;
    return insideX && insideY;
  }
}
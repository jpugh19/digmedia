// Sends the coordinates of the circle to control the rgb led
// the horizontal coordinate / 2 is the red value
// the vertical coordinate / 2 is the blue value
// the average of the verical and horizontal coordinates / 2 is the green value
// receives input from a joystick to move the circle around the canvas
// when the joystick is moved the led changes color
// when the button on the joystick is pressed the circle changes color based on position as well
// youtube link: https://youtube.com/shorts/007_GCgyem4

let port;
let joyX = 0;
let joyY = 0;
let sw = 0;
let connectButton;
let circleX;
let circleY;
let averageXY;
let speed = 3;
let circleColor = "white";
let horizontal = false;
let vertical = false;
let inside = false;

function setup() {
  port = createSerial();
  createCanvas(510, 510);
  circleX = width / 2;
  circleY = height / 2;

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 57600);
  }
  frameRate(90);
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
      circleX += speed;
    }
    else if (joyX < 0) {
      circleX -= speed;
    }

    if (joyY > 0) {
      circleY += speed;
    }
    else if (joyY < 0) {
      circleY -= speed;
    }
  }

  let averageXY = (circleX + circleY) / 2;

  if (port.opened() && frameCount % 3 == 0) {
    let message = `${round(circleX / 2)} ${round(averageXY / 2)} ${round(circleY / 2)}\n`;
    port.write(message);
  }

  circle(circleX, circleY, 25);
  if (sw == 1) {
    fill(round(circleX / 2), round(averageXY / 2), round(circleY / 2));
  }
  else {
    fill("black");
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 57600);
  }
  else {
    port.close();
  }
}
// Sends the tilt of the joystick and the button value to control the circle
// the horizontal coordinate / 2 is the red value
// the vertical coordinate / 2 is the blue value
// the average of the verical and horizontal coordinates / 2 is the green value
// receives input from the circles coordinates to change the led color
// when the joystick is moved the led changes color
// when the button on the joystick is pressed the circle changes color based on position as well
// youtube link: https://youtube.com/shorts/007_GCgyem4

#define VRX_PIN A0
#define VRY_PIN A1
#define SW_PIN 2

const int redPin = 11;
const int greenPin = 10;
const int bluePin = 9;

int joyX = 0;
int joyY = 0;
int sw = 0;

const int numReadings = 10;

int xReadings[numReadings];
int yReadings[numReadings];
int readIndex = 0;
float xTotal = 0;
float yTotal = 0;
float xAverage = 0;
float yAverage = 0;
float xStart;
float yStart;
bool start = false;
unsigned long lastTime;
const int interval = 16;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(57600);
  
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  
  pinMode(SW_PIN, INPUT_PULLUP);
  for (int i = 0; i < numReadings; i++) {
    xReadings[i] = 0;
    yReadings[i] = 0;
  }
}

void loop() {
  // put your main code here, to run repeatedly:

  while (Serial.available() > 0) {

    int red = Serial.parseInt();
    int green = Serial.parseInt();
    int blue = Serial.parseInt();

    if (Serial.read() == '\n') {
      red = constrain(red, 0, 255);
      green = constrain(green, 0, 255);
      blue = constrain(blue, 0, 255);

      analogWrite(redPin, red);
      analogWrite(greenPin, green);
      analogWrite(bluePin, blue);
    }
  }

  int x = analogRead(VRX_PIN);
  int y = analogRead(VRY_PIN);
  int sw = digitalRead(SW_PIN);

  xTotal = xTotal - xReadings[readIndex];
  yTotal = yTotal - yReadings[readIndex];

  xReadings[readIndex] = x;
  yReadings[readIndex] = y;

  xTotal = xTotal + x;
  yTotal = yTotal + y;

  readIndex = readIndex + 1;

  xAverage = xTotal / numReadings;
  yAverage = yTotal / numReadings;

  if (readIndex >= numReadings) {
    readIndex = 0;
    if (!start) {
      xStart = xAverage;
      yStart = yAverage;
      start = true;
    }
  }

  if (start) {
    unsigned long now = millis();
    if (now - lastTime >= interval) {
      Serial.print((int) (xAverage - xStart));
      Serial.print(", ");
      Serial.print((int) (yAverage - yStart));
      Serial.print(", ");
      Serial.println(!sw);

      lastTime = now;
    }

    delay(20);
  }
}

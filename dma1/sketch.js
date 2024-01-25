function setup() {
  createCanvas(200, 600);
}

function draw() {
  background(220);
  stroke("black");
  strokeWeight(1);
  // Example 1
  fill(10, 220, 10);
  rect(0, 0, 200, 100);
  fill(255);
  circle(50, 50, 80);
  fill(255);
  square(110, 10, 80);
  // Example 2
  fill(255);
  square(0, 100, 200);
  noStroke();
  fill(255, 0, 0, 100);
  circle(100, 165, 100);
  fill(0, 0, 255, 100);
  circle(65, 225, 100);
  fill(0, 255, 0, 100);
  circle(135, 225, 100);
  // Example 3
  fill(0);
  rect(0, 300, 200, 100);
  fill("yellow");
  arc(50, 350, 80, 80, PI + QUARTER_PI, PI - QUARTER_PI);
  fill("red");
  circle(150, 350, 80)
  rect(110, 350, 80, 40);
  fill("white");
  circle(130, 350, 25);
  circle(170, 350, 25);
  fill("blue");
  circle(130, 350, 15);
  circle(170, 350, 15);
  // Example 4
  fill("DarkBlue");
  square(0, 400, 200);
  stroke("white");
  strokeWeight(3);
  fill("green");
  circle(100, 500, 100);
  fill("red");
  beginShape();
  vertex(87, 485);
  vertex(100, 450); // top point
  vertex(113, 485);
  vertex(150, 485); // right point
  vertex(120, 505);
  vertex(130, 540); // bottom right point
  vertex(100, 517);
  vertex(70, 540); // bottom left point
  vertex(80, 505);
  vertex(50, 485); // left point
  vertex(87, 485);
  endShape();
}

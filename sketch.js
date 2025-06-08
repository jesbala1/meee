
let redImg, blueImg;
let redDots = [], blueDots = [];
let relaxSpeed = 0.1;
let sampleStep = 4;
let brightnessThreshold = 60;

function preload() {
  redImg = loadImage('red.png');
  blueImg = loadImage('blue.png');
}

function setup() {
  createCanvas(redImg.width, redImg.height);
  noStroke();

  // RED DOTS
  redImg.loadPixels();
  for (let y = 0; y < redImg.height; y += sampleStep) {
    for (let x = 0; x < redImg.width; x += sampleStep) {
      let c = redImg.get(x, y);
      let b = brightness(c);

      if (b < brightnessThreshold) {
        redDots.push({
          ox: x,
          oy: y,
          x: x,
          y: y,
          col: color(255, 0, 0)
        });
      }
    }
  }

  // BLUE DOTS
  blueImg.loadPixels();
  for (let y = 0; y < blueImg.height; y += sampleStep) {
    for (let x = 0; x < blueImg.width; x += sampleStep) {
      let c = blueImg.get(x, y);
      let b = brightness(c);

      if (b < brightnessThreshold) {
        blueDots.push({
          ox: x,
          oy: y,
          x: x,
          y: y,
          col: color(0, 0, 255)
        });
      }
    }
  }

  console.log('Red dots:', redDots.length, 'Blue dots:', blueDots.length);
}

function draw() {
  background(20);

  // First draw RED dots
  for (let i = 0; i < redDots.length; i++) {
    animateDot(redDots[i]);
  }

  // Then draw BLUE dots on top
  for (let i = 0; i < blueDots.length; i++) {
    animateDot(blueDots[i]);
  }
}

function animateDot(dot) {
  let dx = mouseX - dot.x;
  let dy = mouseY - dot.y;
  let distToMouse = sqrt(dx * dx + dy * dy);

  if (distToMouse < 100) {
    let repelStrength = map(distToMouse, 0, 100, 8, 0, true);
    let angle = atan2(dy, dx);
    dot.x += cos(angle) * repelStrength * -1;
    dot.y += sin(angle) * repelStrength * -1;
  }

  dot.x += (dot.ox - dot.x) * relaxSpeed;
  dot.y += (dot.oy - dot.y) * relaxSpeed;

  fill(dot.col);
  ellipse(dot.x, dot.y, sampleStep * 0.9);
}

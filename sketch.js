/*
  -very long story short: the plan is to have a starting color, and for each new line drawn,
   use the previous line's RGBA value to determine the RGBA component of the new line, using soe color incrementation 
   factor.
   -For example, if line 5's color is RGBA(25, 152, 37, 0.7), and we have a color_incrementation_factor of 50,
    our next line's color will be RGBA(75, 202, 87, [some new alpha]).
  -reasoning: ...i don't know, i think it'll look cool???
  -future goals:
    -line color gradients
      -would have to learn how pixel array stuff works better so i can have line color gradients and math-y functions
     and stuff
      - i would definitely have to draw pixel-by-pixel for color gradient stuff
      -or just lerpColor(c1, c2, amt) or smth idk (thanks intellisense)

*/
let mic;
let fft;
let spectrum;

// let numScanlines = 64;
let scanlines = [];
let timings = [];
let previousColor = null;
let newColor = null;

function generate_color_map() {
  spectrum = fft.analyze();
  for (
    let spectrumIndex = 4, currentScanlineIndex = 1;
    spectrumIndex < spectrum.length;
    spectrumIndex += 4, currentScanlineIndex += windowWidth / numScanlines
  ) {
    let l = scanlines[currentScanlineIndex--];
    // newColor = color()
    // let s = new ScanLine(l.r + index);
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  fft = new p5.FFT();
  mic.start();
  fft.setInput(mic);
  let l = new ScanLine(
    0,
    windowHeight / 16,
    windowWidth,
    windowHeight / 16,
    1,
    120,
    16,
    83,
    220
  );
  scanlines.push(l);
  let s = new ScanLine(
    0,
    windowHeight / 16,
    windowWidth,
    windowHeight / 16,
    1,
    120,
    16,
    83,
    220
  );
  s.display();
  // console.log(test.r);
}

function draw() {
  background(220);
  spectrum = fft.analyze(1024, "dB");

  let test = scanlines[0];
  // test.display();
  // use fft spectrum to grab rgba "color values" in indexes of 4
  // for (let index = 4, currentScanlineIndex = 0; index < spectrum.length; index += 4, currentScanlineIndex += windowWidth / numScanlines) {
  //   // const element = array[index];
  //   // console.log(spectrum[index]);
  //   newColor = color([index, index + 1, index + 2], index + 3);
  //   // let s = new ScanLine()
  // }

  for (
    let index = 0;
    index < windowHeight;
    index += windowWidth / numScanlines
  ) {
    // const element = array[index];
    strokeWeight(1);
    stroke(0, windowWidth / index, index);
    line(0, index, windowWidth, index / 3);
    line(0, index, windowWidth, index / 0.1);
    // line(0, index, windowWidth, index / 2);
    // line(0, index, windowWidth, index / .3);
  }
}

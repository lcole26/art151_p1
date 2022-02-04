/**
 * references cited:
 *  -https://forum.processing.org/two/discussion/19936/how-to-get-an-octave-based-frequency-spectrum-from-the-fft-in-minim
 *  -https://github.com/processing/p5.js-sound/blob/main/examples/FFT_logAverages/sketch.js
 */

let mic_test;
let mic_level;
let fft_test;
let spectrum_test;
let lin_avg_arr;
let log_avg_arr;
let bandsPerOctave = 4;
let numOctaveBands = 24;
let octaveBands;
let prevRandomColor;
let currentRandomColor;
let lerpedColor;
let current_draw_time = 0;
let next_draw_time = 0;

function InitScanlineArray(scanlines) {}

function setup() {
  colorMode(HSL);
  createCanvas(windowWidth, windowHeight);
  frameRate(framerate);
  mic_test = new p5.AudioIn();
  fft_test = new p5.FFT();
  mic_test.start();
  fft_test.setInput(mic_test);
  octaveBands = fft_test.getOctaveBands(num_scanlines);
  console.log(`octaveBands is ${octaveBands}`);

  InitScanlineArray(scanlines);
}

function draw() {
  background(bg_color);
  mic_level = mic_test.getLevel(0.4);
  console.log(mic_level);
  if (mic_level > 0.01) {
    spectrum_test = fft_test.analyze(1024, "dB");
    fft_test.smooth(0.8);
    // log_avg_arr = fft_test.logAverages(num_scanlines);
    lin_avg_arr = fft_test.linAverages(num_scanlines);
    // lin_avg_arr = fft_test.linAverages(num_scanlines * 4);
    console.log(`current lin_avg_arr is ${lin_avg_arr}`);

    // let baseLineColor = map(abs(random(lin_avg_arr)), 0, abs(random(lin_avg_arr)), 0, 255);
    // line(0, 0, windowWidth, 0);
    // line(0, 0, windowWidth, 0);

    for (
      let index = 0;
      // let index = windowWidth / num_scanlines;
      index < windowHeight;
      index += windowWidth / num_scanlines
    ) {
      currentRandomColor = color(
        map(
          abs(random(lin_avg_arr)),
          0,
          abs(random(lin_avg_arr)),
          0,
          max_alpha
        ),
        map(
          abs(random(lin_avg_arr)),
          0,
          abs(random(lin_avg_arr)),
          0,
          max_alpha
        ),
        map(
          abs(random(lin_avg_arr)),
          0,
          abs(random(lin_avg_arr)),
          0,
          max_alpha
        ),
        map(abs(random(lin_avg_arr)), 0, abs(random(lin_avg_arr)), 0, max_alpha)
      );
      if (prevRandomColor != null) {
        lerpedColor = lerpColor(prevRandomColor, currentRandomColor, 0.7);
        stroke(lerpedColor);
        fill(lerpedColor);
      } else {
        stroke(currentRandomColor);
        fill(currentRandomColor);
      }

      current_draw_time = millis() / 1000;
      current_draw_time = millis() / 1000;
      next_draw_time = current_draw_time + scanline_draw_interval;
      while (current_draw_time != next_draw_time) {
        line(0, index, windowWidth - random(lin_avg_arr), index / 3);
        line(0, index, windowWidth - random(lin_avg_arr), index / 0.1);
        rect(0, index, windowWidth, index / 3);
        current_draw_time++;
      }
      // line(0, index, mic_level % random(lin_avg_arr), index / 0.1);
      // line(0, windowHeight / 3, windowWidth, windowHeight / 3);
      // line(0, index, windowWidth, index / 0.1);
      // rect(0, index, windowWidth, index / 3);
      // rect(0, index, windowWidth, index / 0.1);

      // line(0, index, random(index + num_scanlines), index / 0.1);
      prevRandomColor = currentRandomColor;
    }
  }
}

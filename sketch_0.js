/**
 * ranges modelled after:
 * https://www.cuidevices.com/blog/understanding-audio-frequency-range-in-audio-design
 * https://soundsightheadphones.com/guides/classifying-the-audio-spectrum-frequencies/
 *  https://www.digikey.com/en/articles/a-look-at-audio-frequency-range-and-audio-components
 */

let sketch_0_mic;
let sketch_0_fft;
let sketch_0_spectrum;
let subbass;
let bass;
let low_midrange;
let mids;
let high_midrange;
let presence_range;
let brilliance_range;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(framerate);
  sketch_0_mic = new p5.AudioIn();
  sketch_0_fft = new p5.FFT();
  sketch_0_mic.start();
  sketch_0_fft.setInput(sketch_0_mic, 0.8);
  // initBaseBins();
  initScanlineArray();
  initFrequencyBinsArrayByScanlineIntervals();
}

function draw() {
  background(bg_color, bg_alpha);
  sketch_0_spectrum = sketch_0_fft.analyze();
  // sketch_0_spectrum = sketch_0_fft.analyze(1024, "dB");
  frequency_bins_array.forEach((freq_bin) => {
    freq_bin.updateBuffer(sketch_0_fft);
    freq_bin.printBinInfo();
  });
  let c = color(
    frequency_bins_array[0].bin_average,
    frequency_bins_array[1].bin_average,
    frequency_bins_array[2].bin_average,
    max_alpha
  );
  console.log(`bg_color: ${bg_color}`);
  stroke(c);
  fill(c);
  strokeWeight(2);
  line(0, windowHeight / 2, windowWidth, windowHeight / 2);
  // rect(12, windowHeight, windowWidth, windowHeight / 3);
  rect(12, 12, windowWidth / 3, windowHeight / 3);

  console.log(
    `average of averages of all bins: {${getFrequencyBinAverageOfAverages()}}`
  );
}

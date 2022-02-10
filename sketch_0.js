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
let scanline_array_0 = [];
let f_bin_2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(framerate / 2);
  sketch_0_mic = new p5.AudioIn();
  sketch_0_fft = new p5.FFT();
  sketch_0_mic.start();
  sketch_0_fft.setInput(sketch_0_mic, 0.8);
  // initBaseBins();
  // initScanlineArray();
  initScanlineArray2(scanline_array_0);
  // initBaseBins();
  // console.log(`validatescanline: ${validateScanlines()}`);
  initFrequencyBinsArrayByScanlineIntervals();
  background(bg_color, bg_alpha);
}

function draw() {
  // sketch_0_spectrum = sketch_0_fft.analyze();
  sketch_0_fft.analyze();
  // sketch_0_spectrum = sketch_0_fft.analyze(1024, "dB");
  frequency_bins_array.forEach((freq_bin) => {
    freq_bin.updateBuffer(sketch_0_fft);
    let f_bin_subdivided = freq_bin.divideBinBufferIntoScanlineColorArray();
    let c2 = color(f_bin_subdivided);
    stroke(c2);
    fill(c2);
    strokeWeight(1);
    // let c2 = color(
    //   freq_bin.bin_buffer.slice(
    //     freq_bin.bin_buffer.length - 3,
    //     freq_bin.bin_buffer.length
    //   )
    // );
    // let z = getFrequencyBinAverageOfAverages();
    // line(
    //   random(0, windowWidth - c2.r),
    //   random(0, windowHeight - c2.g),
    //   random(0, windowWidth - c2.b),
    //   random(0, windowHeight - c2.a)
    // );

    line(
      random(0, f_bin_subdivided[0]),
      random(0, f_bin_subdivided[1]),
      random(0, f_bin_subdivided[2]),
      random(0, f_bin_subdivided[3])
    );
    strokeWeight(9);
    beginShape(POINTS);
    vertex(
      random(0, windowWidth),
      random(0, windowWidth) - f_bin_subdivided[0]
    );
    random(0, getFrequencyBinAverageOfAverages()),
      random(0, windowHeight) - f_bin_subdivided[1];
    random(0, windowWidth), random(0, windowWidth) - f_bin_subdivided[2];
    random(0, windowHeight), random(0, windowHeight) - f_bin_subdivided[3];
    endShape(POINTS);

    // console.log(`q: ${q[0]}`);
    // freq_bin.printBinInfo();
  });
  let c3 = color(
    frequency_bins_array[0].bin_average,
    frequency_bins_array[1].bin_average,
    frequency_bins_array[2].bin_average,
    max_alpha
  );
  fill(c3);
  // background(bg_color, bg_alpha);
  // rect(0, random(windowWidth / 3), windowWidth / 3, 12);
  // line(
  //   random(0, windowWidth),
  //   random(0, windowHeight),
  //   random(0, windowWidth),
  //   random(0, windowHeight)
  // );
}

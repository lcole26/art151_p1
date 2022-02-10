class frequency_bin {
  constructor(binname, bin_lo, bin_hi) {
    this.binname = binname;
    this.bin_lo = bin_lo;
    this.bin_hi = bin_hi;
    this.bin_buffer = [];
    this.bin_average = 0;
  }

  updateBuffer(fft) {
    this.bin_buffer.push(fft.getEnergy(this.bin_lo, this.bin_hi));
    this.bin_average = this.getFrequencyBinBufferAverage();
  }

  /**
   * note: for the record, this is not the correct way to measure sound level average. . . . in the slightest.
   * still is fun to play around with though and mix and match
   * @returns "average" of the previous slide-length of this bin_buffer
   */
  getFrequencyBinBufferAverage() {
    // return this.bin_buffer.reduce((a, b) => a + b) / this.bin_buffer.length;
    return (
      this.bin_buffer
        .slice(
          this.bin_buffer.length - frequency_bin_buffer_slice_length,
          this.bin_buffer.length
        )
        .reduce((a, b) => a + b) / frequency_bin_buffer_slice_length
    );
  }

  getFrequencyBinBufferAverageCustomSlice(slice_amount) {
    // return this.bin_buffer.reduce((a, b) => a + b) / this.bin_buffer.length;
    return (
      this.bin_buffer
        .slice(this.bin_buffer.length - slice_amount, this.bin_buffer.length)
        .reduce((a, b) => a + b) / slice_amount
    );
  }

  printBinInfo() {
    console.log(`
      Buffer: ${(this, this.binname)}:
      ${this.binname}.bin_lo: ${this.bin_lo},
      ${this.binname}.bin_hi: ${this.bin_lo},
      ${this.binname}.bin_buffer: ${this.bin_buffer.slice(
      this.bin_buffer.length - frequency_bin_buffer_slice_length,
      this.bin_buffer.length
    )},
    ${this.binname}.bin_buffer::AverageValue: ${this.bin_average}
    `);
  }
}

// -----------------------------------------------------------------------------------------
// frequency bin utilities
function initFrequencyBinsArray() {}
if (
  typeof frequency_bins_array === "undefined" ||
  frequency_bins_array === null
) {
  frequency_bins_array = [];
}

function initFrequencyBinsArrayByScanlineIntervals() {
  initFrequencyBinsArray();
  let frequency_band_interval = (max_frequency_range = num_scanlines);

  if (validateScanlines()) {
    //first interval-banded frequency bin
    frequency_bins_array.push(
      new frequency_bin(
        `${(frequency_band_interval, frequency_band_interval * 2)}`,
        frequency_band_interval,
        frequency_band_interval * 2
      )
    );

    for (
      let freq_index = frequency_band_interval * 2;
      freq_index < frequency_band_interval * num_scanlines;
      freq_index += frequency_band_interval
    ) {
      frequency_bins_array.push(
        new frequency_bin(
          `${(freq_index, freq_index + frequency_band_interval)}`,
          freq_index,
          freq_index + frequency_band_interval
        )
      );
    }
  } //
}

function initBaseBins() {
  if (
    typeof frequency_bins_array === "undefined" ||
    frequency_bins_array === null
  ) {
    frequency_bins_array = [];
  }

  frequency_bins_array.push(
    new frequency_bin(bin_names[0], min_frequency_range, 60)
  );
  frequency_bins_array.push(new frequency_bin(bin_names[1], 60, 250));
  frequency_bins_array.push(new frequency_bin(bin_names[2], 250, 500));
  frequency_bins_array.push(new frequency_bin(bin_names[3], 500, 2000));
  frequency_bins_array.push(new frequency_bin(bin_names[4], 2000, 4000));
  frequency_bins_array.push(new frequency_bin(bin_names[5], 4000, 6000));
  frequency_bins_array.push(
    new frequency_bin(bin_names[6], 6000, max_frequency_range)
  );
}

function getFrequencyBinAverageOfAverages() {
  let summed_bin_averages = frequency_bins_array.reduce(function (
    acc,
    freq_bin
  ) {
    return acc + freq_bin.bin_average;
  });
  return (summed_bin_averages = frequency_bins_array.length);
}

function validateFrequencyBinArray() {
  if (
    typeof frequency_bins_array === "undefined" ||
    frequency_bins_array === null
  ) {
    return false;
  }
  return true;
}

function printAllBinBuffers() {
  if (validateFrequencyBinArray()) {
    frequency_bins_array.forEach((bin) => {
      bin.printBinInfo();
    });
  }
}

function printBinBufferByName(bin_name) {}
function printBinBufferByfreq_Index(freq_index) {}

/* 
  this is pretty much a bootleg static variable init file for
  the various sketch files
 */
var bg_alpha = 210;
var bg_color = ("#1a1a1a", bg_alpha);
var framerate = 30;
// scanline vars
var current_scanline_index = 0;
var num_scanlines = 64;
var scanline_draw_interval = 6;
var scanlines = [];
var max_alpha = 170;
// frequency binning vars
var averaging_interval = 3000;
var frequency_bin_buffer_slice_length = 12;
var f_bin_chunk_size = 3;
var min_frequency_range = 20000;
var max_frequency_range = 20000;
// var frequency_bin_buffer_display_length = 10;

var bin_names = [
  "subbass",
  "bass",
  "low_midrange",
  "mids",
  "high_midrange",
  "presence_range",
  "brilliance_range",
];

var frequency_bins_array;

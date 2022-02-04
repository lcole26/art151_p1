/* 
  this is pretty much a bootleg static variable init file for
  the various sketch files
 */
var bg_alpha = 210;
var bg_color = ("#1a1a1a", bg_alpha);
var current_scanline_index = 0;
var num_scanlines = 64;
var scanline_draw_interval = 6;
var scanlines = [];
var max_alpha = 170;
var framerate = 30;

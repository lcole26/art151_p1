class ScanLine {
  // constructor(start_x, start_y, end_x, end_y, stroke_color, stroke_weight) {
  ScanLine(start_x, start_y, end_x, end_y, stroke_weight, r, g, b, a) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.end_x = end_x;
    this.end_y = end_y;
    this.is_displayed = false;
    this.stroke_weight = stroke_weight;
    // this.stroke_color = color(r, g, b, a);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  // constructor for line with variable length
  ScanLine(start_x, start_y, end_x, end_y, stroke_weight, color, line_length) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.end_x = end_x;
    this.end_y = end_y;
    this.is_displayed = false;
    this.stroke_weight = stroke_weight;
    this.stroke_color = color;
  }

  // random line at random place
  ScanLine() {
    this.start_x = random(0, windowWidth);
    this.start_y = random(0, windowHeight);
    this.end_x = random(0, windowWidth);
    this.end_y = random(0, windowHeight);
    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.a = random(0, 255);
    // this.stroke_color = random(0, 255);
    this.stroke_weight = 1;
    this.is_displayed = false;
  }

  getLineLength() {
    return sqrt(sq(this.end_x - this.start_x) + sq(this.end_y - this.start_y));
  }

  display() {
    // stroke(this.r, this.g, this.b, this.a);
    stroke(this.r, this.g, this.b, this.a);

    // stroke(color(this.r, this.g, this.b, this.a));
    strokeWeight(this.stroke_weight);
    line(this.start_x, this.start_y, this.end_x, this.end_y);
    this.is_displayed = true;
  }

  undisplay() {
    this.is_displayed = false;
  }

  /* if we're doing simple one-color lines, we can cheat and just get the color 
     first pixel of the line. otherwise, we have to do...other stuff (le gasp!)
  */
  getLineColorByPixels() {
    loadPixels();
    let d = pixelDensity();
  }

  flicker(flicker_factor) {
    // this.stroke_color =
    // this.a =
  }

  getLineColor() {
    return color(this.r, this.g, this.b, this.a);
  }

  update() {}
}

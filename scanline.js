class ScanLine {
  constructor(start_x, start_y, end_x, end_y, stroke_weight, r, g, b, a) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.end_x = end_x;
    this.end_y = end_y;
    this.is_displayed = false;
    this.stroke_weight = stroke_weight;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    // this.stroke_color = color(r, g, b, a);
  }

  getLineLength() {
    return sqrt(sq(this.end_x - this.start_x) + sq(this.end_y - this.start_y));
  }

  getLineEndpoints() {
    return [this.start_x, this.start_y, this.end_x, this.end_y];
  }

  initScanlineArray(scanlines) {
    for (index = 0; index < num_scanlines; i++) {
      scanlines[i] = new ScanLine(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
  }

  // getPreviousScanline

  /**
   * wow, i had to look up this shit from way back in middle school, sheeeeeesh
   * m : slope
   */
  FindLineEquation() {
    let m = (this.end_y - this.start_y) / (this.end_x - this.start_x);
    let b = this.start_y - m * this.start_x;
  }

  display() {
    stroke(this.r, this.g, this.b, this.a);
    strokeWeight(this.stroke_weight);
    line(this.start_x, this.start_y, this.end_x, this.end_y);
    this.is_displayed = true;
  }

  FadeInLine() {}

  undisplay() {
    if (this.is_displayed) {
      // let tempColor = color([this.r, this.g, this.b], 0);
      stroke(bg_color);
      strokeWeight(this.stroke_weight);
      line(this.start_x, this.start_y, this.end_x, this.end_y);
      this.is_displayed = false;
    }
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
    return color([this.r, this.g, this.b], this.a);
  }

  update() {}
}

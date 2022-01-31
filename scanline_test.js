let scanlines_array = [];
// let l, l2;
// let l3 = new ScanLine(0, 100, 12, 4, 3, 120, 240, 12, 190);
// let l_test_0;
let l = new ScanLine(0, 100, 12, 4, 3, 120, 240, 12, 190);
let l2 = new ScanLine(0, 100, 64, 108, 1, 120, 167, 212, 255);
scanlines_array.push(l);
scanlines_array.push(l2);
let l_test_0 = scanlines_array[0];
let l_test_1 = scanlines_array[1];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let c = l_test_0.getLineColor();
  console.log(c);
  console.log(l.getLineLength());
}

function draw() {
  background(bg_color, 210);
  console.log(`lol, bg_color is ${bg_color}`);

  // test display/undisplay functionality
  l_test_0.display();
  l_test_1.display();
  console.log(`l_test_0 is currently: ${l_test_0.is_displayed}`);
  console.log(`l_test_1 is currently: ${l_test_1.is_displayed}`);

  l_test_0.undisplay();
  console.log(`l_test_0 is currently: ${l_test_0.is_displayed}`);

  l_test_1.undisplay();
  console.log(`l_test_1 is currently: ${l_test_1.is_displayed}`);
}

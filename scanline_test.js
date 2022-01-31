let scanlines_array = [];

function setup() {
  let l = new ScanLine(0, 100, 12, 4, 3, 120, 240, 12, 190);
  let l2 = new ScanLine(0, 100, 64, 108, 1, 120, 167, 212, 255);
  scanlines_array.push(l);
  scanlines_array.push(l2);

  let l_test = scanlines_array[0];
  console.log(l_test.r);

  // if(l_test)
}

// function draw() {}

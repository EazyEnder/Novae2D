function setup() {
    createCanvas(500, 500);
    pixelDensity(1);
  }
  
  let density = 0.02; // zoom
  let doubleAmplitude = 7000; // effects heights in land
  let amlitudeReductionRatio = 0.38; // effects water amount 
  let lieFactor = 2.5; // To drown land
  
  function draw() {
    var xoff = 0;
    let lie = doubleAmplitude / amlitudeReductionRatio / amlitudeReductionRatio  / 48 * lieFactor;
    loadPixels() ;
    for (var x = 0; x < width; x++) {
      var yoff = 0;
      for (var y = 0; y < height; y++) {
        var index = (x + (y * width)) * 4;
        var pxHeight = calculateHeight(xoff, yoff);
        pxHeight = normalize(pxHeight + lie, x, y);
        colorPixel(index, pxHeight - lie);
        yoff += density;
      }
      xoff += density;
    }
    updatePixels();
  }
  
  function calculateHeight(xoff, yoff) {
    return (noise(xoff, yoff) * doubleAmplitude) - (doubleAmplitude * amlitudeReductionRatio);
  }
  
  function normalize(baseHeight, x, y) {
    var distanceFromMiddle = Math.sqrt(Math.pow(x - (width / 2), 2) + Math.pow(y - (height / 2), 2));
    var newHeight = baseHeight;
    if (distanceFromMiddle + 1 >= width / 2) {
      newHeight = 0;
    } else {
      newHeight = normalizeByLog(newHeight, distanceFromMiddle); 
    }
    
    return newHeight;
  }
  
  function normalizeByLog(pxHeight , distanceFromMiddle) {
    return pxHeight * Math.log(width / 2 - distanceFromMiddle) / Math.log(width / 2); 
  }
  
  function normalizeByRoot(pxHeight, distanceFromMiddle) {
    return pxHeight * Math.sqrt(width / 2 - distanceFromMiddle) / Math.sqrt(width / 2); 
  }
  
  function normalizeByLinearRing(pxHeight, distanceFromMiddle) {
    let ringRadius = (width / 2) / 5;
    let decRatio = 1 / (ringRadius - width / 2);
    if (distanceFromMiddle  <= width/2 - ringRadius) {
      return pxHeight;
    }
    return (1 - (-width / 2 + ringRadius + distanceFromMiddle) / ringRadius) * pxHeight;
  }
  
  function normalizeByNoise(pxHeight, x, y) {
    return pxHeight * noise(x * density + width, y * density + height);
  }
  
  function colorPixel(index, pxHeight) {
    var r, g, b;
    if (pxHeight <= 0) {r = 38; g = 196; b = 201;}
    else if(pxHeight < 50) {r = 143; g = 237; b = 138;}
    else if(pxHeight < 100) {r = 83; g = 235; b = 75;}
    else if(pxHeight < 250) {r = 39; g = 140; b = 34;}
    else if(pxHeight < 500) {r = 11; g = 122; b = 5;}
    else if(pxHeight < 1000) {r = 179; g = 110; b = 57;}
    else if(pxHeight < 1500) {r = 158; g = 90; b = 38;}
    else if(pxHeight < 2000) {r = 120; g = 75; b = 7;}
    else {r = 222; g = 222; b = 222;}
    pixels[index+0] = r;
    pixels[index+1] = g;
    pixels[index+2] = b;
    pixels[index+3] = 255;
  }
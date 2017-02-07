'use strict';
var utils = require('./utils.js');

/*
  A very helpful tutorial on how the 2600 works
  http://atariage.com/forums/topic/33233-sorted-table-of-contents/
*/

function SpriteDrawer(sprite, options) {
  if (!sprite) {
    return; // return undefined
  }

  var defaults = {
    color : "#696969"
  };
  var _opts = Object.assign({}, defaults, options);

  // create our canvas that will hold our sprite image
  // and will be returned in the end
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext("2d");

  function repl(match, p1, offset, string) {
    return utils.hex2bin(p1);
  }
  sprite = sprite.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, repl);

  canvas.height = sprite.match(/%?[0-1]{8}[\s\n]*/g).length;
  canvas.width = 8;
  sprite = sprite.split("");

  var _n = 0;
  var rbgArr = utils.hex2rgb(_opts.color);
  var imgData = ctx.createImageData(8, sprite.length);

  for (var i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = parseInt(rbgArr[0], 10);
    imgData.data[i + 1] = parseInt(rbgArr[1], 10);
    imgData.data[i + 2] = parseInt(rbgArr[2], 10);
    if (sprite[_n] === "1") {
      imgData.data[i + 3] = 255;
    } else {
      imgData.data[i + 3] = 0;
    }
    _n++;
  }
  ctx.putImageData(imgData, 0, 0);
  
  if (_opts.flip) {
    // Move registration point to the center of the canvas
    // ctx.translate(canvas.width/2, canvas.height/2);
    // Rotate 180 degree
    ctx.rotate(180*(Math.PI/180));
    // Move registration point back to the top left corner of canvas
    // ctx.translate(canvas.width/2, canvas.height/2);
  }
  
  return canvas;
}

module.exports = SpriteDrawer;
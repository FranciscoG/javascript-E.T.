/*
	A very helpful tutorial on how the 2600 works
	http://atariage.com/forums/topic/33233-sorted-table-of-contents/
 */
function SpriteDrawer(options, sprite) {
  if (sprite === null) {
    return;
  }

  //TODO:  Test for HEX instead of setting it as an option
  //TODO:  Test if Sprite is an array or string instead of using _opts.native 

  var _opts = options || {};
  _opts.hex = _opts.hex || false; // set to True to convert Hex to Binary
  _opts.color = _opts.color || "#696969"; // hex color, default to gray
  _opts.native = _opts.native || false;

  var canvas = document.createElement('canvas');
  // Atari Player Sprites were 8 pixel wide.  no height limit
  var ctx = canvas.getContext("2d");

  function repl(match, p1, p2, p3, offset, string) {
    return hex2bin(p2);
  }

  if (_opts.hex && !_opts.native) {
    sprite.forEach(function(e, i, arr) {
      sprite[i] = hex2bin(arr[i]);
    });
  } else if (_opts.hex && _opts.native) {
    sprite = sprite.trim().replace(/(\$)?([a-z0-9]{2})(\s?;\s?[|X.\s]*\s?)?/gi, repl);
  }

  if (_opts.native) {
    canvas.height = sprite.match(/%?[0-1]{8}[\s\n]*/g).length;
    canvas.width = 8;
    sprite = sprite.replace(/[\s\n%]+/g, "").split("");
  } else {
    canvas.width = sprite[0].length;
    canvas.height = sprite.length;
    sprite = sprite.join("").replace("%", "").split("");
  }

  var _n = 0;
  var rbgArr = hex2rgb(_opts.color);
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

  return canvas;
}


/**
 * Usually Sprite Clocks are shown in Binary but in the Atari source code for E.T. it showed sprite clock/pixels in Hex
 * So this converts those hex numbers to Binary
 * @param  {string} hex the 2 character hex string
 * @return {string}     the binary number as a string
 */
var hex2bin = function(hex) {

  function pad(num, size) {
    var s = "000" + num;
    return s.substr(s.length - size);
  }

  var hexArr = hex.split("");
  var bin = "";
  hexArr.forEach(function(e, i, arr) {
    var dec = parseInt(arr[i], 16);
    bin += pad(dec.toString(2), 4);
  });
  return bin;
};

/**
 * Convert a Hex Color to RGB array
 * @param  {string} hex   a full hex color string includeing the hash.  example: "#99af34"
 * @return {object}       an array containing RGB info [R,G,B]
 */
var hex2rgb = function(hex) {
  var hx = hex.substr(1);
  var parts = hx.match(/[0-9A-Za-z]{2}/g);
  parts.forEach(function(e, i, arr) {
    parts[i] = parseInt(arr[i], 16);
  });
  return parts;
};
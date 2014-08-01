/*
	some helpful explanations of the 2600 graphics 

	http://atariage.com/forums/topic/169128-what-is-the-atari-2600-screen-resolution/
	http://wayofthepixel.net/index.php?topic=13697.0
	
 */
var spriteDrawer = function(options, sprite) {

  var _opts = options || {};
  _opts.ratio = _opts.ratio || "4:3";
  _opts.canvasWidth = _opts.canvasWidth || "320";
  _opts.canvasHeight = _opts.canvasHeight || "192";
  _opts.canvasId = _opts.canvasId || null;


};

var ETWalkSprite_A0 = [
  "XXXXXXX.",
  "XXXXXXXX",
  "XX....XX",
  "....XXXX",
  "XXXXXXXX",
  "..XXXXXX",
  "..X.X.XX",
  "XXX..XXX"
];
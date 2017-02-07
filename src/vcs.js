var sound = require('./sound.js');
var draw = require('./draw.js');

var vcs = {

  draw : draw
};

window.vcs = vcs;

// loading system that caches renders of sprites
// 
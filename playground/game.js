const DIR = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  OPPOSITE: [1, 0, 3, 2]
};


const { canvas, ctx } = vcs.display;
const { width, height } = canvas;

const scale = 2;
canvas.width = canvas.width * scale;
canvas.height = canvas.height * scale;
ctx.scale(scale * 2, scale * 2); // only scales what's placed on the canvas
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
canvas.id = "canvas";
document.getElementById("game").appendChild(canvas);

let nx = 44;
let ny = 33;
let dx = width / nx;
let dy = height / ny;
let playing = false;

const worldMap = {
  stage1: {
    name: "forest",
    bgcolor: "#04410b",
    up: 2,
    down: 4,
    left: 3,
    right: 7 //into top center well from the log/frogger stage
  },
  stage2: {
    name: "tall twins",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 5,
    right: 3
  },
  stage3: {
    name: "4 diamonds",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 2,
    right: 4
  },
  stage4: {
    name: "arrows",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 3,
    right: 5
  },
  stage5: {
    name: "frogger", // log screen
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 4,
    right: 2
  },
  stage6: {
    name: "D.C.",
    bgcolor: "#584fda",
    up: 2,
    down: 4,
    left: 7, // Leaving from the left side always lands E.T. in the bottom center well on the Log Screen.
    right: 3
  },
  stage7: {
    nname: "Well",
    bgcolor: "red",
    up: 5
  }
};

//x,y positions of the sides
const sides = {
  T: ny - 1, //actually just entering from the bottom means you exited the top
  R: 0,
  B: 0,
  L: nx - 1
};

var color = "#fce08c";

var ET_walkA = [
  vcs.draw(ETWalkSprite_A0, color),
  vcs.draw(ETWalkSprite_A1, color),
  vcs.draw(ETWalkSprite_A2, color)
];

// this loops through each walk image and puts it on the screen
let _i = 0;
let x = 20;
let y = 20;
function walkAnim() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(ET_walkA[_i], x, y);
  _i++;
  if (_i > 2) {
    _i = 0;
  }
}
const walkspeed = 3;
function move(inputState) {
  switch (inputState.vert) {
    case 2:
      y = y - walkspeed;
      break;
    case 1:
      y = y + walkspeed;
      break
  }

  switch (inputState.horz) {
    case 2:
      x = x - walkspeed;
      break;
    case 1:
      x = x + walkspeed;
      break
  }
}

// using requestAnimationFrame to make it walk
let framesToSkip = 5;
let counter = 0;

/* global vcs */
const start = vcs.loop(function(ts, inputState) {
  if (counter < framesToSkip) {
    counter++;
    return;
  }
  walkAnim();
  move(inputState)
  counter = 0;
});

start();
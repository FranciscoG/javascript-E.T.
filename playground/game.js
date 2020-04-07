///////////////////////////////////////////////////////////////////////////////
// Setup canvas

const { canvas, ctx, scale } = vcs.display();
const { width, height } = canvas;
const spriteScale = 2;
scale(spriteScale, spriteScale);
canvas.id = "canvas";
document.getElementById("game").appendChild(canvas);

///////////////////////////////////////////////////////////////////////////////
// constants

const color = "#fce08c"

const DIRS = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  OPPOSITE: [1, 0, 3, 2],
  STOPPED: 5
};

const walkspeed = 3;
const nx = 44;
const ny = 33;
const dx = width / nx;
const dy = height / ny;

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

// x,y positions of the sides
const sides = {
  T: ny - 1, //actually just entering from the bottom means you exited the top
  R: 0,
  B: 0,
  L: nx - 1
};

///////////////////////////////////////////////////////////////////////////////
// Variables

let framesToSkip = 5;
let counter = 0;
let currentX = DIRS.STOPPED;
let currentY = DIRS.STOPPED;

///////////////////////////////////////////////////////////////////////////////
// Title screen

var ET_Head = [
  TitleETGraphics_1,
  TitleETGraphics_2,
  TitleETGraphics_3,
  TitleETGraphics_4,
  TitleETGraphics_5,
  TitleETGraphics_0
];

const titleE = new vcs.Sprite();
titleE.load(ETTitle_E, true);

const titleT = new vcs.Sprite();
titleT.load(ETTitle_T, true);

const headET = new vcs.Sprite();
headET.loadGroup(ET_Head, true);

function showTitle() {
  titleE.draw(ctx2, 45, 0, color);
  titleT.draw(ctx2, 75, 0, color);
  headET.drawGroup(ctx2, 0, 30, color);
  headET.drawGroup(ctx, 0, 30, color);
}

/****************************************
 * ET Character animation
 */
var ET_walkA = [
  vcs.draw(ETWalkSprite_A0, color),
  vcs.draw(ETWalkSprite_A1, color),
  vcs.draw(ETWalkSprite_A2, color)
];
var ET_walkB = [
  vcs.draw(ETWalkSprite_B0, color),
  vcs.draw(ETWalkSprite_B1, color),
  vcs.draw(ETWalkSprite_B2, color)
];

// this loops through each walk image and puts it on the screen
let _i = 0;
let playerX = 20;
let playerY = 20;
function walkAnim() {
  if (currentX === DIRS.RIGHT) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(ET_walkA[_i], playerX * -1, playerY, -8, 8);
    ctx.restore();
  } else {
    ctx.drawImage(ET_walkA[_i], playerX, playerY);
  }

  _i++;
  if (_i > 2) {
    _i = 0;
  }
}

function stand() {
  if (currentX === DIRS.RIGHT) {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(ET_walkA[0], playerX * -1, playerY, -8, 8);
    ctx.restore();
  } else {
    ctx.drawImage(ET_walkA[0], playerX, playerY);
  }
}


function move(inputState) {
  let walking = false;

  switch (inputState.vert) {
    case 2:
      playerY = playerY - walkspeed;
      walking = true;
      currentY = DIRS.UP;
      break;
    case 1:
      playerY = playerY + walkspeed;
      walking = true;
      currentY = DIRS.DOWN;
      break;
  }

  switch (inputState.horz) {
    case 2:
      playerX = playerX - walkspeed;
      walking = true;
      currentX = DIRS.LEFT;
      break;
    case 1:
      playerX = playerX + walkspeed;
      walking = true;
      currentX = DIRS.RIGHT;
      break;
  }

  if (walking) {
    walkAnim();
  } else {
    stand();
  }
}

/* global vcs */
const start = vcs.loop(function(ts) {
  if (counter < framesToSkip) {
    counter++;
    return;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  move(vcs.input.read());
  counter = 0;
});

vcs.input.setup();
start();

const DIRS = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3,
  OPPOSITE: [1, 0, 3, 2],
  STOPPED: 5,
};
let currentX = DIRS.STOPPED;
let currentY = DIRS.STOPPED;

const { canvas, ctx, scale } = vcs.display();
const { width, height } = canvas;

const spriteScale = 2;
scale(spriteScale, spriteScale);
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

/***************************************
 * Title screen
 */

function showTitle() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move registration point to the center of the canvas
  // ctx.save();

  ctx2.translate(cv2.width / 4, cv2.height / 4);
  // Rotate 180 degree
  ctx2.rotate(180 * (Math.PI / 180));

  var x = 0;
  var y = 0;
  ctx2.drawImage(ET_title[0], x, y);
  ctx2.drawImage(ET_title[1], x + 8, y);
  ctx2.drawImage(ET_title[2], x + 8 * 2, y);
  ctx2.drawImage(ET_title[3], x + 8 * 3, y);
  ctx2.drawImage(ET_title[4], x + 8 * 4, y);
  ctx2.drawImage(ET_title[5], x + 8 * 5, y);

  var ET_E = vcs.draw(ETTitle_E, color);
  var ET_T = vcs.draw(ETTitle_T, color);
  ctx2.drawImage(ET_E, 0, 50);
  ctx2.drawImage(ET_T, 25, 50);

  ctx2.restore();
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
  // console.log(currentX);
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

const walkspeed = 3;
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
  // else do stand
}

// using requestAnimationFrame to make it walk
let framesToSkip = 5;
let counter = 0;

/* global vcs */
const start = vcs.loop(function(ts) {
  if (counter < framesToSkip) {
    counter++;
    return;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const inputState = vcs.input.read();
  move(inputState);
  counter = 0;
});

vcs.input.setup();
start();

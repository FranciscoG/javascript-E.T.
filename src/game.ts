import { GameEngine } from "./lib/GameEngine";
import { InputStates } from "./lib/InputHandler";
import { OneBitSprite, Sprite } from "./lib/Sprite";
import {
  ET_COLORS,
  ETExtensionSprite_A1,
  ETExtensionSprite_A2,
  ETExtensionSprite_A3,
  ETExtensionSprites_A,
  ETTitle_E,
  ETTitle_T,
  ETWalkSprite_A0,
  ETWalkSprite_A1,
  ETWalkSprite_A2,
  ETWalkSprite_B0,
  ETWalkSprite_B1,
  ETWalkSprite_B2,
  TitleETGraphics_0,
  TitleETGraphics_1,
  TitleETGraphics_2,
  TitleETGraphics_3,
  TitleETGraphics_4,
  TitleETGraphics_5,
} from "./assets/visual";
import { byteToBinaryString } from "./lib/utils";
///////////////////////////////////////////////////////////////////////////////
// Setup

const cpu = new GameEngine(document.getElementById("game")!);

///////////////////////////////////////////////////////////////////////////////
// constants

const color = "#fce08c";

const walkspeed = 3;
const nx = 44;
const ny = 33;

//ET had 8 screens:
const ID_FOUR_DIAMOND_PITS = 0;
const ID_EIGHT_PITS = 1;
const ID_ARROW_PITS = 2;
const ID_WIDE_DIAMOND_PITS = 3;

const ID_FOREST = 4;
const ID_WASHINGTON_DC = 5;

const ID_PIT = 6;
const ID_ET_HOME = 7;
const ID_TITLE_SCREEN = 8;

// 4 of the screens have pits

const worldMap = {
  1: {
    name: "forest",
    bgcolor: "#04410b",
    up: 2,
    down: 4, // 2 arrows and 2 small diamonds
    left: 3,
    right: 7, //into top center well from the log/frogger stage
  },
  2: {
    name: "tall twins",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 5,
    right: 3,
  },
  3: {
    name: "4 diamonds",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 2,
    right: 4,
  },
  4: {
    name: "arrows",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 3,
    right: 5,
  },
  5: {
    name: "8 diamonds",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 4,
    right: 2,
  },
  6: {
    name: "D.C.",
    bgcolor: "#584fda",
    up: 2,
    down: 4,
    left: 7, // Leaving from the left side always lands E.T. in the bottom center well on the Log Screen.
    right: 3,
  },
  7: {
    nname: "Pit",
    bgcolor: "red",
    up: 5,
  },
};

// x,y positions of the sides
const sides = {
  T: ny - 1, //actually just entering from the bottom means you exited the top
  R: 0,
  B: 0,
  L: nx - 1,
};

///////////////////////////////////////////////////////////////////////////////
// Variables

let framesToSkip = 5;
let counter = 0;

// setup static bg — score area at bottom uses LT_BLUE+10 ($9A) per ASM
cpu.backgroundSprite = [
  { color: 0x9A, start: 180, stop: 210 },
];

///////////////////////////////////////////////////////////////////////////////
// Title screen

const bigE = byteToBinaryString(ETTitle_E, true);
const bigT = byteToBinaryString(ETTitle_T, true);

const ET_Head = [
  TitleETGraphics_1,
  TitleETGraphics_2,
  TitleETGraphics_3,
  TitleETGraphics_4,
  TitleETGraphics_5,
  TitleETGraphics_0,
].map((asset) => {
  return byteToBinaryString(asset, true);
});

// Combine the 6 head slices into one wide sprite (the Atari used
// the SixDigitKernel to draw 6 × 8-pixel sprites side by side)
const ET_HeadCombined: string[][] = ET_Head[0].map((_, row) => {
  return ET_Head.reduce((acc: string[], slice) => acc.concat(slice[row]), []);
});

let showTitleScreen = true;

function setupTitleScreen() {
  // Title screen colors via TIA color registers
  cpu.colup0 = 0x24;  // COLUP0: player0 (E) + missile0 (dot)
  cpu.colup1 = 0x24;  // COLUP1: player1 (T) + missile1 (dot)
  cpu.colupf = 0xEA;  // COLUPF: playfield + ball (ET head)

  const etTitle1 = new Sprite();
  etTitle1.update(bigE);
  etTitle1.clockSize = 4;
  etTitle1.scanLinesPerRow = 2;
  etTitle1.x = 32;
  etTitle1.y = 16;
  cpu.addSprite("player1", etTitle1);

  const etTitle2 = new Sprite();
  etTitle2.update(bigT);
  etTitle2.clockSize = 4;
  etTitle2.scanLinesPerRow = 2;
  etTitle2.x = etTitle1.x + 16 * 5;
  etTitle2.y = 16;
  cpu.addSprite("player2", etTitle2);

  const dot = new OneBitSprite();
  dot.clockSize = 2;
  dot.x = etTitle1.x + 66;
  dot.y = etTitle1.y + 28;
  dot.scanLines = 4;
  cpu.addSprite("missile1", dot);

  const dot2 = new OneBitSprite();
  dot2.clockSize = 2;
  dot2.x = etTitle2.x + 66;
  dot2.y = etTitle2.y + 28;
  dot2.scanLines = 4;
  cpu.addSprite("missile2", dot2);

  const etHead = new Sprite();
  etHead.update(ET_HeadCombined);
  etHead.clockSize = 1;
  etHead.x = etTitle1.x + 16;
  etHead.y = etTitle1.y + 49;
  cpu.addSprite("ball", etHead);
}

/****************************************
 * ET Character animation
 */

const ET_walkA = [ETWalkSprite_A0, ETWalkSprite_A1, ETWalkSprite_A2].map((asset) => {
  return byteToBinaryString(asset);
});

const et = new Sprite();
et.update(ET_walkA[0]);

function setupMain() {
  cpu.addSprite("player1", et);
}

// this loops through each walk image and puts it on the screen
let etWalkFrame = 0;
let lastXDir = -1; // facing left initially

function walkAnim() {
  et.update(ET_walkA[etWalkFrame]);
  et.reflected = lastXDir > 0;

  etWalkFrame++;
  if (etWalkFrame > ET_walkA.length - 1) {
    etWalkFrame = 0;
  }
}

function stand() {
  et.update(ET_walkA[0]);
  et.reflected = lastXDir > 0;
}

setupTitleScreen();

// Game-layer movement helper — mirrors the joystick input to sprite position.
// Returns what direction the sprite moved (for animation logic).
function moveSprite(sprite: Sprite, input: InputStates, speed: number) {
  let moving = false;
  let xDir = 0;
  let yDir = 0;

  if (input.vert === 2) { sprite.y -= speed; moving = true; yDir = -1; }
  if (input.vert === 1) { sprite.y += speed; moving = true; yDir = 1; }
  if (input.horz === 2) { sprite.x -= speed; moving = true; xDir = -1; }
  if (input.horz === 1) { sprite.x += speed; moving = true; xDir = 1; }

  return { moving, xDir, yDir };
}

cpu.perFrame(function () {
  // why am I skipping frames? I don't remember
  if (counter < framesToSkip) {
    counter++;
    return;
  }

  const inputState = cpu.input.read();
  if (inputState.bttn) {
    showTitleScreen = false;
  }

  if (showTitleScreen) {
    return;
  } else {
    setupMain();
  }

  // move E.T. based on input
  const moveResult = moveSprite(et, cpu.input.read(), walkspeed);
  if (moveResult.xDir !== 0) lastXDir = moveResult.xDir;

  if (moveResult.moving) {
    walkAnim();
  } else {
    stand();
  }

  counter = 0;
});

cpu.start();
document.getElementById("startGame")?.addEventListener("click", function () {});

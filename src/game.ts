import { TIA } from "./lib/TIA";
import { DIRECTIONS, OneBitSprite, Sprite } from "./lib/Sprite";
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
import { NTSC_COLORS } from "./lib/colors";

///////////////////////////////////////////////////////////////////////////////
// Setup

const cpu = new TIA(document.getElementById("game")!);

///////////////////////////////////////////////////////////////////////////////
// constants

const color = "#fce08c";

const walkspeed = 3;
const nx = 44;
const ny = 33;

const worldMap = {
  stage1: {
    name: "forest",
    bgcolor: "#04410b",
    up: 2,
    down: 4,
    left: 3,
    right: 7, //into top center well from the log/frogger stage
  },
  stage2: {
    name: "tall twins",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 5,
    right: 3,
  },
  stage3: {
    name: "4 diamonds",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 2,
    right: 4,
  },
  stage4: {
    name: "arrows",
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 3,
    right: 5,
  },
  stage5: {
    name: "frogger", // log screen
    bgcolor: "#6f9440",
    up: 1,
    down: 6,
    left: 4,
    right: 2,
  },
  stage6: {
    name: "D.C.",
    bgcolor: "#584fda",
    up: 2,
    down: 4,
    left: 7, // Leaving from the left side always lands E.T. in the bottom center well on the Log Screen.
    right: 3,
  },
  stage7: {
    nname: "Well",
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


// setup static bg
cpu.backgroundSprite = [
  { color: NTSC_COLORS["54"], start: 2, stop: 12},
  { color: "#b4b4fc", start: 180, stop: 190},
]

const playfield = new Sprite();


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

let showTitleScreen = true;

function setupTitleScreen() {
  const etTitle1 = new Sprite();
  etTitle1.update(bigE);
  etTitle1.clockSize = 4;
  etTitle1.x = 32;
  etTitle1.y = 16;
  etTitle1.color = NTSC_COLORS["28"]
  cpu.addSprite("player1", etTitle1);

  const etTitle2 = new Sprite();
  etTitle2.update(bigT);
  etTitle2.clockSize = 4;
  etTitle2.x = etTitle1.x + 16 * 3;
  etTitle2.y = 16;
  etTitle2.color = NTSC_COLORS["28"]
  cpu.addSprite("player2", etTitle2);

  const dot = new OneBitSprite();
  dot.x = etTitle1.x + 30;
  dot.y = etTitle1.y + 14;
  dot.color = NTSC_COLORS["28"]
  cpu.addSprite("missile1", dot);
  
  const dot2 = new OneBitSprite();
  dot2.x = etTitle2.x + 30;
  dot2.y = etTitle2.y + 14;
  dot2.color = NTSC_COLORS["28"]
  cpu.addSprite("missile2", dot2);
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

function walkAnim() {
  et.update(ET_walkA[etWalkFrame]);
  if (cpu.player1?.xDir === DIRECTIONS.RIGHT) {
    et.byteArray.forEach((row) => {
      row.reverse();
    });
  }

  etWalkFrame++;
  if (etWalkFrame > ET_walkA.length - 1) {
    etWalkFrame = 0;
  }
}

function stand() {
  et.update(ET_walkA[0]);
  if (cpu.player1?.xDir === DIRECTIONS.RIGHT) {
    et.byteArray.forEach((row) => {
      row.reverse();
    });
  }
}

setupTitleScreen();

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

  // draw
  cpu.updateSprite("player1", cpu.input.read(), walkspeed);

  if (cpu.player1?.moving) {
    walkAnim();
  } else {
    stand();
  }

  counter = 0;
});

cpu.start();
document.getElementById("startGame")?.addEventListener("click", function () {
});

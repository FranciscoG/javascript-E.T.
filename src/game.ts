import { GameEngine } from "./lib/GameEngine";
import * as TitleScene from "./scenes/title.scene";
///////////////////////////////////////////////////////////////////////////////
// Setup

const cpu = new GameEngine(document.getElementById("game")!);


///////////////////////////////////////////////////////////////////////////////
// Variables

let framesToSkip = 5;
let counter = 0;

cpu.backgroundSprite = [
  // Top bar "status" area, using LT_BLUE+2 ($52) per ASM
  { color: 0x52, start: 0, stop: 15  },
  // Score area at bottom, using LT_BLUE+10 ($9A) per ASM
  { color: 0x9A, start: 180, stop: 210 },
];

///////////////////////////////////////////////////////////////////////////////
// Scene management

let currentScene: "title" | "gameplay" | "ending" = "title";


TitleScene.enter(cpu);

cpu.perFrame(function () {
  // why am I skipping frames? I don't remember
  if (counter < framesToSkip) {
    counter++;
    return;
  }

  if (currentScene === "title") {
    const done = TitleScene.update(cpu);
    if (done) {
      TitleScene.exit(cpu);
      currentScene = "gameplay";
      
    }
    counter = 0;
    return;
  }

  counter = 0;
});

cpu.start();
document.getElementById("startGame")?.addEventListener("click", function () {});

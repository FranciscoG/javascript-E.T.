import { GameEngine } from "./lib/GameEngine";
import { SceneManager } from "./lib/SceneManager";
import { TitleScene } from "./scenes/title.scene";
import { LandingScene } from "./scenes/landing.scene";
///////////////////////////////////////////////////////////////////////////////
// Setup

const cpu = new GameEngine(document.getElementById("game")!, 2);


///////////////////////////////////////////////////////////////////////////////
// Variables

let framesToSkip = 5;
let counter = 0;

cpu.backgroundSprite = [
  // Top bar "status" area, using LT_BLUE+2 ($52) per ASM
  { color: 0x52, start: 0, stop: 15 },
  // Score area at bottom, using LT_BLUE+10 ($9A) per ASM
  { color: 0x9A, start: 180, stop: 210 },
];

///////////////////////////////////////////////////////////////////////////////
// Scene management

const titleScene = new TitleScene();
const landingScene = new LandingScene();


const sceneManager = new SceneManager();
sceneManager.addScene(titleScene);
sceneManager.addScene(landingScene);

sceneManager.setCurrentScene(landingScene.name, cpu);

cpu.perFrame(function () {
  // why am I skipping frames? I don't remember
  if (counter < framesToSkip) {
    counter++;
    return;
  }

  sceneManager.update(cpu);

  counter = 0;
});

cpu.draw();
cpu.start();
// this is needed to play audio in browsers, which block it until user interaction
document.getElementById("startGame")?.addEventListener("click", () => {
  cpu.start();
});

import { GameEngine } from "./lib/GameEngine";
import { SceneManager } from "./lib/SceneManager";
import { TitleScene } from "./scenes/title.scene";
import { GameplayScene } from "./scenes/game-play.scene";
///////////////////////////////////////////////////////////////////////////////
// Setup

const cpu = new GameEngine(document.getElementById("game")!);


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
const gameplayScene = new GameplayScene();


titleScene.enter(cpu);

const sceneManager = new SceneManager();
sceneManager.addScene(titleScene);
sceneManager.addScene(gameplayScene);

sceneManager.setCurrentScene(titleScene.name);

cpu.perFrame(function () {
  // why am I skipping frames? I don't remember
  if (counter < framesToSkip) {
    counter++;
    return;
  }

  sceneManager.update(cpu);

  counter = 0;
});


document.getElementById("startGame")?.addEventListener("click", () => {
  cpu.start();
  cpu.audio.resume();
});

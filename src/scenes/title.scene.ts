import { GameEngine } from "../lib/GameEngine";
import { OneBitSprite, Sprite } from "../lib/Sprite";
import {
  ETTitle_E,
  ETTitle_T,
  TitleETGraphics_0,
  TitleETGraphics_1,
  TitleETGraphics_2,
  TitleETGraphics_3,
  TitleETGraphics_4,
  TitleETGraphics_5,
} from "../assets/visual";
import { byteToBinaryString } from "../lib/utils";

const bigE = byteToBinaryString(ETTitle_E, true);
const bigT = byteToBinaryString(ETTitle_T, true);

const ET_Head = [
  TitleETGraphics_1,
  TitleETGraphics_2,
  TitleETGraphics_3,
  TitleETGraphics_4,
  TitleETGraphics_5,
  TitleETGraphics_0,
].map((asset) => byteToBinaryString(asset, true));

// Combine the 6 head slices into one wide sprite (the Atari used
// the SixDigitKernel to draw 6 × 8-pixel sprites side by side)
const ET_HeadCombined: string[][] = ET_Head[0].map((_, row) => {
  return ET_Head.reduce((acc: string[], slice) => acc.concat(slice[row]), []);
});

const titleBlue = 0x80;
const gameplayInsetX = 40;
const titleTextY = 41;
const titleHeadY = 92;

function gameplayXToCanvas(gameX: number): number {
  return gameplayInsetX + gameX * 2;
}

let active = false;

export function enter(cpu: GameEngine) {
  active = true;

  // The title screen playfield background comes from BackgroundColors[ID_TITLE_SCREEN] = BLUE.
  cpu.colubk = titleBlue;

  // Title screen colors via TIA color registers
  cpu.colup0 = 0x24; // COLUP0: player0 (E) + missile0 (dot)
  cpu.colup1 = 0x24; // COLUP1: player1 (T) + missile1 (dot)
  cpu.colupf = 0xea; // COLUPF: playfield + ball (ET head)

	// The sprite for the big "E"
  const etTitle1 = new Sprite();
  etTitle1.update(bigE);
  etTitle1.clockSize = 4;
  etTitle1.scanLinesPerRow = 2;
  etTitle1.x = gameplayXToCanvas(24);
  etTitle1.y = titleTextY;
  cpu.addSprite("player1", etTitle1);

	// The sprite for the big "T"
  const etTitle2 = new Sprite();
  etTitle2.update(bigT);
  etTitle2.clockSize = 4;
  etTitle2.scanLinesPerRow = 2;
  etTitle2.x = gameplayXToCanvas(65);
  etTitle2.y = titleTextY;
  cpu.addSprite("player2", etTitle2);

	// the sprite for the first dot next to the "E". 
  const dot = new OneBitSprite();
  dot.clockSize = 2;
  dot.x = gameplayXToCanvas(58);
  dot.y = etTitle1.y + 28;
  dot.scanLines = 4;
  cpu.addSprite("missile1", dot);

	// the sprite for the second dot next to the "T". 
  const dot2 = new OneBitSprite();
  dot2.clockSize = 2;
  dot2.x = gameplayXToCanvas(95);
  dot2.y = etTitle2.y + 28;
  dot2.scanLines = 4;
  cpu.addSprite("missile2", dot2);

	// the sprite for E.T.'s head
  const etHead = new Sprite();
  etHead.update(ET_HeadCombined);
  etHead.clockSize = 1;
  etHead.x = 100;       // SixDigitKernel starts at visible pixel 50.
  etHead.y = titleHeadY;
  cpu.addSprite("ball", etHead);
}

/** Returns true when the title screen is done (button pressed). */
export function update(cpu: GameEngine): boolean {
  if (!active) return true;

  const input = cpu.input.read();
  if (input.bttn) {
    active = false;
    return true; // done — transition to next scene
  }
  return false;
}

export function exit(cpu: GameEngine) {
  active = false;
  cpu.colubk = 0x00;
  cpu.removeSprite("player1");
  cpu.removeSprite("player2");
  cpu.removeSprite("missile1");
  cpu.removeSprite("missile2");
  cpu.removeSprite("ball");
}

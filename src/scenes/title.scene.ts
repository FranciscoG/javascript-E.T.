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
import { ET_Theme_music } from "../assets/sounds";
import { byteToBinaryString } from "../lib/utils";
import { Scene } from "../lib/SceneManager";

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

export class TitleScene implements Scene {
	name = "title";

	etTitle1: Sprite;
	etTitle2: Sprite;
	dot: OneBitSprite;
	dot2: OneBitSprite;
	etHead: Sprite;

	constructor() {
		this.etTitle1 = new Sprite({
			clockSize: 4,
			scanLines: 2,
			x: gameplayXToCanvas(24),
			y: titleTextY,
			byteArray: bigE,
		});
		this.etTitle2 = new Sprite({
			clockSize: 4,
			scanLines: 2,
			x: gameplayXToCanvas(65),
			y: titleTextY,
			byteArray: bigT,
		});
		this.dot = new OneBitSprite({
			clockSize: 2,
			x: gameplayXToCanvas(58),
			y: this.etTitle1.y + 28,
			scanLines: 4,
		});
		this.dot2 = new OneBitSprite({
			clockSize: 2,
			x: gameplayXToCanvas(95),
			y: this.etTitle2.y + 28,
			scanLines: 4,
		});
		this.etHead = new Sprite({
			clockSize: 1,
			byteArray: ET_HeadCombined,
			x: 100,
			y: titleHeadY,
		});
	}

	enter(cpu: GameEngine) {
		// The title screen playfield background comes from BackgroundColors[ID_TITLE_SCREEN] = BLUE.
		cpu.colubk = titleBlue;

		// Title screen colors via TIA color registers
		cpu.colup0 = 0x24; // COLUP0: player0 (E) + missile0 (dot)
		cpu.colup1 = 0x24; // COLUP1: player1 (T) + missile1 (dot)
		cpu.colupf = 0xea; // COLUPF: playfield + ball (ET head)

		// The sprite for the big "E"
		cpu.addSprite("player1", this.etTitle1);

		// The sprite for the big "T"
		cpu.addSprite("player2", this.etTitle2);

		// the sprite for the first dot next to the "E". 
		cpu.addSprite("missile1", this.dot);

		// the sprite for the second dot next to the "T". 
		cpu.addSprite("missile2", this.dot2);

		// the sprite for E.T.'s head
		cpu.addSprite("ball", this.etHead);

		cpu.audio.playSequence(1, ET_Theme_music, {
			audc: 12,
			audv: 7,
			framesPerTick: 12,
			loop: true,
		});
	}

	/** Returns true when the title screen is done (button pressed). */
	update(cpu: GameEngine): string | false {
		const input = cpu.input.read();
		if (input.bttn) {
			return "gameplay";
		}
		return false;
	}

	exit(cpu: GameEngine) {
		cpu.colubk = 0x00;
		cpu.audio.stopSequence(1);
		cpu.removeSprite("player1");
		cpu.removeSprite("player2");
		cpu.removeSprite("missile1");
		cpu.removeSprite("missile2");
		cpu.removeSprite("ball");
	}

}
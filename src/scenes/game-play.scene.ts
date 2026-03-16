import {
	ETWalkSprite_A0,
	ETWalkSprite_A1,
	ETWalkSprite_A2,
	ETWalkSprite_B0,
	ETWalkSprite_B1,
	ETWalkSprite_B2
} from "../assets/visual";
import { GameEngine } from "../lib/GameEngine";
import { InputStates } from "../lib/InputHandler";
import { Scene } from "../lib/SceneManager";
import { Sprite } from "../lib/Sprite";

import { byteToBinaryString } from "../lib/utils";

/****************************************
 * ET Character animation
 */

const ET_walkA = [ETWalkSprite_A0, ETWalkSprite_A1, ETWalkSprite_A2].map((asset) => {
	return byteToBinaryString(asset);
});

const ET_walkB = [ETWalkSprite_B0, ETWalkSprite_B1, ETWalkSprite_B2].map((asset) => {
	return byteToBinaryString(asset);
});

// Game-layer movement helper — mirrors the joystick input to sprite position.
// Returns what direction the sprite moved (for animation logic).
function moveSprite(input: InputStates, speed: number) {
	let xDir = 0;
	let yDir = 0;

	if (input.vert === 2) { yDir = -1; }
	if (input.vert === 1) { yDir = 1; }
	if (input.horz === 2) { xDir = -1; }
	if (input.horz === 1) { xDir = 1; }

	return {
		moving: xDir !== 0 || yDir !== 0,
		dx: xDir * speed,
		dy: yDir * speed,
		xDir,
		yDir,
	};
}

export class GameplayScene implements Scene {
	name = "gameplay";

	walkspeed = 3;
	walkAnimDelay = 1;

	etA: Sprite;
	etB: Sprite;


	private etWalkFrame = 0;
	private walkTick = 0;
	private lastXDir = -1;

	constructor() {
		this.etA = new Sprite({
			byteArray: ET_walkA[0],
			x: 22,
			y: 150,
			scanLines: 2,
		});
		this.etB = new Sprite({
			byteArray: ET_walkB[0],
			x: 22,
			y: 150,
			scanLines: 2,
		});
	}

	private syncETSprites() {
		this.etA.reflected = this.lastXDir > 0;
		this.etB.reflected = this.lastXDir > 0;
	}

	private walkAnim() {
		this.etA.update(ET_walkA[this.etWalkFrame]);
		this.etB.update(ET_walkB[this.etWalkFrame]);
		this.syncETSprites();
		this.etWalkFrame = (this.etWalkFrame + 1) % ET_walkA.length;
	}

	private stand() {
		this.etA.update(ET_walkA[0]);
		this.etB.update(ET_walkB[0]);
		this.syncETSprites();
		this.etWalkFrame = 1;
		this.walkTick = 0;
	}

	enter(cpu: GameEngine) {
		cpu.colup0 = 0xDA;
		cpu.colup1 = 0xDA;
		this.stand();
		cpu.addSprite("player1", this.etA);
		cpu.addSprite("player2", this.etB);
	}

	private placeETnext(x: number, y: number, cpu: GameEngine) {
		this.etA.x += x;
		this.etA.y += y;
		this.etB.x += x;
		this.etB.y += y;

		// TODO: for now this prevents ET from going off screen. But eventually 
		// this will handle ET moving to a new section.
		this.etA.x = Math.max(0, Math.min(cpu.display.w - this.etA.width, this.etA.x));
		this.etA.y = Math.max(0, Math.min(cpu.display.h - this.etA.height, this.etA.y));
		this.etB.x = Math.max(0, Math.min(cpu.display.w - this.etB.width, this.etB.x));
		this.etB.y = Math.max(0, Math.min(cpu.display.h - this.etB.height, this.etB.y));
	}

	update(cpu: GameEngine): string | false {
		const input = cpu.input.read();
		const { moving, dx, dy, xDir } = moveSprite(input, this.walkspeed);

		if (xDir !== 0) {
			this.lastXDir = xDir;
		}

		this.syncETSprites();
		this.placeETnext(dx, dy, cpu);

		if (moving) {
			this.walkTick += 1;
			if (this.walkTick >= this.walkAnimDelay) {
				this.walkAnim();
				this.walkTick = 0;
			}
		} else {
			this.stand();
		}

		return false;
	}

	exit(cpu: GameEngine) {
		cpu.removeSprite("player1");
		cpu.removeSprite("player2");
	}
}
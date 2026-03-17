import { GameEngine } from "./lib/GameEngine";
import { InputStates } from "./lib/InputHandler";
import { Sprite } from "./lib/Sprite";
import { StateMachine } from "./lib/StateMachine.ts";
import type { StateDefinition } from "./lib/StateMachine.ts";
import { ET_Walk, ET_Extension } from "./et.sprite";

type ETStateName = "idle" | "walk" | "run" | "extend";

type ETStatePayload = { cpu: GameEngine; intent: ETIntent };

interface ETIntent {
	moving: boolean;
	buttonPressed: boolean;
	buttonJustPressed: boolean;
	running: boolean;
	dx: number;
	dy: number;
	xDir: number;
	yDir: number;
};

type ETState = StateDefinition<ET, ETStatePayload, ETStateName>;


export class ET {
	private static readonly SOUND_CHANNEL: 0 | 1 = 1;
	private static readonly RUN_AUDC = 0x05;
	private static readonly RUN_AUDV = 0x07;
	private static readonly EXTEND_AUDC = 0x0E;
	private static readonly EXTEND_AUDF = 0x0E;

	etSprite: Sprite;
	walkspeed = 3;
	walkAnimDelay = 1;
	runAnimDelay = 0;
	extensionAnimDelay = 0;

	etWalkFrame = 0;
	etExtensionFrame = 0;
	animTick = 0;
	lastXDir = -1;
	extensionFeetY = 0;
	buttonWasPressed = false;
	soundTick = 0;
	private audio: GameEngine["audio"] | null = null;

	readonly stateMachine: StateMachine<ET, ETStatePayload, ETStateName>;

	constructor(x: number, y: number) {
		this.etSprite = new Sprite({
			byteArray: ET_Walk[0],
			x,
			y,
			scanLines: 1,
		});
		this.stateMachine = new StateMachine<ET, ETStatePayload, ETStateName>(this, this.states);
	}

	readMovement(input: InputStates, speed: number) {
		let xDir = 0;
		let yDir = 0;

		if (input.vert === 2) yDir = -1;
		if (input.vert === 1) yDir = 1;
		if (input.horz === 2) xDir = -1;
		if (input.horz === 1) xDir = 1;

		return {
			moving: xDir !== 0 || yDir !== 0,
			dx: xDir * speed,
			dy: yDir * speed,
			xDir,
			yDir,
		};
	}

	readonly states: Record<ETStateName, ETState> = {
		idle: {
			enter: (et: ET) => {
				et.animTick = 0;
				et.etWalkFrame = 1;
				et.face(-1); // always face left in idle
				et.showWalkFrame(0);
				et.stopStateSound();
			},
			update: (_et: ET, { intent }: ETStatePayload) => {
				if (!intent.moving && intent.buttonJustPressed) return "extend";
				if (intent.moving && intent.running) return "run";
				if (intent.moving) return "walk";
			},
		},

		walk: {
			enter: (et: ET) => {
				et.animTick = 0;
				et.soundTick = 0;
			},
			update: (et: ET, { cpu, intent }: ETStatePayload) => {
				if (!intent.moving) return "idle";
				if (intent.running) return "run";

				et.face(intent.xDir);
				et.moveBy(intent.dx, intent.dy, cpu);
				et.stepWalk(et.walkAnimDelay);
				et.playWalkSound(cpu);
			},
			exit: (et: ET) => {
				et.stopStateSound();
			},
		},

		run: {
			enter: (et: ET) => {
				et.animTick = 0;
				et.soundTick = 0;
			},
			update: (et: ET, { cpu, intent }: ETStatePayload) => {
				if (!intent.moving) return "idle";
				if (!intent.running) return "walk";

				et.face(intent.xDir);
				et.moveBy(intent.dx * 4, intent.dy * 4, cpu);
				et.stepWalk(et.runAnimDelay);
				et.playRunSound(cpu);
			},
			exit: (et: ET) => {
				et.stopStateSound();
			},
		},

		extend: {
			enter: (et: ET) => {
				et.animTick = 0;
				et.etExtensionFrame = 0;
				et.extensionFeetY = et.etSprite.y + et.etSprite.height;
				et.showExtensionFrame(0);
				et.soundTick = 0;
			},
			update: (et: ET, { cpu }: ETStatePayload) => {
				et.playExtendSound(cpu);
				et.animTick += 1;
				if (et.animTick < et.extensionAnimDelay) return;

				et.animTick = 0;
				et.etExtensionFrame += 1;

				if (et.etExtensionFrame >= ET_Extension.length) {
					return "idle";
				}

				et.showExtensionFrame(et.etExtensionFrame);
			},
			exit: (et: ET) => {
				et.stopStateSound();
			},
		},
	};



	readIntent(input: InputStates): ETIntent {
		const base = this.readMovement(input, this.walkspeed);
		const buttonJustPressed = input.bttn && !this.buttonWasPressed;
		this.buttonWasPressed = input.bttn;

		return {
			...base,
			buttonPressed: input.bttn,
			buttonJustPressed,
			running: base.moving && input.bttn,
		};
	}

	attachAudio(cpu: GameEngine) {
		this.audio = cpu.audio;
	}

	stopAudio() {
		this.stopStateSound();
	}

	face(xDir: number) {
		if (xDir !== 0) {
			this.lastXDir = xDir;
		}
		this.etSprite.reflected = this.lastXDir > 0;
	}

	moveBy(dx: number, dy: number, cpu: GameEngine) {
		this.etSprite.x += dx;
		this.etSprite.y += dy;

		this.etSprite.x = Math.max(0, Math.min(cpu.display.w - this.etSprite.width, this.etSprite.x));
		this.etSprite.y = Math.max(0, Math.min(cpu.display.h - this.etSprite.height, this.etSprite.y));
	}

	stepWalk(delay: number) {
		this.animTick += 1;
		if (this.animTick < delay) return;

		this.animTick = 0;
		this.showWalkFrame(this.etWalkFrame);
		this.etWalkFrame = (this.etWalkFrame + 1) % ET_Walk.length;
	}

	showWalkFrame(index: number) {
		const feetY = this.etSprite.y + this.etSprite.height;
		this.etSprite.update(ET_Walk[index]);
		this.etSprite.y = feetY - this.etSprite.height;
		this.etSprite.reflected = this.lastXDir > 0;
	}

	showExtensionFrame(index: number) {
		this.etSprite.update(ET_Extension[index]);
		this.etSprite.y = this.extensionFeetY - this.etSprite.height;
		this.etSprite.reflected = this.lastXDir > 0;
	}

	private stopStateSound() {
		this.soundTick = 0;
		this.audio?.setChannel(ET.SOUND_CHANNEL, { audv: 0 });
	}

	private playWalkSound(cpu: GameEngine) {
		this.audio = cpu.audio;
		const phase = this.soundTick & 0x07;
		if (phase !== 0) {
			cpu.audio.setChannel(ET.SOUND_CHANNEL, { audv: 0 });
			this.soundTick += 1;
			return;
		}

		const chirp = (this.soundTick >> 3) & 0x03;
		if (chirp === 0) {
			cpu.audio.setChannel(ET.SOUND_CHANNEL, { audv: 0 });
			this.soundTick += 1;
			return;
		}

		const value = 0x16 + chirp;
		cpu.audio.setChannel(ET.SOUND_CHANNEL, {
			audc: value,
			audf: value,
			audv: 0x07,
		});
		this.soundTick += 1;
	}

	private playRunSound(cpu: GameEngine) {
		this.audio = cpu.audio;
		cpu.audio.setChannel(ET.SOUND_CHANNEL, {
			audc: ET.RUN_AUDC,
			audf: this.soundTick & 0x07,
			audv: ET.RUN_AUDV,
		});
		this.soundTick += 1;
	}

	private playExtendSound(cpu: GameEngine) {
		this.audio = cpu.audio;
		const volumeByFrame = [0x04, 0x08, 0x0C, 0x08, 0x04];
		cpu.audio.setChannel(ET.SOUND_CHANNEL, {
			audc: ET.EXTEND_AUDC,
			audf: ET.EXTEND_AUDF,
			audv: volumeByFrame[this.etExtensionFrame] ?? 0x04,
		});
	}
}
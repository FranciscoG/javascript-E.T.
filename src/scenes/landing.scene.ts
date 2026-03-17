import { GameEngine } from "../lib/GameEngine";
import { Scene } from "../lib/SceneManager";
import { ET } from '../et.state';


export class LandingScene implements Scene {
	name = "landing";

	et: ET;
	constructor() {
		this.et = new ET(150, 50);
	}

	enter(cpu: GameEngine) {
		cpu.colup0 = 0xda;
		cpu.colup1 = 0xda;
		this.et.attachAudio(cpu);
		this.et.stateMachine.transition("idle");
		cpu.addSprite("player1", this.et.etSprite);
	}

	update(cpu: GameEngine): string | false {
		const intent = this.et.readIntent(cpu.input.read());
		this.et.stateMachine.update({ cpu, intent });

		return false;
	}

	exit(cpu: GameEngine) {
		this.et.stopAudio();
		cpu.removeSprite("player1");
	}
}
import type { GameEngine } from "./GameEngine";

export interface Scene {
	name: string;

	/**
	 * loads resources and sets up the scene. Called once when the scene is entered.
	 */
	enter: (cpu: GameEngine) => void;

	/**
	 * updates the scene. Called every frame while the scene is active. Should return
	 * the name of the next scene when the scene is ready to transition, or false if
	 * the scene should continue.
	 */
	update: (cpu: GameEngine) => string | false;

	/**
	 * cleans up resources and event listeners. Called once when the scene is exited.
	 */
	exit: (cpu: GameEngine) => void;
}

export class SceneManager {
	private scenes: Record<string, Scene> = {};
	private currentSceneName: string | null = null;

	addScene(scene: Scene) {
		this.scenes[scene.name] = scene;
	}

	setCurrentScene(name: string, cpu: GameEngine) {
		if (this.scenes[name]) {
			this.currentSceneName = name;
			this.scenes[name].enter(cpu);
		} else {
			throw new Error(`Scene "${name}" does not exist.`);
		}
	}

	update(cpu: GameEngine) {
		if (this.currentSceneName) {
			const currentScene = this.scenes[this.currentSceneName];
			const nextSceneName = currentScene.update(cpu);
			if (typeof nextSceneName === "string" && nextSceneName !== this.currentSceneName && this.scenes[nextSceneName]) {
				currentScene.exit(cpu);
				this.setCurrentScene(nextSceneName, cpu);
			}
		}
	}

}
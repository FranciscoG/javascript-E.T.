class Scene {
	
  constructor(name: string) {}

	/**
	 * This will be called once ever. Put any pre-loading logic here.
	 * For example, loading images or sounds that will be used in the scene.
	 * This is also a good place to set up any global variables that will be used
	 * throughout the scene.
	 */
	setup() {}

	/**
	 * This will be called every time the scene is started.
	 */
	onSceneStart() {}

	/**
	 * This will be called every time the scene is ended.
	 */
	onSceneEnd() {}

	/**
	 * This will be called every frame
	 * @param time - The current time in milliseconds
	 * @param delta - The time since the last frame in milliseconds
	 */
	update(time: number, delta: number) {
		// Update logic for the scene goes here
	}
}

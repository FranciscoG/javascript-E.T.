export interface StateDefinition<TContext, TInput, TStateName extends string> {
	enter?: (context: TContext) => void;
	update: (context: TContext, input: TInput) => TStateName | void;
	exit?: (context: TContext) => void;
}

export class StateMachine<TContext, TInput, TStateName extends string> {
	private currentStateName: TStateName | null = null;

	constructor(
		private readonly context: TContext,
		private readonly states: Record<TStateName, StateDefinition<TContext, TInput, TStateName>>,
	) { }

	get currentState(): TStateName | null {
		return this.currentStateName;
	}

	transition(next: TStateName) {
		if (this.currentStateName === next) return;

		if (this.currentStateName) {
			this.states[this.currentStateName].exit?.(this.context);
		}

		this.currentStateName = next;
		this.states[this.currentStateName].enter?.(this.context);
	}

	update(input: TInput) {
		if (!this.currentStateName) {
			throw new Error("StateMachine.update() called before an initial state was set.");
		}

		const next = this.states[this.currentStateName].update(this.context, input);
		if (next) {
			this.transition(next);
		}
	}
}

/**
 * Vertical movement
 * - Up                  - 0b10  aka 2
 * - Down                - 0b01  aka 1
 * - Off                 - 0b00  aka 0
 * 
 * Horizontal movement
 * - Left                - 0b10  aka 2
 * - Right               - 0b01  aka 1
 * - Off                 - 0b00  aka 0
 * 
 * Button pressed      - true/false 
 */

type AxisState = 0b00 | 0b10 | 0b01;

export interface InputStates {
  vert: AxisState,
  horz: AxisState,
  bttn: boolean
}

enum DIRECTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

interface KeyMap {
  [key: string]: DIRECTIONS
}


const KEY_MAP: KeyMap = {
  // event.code and event.key
  "ArrowUp": DIRECTIONS.UP,
  "ArrowDown": DIRECTIONS.DOWN,
  "ArrowLeft": DIRECTIONS.LEFT,
  "ArrowRight": DIRECTIONS.RIGHT,

  // IE Edge event.key
  "Up": DIRECTIONS.UP,
  "Down": DIRECTIONS.DOWN,
  "Left": DIRECTIONS.LEFT,
  "Right": DIRECTIONS.RIGHT,

  // WASD event.key
  "w": DIRECTIONS.UP,
  "s": DIRECTIONS.DOWN,
  "a": DIRECTIONS.LEFT,
  "d": DIRECTIONS.RIGHT,

  // WASD event.code
  "KeyW": DIRECTIONS.UP,
  "KeyS": DIRECTIONS.DOWN,
  "KeyA": DIRECTIONS.LEFT,
  "KeyD": DIRECTIONS.RIGHT
};


export class InputHandler {

  inputState: InputStates = {
    vert: 0b00,
    horz: 0b00,
    bttn: false
  }

  constructor(element: HTMLElement = document.body) {
    element.addEventListener("keydown", (e: Event) => {
      if (this.handleKeyDown((e as KeyboardEvent).code)) {
        e.preventDefault();
      }
    }, false);

    element.addEventListener("keyup", (e: Event) => {
      if (this.handleKeyUp((e as KeyboardEvent).code)) {
        e.preventDefault();
      }
    }, false);
  }

  read(): InputStates { return this.inputState; }

  handleKeyDown(key: string): boolean {
    if (key === "Space") {
      // space bar is our trigger button
      this.inputState.bttn = true;
      return true;
    }

    let handled: boolean = false;

    switch (KEY_MAP[key]) {
      case DIRECTIONS.UP:
        handled = true;
        this.inputState.vert = 0b10;
        break;
      case DIRECTIONS.DOWN:
        handled = true;
        this.inputState.vert = 0b01;
        break;
      case DIRECTIONS.LEFT:
        handled = true;
        this.inputState.horz = 0b10;
        break;
      case DIRECTIONS.RIGHT:
        handled = true;
        this.inputState.horz = 0b01;
        break;
    }

    return handled;
  }

  handleKeyUp(key: string): boolean {
    if (key === "Space") {
      // space bar is our trigger button
      this.inputState.bttn = false;
      return true;
    }

    let handled: boolean = false;

    switch (KEY_MAP[key]) {
      case DIRECTIONS.UP:
        handled = true;
        this.inputState.vert = 0b00;
        break;
      case DIRECTIONS.DOWN:
        handled = true;
        this.inputState.vert = 0b00;
        break;
      case DIRECTIONS.LEFT:
        handled = true;
        this.inputState.horz = 0b00;
        break;
      case DIRECTIONS.RIGHT:
        handled = true;
        this.inputState.horz = 0b00;
        break;
    }

    return handled;
  }
}



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

enum ACTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  BUTTON
}

interface KeyMap {
  [key: string]: ACTIONS
}


const KEY_MAP: KeyMap = {
  // event.code and event.key
  "ArrowUp": ACTIONS.UP,
  "ArrowDown": ACTIONS.DOWN,
  "ArrowLeft": ACTIONS.LEFT,
  "ArrowRight": ACTIONS.RIGHT,

  // IE Edge event.key
  "Up": ACTIONS.UP,
  "Down": ACTIONS.DOWN,
  "Left": ACTIONS.LEFT,
  "Right": ACTIONS.RIGHT,

  // WASD event.key
  "w": ACTIONS.UP,
  "s": ACTIONS.DOWN,
  "a": ACTIONS.LEFT,
  "d": ACTIONS.RIGHT,

  // WASD event.code
  "KeyW": ACTIONS.UP,
  "KeyS": ACTIONS.DOWN,
  "KeyA": ACTIONS.LEFT,
  "KeyD": ACTIONS.RIGHT,

  "Space": ACTIONS.BUTTON
};


export class InputHandler {

  inputState: InputStates = {
    vert: 0b00,
    horz: 0b00,
    bttn: false
  }

  constructor(element: HTMLElement = document.body) {
    element.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.handleKeyDown(e.code)) {
        e.preventDefault();
      }
    }, false);

    element.addEventListener("keyup", (e: KeyboardEvent) => {
      if (this.handleKeyUp(e.code)) {
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
      case ACTIONS.UP:
        handled = true;
        this.inputState.vert = 0b10;
        break;
      case ACTIONS.DOWN:
        handled = true;
        this.inputState.vert = 0b01;
        break;
      case ACTIONS.LEFT:
        handled = true;
        this.inputState.horz = 0b10;
        break;
      case ACTIONS.RIGHT:
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
      case ACTIONS.UP:
        handled = true;
        this.inputState.vert = 0b00;
        break;
      case ACTIONS.DOWN:
        handled = true;
        this.inputState.vert = 0b00;
        break;
      case ACTIONS.LEFT:
        handled = true;
        this.inputState.horz = 0b00;
        break;
      case ACTIONS.RIGHT:
        handled = true;
        this.inputState.horz = 0b00;
        break;
    }

    return handled;
  }
}


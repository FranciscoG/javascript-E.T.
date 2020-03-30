
/**
 * Vertical movement
 * Up                  - 0b10  aka 2
 * Down                - 0b01  aka 1
 * Off                 - 0b00  aka 0
 * 
 * Horizontal movement
 * Left                - 0b10  aka 2
 * Right               - 0b01  aka 1
 * Off                 - 0b00  aka 0
 * 
 * Button pressed      - true/false 
 */

type AxisState = 0b00|0b10|0b01;

interface InputStates {
  vert: AxisState,
  horz: AxisState,
  bttn: boolean
}

const inputState: InputStates = {
  vert: 0b00,
  horz: 0b00,
  bttn: false
}

const DIRECTIONS = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};
Object.freeze(DIRECTIONS);

const KEY_MAP = {
  // event.code and event.key
  "ArrowUp"   : DIRECTIONS.UP,
  "ArrowDown" : DIRECTIONS.DOWN,
  "ArrowLeft" : DIRECTIONS.LEFT,
  "ArrowRight": DIRECTIONS.RIGHT,

  // IE Edge Event.key
  "Up"        : DIRECTIONS.UP,
  "Down"      : DIRECTIONS.DOWN,
  "Left"      : DIRECTIONS.LEFT,
  "Right"     : DIRECTIONS.RIGHT,

  // WASD event.key
  "w"         : DIRECTIONS.UP,
  "s"         : DIRECTIONS.DOWN,
  "a"         : DIRECTIONS.LEFT,
  "d"         : DIRECTIONS.RIGHT,
  
  // WASD event.code
  "KeyW"         : DIRECTIONS.UP,
  "KeyS"         : DIRECTIONS.DOWN,
  "KeyA"         : DIRECTIONS.LEFT,
  "KeyD"         : DIRECTIONS.RIGHT
};

function handleKeyDown(key: string): boolean {
  if (key === "Space") {
    // space bar is our trigger button
    inputState.bttn = true;
    return true;
  }

  const dir = KEY_MAP[key];
  
  if (!dir) {
    return false;
  }

  let handled: boolean = false;

  switch (dir) {
    case DIRECTIONS.UP:
      handled = true;
      inputState.vert = 0b10;
      break;
    case DIRECTIONS.DOWN:
      handled = true;
      inputState.vert = 0b01;
      break;
    case DIRECTIONS.LEFT:
      handled = true;
      inputState.horz = 0b10;
      break;
    case DIRECTIONS.RIGHT:
      handled = true;
      inputState.horz = 0b01;
      break;
  }

  return handled;
}

function handleKeyUp(key: string): boolean {
  if (key === "Space") {
    // space bar is our trigger button
    inputState.bttn = false;
    return true;
  }

  const dir = KEY_MAP[key];
  
  if (!dir) {
    return false;
  }
  
  let handled: boolean = false;

  switch (dir) {
    case DIRECTIONS.UP:
      handled = true;
      inputState.vert = 0b00;
      break;
    case DIRECTIONS.DOWN:
      handled = true;
      inputState.vert = 0b00;
      break;
    case DIRECTIONS.LEFT:
      handled = true;
      inputState.horz = 0b00;
      break;
    case DIRECTIONS.RIGHT:
      handled = true;
      inputState.horz = 0b00;
      break;
  }

  return handled;
}

function setup(element?: HTMLElement): void {
  (element || document).addEventListener("keydown", function onDown(e: KeyboardEvent) {
    if (handleKeyDown(e.code)) {
      e.preventDefault();
    }
  }, false);

  (element || document).addEventListener("keyup", function onUp(e: KeyboardEvent) {
    if (handleKeyUp(e.code)) {
      e.preventDefault();
    }
  }, false);
}

const read = (): InputStates => inputState;

export default {
  setup,
  read
}

export { InputStates };
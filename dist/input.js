const inputState = {
    vert: 0b00,
    horz: 0b00,
    bttn: false
};
var DIRECTIONS;
(function (DIRECTIONS) {
    DIRECTIONS[DIRECTIONS["UP"] = 0] = "UP";
    DIRECTIONS[DIRECTIONS["DOWN"] = 1] = "DOWN";
    DIRECTIONS[DIRECTIONS["LEFT"] = 2] = "LEFT";
    DIRECTIONS[DIRECTIONS["RIGHT"] = 3] = "RIGHT";
})(DIRECTIONS || (DIRECTIONS = {}));
const KEY_MAP = {
    "ArrowUp": DIRECTIONS.UP,
    "ArrowDown": DIRECTIONS.DOWN,
    "ArrowLeft": DIRECTIONS.LEFT,
    "ArrowRight": DIRECTIONS.RIGHT,
    "Up": DIRECTIONS.UP,
    "Down": DIRECTIONS.DOWN,
    "Left": DIRECTIONS.LEFT,
    "Right": DIRECTIONS.RIGHT,
    "w": DIRECTIONS.UP,
    "s": DIRECTIONS.DOWN,
    "a": DIRECTIONS.LEFT,
    "d": DIRECTIONS.RIGHT,
    "KeyW": DIRECTIONS.UP,
    "KeyS": DIRECTIONS.DOWN,
    "KeyA": DIRECTIONS.LEFT,
    "KeyD": DIRECTIONS.RIGHT
};
function handleKeyDown(key) {
    if (key === "Space") {
        inputState.bttn = true;
        return true;
    }
    const dir = KEY_MAP[key];
    if (dir !== 0 && !dir) {
        return false;
    }
    let handled = false;
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
function handleKeyUp(key) {
    if (key === "Space") {
        inputState.bttn = false;
        return true;
    }
    const dir = KEY_MAP[key];
    if (dir !== 0 && !dir) {
        return false;
    }
    let handled = false;
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
export function setup(element) {
    (element || document).addEventListener("keydown", function onDown(e) {
        if (handleKeyDown(e.code)) {
            e.preventDefault();
        }
    }, false);
    (element || document).addEventListener("keyup", function onUp(e) {
        if (handleKeyUp(e.code)) {
            e.preventDefault();
        }
    }, false);
}
export const read = () => inputState;

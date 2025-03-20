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
export class InputHandler {
    constructor(element = document.body) {
        this.inputState = {
            vert: 0b00,
            horz: 0b00,
            bttn: false
        };
        element.addEventListener("keydown", (e) => {
            if (this.handleKeyDown(e.code)) {
                e.preventDefault();
            }
        }, false);
        element.addEventListener("keyup", (e) => {
            if (this.handleKeyUp(e.code)) {
                e.preventDefault();
            }
        }, false);
    }
    read() { return this.inputState; }
    handleKeyDown(key) {
        if (key === "Space") {
            this.inputState.bttn = true;
            return true;
        }
        let handled = false;
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
    handleKeyUp(key) {
        if (key === "Space") {
            this.inputState.bttn = false;
            return true;
        }
        let handled = false;
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

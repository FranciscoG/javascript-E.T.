export class Game {
    constructor() {
        this.perFrameCallback = () => { };
        this.frame = this.frame.bind(this);
    }
    perFrame(cb) {
        this.perFrameCallback = cb;
    }
    start() {
        requestAnimationFrame(this.frame);
    }
    frame(timestamp) {
        this.perFrameCallback(timestamp);
        requestAnimationFrame(this.frame);
    }
}

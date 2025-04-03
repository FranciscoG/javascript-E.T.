type OnLoop = (ts: number) => void;

/*
first step, load assets
second step, create scene
third step, start game loop
*/

export class GameLoop {
  perFrameCallback: OnLoop = () => {};

  constructor() {}

  perFrame(cb: OnLoop) {
    this.perFrameCallback = cb;
  }

  start() {
    requestAnimationFrame(this.frame);
  }

  frame = (timestamp: number) => {
    this.perFrameCallback(timestamp);
    requestAnimationFrame(this.frame);
  };
}

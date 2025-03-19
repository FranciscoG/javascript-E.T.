type OnLoop = (ts: number) => void

/*
first step, load assets
second step, create scene
third step, start game loop
*/

export class Game {
  perFrameCallback: OnLoop = () => {};

  constructor() {
    this.frame = this.frame.bind(this);
  }

  perFrame(cb: OnLoop) { 
    this.perFrameCallback = cb;
  }

  start() {
    requestAnimationFrame(this.frame);
  }

  frame(timestamp: number) {
    this.perFrameCallback(timestamp);
    requestAnimationFrame(this.frame);
  }
}

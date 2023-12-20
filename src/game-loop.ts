type OnLoop = (ts: number) => void

let loopCb: OnLoop = () => {};

function frame(timestamp: number) {
  loopCb(timestamp);
  requestAnimationFrame(frame);
}

export function registerLoop(cb: OnLoop) {
  loopCb = cb;
  return function start() {
    frame(0);
  }
};

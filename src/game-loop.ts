import input, { InputStates } from "./input";

type OnLoop = (ts: number, input: InputStates) => void

let loopCb: OnLoop = () => {};

input.setup();

function frame(timestamp) {
  loopCb(timestamp, input.read());
  requestAnimationFrame(frame);
}

export default function registerLoop(cb: OnLoop) {
  loopCb = cb;
  frame(0);
};

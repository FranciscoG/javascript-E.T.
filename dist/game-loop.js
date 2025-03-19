let loopCb = () => { };
function frame(timestamp) {
    loopCb(timestamp);
    requestAnimationFrame(frame);
}
export function registerLoop(cb) {
    loopCb = cb;
    return function start() {
        frame(0);
    };
}
;

/**
 * In summary, an Atari 2600 frame consists of 262 scanlines (NTSC) or 312
 * scanlines (PAL), sent at 60Hz (NTSC) or 50Hz (PAL) frequency. It is the job
 * of the '2600 programmer to make sure that the correct number of scanlines are
 * sent to the TV at the right time, with the right graphics data, and
 * appropriate control signals to indicate the end of the frame are also
 * included.
 *
 * The TIA 'draws' the pixels on the screen 'on-the-fly'. Each pixel is one
 * 'clock' of the TIA's processing time, and there are exactly 228 colour clocks
 * of TIA time on each scanline. But a scanline consists of not only the time it
 * takes to scan the electron beam across the picture tube, but also the time it
 * takes for the beam to return to the start of the next line (the horizontal
 * blank, or retrace). Of the 228 colour clocks, 160 are used to draw the pixels
 * on the screen (giving us our maximum horizontal resolution of 160 pixels per
 * line), and 68 are consumed during the retrace period.
 *
 *
 * The 6502 clock is derived from the TIA clock through a divide-by-three. That
 * is, for every single clock of 6502 time, three clocks of TIA time have
 * passed. Therefore, there are *exactly* 228/3 = 76 cycles of 6502 time per
 * scanline. The 6502 and TIA perform a complex 'in-step' dance - one cycle of
 * 6502, three cycles of TIA. A side-note: 76 cycles per line x 262 lines per
 * frame x 60 frames per second = the number of 6502 cycles per second for NTSC
 * (= 1.19MHz, roughly).
 *
 * Vertical
 * 3 Scanlines devoted to the vertical synchronisation
 * 37 scanlines of vertical blank time
 * ---> 192 (NTSC) or 242 (PAL) lines of actual picture
 * 30 scanlines of overscan
 */

interface Context2D extends CanvasRenderingContext2D {
  webkitImageSmoothingEnabled: boolean;
  mozImageSmoothingEnabled: boolean;
}

const canvas: HTMLCanvasElement = document.createElement("canvas");
canvas.width = 160 * 2;
canvas.height = 192;
const ctx = <Context2D> canvas.getContext("2d");
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

// TODO: handle scaling in this module
export default {
  canvas,
  ctx
}

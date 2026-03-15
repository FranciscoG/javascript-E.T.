/**
 * How the 2600 draws on a TV (NTSC)
 * https://alienbill.com/2600/101/docs/stella.html#tvprot
 *
 * VERTICAL:
 * A single television "frame" consists of 262 horizontal lines.
 * - 3 vertical sync (VSYNC) line (to signal the TV set to start a new frame)
 * - 37 vertical blank (VBLANK) lines
 * - 192 TV picture lines
 * - 30 overscan lines
 * - Total: 262 lines
 *
 * HORIZONTAL:
 * Each line is divided by 228 clock counts
 * - Starts with 68 clock counts of horizontal blank (not seen on the TV screen)
 * - 160 clock counts to fully scan one line of TV picture
 * - Total: 228 "pixels" (clocks)
 *
 * TV RESOLUTION:
 * Actual visible "resolution" is 160 w x 192 h
 *
 * Resolution adjusted for modern computers:
 * 320 x 210, read why in this link
 * https://atariage.com/forums/topic/169128-what-is-the-atari-2600-screen-resolution/?tab=comments#comment-2092604
 */

export class Display {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;

  constructor(w: number = 320, h: number = 210) {
    this.w = w;
    this.h = h;
    this.canvas = document.createElement("canvas");
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx = this.canvas.getContext("2d")!;
  }

  scale(x: number, y: number) {
    this.canvas.width = this.w * x;
    this.canvas.height = this.h * y;
    this.ctx.scale(x, y);
    this.ctx.imageSmoothingEnabled = false;
  }

  clear() {
    this.ctx.fillRect(0, 0, this.w, this.h);
  }
}

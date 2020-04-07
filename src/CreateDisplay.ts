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

interface Context2D extends CanvasRenderingContext2D {
  webkitImageSmoothingEnabled: boolean;
  mozImageSmoothingEnabled: boolean;
}

interface CanvasAndContext {
  canvas: HTMLCanvasElement,
  ctx: Context2D,
  scale: (x: number, y: number) => void
}

function CreateDisplay(w: number = 320, h: number = 210): CanvasAndContext {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = <Context2D>canvas.getContext("2d");

  return {
    canvas,
    ctx,
    scale: function (x: number, y: number): void {
      canvas.width = canvas.width * x;
      canvas.height = canvas.height * y;
      ctx.scale(x * 2, y * 2); // only scales what's placed on the canvas
      ctx.webkitImageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
    }
  }
}

export default CreateDisplay

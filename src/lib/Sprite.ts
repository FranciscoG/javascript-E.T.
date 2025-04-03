
/**
 * A very helpful tutorial on how the 2600 works
 * http://atariage.com/forums/topic/33233-sorted-table-of-contents/
 *
 * Sprites were drawn using binary. Each byte represented a row of pixels.
 */

const pixelW = 320 / 160;
const pixelH = Math.floor(210 / 192);

export const DIRECTIONS = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

export class Sprite {
  // the top left x,y corner of a sprite
  x: number = 0;
  y: number = 0;
  width: number = 8; // width of the sprite in pixels
  height: number = 0; // height of the sprite in pixels

  moving: boolean = false;
  xDir: number = DIRECTIONS.LEFT;
  yDir: number = DIRECTIONS.UP;

  color: string = "#696969";

  clockSize: 1 | 2 | 4 | 8 = 1;

  /**
   * a single Sprite frame
   */
  byteArray: string[][] = [];

  constructor() {}

  update(newArr: string[][]) {
    this.byteArray = newArr;
  }

  /**
   * Draws a single sprite onto provided context
   * @param ctx
   * @param x starting X position
   * @param y starting Y position
   * @param color hex color fillRect value
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    let x = this.x;
    let y = this.y;

    for (let byte of this.byteArray) {
      for (let bit of byte) {
        if (bit === "1") {
          ctx.fillRect(x, y, pixelW * this.clockSize, pixelH);
        }
        x += pixelW * this.clockSize;
      }

      y += pixelH;
      x = this.x;
    }
  }
}

/**
 * This sprite is used for the Ball and Missile. It is a 1 bit sprite, meaning
 * it can only be either on or off. The clock size can be increased to make it
 * wider. On the actual Atari they can be me as tall as the screen by leaving
 * them enabled for as many scan lines as needed.
 */
export class OneBitSprite extends Sprite {
  clockSize: 1 | 2 | 4 | 8 = 1;
  scanLines: number = 1; // how many scan lines to draw the sprite

  constructor() {
    super();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    let x = this.x;
    let y = this.y;

    for (let i = 0; i < this.scanLines; i++) {
      ctx.fillRect(x, y, pixelW * this.clockSize, pixelH); 
      y += pixelH;
    }
  }
}

/*
  A very helpful tutorial on how the 2600 works
  http://atariage.com/forums/topic/33233-sorted-table-of-contents/
*/

import { hex2bin } from "./utils";

const pixelW = 320 / 160;
const pixelH = Math.floor(210 / 192);

function extractToBinary(_: string, p1: string): string {
  return hex2bin(p1);
}

/**
 * ET example 
 * 
  const ETSprites = `
    .byte $FE ; |XXXXXXX.|
    .byte $FF ; |XXXXXXXX|
    .byte $C3 ; |XX....XX|
    .byte $0F ; |....XXXX|
    .byte $FF ; |XXXXXXXX|
    .byte $3F ; |..XXXXXX|
    .byte $2B ; |..X.X.XX|
    .byte $E7 ; |XXX..XXX|
    .byte $00 ; |........|
  `;
 */


/**
 * string[][] = [ 
 *  ["1","0","1","1", ...],
 *  ["1","0","1","1", ...] 
 * ]
 */

class Sprite {
  byteArray: string[][];
  groupByteArray: string[][][];

  constructor() {
    this.byteArray = [];
    this.groupByteArray = [];
  }

  load(sprite: string, flipped: boolean = false): string[][] {

    /**
     * Extract all of the hex numbers (i.e. $FE) from the sprite string
     * and convert them to binary. This prodiuces one long string of 1s and 0s
     * without any space or line breaks like this;
     * 111111101111111111000011000011111111111100111111001010111110011100000000
     */
    sprite = sprite.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, extractToBinary);

    if (!sprite) {
      throw new Error(`Could not find any hex values in the sprite string`);
    }

    /**
     * break up long string into chunks of 8
     * ["11111110", "11111111", "11000011", "00001111", "11111111", ... ]
     */
    const matches = sprite.match(/%?[0-1]{8}[\s\n]*/g);

    if (!matches) {
      throw new Error(`Error parsing binary string amd converting it into array`);
    }

    if (flipped) {
      matches.reverse();
    }

    this.byteArray = matches.map((bit: string): string[] => {
      return bit.split("");
    });

    return this.byteArray;
  }

  loadGroup(spriteGroup: string[], flipped: boolean = false) {
    this.groupByteArray = spriteGroup.map((sprite: string): string[][] => {
      return this.load(sprite, flipped);
    })
  }

  /**
   * Draws a single sprite onto provided context
   * @param ctx 
   * @param x starting X position
   * @param y starting Y position
   * @param color hex color fillRect value
   */
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, color: string = "#696969") {
    ctx.fillStyle = color;
    let x = startX;
    let y = startY;

    for (let byte of this.byteArray) {
      for (let bit of byte) {
        if (bit === "1") {
          ctx.fillRect(x, y, pixelW, pixelH);
        }
        x += pixelW;
      }

      y += pixelH
      x = startX;
    }
  }

  drawGroup(ctx: CanvasRenderingContext2D, startX: number, startY: number, color: string = "#696969") {
    let x = startX;
    for (let byteArray of this.groupByteArray) {
      this.byteArray = byteArray
      this.draw(ctx, x, startY, color);
      x += (pixelW * 8);
    }
  }

}


export default Sprite;
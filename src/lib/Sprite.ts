
/**
 * A very helpful tutorial on how the 2600 works
 * http://atariage.com/forums/topic/33233-sorted-table-of-contents/
 *
 * Sprites were drawn using binary. Each byte represented a row of pixels.
 */

import { ntscColor } from './ntsc-colors';

const pixelW = 320 / 160;
const pixelH = Math.floor(210 / 192);

export class Sprite {
  x: number = 0;
  y: number = 0;

  color: number = 0x00;

  clockSize: 1 | 2 | 4 | 8 = 1;
  scanLinesPerRow: number = 1;

  /** TIA REFP — when true, the sprite graphics are drawn mirrored horizontally */
  reflected: boolean = false;

  byteArray: string[][] = [];

  get width(): number {
    const cols = this.byteArray[0]?.length ?? 0;
    return cols * pixelW * this.clockSize;
  }

  get height(): number {
    return this.byteArray.length * pixelH * this.scanLinesPerRow;
  }

  constructor() {}

  update(newArr: string[][]) {
    this.byteArray = newArr;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = ntscColor(this.color);
    let x = this.x;
    let y = this.y;

    for (let byte of this.byteArray) {
      const row = this.reflected ? [...byte].reverse() : byte;
      for (let bit of row) {
        if (bit === "1") {
          ctx.fillRect(x, y, pixelW * this.clockSize, pixelH * this.scanLinesPerRow);
        }
        x += pixelW * this.clockSize;
      }

      y += pixelH * this.scanLinesPerRow;
      x = this.x;
    }
  }
}

/**
 * This sprite is used for the Ball and Missile. It is a 1 bit sprite, meaning
 * it can only be either on or off. The clock size can be increased to make it
 * wider. On the actual Atari they can be made as tall as the screen by leaving
 * them enabled for as many scan lines as needed.
 */
export class OneBitSprite extends Sprite {
  clockSize: 1 | 2 | 4 | 8 = 1;
  scanLines: number = 1;

  get width(): number {
    return pixelW * this.clockSize;
  }

  get height(): number {
    return this.scanLines * pixelH;
  }

  constructor() {
    super();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = ntscColor(this.color);
    let x = this.x;
    let y = this.y;

    for (let i = 0; i < this.scanLines; i++) {
      ctx.fillRect(x, y, pixelW * this.clockSize, pixelH); 
      y += pixelH;
    }
  }
}

/**
 * TIA Playfield
 *
 * The TIA playfield is defined by three registers:
 *   PF0 (4 bits, D4-D7, drawn left to right → bits reversed)
 *   PF1 (8 bits, D7-D0, drawn left to right → bits in order)
 *   PF2 (8 bits, D0-D7, drawn left to right → bits reversed)
 *
 * Together they define a 20-bit pattern for the left half of the screen.
 * The right half either repeats (duplicate) or mirrors (reflect) the pattern.
 *
 * The playfield is drawn at clock-count resolution: each bit = 4 color clocks
 * (on a 160-clock line, 20 bits × 4 clocks = 80 clocks for one half).
 *
 * CTRLPF register controls:
 *   bit 0: REFLECT — if set, right half mirrors the left half
 *   bit 1: SCORE — if set, left half uses COLUP0, right half uses COLUP1
 *   bit 2: PFP — playfield priority (drawn on top of players if set)
 */
export class Playfield {
  /** PF0 register (only bits 4-7 are used, drawn D4→D7) */
  pf0: number = 0;
  /** PF1 register (all 8 bits, drawn D7→D0) */
  pf1: number = 0;
  /** PF2 register (all 8 bits, drawn D0→D7) */
  pf2: number = 0;

  /** If true, right half mirrors left half. If false, right half repeats. */
  reflect: boolean = false;

  /** If true, score mode: left half = COLUP0, right half = COLUP1 */
  scoreMode: boolean = false;

  /** Playfield color (COLUPF). In score mode, the engine overrides per-half. */
  color: number = 0x00;

  /** Scanline range where this playfield pattern is active */
  startLine: number = 0;
  stopLine: number = 192;

  /**
   * Build the 20-bit left-half pattern from PF0, PF1, PF2.
   * Returns an array of 20 booleans (true = pixel on).
   */
  private getLeftHalf(): boolean[] {
    const bits: boolean[] = [];

    // PF0: bits 4-7 in order (D4, D5, D6, D7) — 4 bits
    for (let i = 4; i <= 7; i++) {
      bits.push(((this.pf0 >> i) & 1) === 1);
    }

    // PF1: bits 7-0 in reverse order (D7, D6, D5, D4, D3, D2, D1, D0) — 8 bits
    for (let i = 7; i >= 0; i--) {
      bits.push(((this.pf1 >> i) & 1) === 1);
    }

    // PF2: bits 0-7 in order (D0, D1, D2, D3, D4, D5, D6, D7) — 8 bits
    for (let i = 0; i <= 7; i++) {
      bits.push(((this.pf2 >> i) & 1) === 1);
    }

    return bits;
  }

  /**
   * Get the full 40-bit playfield pattern (left + right half).
   */
  getPattern(): boolean[] {
    const left = this.getLeftHalf();
    const right = this.reflect ? [...left].reverse() : [...left];
    return left.concat(right);
  }

  /**
   * Draw the playfield onto the canvas.
   * Each playfield bit = 4 color clocks = 8 canvas pixels (4 × pixelW).
   * @param ctx Canvas rendering context
   * @param colorLeft Color for left half (used in score mode for COLUP0)
   * @param colorRight Color for right half (used in score mode for COLUP1)
   */
  draw(ctx: CanvasRenderingContext2D, colorLeft?: number, colorRight?: number) {
    const pattern = this.getPattern();
    const bitWidth = 4 * pixelW; // each PF bit = 4 color clocks

    for (let y = this.startLine; y < this.stopLine; y++) {
      for (let bit = 0; bit < 40; bit++) {
        if (!pattern[bit]) continue;

        if (this.scoreMode && colorLeft !== undefined && colorRight !== undefined) {
          ctx.fillStyle = ntscColor(bit < 20 ? colorLeft : colorRight);
        } else {
          ctx.fillStyle = ntscColor(this.color);
        }

        ctx.fillRect(bit * bitWidth, y * pixelH, bitWidth, pixelH);
      }
    }
  }
}

import { Display } from "./Display";
import { Sprite, Playfield } from "./Sprite";
import { Audio } from "./Audio";
import { InputHandler } from "./InputHandler";
import { ntscColor } from "./ntsc-colors";

export type TIAObject = "player1" | "player2" | "missile1" | "missile2" | "ball";
type OnLoop = (ts: number) => void;

export class GameEngine {
  /**
   * TIA Color Registers
   *
   * The TIA has 4 color registers that control all on-screen colors:
   *   COLUP0 — Player 0 and Missile 0
   *   COLUP1 — Player 1 and Missile 1
   *   COLUPF — Playfield and Ball
   *   COLUBK — Background
   *
   * Individual sprite .color properties can still be set to override
   * the register color (for convenience in non-strict mode).
   */
  colup0: number = 0x00;  // player 0 + missile 0 color
  colup1: number = 0x00;  // player 1 + missile 1 color
  colupf: number = 0x00;  // playfield + ball color
  colubk: number = 0x00;  // background color

  // Per-scanline color bands. The TIA sets COLUBK at specific scanlines
  // to create colored horizontal bands.
  backgroundSprite: Array<{ color: number; start: number; stop: number }> = [];

  // TIA Playfield — PF0/PF1/PF2 registers with reflect/score mode
  playfield: Playfield = new Playfield();

  // The TIA detects collisions between any of the 6 objects it generates (the
  // playfield and 5 moveable objects). There are 15 possible two-object
  // collisions
  collisions: number[] = [
    0, // 0. player 1 with playfield
    0, // 1. player 1 with player 2
    0, // 2. player 1 with missile 1
    0, // 3. player 1 with missile 2
    0, // 4. player 1 with ball

    0, // 5. player 2 with playfield
    0, // 6. player 2 with missile 1
    0, // 7. player 2 with missile 2
    0, // 8. player 2 with ball

    0, // 9. missile 1 with playfield
    0, // 10. missile 1 with ball
    0, // 11. missile 1 with missile 2

    0, // 12. missile 2 with playfield
    0, // 13. missile 2 with ball

    0, // 14. ball with playfield
  ];

  display = new Display();
  input = new InputHandler();
  audio = new Audio();

  private sprites: Record<TIAObject, Sprite | null> = {
    player1: null,
    player2: null,
    missile1: null,
    missile2: null,
    ball: null,
  };

  constructor(target: HTMLElement) {
    this.display.scale(3, 3);
    target.appendChild(this.display.canvas);
  }

  // Accessors for the 5 moveable TIA objects
  get player1() { return this.sprites.player1; }
  get player2() { return this.sprites.player2; }
  get missile1() { return this.sprites.missile1; }
  get missile2() { return this.sprites.missile2; }
  get ball() { return this.sprites.ball; }

  // Helper function to check for collision
  checkCollision(spriteA: Sprite | null, spriteB: Sprite | null, index: number) {
    if (spriteA && spriteB) {
      // Simple bounding box collision detection
      if (
        spriteA.x < spriteB.x + spriteB.width &&
        spriteA.x + spriteA.width > spriteB.x &&
        spriteA.y < spriteB.y + spriteB.height &&
        spriteA.y + spriteA.height > spriteB.y
      ) {
        this.collisions[index] = 1; // Collision detected
      } else {
        this.collisions[index] = 0; // No collision
      }
    }
  }

  detectCollisions(): void {
    const s = this.sprites;
    // TODO: playfield collision needs scanline-level detection
    this.checkCollision(s.player1, s.player2, 1);
    this.checkCollision(s.player1, s.missile1, 2);
    this.checkCollision(s.player1, s.missile2, 3);
    this.checkCollision(s.player1, s.ball, 4);

    this.checkCollision(s.player2, s.missile1, 6);
    this.checkCollision(s.player2, s.missile2, 7);
    this.checkCollision(s.player2, s.ball, 8);

    this.checkCollision(s.missile1, s.ball, 10);
    this.checkCollision(s.missile1, s.missile2, 11);

    this.checkCollision(s.missile2, s.ball, 13);
  }

  addSprite(name: TIAObject, sprite: Sprite): void {
    this.sprites[name] = sprite;
  }

  removeSprite(name: TIAObject): void {
    this.sprites[name] = null;
  }

  /**
   * Apply TIA color register values to sprites before drawing.
   * Missiles inherit their player's color, ball inherits playfield color.
   */
  private applyColorRegisters(): void {
    if (this.sprites.player1) this.sprites.player1.color = this.colup0;
    if (this.sprites.missile1) this.sprites.missile1.color = this.colup0;
    if (this.sprites.player2) this.sprites.player2.color = this.colup1;
    if (this.sprites.missile2) this.sprites.missile2.color = this.colup1;
    if (this.sprites.ball) this.sprites.ball.color = this.colupf;
    this.playfield.color = this.colupf;
  }

  drawBackground() {
    this.backgroundSprite.forEach((bg) => {
      this.display.ctx.fillStyle = ntscColor(bg.color);
      this.display.ctx.fillRect(0, bg.start, this.display.w, bg.stop - bg.start);
    });
  }

  draw() {
    // Apply TIA color registers to all objects
    this.applyColorRegisters();

    // Fill with COLUBK background color
    this.display.ctx.fillStyle = ntscColor(this.colubk);
    this.display.clear();
    this.drawBackground();

    // Draw playfield (with score mode support)
    this.playfield.draw(this.display.ctx, this.colup0, this.colup1);

    // Draw moveable objects in TIA priority order: players, missiles, ball
    const order: TIAObject[] = ["player1", "player2", "missile1", "missile2", "ball"];
    for (const name of order) {
      this.sprites[name]?.draw(this.display.ctx);
    }
  }

  perFrameCallback: OnLoop = () => {};

  perFrame(cb: OnLoop) {
    this.perFrameCallback = cb;
  }

  frame = (timestamp: number) => {
    // detect collisions first
    this.detectCollisions();

    // call user logic
    this.perFrameCallback(timestamp);

    // draw
    this.draw();

    requestAnimationFrame(this.frame);
  };

  start() {
    requestAnimationFrame(this.frame);
  }
}

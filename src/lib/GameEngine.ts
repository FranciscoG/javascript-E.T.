import { Display } from "./Display";
import { DIRECTIONS, Sprite } from "./Sprite";
import { InputHandler, InputStates } from "./InputHandler";

type MoveableObjects = "player1" | "player2" | "missile1" | "missile2" | "ball" | "playfield";
type OnLoop = (ts: number) => void;

export class GameEngine {
  // background
  backgroundColor: string = "#000000"; // background color

  // the bg is a special sprite that is drawn first.
  // it contains instructions to draw a specific color for a specific
  // number of full width lines. In the actual atari this is done by using
  // the time to set specific colors for a specific number of lines.
  backgroundSprite: Array<{ color: string; start: number; stop: number }> = [];

  // static object, can be moved but requires a full redraw of the playfield
  playfield: Sprite | null = null;

  // 5 moveable objects:
  player1: Sprite | null = null; // player 1 sprite
  player2: Sprite | null = null; // player 2 sprite
  missile1: Sprite | null = null; // player 1's missile
  missile2: Sprite | null = null; // player 2's missile
  ball: Sprite | null = null; // ball sprite

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
    0, // 11. missing 1 with missile 2

    0, // 12. missile 2 with playfield
    0, // 13. missile 2 with ball

    0, // 14. ball with playfield
  ];

  display = new Display();
  input = new InputHandler();

  constructor(target: HTMLElement) {
    this.display.scale(3, 3);
    target.appendChild(this.display.canvas);
    this.display.ctx.fillStyle = this.backgroundColor;
  }

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
    // Check all combinations of collisions
    this.checkCollision(this.playfield, this.player1, 0);
    this.checkCollision(this.player1, this.player2, 1);
    this.checkCollision(this.player1, this.missile1, 2);
    this.checkCollision(this.player1, this.missile2, 3);
    this.checkCollision(this.player1, this.ball, 4);

    this.checkCollision(this.player2, this.playfield, 5);
    this.checkCollision(this.player2, this.missile1, 6);
    this.checkCollision(this.player2, this.missile2, 7);
    this.checkCollision(this.player2, this.ball, 8);

    this.checkCollision(this.missile1, this.playfield, 9);
    this.checkCollision(this.missile1, this.ball, 10);
    this.checkCollision(this.missile1, this.missile2, 11);

    this.checkCollision(this.missile2, this.playfield, 12);
    this.checkCollision(this.missile2, this.ball, 13);

    this.checkCollision(this.ball, this.playfield, 14);
  }

  addSprite(name: MoveableObjects, sprite: Sprite): void {
    switch (name) {
      case "player1":
        this.player1 = sprite;
        break;
      case "player2":
        this.player2 = sprite;
        break;
      case "missile1":
        this.missile1 = sprite;
        break;
      case "missile2":
        this.missile2 = sprite;
        break;
      case "ball":
        this.ball = sprite;
        break;
      case "playfield":
        this.playfield = sprite;
        break;
    }
  }

  removeSprite(name: MoveableObjects): void {
    switch (name) {
      case "player1":
        this.player1 = null;
        break;
      case "player2":
        this.player2 = null;
        break;
      case "missile1":
        this.missile1 = null;
        break;
      case "missile2":
        this.missile2 = null;
        break;
      case "ball":
        this.ball = null;
        break;
      case "playfield":
        this.playfield = null;
        break;
    }
  }

  move(sprite: Sprite, inputState: InputStates, speed: number) {
    let x = sprite.x;
    let y = sprite.y;

    switch (inputState.vert) {
      case 2:
        y = y - speed;
        sprite.moving = true;
        sprite.yDir = DIRECTIONS.UP;
        break;
      case 1:
        y = y + speed;
        sprite.moving = true;
        sprite.yDir = DIRECTIONS.DOWN;
        break;
    }

    switch (inputState.horz) {
      case 2:
        x = x - speed;
        sprite.moving = true;
        sprite.xDir = DIRECTIONS.LEFT;
        break;
      case 1:
        x = x + speed;
        sprite.moving = true;
        sprite.xDir = DIRECTIONS.RIGHT;
        break;
    }

    if (inputState.horz === 0 && inputState.vert === 0) {
      sprite.moving = false; // not moving
    }

    sprite.x = x;
    sprite.y = y;
  }

  updateSprite(whichSprite: MoveableObjects, inputState: InputStates, speed: number = 3) {
    switch (whichSprite) {
      case "player1":
        if (this.player1) {
          this.move(this.player1, inputState, speed);
        }
        break;
      case "player2":
        if (this.player2) {
          this.move(this.player2, inputState, speed);
        }
        break;
      case "missile1":
        if (this.missile1) {
          this.move(this.missile1, inputState, speed);
        }
        break;
      case "missile2":
        if (this.missile2) {
          this.move(this.missile2, inputState, speed);
        }
        break;
      case "ball":
        if (this.ball) {
          this.move(this.ball, inputState, speed);
        }
        break;
    }
  }

  drawBackground() {
    this.backgroundSprite.forEach((bg) => {
      this.display.ctx.fillStyle = bg.color;
      this.display.ctx.fillRect(0, bg.start, this.display.canvas.width, bg.stop - bg.start);
    });
  }

  draw() {
    // clear the canvas
    
    // start with the background color
    this.display.ctx.fillStyle = this.backgroundColor;

    this.display.clear();
    
    this.drawBackground();

    if (this.playfield) {
      this.playfield.draw(this.display.ctx);
    }
    if (this.player1) {
      this.player1.draw(this.display.ctx);
    }
    if (this.player2) {
      this.player2.draw(this.display.ctx);
    }
    if (this.missile1) {
      this.missile1.draw(this.display.ctx);
    }
    if (this.missile2) {
      this.missile2.draw(this.display.ctx);
    }
    if (this.ball) {
      this.ball.draw(this.display.ctx);
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

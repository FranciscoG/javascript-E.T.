import {
  ETWalkSprite_A0,
  ETWalkSprite_A1,
  ETWalkSprite_A2,
} from "../assets/visual";
import { InputStates } from "../lib/InputHandler";
import { Sprite } from "../lib/Sprite";

import { byteToBinaryString } from "../lib/utils";

///////////////////////////////////////////////////////////////////////////////
// constants

const walkspeed = 3;

const nx = 44;
const ny = 33;


//ET had 8 screens:
const ID_FOUR_DIAMOND_PITS = 0;
const ID_EIGHT_PITS = 1;
const ID_ARROW_PITS = 2;
const ID_WIDE_DIAMOND_PITS = 3;

const ID_FOREST = 4;
const ID_WASHINGTON_DC = 5;

const ID_PIT = 6;
const ID_ET_HOME = 7;
const ID_TITLE_SCREEN = 8;

// 4 of the screens have pits

const worldMap = {
	1: {
		name: "forest",
		bgcolor: "#04410b",
		up: 2,
		down: 4, // 2 arrows and 2 small diamonds
		left: 3,
		right: 7, //into top center well from the log/frogger stage
	},
	2: {
		name: "tall twins",
		bgcolor: "#6f9440",
		up: 1,
		down: 6,
		left: 5,
		right: 3,
	},
	3: {
		name: "4 diamonds",
		bgcolor: "#6f9440",
		up: 1,
		down: 6,
		left: 2,
		right: 4,
	},
	4: {
		name: "arrows",
		bgcolor: "#6f9440",
		up: 1,
		down: 6,
		left: 3,
		right: 5,
	},
	5: {
		name: "8 diamonds",
		bgcolor: "#6f9440",
		up: 1,
		down: 6,
		left: 4,
		right: 2,
	},
	6: {
		name: "D.C.",
		bgcolor: "#584fda",
		up: 2,
		down: 4,
		left: 7, // Leaving from the left side always lands E.T. in the bottom center well on the Log Screen.
		right: 3,
	},
	7: {
		nname: "Pit",
		bgcolor: "red",
		up: 5,
	},
};

// x,y positions of the sides
const sides = {
	T: ny - 1, //actually just entering from the bottom means you exited the top
	R: 0,
	B: 0,
	L: nx - 1,
};


/****************************************
 * ET Character animation
 */

const ET_walkA = [ETWalkSprite_A0, ETWalkSprite_A1, ETWalkSprite_A2].map((asset) => {
	return byteToBinaryString(asset);
});

const et = new Sprite();
et.update(ET_walkA[0]);

// this loops through each walk image and puts it on the screen
let etWalkFrame = 0;
let lastXDir = -1; // facing left initially

function walkAnim() {
	et.update(ET_walkA[etWalkFrame]);
	et.reflected = lastXDir > 0;

	etWalkFrame++;
	if (etWalkFrame > ET_walkA.length - 1) {
		etWalkFrame = 0;
	}
}

function stand() {
	et.update(ET_walkA[0]);
	et.reflected = lastXDir > 0;
}

// Game-layer movement helper — mirrors the joystick input to sprite position.
// Returns what direction the sprite moved (for animation logic).
function moveSprite(sprite: Sprite, input: InputStates, speed: number) {
	let moving = false;
	let xDir = 0;
	let yDir = 0;

	if (input.vert === 2) { sprite.y -= speed; moving = true; yDir = -1; }
	if (input.vert === 1) { sprite.y += speed; moving = true; yDir = 1; }
	if (input.horz === 2) { sprite.x -= speed; moving = true; xDir = -1; }
	if (input.horz === 1) { sprite.x += speed; moving = true; xDir = 1; }

	return { moving, xDir, yDir };
}
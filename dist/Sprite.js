import { hex2bin } from "./utils.js";
const pixelW = 320 / 160;
const pixelH = Math.floor(210 / 192);
function extractToBinary(_, p1) {
    return hex2bin(p1);
}
export class Sprite {
    constructor() {
        this.byteArray = [];
        this.groupByteArray = [];
    }
    load(sprite, flipped = false) {
        sprite = sprite.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, extractToBinary);
        if (!sprite) {
            throw new Error(`Could not find any hex values in the sprite string`);
        }
        const matches = sprite.match(/%?[0-1]{8}[\s\n]*/g);
        if (!matches) {
            throw new Error(`Error parsing binary string amd converting it into array`);
        }
        if (flipped) {
            matches.reverse();
        }
        this.byteArray = matches.map((bit) => {
            return bit.split("");
        });
        return this.byteArray;
    }
    loadGroup(spriteGroup, flipped = false) {
        this.groupByteArray = spriteGroup.map((sprite) => {
            return this.load(sprite, flipped);
        });
    }
    draw(ctx, startX, startY, color = "#696969") {
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
            y += pixelH;
            x = startX;
        }
    }
    drawGroup(ctx, startX, startY, color = "#696969") {
        let x = startX;
        for (let byteArray of this.groupByteArray) {
            this.byteArray = byteArray;
            this.draw(ctx, x, startY, color);
            x += (pixelW * 8);
        }
    }
}

/*
  A very helpful tutorial on how the 2600 works
  http://atariage.com/forums/topic/33233-sorted-table-of-contents/
*/

import utils from "./utils";


function repl(match: string, p1: string): string {
  return utils.hex2bin(p1);
}

function SpriteDrawer(sprite: string, color: string = "#696969"): HTMLCanvasElement {
  if (!sprite) {
    return; // return undefined
  }

  // create our canvas that will hold our sprite image
  // and will be returned in the end
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  sprite = sprite.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, repl);

  canvas.height = sprite.match(/%?[0-1]{8}[\s\n]*/g).length;
  canvas.width = 8;

  const spriteArr = sprite.split("");

  let n: number = 0;
  const rbgArr: number[] = utils.hex2rgb(color);
  const imgData = ctx.createImageData(8, spriteArr.length);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i + 0] = rbgArr[0];
    imgData.data[i + 1] = rbgArr[1];
    imgData.data[i + 2] = rbgArr[2];
    if (spriteArr[n] === "1") {
      imgData.data[i + 3] = 255;
    } else {
      imgData.data[i + 3] = 0;
    }
    n++;
  }
  ctx.putImageData(imgData, 0, 0);

  return canvas;
}

export default SpriteDrawer;

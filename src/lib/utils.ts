/**
 * Usually Sprite Clocks are shown in Binary but in the Atari source code for
 * E.T. it shows sprite clock/pixels in Hex So this converts those hex numbers
 * to Binary
 * @param  {string} hex the 2 character hex string
 * @return {string}     the binary string
 */
export function hex2bin(hexString: string): string {
  const decimal = parseInt(hexString, 16);
  return decimal.toString(2).padStart(hexString.length * 4, '0');
}

/**
 * Convert a Hex Color to RGB array
 * @param  hex  a full hex color string including the hash.  example: "#99af34"
 */
export function hex2rgb(hex: string): number[] {
  if (hex.charAt(0) === "#") {
    hex = hex.substring(1);
  }
  // separate "99af34" into ["99", "af", "34"]
  const parts = hex.match(/[0-9A-Za-z]{2}/g);

  if (!parts) {
    return [0, 0, 0]; // just return black if it failes
  }

  // convert into hexadecimal number
  return parts.map(function (e: string) {
    return parseInt(e, 16);
  });
}

function extractToBinary(_: string, p1: string): string {
  return hex2bin(p1);
}

/**
 * converts the sprite declaration in hex to a 2D array of binary strings
 * example:
 * .byte $FE ; |XXXXXXX.|
 * .byte $FF ; |XXXXXXXX|
 * .byte $C3 ; |XX....XX|
 * .byte $0F ; |....XXXX|
 * .byte $FF ; |XXXXXXXX|
 * .byte $3F ; |..XXXXXX|
 * .byte $2B ; |..X.X.XX|
 * .byte $E7 ; |XXX..XXX|
 * .byte $00 ; |........|
 * 
 * becomes this array: [
 *  ["1","1","1","1","1","1","1","0"],
 *  ["1","1","1","1","1","1","1","1"],
 *  ["1","1","0","0","0","0","1","1"],
 *  ["0","0","0","0","1","1","1","1"],
 *  ["1","1","1","1","1","1","1","1"],
 *  ["0","0","1","1","1","1","1","1"],
 *  ["0","0","1","0","1","0","1","1"],
 *  ["1","1","1","0","0","1","1","1"],
 *  ["0","0","0","0","0","0","0","0"] 
 * ]
 * @param byteString 
 */
export function byteToBinaryString(byteString: string, flipped: boolean = false): string[][] {
    /**
     * Extract all of the hex numbers (i.e. $FE) from the sprite string
     * and convert them to binary. This prodiuces one long string of 1s and 0s
     * without any space or line breaks like this;
     * 111111101111111111000011000011111111111100111111001010111110011100000000
     */
    const sprite = byteString.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, extractToBinary);

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

    const byteArray = matches.map((bit: string): string[] => {
      return bit.split("");
    });

    return byteArray;
  
}
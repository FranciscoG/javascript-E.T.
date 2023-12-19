/**
 * Usually Sprite Clocks are shown in Binary but in the Atari source code for
 * E.T. it shows sprite clock/pixels in Hex So this converts those hex numbers
 * to Binary
 * @param  {string} hex the 2 character hex string
 * @return {string}     the binary number as a string
 */
export function hex2bin(hex: string): string {

  function pad(num: string, size: number) {
    const s = "000" + num;
    return s.substr(s.length - size);
  }

  const hexArr: string[] = hex.split("");
  let bin: string = "";
  hexArr.forEach(function (e: string, i: number, arr: string[]) {
    const dec = parseInt(arr[i], 16);
    bin += pad(dec.toString(2), 4);
  });
  return bin;
}

/**
 * Convert a Hex Color to RGB array
 * @param  hex  a full hex color string including the hash.  example: "#99af34"
 */
export function hex2rgb(hex: string): number[] {
  if (hex.charAt(0) === "#") {
    hex = hex.substr(1);
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
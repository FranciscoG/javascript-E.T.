

/**
 * Module containing an assortment of useful utility functions
 * @type {Object}
 */
export default {

  /**
   * Usually Sprite Clocks are shown in Binary but in the Atari source code for E.T. it showed sprite clock/pixels in Hex
   * So this converts those hex numbers to Binary
   * @param  {string} hex the 2 character hex string
   * @return {string}     the binary number as a string
   */
  hex2bin: function (hex: string): string {

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
  },

  /**
   * Convert a Hex Color to RGB array
   * @param  {string} hex   a full hex color string including the hash.  example: "#99af34"
   * @return {object}       an array containing RGB info [R,G,B]
   */
  hex2rgb: function (hex: string): number[] {
    if (hex.charAt(0) === "#") {
      hex = hex.substr(1);
    }
    // separate "99af34" into ["99", "af", "34"]
    const parts = hex.match(/[0-9A-Za-z]{2}/g);
    // convert into hexadecimal number
    return parts.map(function (e: string) {
      return parseInt(e, 16);
    });
  }
};
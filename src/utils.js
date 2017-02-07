'use strict';
/**
 * Module containing an assortment of useful utility functions
 * @type {Object}
 */
module.exports = {
  
  /**
   * Usually Sprite Clocks are shown in Binary but in the Atari source code for E.T. it showed sprite clock/pixels in Hex
   * So this converts those hex numbers to Binary
   * @param  {string} hex the 2 character hex string
   * @return {string}     the binary number as a string
   */
  hex2bin : function(hex) {

    function pad(num, size) {
      var s = "000" + num;
      return s.substr(s.length - size);
    }

    var hexArr = hex.split("");
    var bin = "";
    hexArr.forEach(function(e, i, arr) {
      var dec = parseInt(arr[i], 16);
      bin += pad(dec.toString(2), 4);
    });
    return bin;
  },

  /**
   * Convert a Hex Color to RGB array
   * @param  {string} hex   a full hex color string includeing the hash.  example: "#99af34"
   * @return {object}       an array containing RGB info [R,G,B]
   */
  hex2rgb : function(hex) {
    var hx = hex.substr(1);
    var parts = hx.match(/[0-9A-Za-z]{2}/g);
    parts.forEach(function(e, i, arr) {
      parts[i] = parseInt(arr[i], 16);
    });
    return parts;
  }
};
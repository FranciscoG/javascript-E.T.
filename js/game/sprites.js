/*

Original Colors:
		17F9: 0E DE DC DA DA DA

		New Colors:
		17F9: 0E FE FC F8 F8 F8


	ETColors
   .byte WHITE,DK_GREEN+14,DK_GREEN+12,DK_GREEN+10
   .byte DK_GREEN+10,DK_GREEN+10,BLACK

   ETAnimationLSBTable_A
   .byte <ETWalkSprite_A0,<ETWalkSprite_A1,<ETWalkSprite_A2
   
	ETAnimationLSBTable_B
   .byte <ETWalkSprite_B0,<ETWalkSprite_B1,<ETWalkSprite_B2


regex for converting from ET source 
	find:
		(\.byte\s\$)([0-9A-Za-z]{2})(\s)(;)
	replace:
		"\2", //

 */

// NTSC color constants
var ET_COLORS = {
  BLACK: "00",
  WHITE: "0E",
  LT_RED: "20",
  RED: "30",
  ORANGE: "40",
  ORANGE_2: this.ORANGE,
  RED_2: this.ORANGE,
  DK_PINK: "50",
  DK_BLUE: "70",
  BLUE: "80",
  LT_BLUE: "90",
  GREEN: "C0",
  GREEN_2: this.GREEN,
  DK_GREEN: "D0",
  DK_GREEN_2: this.DK_GREEN,
  LT_BROWN: "E0",
  LT_BROWN_2: this.LT_BROWN,
  BROWN: "F0",
  NTSC_BROWN: this.BROWN
};

var ETWalkSprite_A0 = [
  "FE", // |XXXXXXX.|
  "FF", // |XXXXXXXX|
  "C3", // |XX....XX|
  "0F", // |....XXXX|
  "FF", // |XXXXXXXX|
  "3F", // |..XXXXXX|
  "2B", // |..X.X.XX|
  "E7", // |XXX..XXX|
  "00" // |........|
];

var ETWalkSprite_B0 = [
  "BF", // |X.XXXXXX|
  "FF", // |XXXXXXXX|
  "03", // |......XX|
  "1F", // |...XXXXX|
  "BF", // |X.XXXXXX|
  "3F", // |..XXXXXX|
  "63", // |.XX...XX|
  "00" // |........|
];


var ETWalkSprite_A1 = [
  "FE", // |XXXXXXX.|
  "FF", // |XXXXXXXX|
  "C3", // |XX....XX|
  "0F", // |....XXXX|
  "FF", // |XXXXXXXX|
  "3F", // |..XXXXXX|
  "3F", // |..XXXXXX|
  "60", // |.XX.....|
  "00" // |........|
];

var ETWalkSprite_B1 = [
  "BF", // |X.XXXXXX|
  "FF", // |XXXXXXXX|
  "03", // |......XX|
  "1F", // |...XXXXX|
  "BF", // |X.XXXXXX|
  "3F", // |..XXXXXX|
  "27", // |..X..XXX|
  "E0", // |XXX.....|
  "00" // |........|
];

var ETWalkSprite_A2 = [
  "FE", // |XXXXXXX.|
  "FF", // |XXXXXXXX|
  "C3", // |XX....XX|
  "0F", // |....XXXX|
  "FF", // |XXXXXXXX|
  "3F", // |..XXXXXX|
  "7E", // |.XXXXXX.|
  "03", // |......XX|
  "00", // |........|
];

var ETWalkSprite_B2 = [
  "BF", // |X.XXXXXX|
  "FF", // |XXXXXXXX|
  "03", // |......XX|
  "1F", // |...XXXXX|
  "BF", // |X.XXXXXX|
  "3F", // |..XXXXXX|
  "E1", // |XXX....X|
  "07", // |.....XXX|
  "00", // |........|
];

var ETExtensionSprite_B3 = [
  "BF", // |X.XXXXXX|
  "FF", // |XXXXXXXX|
  "03", // |......XX|
  "03", // |......XX|
  "03", // |......XX|
  "03", // |......XX|
  "03", // |......XX|
  "1F", // |...XXXXX|
  "BF", // |X.XXXXXX|
  "3F", // |..XXXXXX|
  "63", // |.XX...XX|
  "00" // |........|
];
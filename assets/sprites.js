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

/*

	ETColors
   .byte WHITE,DK_GREEN+14,DK_GREEN+12,DK_GREEN+10
   .byte DK_GREEN+10,DK_GREEN+10,BLACK

From the Fix ET article:

Original Colors:
		17F9: 0E DE DC DA DA DA

		New Colors:
		17F9: 0E FE FC F8 F8 F8

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


var TitleETGraphics = ``;

var TitleETGraphics_0 = `
  .byte $D0 ; |XX.X....|
  .byte $00 ; |........|
  .byte $D0 ; |XX.X....|
  .byte $E0 ; |XXX.....|
  .byte $10 ; |...X....|
  .byte $E0 ; |XXX.....|
  .byte $50 ; |.X.X....|
  .byte $F0 ; |XXXX....|
  .byte $40 ; |.X......|
  .byte $F0 ; |XXXX....|
  .byte $A0 ; |X.X.....|
  .byte $D0 ; |XX.X....|
  .byte $A8 ; |X.X.X...|
  .byte $F4 ; |XXXX.X..|
  .byte $C8 ; |XX..X...|
  .byte $F0 ; |XXXX....|
  .byte $A8 ; |X.X.X...|
  .byte $D4 ; |XX.X.X..|
  .byte $EC ; |XXX.XX..|
  .byte $D8 ; |XX.XX...|
  .byte $74 ; |.XXX.X..|
  .byte $F8 ; |XXXXX...|
  .byte $B4 ; |X.XX.X..|
  .byte $F8 ; |XXXXX...|
  .byte $F4 ; |XXXX.X..|
  .byte $58 ; |.X.XX...|
  .byte $F8 ; |XXXXX...|
  .byte $D8 ; |XX.XX...|
  .byte $D0 ; |XX.X....|
  .byte $D0 ; |XX.X....|
  .byte $A0 ; |X.X.....|
  .byte $40 ; |.X......|
  .byte $80 ; |X.......|
`;

var TitleETGraphics_1 = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $03 ; |......XX|
  .byte $02 ; |......X.|
  .byte $07 ; |.....XXX|
  .byte $05 ; |.....X.X|
  .byte $07 ; |.....XXX|
  .byte $0D ; |....XX.X|
  .byte $0F ; |....XXXX|
  .byte $1D ; |...XXX.X|
  .byte $16 ; |...X.XX.|
  .byte $1F ; |...XXXXX|
  .byte $1B ; |...XX.XX|
  .byte $1D ; |...XXX.X|
  .byte $1E ; |...XXXX.|
  .byte $0F ; |....XXXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $03 ; |......XX|
  .byte $01 ; |.......X|
  .byte $00 ; |........|
`;

var TitleETGraphics_2 = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $01 ; |.......X|
  .byte $03 ; |......XX|
  .byte $06 ; |.....XX.|
  .byte $0D ; |....XX.X|
  .byte $08 ; |....X...|
  .byte $1B ; |...XX.XX|
  .byte $1B ; |...XX.XX|
  .byte $1F ; |...XXXXX|
  .byte $0F ; |....XXXX|
  .byte $2F ; |..X.XXXX|
  .byte $1F ; |...XXXXX|
  .byte $37 ; |..XX.XXX|
  .byte $3F ; |..XXXXXX|
  .byte $DB ; |XX.XX.XX|
  .byte $7F ; |.XXXXXXX|
  .byte $DD ; |XX.XXX.X|
  .byte $6F ; |.XX.XXXX|
  .byte $B5 ; |X.XX.X.X|
  .byte $1B ; |...XX.XX|
  .byte $1D ; |...XXX.X|
  .byte $17 ; |...X.XXX|
  .byte $3A ; |..XXX.X.|
  .byte $1D ; |...XXX.X|
  .byte $1A ; |...XX.X.|
  .byte $B5 ; |X.XX.X.X|
  .byte $5E ; |.X.XXXX.|
  .byte $F5 ; |XXXX.X.X|
  .byte $6B ; |.XX.X.XX|
  .byte $A7 ; |X.X..XXX|
  .byte $5F ; |.X.XXXXX|
  .byte $BF ; |X.XXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FE ; |XXXXXXX.|
  .byte $7B ; |.XXXX.XX|
`;

var TitleETGraphics_3 = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $7F ; |.XXXXXXX|
  .byte $C0 ; |XX......|
  .byte $AA ; |X.X.X.X.|
  .byte $7F ; |.XXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $EF ; |XXX.XXXX|
  .byte $00 ; |........|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $DF ; |XX.XXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $DF ; |XX.XXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $DF ; |XX.XXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FD ; |XXXXXX.X|
  .byte $27 ; |..X..XXX|
  .byte $25 ; |..X..X.X|
  .byte $FE ; |XXXXXXX.|
  .byte $FB ; |XXXXX.XX|
  .byte $FE ; |XXXXXXX.|
  .byte $7B ; |.XXXX.XX|
  .byte $D6 ; |XX.X.XX.|
  .byte $BF ; |X.XXXXXX|
  .byte $D7 ; |XX.X.XXX|
  .byte $EF ; |XXX.XXXX|
  .byte $D7 ; |XX.X.XXX|
  .byte $FF ; |XXXXXXXX|
  .byte $D7 ; |XX.X.XXX|
  .byte $E7 ; |XXX..XXX|
  .byte $D3 ; |XX.X..XX|
  .byte $A1 ; |X.X....X|
  .byte $80 ; |X.......|
  .byte $00 ; |........|
`;

var TitleETGraphics_4 = `
  .byte $01 ; |.......X|
  .byte $00 ; |........|
  .byte $81 ; |X......X|
  .byte $C1 ; |XX.....X|
  .byte $61 ; |.XX....X|
  .byte $30 ; |..XX....|
  .byte $98 ; |X..XX...|
  .byte $9E ; |X..XXXX.|
  .byte $0F ; |....XXXX|
  .byte $E7 ; |XXX..XXX|
  .byte $F7 ; |XXXX.XXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $ED ; |XXX.XX.X|
  .byte $FA ; |XXXXX.X.|
  .byte $F7 ; |XXXX.XXX|
  .byte $EF ; |XXX.XXXX|
  .byte $BF ; |X.XXXXXX|
  .byte $FD ; |XXXXXX.X|
  .byte $5A ; |.X.XX.X.|
  .byte $FF ; |XXXXXXXX|
  .byte $D5 ; |XX.X.X.X|
  .byte $A2 ; |X.X...X.|
  .byte $63 ; |.XX...XX|
  .byte $E3 ; |XXX...XX|
  .byte $67 ; |.XX..XXX|
  .byte $E3 ; |XXX...XX|
  .byte $A2 ; |X.X...X.|
  .byte $D5 ; |XX.X.X.X|
  .byte $7F ; |.XXXXXXX|
  .byte $AA ; |X.X.X.X.|
  .byte $D5 ; |XX.X.X.X|
  .byte $FB ; |XXXXX.XX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $2A ; |..X.X.X.|
`;

var TitleETGraphics_5 = `
  .byte $FF ; |XXXXXXXX|
  .byte $15 ; |...X.X.X|
  .byte $FF ; |XXXXXXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $4A ; |.X..X.X.|
  .byte $BF ; |X.XXXXXX|
  .byte $5F ; |.X.XXXXX|
  .byte $2D ; |..X.XX.X|
  .byte $57 ; |.X.X.XXX|
  .byte $BB ; |X.XXX.XX|
  .byte $DD ; |XX.XXX.X|
  .byte $EE ; |XXX.XXX.|
  .byte $FB ; |XXXXX.XX|
  .byte $DD ; |XX.XXX.X|
  .byte $EE ; |XXX.XXX.|
  .byte $FF ; |XXXXXXXX|
  .byte $57 ; |.X.X.XXX|
  .byte $FF ; |XXXXXXXX|
  .byte $BF ; |X.XXXXXX|
  .byte $EB ; |XXX.X.XX|
  .byte $B5 ; |X.XX.X.X|
  .byte $DF ; |XX.XXXXX|
  .byte $EA ; |XXX.X.X.|
  .byte $FF ; |XXXXXXXX|
  .byte $5A ; |.X.XX.X.|
  .byte $FF ; |XXXXXXXX|
  .byte $6D ; |.XX.XX.X|
  .byte $F7 ; |XXXX.XXX|
  .byte $BE ; |X.XXXXX.|
  .byte $5F ; |.X.XXXXX|
  .byte $B6 ; |X.XX.XX.|
  .byte $7E ; |.XXXXXX.|
  .byte $F6 ; |XXXX.XX.|
  .byte $F5 ; |XXXX.X.X|
  .byte $F4 ; |XXXX.X..|
  .byte $E8 ; |XXX.X...|
  .byte $D0 ; |XX.X....|
  .byte $80 ; |X.......|
  .byte $00 ; |........|
  .byte $00 ; |........|
`;

// NextRoundScoreMSB
//   .byte $00,$10,$22,$34,$45,$63,$78,$99
  
// NextRoundEnergyValues
//   .byte $99,$92,$84,$76,$68,$59,$51,$42

// ETColors
//   .byte WHITE,DK_GREEN+14,DK_GREEN+12,DK_GREEN+10
//   .byte DK_GREEN+10,DK_GREEN+10,BLACK


var WideDiamondPitGraphics = ``;

var WideDiamondPitPF1Graphics = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
`;

var KernelJumpTableIndex = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $0F ; |....XXXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $07 ; |.....XXX|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
  .byte $02 ; |......X.|
`;

var WideDiamondPitPF2Graphics = `
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $80 ; |X.......|
  .byte $C0 ; |XX......|
  .byte $E0 ; |XXX.....|
  .byte $E0 ; |XXX.....|
  .byte $E0 ; |XXX.....|
  .byte $C0 ; |XX......|
  .byte $80 ; |X.......|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $01 ; |.......X|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $80 ; |X.......|
  .byte $C0 ; |XX......|
  .byte $E0 ; |XXX.....|
  .byte $E0 ; |XXX.....|
  .byte $E0 ; |XXX.....|
  .byte $C0 ; |XX......|
  .byte $80 ; |X.......|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
  .byte $00 ; |........|
`;

var ForestGraphics = ``;

var ForestPF1Graphics = `
  .byte $AA ; |X.X.X.X.|
  .byte $55 ; |.X.X.X.X|
  .byte $AB ; |X.X.X.XX|
  .byte $57 ; |.X.X.XXX|
  .byte $A2 ; |X.X...X.|
  .byte $C1 ; |XX.....X|
  .byte $C0 ; |XX......|
  .byte $55 ; |.X.X.X.X|
  .byte $A2 ; |X.X...X.|
  .byte $C1 ; |XX.....X|
  .byte $C0 ; |XX......|
  .byte $55 ; |.X.X.X.X|
  .byte $A2 ; |X.X...X.|
  .byte $C1 ; |XX.....X|
  .byte $C0 ; |XX......|
  .byte $55 ; |.X.X.X.X|
  .byte $A2 ; |X.X...X.|
  .byte $C1 ; |XX.....X|
  .byte $D0 ; |XX.X....|
  .byte $55 ; |.X.X.X.X|
  .byte $BA ; |X.XXX.X.|
  .byte $7D ; |.XXXXX.X|
  .byte $FC ; |XXXXXX..|
  .byte $55 ; |.X.X.X.X|
  .byte $BA ; |X.XXX.X.|
  .byte $7D ; |.XXXXX.X|
  .byte $FE ; |XXXXXXX.|
  .byte $54 ; |.X.X.X..|
  .byte $38 ; |..XXX...|
  .byte $7D ; |.XXXXX.X|
  .byte $FE ; |XXXXXXX.|
  .byte $54 ; |.X.X.X..|
  .byte $38 ; |..XXX...|
  .byte $7D ; |.XXXXX.X|
  .byte $FE ; |XXXXXXX.|
  .byte $54 ; |.X.X.X..|
  .byte $38 ; |..XXX...|
  .byte $55 ; |.X.X.X.X|
  .byte $AA ; |X.X.X.X.|
  .byte $55 ; |.X.X.X.X|
  .byte $2B ; |..X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $83 ; |X.....XX|
  .byte $01 ; |.......X|
  .byte $AB ; |X.X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $83 ; |X.....XX|
  .byte $01 ; |.......X|
  .byte $AB ; |X.X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $83 ; |X.....XX|
  .byte $01 ; |.......X|
  .byte $AB ; |X.X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $83 ; |X.....XX|
  .byte $01 ; |.......X|
  .byte $AB ; |X.X.X.XX|
  .byte $C5 ; |XX...X.X|
  .byte $82 ; |X.....X.|
  .byte $C1 ; |XX.....X|
  .byte $EA ; |XXX.X.X.|
  .byte $E5 ; |XXX..X.X|
  .byte $AA ; |X.X.X.X.|
  .byte $D5 ; |XX.X.X.X|
`;

var ForestPF2Graphics = `
  .byte $55 ; |.X.X.X.X|
  .byte $AB ; |X.X.X.XX|
  .byte $57 ; |.X.X.XXX|
  .byte $2F ; |..X.XXXX|
  .byte $15 ; |...X.X.X|
  .byte $0B ; |....X.XX|
  .byte $55 ; |.X.X.X.X|
  .byte $2A ; |..X.X.X.|
  .byte $15 ; |...X.X.X|
  .byte $0E ; |....XXX.|
  .byte $5F ; |.X.XXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $15 ; |...X.X.X|
  .byte $0E ; |....XXX.|
  .byte $5F ; |.X.XXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $15 ; |...X.X.X|
  .byte $0E ; |....XXX.|
  .byte $5F ; |.X.XXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $15 ; |...X.X.X|
  .byte $0E ; |....XXX.|
  .byte $5F ; |.X.XXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $55 ; |.X.X.X.X|
  .byte $AE ; |X.X.XXX.|
  .byte $54 ; |.X.X.X..|
  .byte $A8 ; |X.X.X...|
  .byte $D0 ; |XX.X....|
  .byte $EA ; |XXX.X.X.|
  .byte $F4 ; |XXXX.X..|
  .byte $A8 ; |X.X.X...|
  .byte $D0 ; |XX.X....|
  .byte $EA ; |XXX.X.X.|
  .byte $F4 ; |XXXX.X..|
  .byte $A8 ; |X.X.X...|
  .byte $D0 ; |XX.X....|
  .byte $EA ; |XXX.X.X.|
  .byte $F4 ; |XXXX.X..|
  .byte $A8 ; |X.X.X...|
  .byte $D1 ; |XX.X...X|
  .byte $EB ; |XXX.X.XX|
  .byte $F7 ; |XXXX.XXX|
  .byte $AA ; |X.X.X.X.|
  .byte $D5 ; |XX.X.X.X|
  .byte $EB ; |XXX.X.XX|
  .byte $C7 ; |XX...XXX|
  .byte $82 ; |X.....X.|
  .byte $81 ; |X......X|
  .byte $AB ; |X.X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $82 ; |X.....X.|
  .byte $01 ; |.......X|
  .byte $AB ; |X.X.X.XX|
  .byte $47 ; |.X...XXX|
  .byte $8A ; |X...X.X.|
  .byte $1D ; |...XXX.X|
  .byte $BE ; |X.XXXXX.|
  .byte $7F ; |.XXXXXXX|
  .byte $AA ; |X.X.X.X.|
  .byte $1D ; |...XXX.X|
  .byte $BE ; |X.XXXXX.|
  .byte $7F ; |.XXXXXXX|
  .byte $AA ; |X.X.X.X.|
`;

// KernelJumpTable
//   .word JumpIntoGameKernel-1
//   .word TitleScreenKernel-1

// PsuedoRandomValueIncTable
//   .byte 115,13,91,213
  
//   BOUNDARY 0

var ETSprites = `
  .byte $FE ; |XXXXXXX.|
  .byte $FF ; |XXXXXXXX|
  .byte $C3 ; |XX....XX|
  .byte $0F ; |....XXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $2B ; |..X.X.XX|
  .byte $E7 ; |XXX..XXX|
  .byte $00 ; |........|
`;
var ETWalkSprite_A0 = ETSprites;

var ETExtensionSprites_A = `
  .byte $FE ; |XXXXXXX.|
  .byte $FF ; |XXXXXXXX|
  .byte $C3 ; |XX....XX|
  .byte $03 ; |......XX|
  .byte $0F ; |....XXXX|
  .byte $FF ; |XXXXXXXX|
  .byte $3F ; |..XXXXXX|
  .byte $2B ; |..X.X.XX|
  .byte $E7 ; |XXX..XXX|
  .byte $00 ; |........|
`;
var ETExtensionSprite_A0 = ETExtensionSprites_A;

var ETExtensionSprite_A1 = `
   .byte $FE ; |XXXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $C3 ; |XX....XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $0F ; |....XXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $2B ; |..X.X.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $00 ; |........|
`;
var ETExtensionSprite_A2 = `
   .byte $FE ; |XXXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $C3 ; |XX....XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $0F ; |....XXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $2B ; |..X.X.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $00 ; |........|
`;

var ETExtensionSprite_A3 = `
   .byte $FE ; |XXXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $0F ; |....XXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $2B ; |..X.X.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $00 ; |........|
`;

var ETWalkSprite_B0 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $63 ; |.XX...XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var ETExtensionSprite_B0 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $63 ; |.XX...XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;
var ETExtensionSprites_B = ETExtensionSprite_B0;


var ETExtensionSprite_B1 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $63 ; |.XX...XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var ETExtensionSprite_B2 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $63 ; |.XX...XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var ETExtensionSprite_B3 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $63 ; |.XX...XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;



var ETDead_0 = `
   .byte $E0 ; |XXX.....|
   .byte $A2 ; |X.X...X.|
   .byte $E7 ; |XXX..XXX|
   .byte $EE ; |XXX.XXX.|
   .byte $FB ; |XXXXX.XX|
   .byte $00 ; |........|
`;

var ETDead_1 = `
   .byte $E0 ; |XXX.....|
   .byte $E3 ; |XXX...XX|
   .byte $EF ; |XXX.XXXX|
   .byte $ED ; |XXX.XX.X|
   .byte $FF ; |XXXXXXXX|
   .byte $00 ; |........|
`;


var ETWalkSprite_A1 = `
   .byte $FE ; |XXXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $C3 ; |XX....XX|
   .byte $0F ; |....XXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $60 ; |.XX.....|
   .byte $00 ; |........|
`;

var ETWalkSprite_B1 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $27 ; |..X..XXX|
   .byte $E0 ; |XXX.....|
   .byte $00 ; |........|
`;

var ETWalkSprite_A2 = `
   .byte $FE ; |XXXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $C3 ; |XX....XX|
   .byte $0F ; |....XXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $7E ; |.XXXXXX.|
   .byte $03 ; |......XX|
   .byte $00 ; |........|
`;

var ETWalkSprite_B2 = `
   .byte $BF ; |X.XXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $03 ; |......XX|
   .byte $1F ; |...XXXXX|
   .byte $BF ; |X.XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $E1 ; |XXX....X|
   .byte $07 ; |.....XXX|
   .byte $00 ; |........|
`;

var ETTitle_E = `
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $F8 ; |XXXXX...|
   .byte $DC ; |XX.XXX..|
   .byte $CE ; |XX..XXX.|
   .byte $C6 ; |XX...XX.|
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $D8 ; |XX.XX...|
   .byte $CC ; |XX..XX..|
   .byte $C6 ; |XX...XX.|
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $78 ; |.XXXX...|
   .byte $3C ; |..XXXX..|
   .byte $1E ; |...XXXX.|
`;

var ETTitle_T = `
   .byte $10 ; |...X....|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $F8 ; |XXXXX...|
   .byte $78 ; |.XXXX...|
   .byte $3C ; |..XXXX..|
   .byte $1E ; |...XXXX.|
   .byte $0F ; |....XXXX|
`;

// lda #$0F  ; 2 enable missiles for dots in E.T.
// 
var ETTitle_dot = '$0F'; 

var FlowerSpritesA = ``;

var Flower_A0 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $0A ; |....X.X.|
   .byte $1A ; |...XX.X.|
   .byte $76 ; |.XXX.XX.|
   .byte $3A ; |..XXX.X.|
`;

var Flower_A1 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $1C ; |...XXX..|
   .byte $20 ; |..X.....|
   .byte $1C ; |...XXX..|
   .byte $38 ; |..XXX...|
`;

var Flower_A2 = `
   .byte $00 ; |........|
   .byte $14 ; |...X.X..|
   .byte $1C ; |...XXX..|
   .byte $10 ; |...X....|
   .byte $1C ; |...XXX..|
   .byte $10 ; |...X....|
   .byte $18 ; |...XX...|
`;

var Flower_A3 = `
   .byte $14 ; |...X.X..|
   .byte $1C ; |...XXX..|
   .byte $14 ; |...X.X..|
   .byte $08 ; |....X...|
   .byte $0C ; |....XX..|
   .byte $08 ; |....X...|
   .byte $18 ; |...XX...|
`;

var FlowerSpritesB = ``;

var Flower_B0 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $0D ; |....XX.X|
   .byte $07 ; |.....XXX|
   .byte $40 ; |.X......|
   .byte $08 ; |....X...|
`;

var Flower_B1 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $2A ; |..X.X.X.|
   .byte $0A ; |....X.X.|
   .byte $20 ; |..X.....|
   .byte $0A ; |....X.X.|
   .byte $08 ; |....X...|
`;

var Flower_B2 = `
   .byte $00 ; |........|
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $10 ; |...X....|
   .byte $12 ; |...X..X.|
   .byte $28 ; |..X.X...|
   .byte $08 ; |....X...|
`;

var Flower_B3 = `
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $08 ; |....X...|
   .byte $0A ; |....X.X.|
   .byte $08 ; |....X...|
   .byte $28 ; |..X.X...|
   .byte $08 ; |....X...|
`;

// FlowerColors 
//    .byte BROWN+14,BROWN+14,BROWN+12,ORANGE+10
//    .byte ORANGE+8,ORANGE+6,ORANGE+4

// EasterEggSpriteValues
//    .byte SHOW_YAR_SPRITE, SHOW_INDY_SPRITE
   
//    BOUNDARY 0


var NumberFonts = ``;

var zero = `
   .byte $FE ; |XXXXXXX.|
   .byte $86 ; |X....XX.|
   .byte $86 ; |X....XX.|
   .byte $86 ; |X....XX.|
   .byte $82 ; |X.....X.|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var one = `
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $08 ; |....X...|
   .byte $08 ; |....X...|
   .byte $08 ; |....X...|
   .byte $00 ; |........|
`;

var two = `
   .byte $FE ; |XXXXXXX.|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $FE ; |XXXXXXX.|
   .byte $02 ; |......X.|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var three = `
   .byte $FE ; |XXXXXXX.|
   .byte $86 ; |X....XX.|
   .byte $06 ; |.....XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $02 ; |......X.|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var four = `
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $FE ; |XXXXXXX.|
   .byte $82 ; |X.....X.|
   .byte $82 ; |X.....X.|
   .byte $80 ; |X.......|
   .byte $80 ; |X.......|
   .byte $00 ; |........|
`;

var five = `
   .byte $FE ; |XXXXXXX.|
   .byte $86 ; |X....XX.|
   .byte $06 ; |.....XX.|
   .byte $FE ; |XXXXXXX.|
   .byte $80 ; |X.......|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var six = `
   .byte $FE ; |XXXXXXX.|
   .byte $86 ; |X....XX.|
   .byte $86 ; |X....XX.|
   .byte $FE ; |XXXXXXX.|
   .byte $80 ; |X.......|
   .byte $88 ; |X...X...|
   .byte $F8 ; |XXXXX...|
   .byte $00 ; |........|
`;

var seven = `
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $02 ; |......X.|
   .byte $02 ; |......X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var eight = `
   .byte $FE ; |XXXXXXX.|
   .byte $82 ; |X.....X.|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $44 ; |.X...X..|
   .byte $44 ; |.X...X..|
   .byte $7C ; |.XXXXX..|
   .byte $00 ; |........|
`;

var nine = `
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $06 ; |.....XX.|
   .byte $FE ; |XXXXXXX.|
   .byte $82 ; |X.....X.|
   .byte $82 ; |X.....X.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
`;

var Blank = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;


var HSWInitials = `
   .byte $07 ; |.....XXX|
   .byte $01 ; |.......X|
   .byte $57 ; |.X.X.XXX|
   .byte $54 ; |.X.X.X..|
   .byte $77 ; |.XXX.XXX|
   .byte $50 ; |.X.X....|
   .byte $50 ; |.X.X....|
   .byte $00 ; |........|

   .byte $07 ; |.....XXX|
   .byte $55 ; |.X.X.X.X|
   .byte $71 ; |.XXX...X|
   .byte $73 ; |.XXX..XX|
   .byte $51 ; |.X.X...X|
   .byte $55 ; |.X.X.X.X|
   .byte $57 ; |.X.X.XXX|
   .byte $00 ; |........|
`;

var ElliottSprites = ``;

var Elliott_0 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $7C ; |.XXXXX..|
   .byte $D8 ; |XX.XX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $EC ; |XXX.XX..|
   .byte $82 ; |X.....X.|
   .byte $84 ; |X....X..|
`;

var Elliott_1 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $78 ; |.XXXX...|
   .byte $5C ; |.X.XXX..|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $6C ; |.XX.XX..|
   .byte $60 ; |.XX.....|
   .byte $06 ; |.....XX.|
`;

var Elliott_2 = `
   .byte $00 ; |........|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $78 ; |.XXXX...|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $20 ; |..X.....|
   .byte $38 ; |..XXX...|
`;

var Elliott_3 = `
   .byte $00 ; |........|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $78 ; |.XXXX...|
   .byte $00 ; |........|
`;

var Elliott_4 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $38 ; |..XXX...|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $68 ; |.XX.X...|
   .byte $CC ; |XX..XX..|
   .byte $00 ; |........|
`;

var Elliott_5 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $78 ; |.XXXX...|
   .byte $DC ; |XX.XXX..|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $68 ; |.XX.X...|
   .byte $CC ; |XX..XX..|
`;

// ElliottColors_A
//    .byte BLACK,BLACK,ORANGE_2+8,RED+10,RED+10,RED+10,LT_BLUE+10
//    .byte LT_BLUE+10,LT_BLUE+10,DK_GREEN_2+14,DK_GREEN_2+14


var Elliott_6 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $78 ; |.XXXX...|
   .byte $5C ; |.X.XXX..|
   .byte $B8 ; |X.XXX...|
   .byte $38 ; |..XXX...|
   .byte $68 ; |.XX.X...|
   .byte $CC ; |XX..XX..|
   .byte $86 ; |X....XX.|
   .byte $00 ; |........|
`;

var Elliott_7 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $78 ; |.XXXX...|
   .byte $5C ; |.X.XXX..|
   .byte $78 ; |.XXXX...|
   .byte $18 ; |...XX...|
   .byte $78 ; |.XXXX...|
   .byte $60 ; |.XX.....|
   .byte $06 ; |.....XX.|
   .byte $00 ; |........|
`;

var Elliott_8 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $78 ; |.XXXX...|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $28 ; |..X.X...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
`;

var Elliott_9 = `
   .byte $10 ; |...X....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $38 ; |..XXX...|
   .byte $30 ; |..XX....|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $60 ; |.XX.....|
   .byte $00 ; |........|
`;

var Elliott_10 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $38 ; |..XXX...|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $18 ; |...XX...|
   .byte $28 ; |..X.X...|
   .byte $0C ; |....XX..|
   .byte $C0 ; |XX......|
   .byte $00 ; |........|
`;

var Elliott_11 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $78 ; |.XXXX...|
   .byte $5C ; |.X.XXX..|
   .byte $B8 ; |X.XXX...|
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $CC ; |XX..XX..|
   .byte $CC ; |XX..XX..|
`;

// ElliottColors_B
//    .byte BLACK,ORANGE_2+8,RED+4,RED+4,RED+4,LT_BLUE+10,LT_BLUE+10
//    .byte LT_BLUE+10,LT_BLUE+10,DK_GREEN_2+14,DK_GREEN_2+14


var FourDiamondPitGraphics = ``;

var FourDiamondPitPF1Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $1F ; |...XXXXX|
   .byte $1F ; |...XXXXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $01 ; |.......X|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $1F ; |...XXXXX|
   .byte $1F ; |...XXXXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $01 ; |.......X|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var EightPitGraphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $C0 ; |XX......|
   .byte $F0 ; |XXXX....|
   .byte $F8 ; |XXXXX...|
   .byte $F8 ; |XXXXX...|
   .byte $F8 ; |XXXXX...|
   .byte $E0 ; |XXX.....|
   .byte $80 ; |X.......|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $01 ; |.......X|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $80 ; |X.......|
   .byte $E0 ; |XXX.....|
   .byte $F8 ; |XXXXX...|
   .byte $F8 ; |XXXXX...|
   .byte $F8 ; |XXXXX...|
   .byte $F0 ; |XXXX....|
   .byte $C0 ; |XX......|
`;

var ArrowPitGraphics = ``;

var ArrowPitPF1Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $01 ; |.......X|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $01 ; |.......X|
`;

var ArrowPitPF2Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $0F ; |....XXXX|
   .byte $0F ; |....XXXX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $01 ; |.......X|
   .byte $00 ; |........|
   .byte $01 ; |.......X|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $0F ; |....XXXX|
   .byte $0F ; |....XXXX|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $03 ; |......XX|
   .byte $07 ; |.....XXX|
   .byte $03 ; |......XX|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var Telephone = `
   .byte $3C ; |..XXXX..|
   .byte $20 ; |..X.....|
   .byte $3C ; |..XXXX..|
   .byte $20 ; |..X.....|
   .byte $3C ; |..XXXX..|
   .byte $18 ; |...XX...|
   .byte $DB ; |XX.XX.XX|
   .byte $FF ; |XXXXXXXX|
`;

// TelephoneIconLSBPtrs
//    .byte <Telephone,<Telephone - 3,<Telephone - 5,<Telephone - 9


var YarSprites = ``;

var Yar_0 = `
   .byte $24 ; |..X..X..|
   .byte $18 ; |...XX...|
   .byte $24 ; |..X..X..|
   .byte $24 ; |..X..X..|
   .byte $7E ; |.XXXXXX.|
   .byte $5A ; |.X.XX.X.|
   .byte $DB ; |XX.XX.XX|
   .byte $3C ; |..XXXX..|
`;

var Yar_1 = `
   .byte $24 ; |..X..X..|
   .byte $99 ; |X..XX..X|
   .byte $A5 ; |X.X..X.X|
   .byte $E7 ; |XXX..XXX|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
`;

   // BOUNDARY 0


var GameIcons = ``;

var BlankIcon = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var WarpLeftIcon = `
   .byte $18 ; |...XX...|
   .byte $30 ; |..XX....|
   .byte $60 ; |.XX.....|
   .byte $FF ; |XXXXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $60 ; |.XX.....|
   .byte $30 ; |..XX....|
   .byte $18 ; |...XX...|
`;

var WarpRightIcon = `
   .byte $18 ; |...XX...|
   .byte $0C ; |....XX..|
   .byte $06 ; |.....XX.|
   .byte $FF ; |XXXXXXXX|
   .byte $FF ; |XXXXXXXX|
   .byte $06 ; |.....XX.|
   .byte $0C ; |....XX..|
`;

var WarpUpIcon = `
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $DB ; |XX.XX.XX|
   .byte $7E ; |.XXXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $18 ; |...XX...|
`;

var WarpDownIcon = `
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $7E ; |.XXXXXX.|
   .byte $DB ; |XX.XX.XX|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
`;

var QuestionIcon = `
   .byte $38 ; |..XXX...|
   .byte $00 ; |........|
   .byte $38 ; |..XXX...|
   .byte $1C ; |...XXX..|
   .byte $0E ; |....XXX.|
   .byte $66 ; |.XX..XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $3C ; |..XXXX..|
`;

var EatCandyIcon_0 = `
   .byte $00 ; |........|
   .byte $7E ; |.XXXXXX.|
   .byte $C3 ; |XX....XX|
   .byte $99 ; |X..XX..X|
   .byte $99 ; |X..XX..X|
   .byte $C3 ; |XX....XX|
   .byte $66 ; |.XX..XX.|
   .byte $3C ; |..XXXX..|
`;

var WashingtonIcon = `
   .byte $7F ; |.XXXXXXX|
   .byte $7F ; |.XXXXXXX|
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $3E ; |..XXXXX.|
   .byte $7F ; |.XXXXXXX|
`;

var CallElliottIcon = `
   .byte $02 ; |......X.|
   .byte $74 ; |.XXX.X..|
   .byte $C0 ; |XX......|
   .byte $F7 ; |XXXX.XXX|
   .byte $D0 ; |XX.X....|
   .byte $F4 ; |XXXX.X..|
   .byte $62 ; |.XX...X.|
   .byte $01 ; |.......X|
`;

var CallShipIcon = `
   .byte $42 ; |.X....X.|
   .byte $24 ; |..X..X..|
   .byte $7E ; |.XXXXXX.|
   .byte $BD ; |X.XXXX.X|
   .byte $FF ; |XXXXXXXX|
   .byte $5A ; |.X.XX.X.|
   .byte $3C ; |..XXXX..|
   .byte $24 ; |..X..X..|
`;

var LandingZoneIcon = `
   .byte $00 ; |........|
   .byte $7F ; |.XXXXXXX|
   .byte $49 ; |.X..X..X|
   .byte $5D ; |.X.XXX.X|
   .byte $77 ; |.XXX.XXX|
   .byte $5D ; |.X.XXX.X|
   .byte $49 ; |.X..X..X|
   .byte $7F ; |.XXXXXXX|
`;

var LevitateIcon = `
   .byte $FF ; |XXXXXXXX|
   .byte $00 ; |........|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $7E ; |.XXXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $18 ; |...XX...|
`;

var ReviveFlowerIcon = `
   .byte $00 ; |........|
   .byte $3E ; |..XXXXX.|
   .byte $63 ; |.XX...XX|
   .byte $41 ; |.X.....X|
   .byte $08 ; |....X...|
   .byte $00 ; |........|
   .byte $22 ; |..X...X.|
   .byte $22 ; |..X...X.|
`;

var CountdownClockIcons = ``;

var CountdownClock_0 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $10 ; |...X....|
   .byte $30 ; |..XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_1 = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $E0 ; |XXX.....|
   .byte $D0 ; |XX.X....|
   .byte $B0 ; |X.XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_2 = `
   .byte $00 ; |........|
   .byte $80 ; |X.......|
   .byte $C0 ; |XX......|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $D0 ; |XX.X....|
   .byte $B0 ; |X.XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_3 = `
   .byte $70 ; |.XXX....|
   .byte $B0 ; |X.XX....|
   .byte $D0 ; |XX.X....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $D0 ; |XX.X....|
   .byte $B0 ; |X.XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_4 = `   
   .byte $7E ; |.XXXXXX.|
   .byte $BC ; |X.XXXX..|
   .byte $D8 ; |XX.XX...|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $D0 ; |XX.X....|
   .byte $B0 ; |X.XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_5 = `   
   .byte $7E ; |.XXXXXX.|
   .byte $BD ; |X.XXXX.X|
   .byte $DB ; |XX.XX.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $E0 ; |XXX.....|
   .byte $D0 ; |XX.X....|
   .byte $B0 ; |X.XX....|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_6 = `   
   .byte $7E ; |.XXXXXX.|
   .byte $BD ; |X.XXXX.X|
   .byte $DB ; |XX.XX.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $E7 ; |XXX..XXX|
   .byte $D3 ; |XX.X..XX|
   .byte $B1 ; |X.XX...X|
   .byte $70 ; |.XXX....|
`;

var CountdownClock_7 = `
   .byte $7E ; |.XXXXXX.|
   .byte $BD ; |X.XXXX.X|
   .byte $DB ; |XX.XX.XX|
   .byte $E7 ; |XXX..XXX|
   .byte $E7 ; |XXX..XXX|
   .byte $DB ; |XX.XX.XX|
   .byte $BD ; |X.XXXX.X|
   .byte $7E ; |.XXXXXX.|
`;

var EatCandyIcon_1 = `
   .byte $00 ; |........|
   .byte $3C ; |..XXXX..|
   .byte $7E ; |.XXXXXX.|
   .byte $C3 ; |XX....XX|
   .byte $7E ; |.XXXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $18 ; |...XX...|
   .byte $00 ; |........|
`;


var Copyright_0 = `
   .byte $79 ; |.XXXX..X|
   .byte $85 ; |X....X.X|
   .byte $B5 ; |X.XX.X.X|
   .byte $A5 ; |X.X..X.X|
   .byte $B5 ; |X.XX.X.X|
   .byte $85 ; |X....X.X|
   .byte $79 ; |.XXXX..X|
   .byte $00 ; |........|
`;

var Copyright_1 = `
   .byte $17 ; |...X.XXX|
   .byte $15 ; |...X.X.X|
   .byte $15 ; |...X.X.X|
   .byte $77 ; |.XXX.XXX|
   .byte $55 ; |.X.X.X.X|
   .byte $55 ; |.X.X.X.X|
   .byte $77 ; |.XXX.XXX|
   .byte $00 ; |........|
`;

var Copyright_2 = `
   .byte $71 ; |.XXX...X|
   .byte $41 ; |.X.....X|
   .byte $41 ; |.X.....X|
   .byte $71 ; |.XXX...X|
   .byte $11 ; |...X...X|
   .byte $51 ; |.X.X...X|
   .byte $70 ; |.XXX....|
   .byte $00 ; |........|
`;

var Copyright_3 = `
   .byte $49 ; |.X..X..X|
   .byte $49 ; |.X..X..X|
   .byte $49 ; |.X..X..X|
   .byte $C9 ; |XX..X..X|
   .byte $49 ; |.X..X..X|
   .byte $49 ; |.X..X..X|
   .byte $BE ; |X.XXXXX.|
   .byte $00 ; |........|
`;

var Copyright_4 = `
   .byte $55 ; |.X.X.X.X|
   .byte $55 ; |.X.X.X.X|
   .byte $55 ; |.X.X.X.X|
   .byte $D9 ; |XX.XX..X|
   .byte $55 ; |.X.X.X.X|
   .byte $55 ; |.X.X.X.X|
   .byte $99 ; |X..XX..X|
   .byte $00 ; |........|
`;

var ArtistInitials = `
   .byte $1E ; |...XXXX.|
   .byte $1B ; |...XX.XX|
   .byte $7B ; |.XXXX.XX|
   .byte $DB ; |XX.XX.XX|
   .byte $DB ; |XX.XX.XX|
   .byte $1E ; |...XXXX.|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
`;

var PitGraphics = ``;

var PitPF1Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $80 ; |X.......|
   .byte $80 ; |X.......|
   .byte $80 ; |X.......|
   .byte $80 ; |X.......|
   .byte $80 ; |X.......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $C0 ; |XX......|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F8 ; |XXXXX...|
`;

   
// IndyColors

//    ENDIF
   
//    .byte NTSC_BROWN+8,NTSC_BROWN+8,NTSC_BROWN+8,NTSC_BROWN+12
//    .byte NTSC_BROWN+12,NTSC_BROWN+14,NTSC_BROWN+15,NTSC_BROWN+15
//    .byte NTSC_BROWN+15,NTSC_BROWN+15,NTSC_BROWN+15,NTSC_BROWN+15
//    .byte NTSC_BROWN+15,NTSC_BROWN+15,NTSC_BROWN+15,NTSC_BROWN+15


var WashingtonDCGraphics = ``;

var WashingtonPF2Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $1F ; |...XXXXX|
   .byte $1F ; |...XXXXX|
   .byte $00 ; |........|
   .byte $1F ; |...XXXXX|
   .byte $1F ; |...XXXXX|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $04 ; |.....X..|
   .byte $0F ; |....XXXX|
   .byte $1F ; |...XXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $80 ; |X.......|
   .byte $C0 ; |XX......|
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $F8 ; |XXXXX...|
   .byte $FC ; |XXXXXX..|
   .byte $F4 ; |XXXX.X..|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $B0 ; |X.XX....|
   .byte $B0 ; |X.XX....|
   .byte $F0 ; |XXXX....|
   .byte $B0 ; |X.XX....|
   .byte $B0 ; |X.XX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
`;

var WashingtonPF1Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $3F ; |..XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $00 ; |........|
   .byte $3F ; |..XXXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $09 ; |....X..X|
   .byte $1F ; |...XXXXX|
   .byte $3F ; |..XXXXXX|
   .byte $7F ; |.XXXXXXX|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var PitPF2Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var ScientistSprites = ``;

var Scientist_0 = `
   .byte $1A ; |...XX.X.|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $5E ; |.X.XXXX.|
   .byte $16 ; |...X.XX.|
   .byte $3C ; |..XXXX..|
   .byte $7E ; |.XXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $00 ; |........|
   .byte $E7 ; |XXX..XXX|
`;

var Scientist_1 = `
   .byte $1A ; |...XX.X.|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $5C ; |.X.XXX..|
   .byte $2E ; |..X.XXX.|
   .byte $36 ; |..XX.XX.|
   .byte $3C ; |..XXXX..|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $00 ; |........|
   .byte $7C ; |.XXXXX..|
`;

var Scientist_2 = `
   .byte $1A ; |...XX.X.|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $3C ; |..XXXX..|
   .byte $2C ; |..X.XX..|
   .byte $2C ; |..X.XX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $00 ; |........|
   .byte $3C ; |..XXXX..|
`;

var Scientist_3 = `
   .byte $1A ; |...XX.X.|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $6C ; |.XX.XX..|
   .byte $38 ; |..XXX...|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $00 ; |........|
   .byte $76 ; |.XXX.XX.|
`;

var Scientist_4 = `
   .byte $1A ; |...XX.X.|
   .byte $00 ; |........|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $5E ; |.X.XXXX.|
   .byte $36 ; |..XX.XX.|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $00 ; |........|
   .byte $EE ; |XXX.XXX.|
`;

var Scientist_5 = `
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $2E ; |..X.XXX.|
   .byte $3A ; |..XXX.X.|
   .byte $3E ; |..XXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $E6 ; |XXX..XX.|
   .byte $C7 ; |XX...XXX|
`;

var Scientist_6 = `
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $3E ; |..XXXXX.|
   .byte $3A ; |..XXX.X.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $70 ; |.XXX....|
   .byte $1C ; |...XXX..|
`;

var Scientist_7 = `
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $38 ; |..XXX...|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $34 ; |..XX.X..|
   .byte $38 ; |..XXX...|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $38 ; |..XXX...|
`;

var Scientist_8 = `
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $5C ; |.X.XXX..|
   .byte $34 ; |..XX.X..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $76 ; |.XXX.XX.|
   .byte $70 ; |.XXX....|
`;

var Scientist_9 = `
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $6E ; |.XX.XXX.|
   .byte $7A ; |.XXXX.X.|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $EC ; |XXX.XX..|
   .byte $CE ; |XX..XXX.|
`;

// ScientistColors_A
//    .byte LT_BLUE+8,RED_2+6,RED_2+6,RED_2+6,WHITE,WHITE-2,WHITE-4
//    .byte WHITE-4,WHITE-4,WHITE-4,WHITE-4,BLACK+8,BLACK,ORANGE+8
// ScientistColors_B
//    .byte LT_BLUE+8,RED_2+6,RED_2+6,WHITE,WHITE-2,WHITE-4,WHITE-4
//    .byte WHITE-4,WHITE-4,WHITE-4,BLACK+8,BLACK+8,ORANGE+8,ORANGE+8


var H_PhonePiece_0 = `
   .byte $90 ; |X..X....|
   .byte $64 ; |.XX..X..|
   .byte $3F ; |..XXXXXX|
   .byte $64 ; |.XX..X..|
   .byte $90 ; |X..X....|
`;

var H_PhonePiece_1 = `
   .byte $C8 ; |XX..X...|
   .byte $32 ; |..XX..X.|
   .byte $32 ; |..XX..X.|
   .byte $C8 ; |XX..X...|
   .byte $00 ; |........|
`;


var S_PhonePiece_0 = `
   .byte $1F ; |...XXXXX|
   .byte $54 ; |.X.X.X..|
   .byte $54 ; |.X.X.X..|
   .byte $15 ; |...X.X.X|
   .byte $7C ; |.XXXXX..|
`;

var S_PhonePiece_1 = `
   .byte $3E ; |..XXXXX.|
   .byte $A8 ; |X.X.X...|
   .byte $2A ; |..X.X.X.|
   .byte $2A ; |..X.X.X.|
   .byte $F8 ; |XXXXX...|
`;


var W_PhonePiece_0 = `
   .byte $3C ; |..XXXX..|
   .byte $C0 ; |XX......|
   .byte $AA ; |X.X.X.X.|
   .byte $0E ; |....XXX.|
   .byte $E0 ; |XXX.....|
`;

var W_PhonePiece_1 = `
   .byte $60 ; |.XX.....|
   .byte $FE ; |XXXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $38 ; |..XXX...|
   .byte $FF ; |XXXXXXXX|
`;

// PhonePieceColors_A
//    .byte BROWN+14,BROWN+10,BROWN+6,BROWN+4,BROWN+2
// PhonePieceColors_B
//    .byte BROWN+12,BROWN+8,LT_BROWN_2+6,LT_BROWN_2+4,LT_BROWN_2+2


var MotherShip = `
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $7E ; |.XXXXXX.|
   .byte $FF ; |XXXXXXXX|
   .byte $42 ; |.X....X.|
   .byte $C3 ; |XX....XX|
   .byte $42 ; |.X....X.|
   .byte $C3 ; |XX....XX|
   .byte $42 ; |.X....X.|
   .byte $C3 ; |XX....XX|
   .byte $42 ; |.X....X.|
   .byte $C3 ; |XX....XX|
   .byte $7E ; |.XXXXXX.|
   .byte $5A ; |.X.XX.X.|
   .byte $42 ; |.X....X.|
   .byte $E7 ; |XXX..XXX|
`;

// MotherShipColors
//    .byte DK_PINK+8,DK_PINK+6,DK_PINK+4,DK_PINK+2,DK_PINK+4,DK_PINK+6,DK_PINK+8
//    .byte DK_PINK+6,DK_PINK+4,DK_PINK+2,DK_PINK+4,DK_PINK+6,DK_PINK+8,DK_PINK+6
//    .byte DK_PINK+4,DK_PINK+2,DK_PINK+4,DK_PINK+6,DK_PINK+8,DK_PINK+6,DK_PINK+4
//    .byte DK_PINK+2
   
//    IF COMPILE_VERSION = PAL
   
// YarColor
// IndyColors
//    .byte BROWN+12,BROWN+12,BROWN+12,BROWN+12,BROWN+12
//    .byte BROWN+12,BROWN+12,BROWN+12,BROWN+12,BROWN+12
   
//    ENDIF
   
//    BOUNDARY 0
   

var ETHomePFGraphics = ``;

var ETHomePF2Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $80 ; |X.......|
   .byte $C0 ; |XX......|
   .byte $E0 ; |XXX.....|
   .byte $F0 ; |XXXX....|
   .byte $F8 ; |XXXXX...|
   .byte $FC ; |XXXXXX..|
   .byte $F4 ; |XXXX.X..|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $B0 ; |X.XX....|
   .byte $B0 ; |X.XX....|
   .byte $F0 ; |XXXX....|
   .byte $B0 ; |X.XX....|
   .byte $B0 ; |X.XX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
   .byte $F0 ; |XXXX....|
`;

var ETHomePF1Graphics = `
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
   .byte $00 ; |........|
`;

var FBIAgentSprites = ``;

var FBIAgent_0 = `
   .byte $1C ; |...XXX..|
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $6C ; |.XX.XX..|
   .byte $78 ; |.XXXX...|
   .byte $6E ; |.XX.XXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $3E ; |..XXXXX.|
   .byte $36 ; |..XX.XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $E7 ; |XXX..XXX|
`;

var FBIAgent_1 = `
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $58 ; |.X.XX...|
   .byte $70 ; |.XXX....|
   .byte $7C ; |.XXXXX..|
   .byte $6C ; |.XX.XX..|
   .byte $7E ; |.XXXXXX.|
   .byte $2E ; |..X.XXX.|
   .byte $3E ; |..XXXXX.|
   .byte $3E ; |..XXXXX.|
   .byte $3E ; |..XXXXX.|
   .byte $3E ; |..XXXXX.|
`;

var FBIAgent_2 = `
   .byte $38 ; |..XXX...|
   .byte $7C ; |.XXXXX..|
   .byte $78 ; |.XXXX...|
   .byte $38 ; |..XXX...|
   .byte $58 ; |.X.XX...|
   .byte $F0 ; |XXXX....|
   .byte $FC ; |XXXXXX..|
   .byte $DC ; |XX.XXX..|
   .byte $FC ; |XXXXXX..|
   .byte $7C ; |.XXXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
`;

var FBIAgent_3 = `
   .byte $1C ; |...XXX..|
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $1C ; |...XXX..|
   .byte $2C ; |..X.XX..|
   .byte $78 ; |.XXXX...|
   .byte $7E ; |.XXXXXX.|
   .byte $6E ; |.XX.XXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $36 ; |..XX.XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $6E ; |.XX.XXX.|
`;

var FBIAgent_4 = `
   .byte $1C ; |...XXX..|
   .byte $1C ; |...XXX..|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $76 ; |.XXX.XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $76 ; |.XXX.XX.|
   .byte $7C ; |.XXXXX..|
   .byte $3A ; |..XXX.X.|
   .byte $7E ; |.XXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $FE ; |XXXXXXX.|
   .byte $C6 ; |XX...XX.|
   .byte $E7 ; |XXX..XXX|
`;

var FBIAgent_5 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $30 ; |..XX....|
   .byte $6C ; |.XX.XX..|
   .byte $7C ; |.XXXXX..|
   .byte $6C ; |.XX.XX..|
   .byte $7C ; |.XXXXX..|
   .byte $36 ; |..XX.XX.|
   .byte $3E ; |..XXXXX.|
   .byte $3E ; |..XXXXX.|
   .byte $3E ; |..XXXXX.|
   .byte $3C ; |..XXXX..|
   .byte $3E ; |..XXXXX.|
`;

var FBIAgent_6 = `
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $38 ; |..XXX...|
   .byte $30 ; |..XX....|
   .byte $EC ; |XXX.XX..|
   .byte $FC ; |XXXXXX..|
   .byte $FC ; |XXXXXX..|
   .byte $FC ; |XXXXXX..|
   .byte $FC ; |XXXXXX..|
   .byte $1C ; |...XXX..|
   .byte $3C ; |..XXXX..|
   .byte $3C ; |..XXXX..|
   .byte $38 ; |..XXX...|
   .byte $3C ; |..XXXX..|
`;

var FBIAgent_7 = `
   .byte $1C ; |...XXX..|
   .byte $1C ; |...XXX..|
   .byte $1C ; |...XXX..|
   .byte $18 ; |...XX...|
   .byte $76 ; |.XXX.XX.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $74 ; |.XXX.X..|
   .byte $7E ; |.XXXXXX.|
   .byte $2E ; |..X.XXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $7E ; |.XXXXXX.|
   .byte $6C ; |.XX.XX..|
   .byte $76 ; |.XXX.XX.|
`;

// FBIAgentColors_A
//    .byte LT_RED+8,LT_RED+8,RED_2+8,RED_2+8,LT_RED+10,LT_RED+10,LT_RED+10
//    .byte LT_RED+10,LT_RED+8,LT_RED+8,LT_RED+8,LT_RED+8,LT_RED+6,BLACK
// FBIAgentColors_B
//    .byte LT_RED+8,BLACK,RED_2+8,LT_RED+10,LT_RED+10,LT_RED+10,LT_RED+10
//    .byte LT_RED+10,LT_RED+8,LT_RED+8,LT_RED+8,LT_RED+6,BLACK,BLACK

// HumanHorizReflectionTable
//    .byte 28,60,94


var IndySprite = `
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $00 ; |........|
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
   .byte $5A ; |.X.XX.X.|
   .byte $3C ; |..XXXX..|
   .byte $18 ; |...XX...|
   .byte $18 ; |...XX...|
   .byte $3C ; |..XXXX..|
`;
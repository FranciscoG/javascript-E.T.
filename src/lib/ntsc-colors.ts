/*
	colors specificied by the TIA Color Chart in the Stella programming Guide

	http://www.randomterrain.com/atari-2600-memories-tia-color-charts.html
	http://www.qotile.net/minidig/docs/tia_color.html

 */

interface COLOR_MAP_ITEM {
  [key: string]: string
}

interface COLOR_MAP {
  [key: string]: COLOR_MAP_ITEM
}

const ntsc_colors: COLOR_MAP = {
  "0": {
    "0": "#000000",
    "1": "#444400",
    "2": "#702800",
    "3": "#841800",
    "4": "#880000",
    "5": "#78005c",
    "6": "#480078",
    "7": "#140084",
    "8": "#000088",
    "9": "#00187c",
    "A": "#002c5c",
    "B": "#003c2c",
    "C": "#003c00",
    "D": "#143800",
    "E": "#2c3000",
    "F": "#442800"
  },
  "2": {
    "0": "#404040",
    "1": "#646410",
    "2": "#844414",
    "3": "#983418",
    "4": "#9c2020",
    "5": "#8c2074",
    "6": "#602090",
    "7": "#302098",
    "8": "#1c209c",
    "9": "#1c3890",
    "A": "#1c4c78",
    "B": "#1c5c48",
    "C": "#205c20",
    "D": "#345c1c",
    "E": "#4c501c",
    "F": "#644818"
  },
  "4": {
    "0": "#6c6c6c",
    "1": "#848424",
    "2": "#985c28",
    "3": "#ac5030",
    "4": "#b03c3c",
    "5": "#a03c88",
    "6": "#783ca4",
    "7": "#4c3cac",
    "8": "#3840b0",
    "9": "#3854a8",
    "A": "#386890",
    "B": "#387c64",
    "C": "#407c40",
    "D": "#507c38",
    "E": "#687034",
    "F": "#846830"
  },
  "6": {
    "0": "#909090",
    "1": "#a0a034",
    "2": "#ac783c",
    "3": "#c06848",
    "4": "#c05858",
    "5": "#b0589c",
    "6": "#8c58b8",
    "7": "#6858c0",
    "8": "#505cc0",
    "9": "#5070bc",
    "A": "#5084ac",
    "B": "#509c80",
    "C": "#5c9c5c",
    "D": "#6c9850",
    "E": "#848c4c",
    "F": "#a08444"
  },
  "8": {
    "0": "#b0b0b0",
    "1": "#b8b840",
    "2": "#bc8c4c",
    "3": "#d0805c",
    "4": "#d07070",
    "5": "#c070b0",
    "6": "#a070cc",
    "7": "#7c70d0",
    "8": "#6874d0",
    "9": "#6888cc",
    "A": "#689cc0",
    "B": "#68b494",
    "C": "#74b474",
    "D": "#84b468",
    "E": "#9ca864",
    "F": "#b89c58",
  },
  "A": {
    "0": "#c8c8c8",
    "1": "#d0d050",
    "2": "#cca05c",
    "3": "#e09470",
    "4": "#e08888",
    "5": "#d084c0",
    "6": "#b484dc",
    "7": "#9488e0",
    "8": "#7c8ce0",
    "9": "#7c9cdc",
    "A": "#7cb4d4",
    "B": "#7cd0ac",
    "C": "#8cd08c",
    "D": "#9ccc7c",
    "E": "#b4c078",
    "F": "#d0b46c"
  },
  "C": {
    "0": "#dcdcdc",
    "1": "#e8e85c",
    "2": "#dcb468",
    "3": "#eca880",
    "4": "#eca0a0",
    "5": "#dc9cd0",
    "6": "#c49cec",
    "7": "#a8a0ec",
    "8": "#90a4ec",
    "9": "#90b4ec",
    "A": "#90cce8",
    "B": "#90e4c0",
    "C": "#a4e4a4",
    "D": "#b4e490",
    "E": "#ccd488",
    "F": "#e8cc7c"
  },
  "E": {
    "0": "#ececec",
    "1": "#fcfc68",
    "2": "#ecc878",
    "3": "#fcbc94",
    "4": "#fcb4b4",
    "5": "#ecb0e0",
    "6": "#d4b0fc",
    "7": "#bcb4fc",
    "8": "#a4b8fc",
    "9": "#a4c8fc",
    "A": "#a4e0fc",
    "B": "#a4fcd4",
    "C": "#b8fcb8",
    "D": "#c8fca4",
    "E": "#e0ec9c",
    "F": "#fce08c"
  }
};

ntsc_colors["1"] = ntsc_colors["0"];
ntsc_colors["3"] = ntsc_colors["2"];
ntsc_colors["5"] = ntsc_colors["4"];
ntsc_colors["7"] = ntsc_colors["6"];
ntsc_colors["9"] = ntsc_colors["8"];
ntsc_colors["B"] = ntsc_colors["A"];
ntsc_colors["D"] = ntsc_colors["C"];
ntsc_colors["F"] = ntsc_colors["E"];

const ntscColor = function (val: string): string {
  const [first, second]: string[] = val.toUpperCase().replace("$", "").split("");
  return ntsc_colors[second][first];
};

export default ntscColor;

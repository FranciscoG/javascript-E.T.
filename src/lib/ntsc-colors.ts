/**
 * TIA NTSC Color Palette
 *
 * The TIA stores color in a single byte:
 *   - High nibble (bits 4-7): hue (0-F, where 0 = grayscale)
 *   - Low nibble (bits 1-3): luminance (8 levels). Bit 0 is ignored.
 *
 * This gives 128 unique colors (16 hues × 8 luminance levels).
 *
 * Values from the Stella Programmer's Guide NTSC color chart:
 *   http://www.randomterrain.com/atari-2600-memories-tia-color-charts.html
 *   http://www.qotile.net/minidig/docs/tia_color.html
 */

// 128 unique colors. Each row = one hue, 8 luminance levels dark → bright.
// Index = TIA_byte >> 1 (since bit 0 is ignored).
const palette: string[] = [
  // $0x Gray
  "#000000", "#404040", "#6c6c6c", "#909090", "#b0b0b0", "#c8c8c8", "#dcdcdc", "#ececec",
  // $1x Gold
  "#444400", "#646410", "#848424", "#a0a034", "#b8b840", "#d0d050", "#e8e85c", "#fcfc68",
  // $2x Orange
  "#702800", "#844414", "#985c28", "#ac783c", "#bc8c4c", "#cca05c", "#dcb468", "#ecc878",
  // $3x Red-Orange
  "#841800", "#983418", "#ac5030", "#c06848", "#d0805c", "#e09470", "#eca880", "#fcbc94",
  // $4x Pink-Red
  "#880000", "#9c2020", "#b03c3c", "#c05858", "#d07070", "#e08888", "#eca0a0", "#fcb4b4",
  // $5x Purple-Magenta
  "#78005c", "#8c2074", "#a03c88", "#b0589c", "#c070b0", "#d084c0", "#dc9cd0", "#ecb0e0",
  // $6x Purple
  "#480078", "#602090", "#783ca4", "#8c58b8", "#a070cc", "#b484dc", "#c49cec", "#d4b0fc",
  // $7x Blue-Purple
  "#140084", "#302098", "#4c3cac", "#6858c0", "#7c70d0", "#9488e0", "#a8a0ec", "#bcb4fc",
  // $8x Blue
  "#000088", "#1c209c", "#3840b0", "#505cc0", "#6874d0", "#7c8ce0", "#90a4ec", "#a4b8fc",
  // $9x Cyan-Blue
  "#00187c", "#1c3890", "#3854a8", "#5070bc", "#6888cc", "#7c9cdc", "#90b4ec", "#a4c8fc",
  // $Ax Cyan
  "#002c5c", "#1c4c78", "#386890", "#5084ac", "#689cc0", "#7cb4d4", "#90cce8", "#a4e0fc",
  // $Bx Cyan-Green
  "#003c2c", "#1c5c48", "#387c64", "#509c80", "#68b494", "#7cd0ac", "#90e4c0", "#a4fcd4",
  // $Cx Green
  "#003c00", "#205c20", "#407c40", "#5c9c5c", "#74b474", "#8cd08c", "#a4e4a4", "#b8fcb8",
  // $Dx Yellow-Green
  "#143800", "#345c1c", "#507c38", "#6c9850", "#84b468", "#9ccc7c", "#b4e490", "#c8fca4",
  // $Ex Yellow
  "#2c3000", "#4c501c", "#687034", "#848c4c", "#9ca864", "#b4c078", "#ccd488", "#e0ec9c",
  // $Fx Orange-Yellow
  "#442800", "#644818", "#846830", "#a08444", "#b89c58", "#d0b46c", "#e8cc7c", "#fce08c",
];

/**
 * Look up the CSS color string for a TIA color register value.
 * @param color TIA color byte (0x00–0xFF). Bit 0 is ignored.
 */
export function ntscColor(color: number): string {
  return palette[color >> 1];
}

export default ntscColor;

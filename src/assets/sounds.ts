/**
 * E.T. sound data expressed as TIA register values.
 *
 * TIA audio constants from the original ASM source:
 *   SOUND_CHANNEL_SAW    = 1
 *   SOUND_CHANNEL_ENGINE = 3
 *   SOUND_CHANNEL_SQUARE = 4
 *   SOUND_CHANNEL_BASS   = 6
 *   SOUND_CHANNEL_PITFALL= 7
 *   SOUND_CHANNEL_NOISE  = 8
 *   SOUND_CHANNEL_LEAD   = 12
 *   SOUND_CHANNEL_BUZZ   = 15
 */

// AUDF values for AUDC=12 (LEAD) from the ASM source
const LEAD_F4_SHARP = 13;
const LEAD_E4       = 15;
const LEAD_D4_SHARP = 16;
const LEAD_D4       = 17;
const LEAD_C4_SHARP = 18;
const LEAD_H3       = 20;  // B3 in German notation
const LEAD_A3       = 23;
const LEAD_G3_SHARP = 24;
const LEAD_F3_SHARP = 27;
const LEAD_E3_2     = 31;

/**
 * ThemeMusicFrequencyTable from the original ASM.
 * Each entry is an AUDF value for AUDC=12 (SOUND_CHANNEL_LEAD).
 * Each byte in the original represents one tick; consecutive identical
 * values are grouped with a `ticks` count for convenience.
 */
export const ET_Theme_music: { audf: number; ticks: number }[] = [
  { audf: LEAD_A3,       ticks: 4 },
  { audf: LEAD_E4,       ticks: 4 },
  { audf: LEAD_D4,       ticks: 1 },
  { audf: LEAD_C4_SHARP, ticks: 1 },
  { audf: LEAD_H3,       ticks: 1 },
  { audf: LEAD_C4_SHARP, ticks: 1 },
  { audf: LEAD_A3,       ticks: 4 },
  { audf: LEAD_E3_2,     ticks: 8 },
  { audf: LEAD_F3_SHARP, ticks: 4 },
  { audf: LEAD_F4_SHARP, ticks: 4 },
  { audf: LEAD_E4,       ticks: 1 },
  { audf: LEAD_D4_SHARP, ticks: 1 },
  { audf: LEAD_C4_SHARP, ticks: 1 },
  { audf: LEAD_D4_SHARP, ticks: 1 },
  { audf: LEAD_H3,       ticks: 4 },
  { audf: LEAD_F3_SHARP, ticks: 4 },
  { audf: LEAD_G3_SHARP, ticks: 3 },
  { audf: LEAD_H3,       ticks: 1 },
  { audf: LEAD_C4_SHARP, ticks: 1 },
  { audf: LEAD_A3,       ticks: 1 },
  { audf: LEAD_E3_2,     ticks: 5 },
];

// .byte LEAD_A3,LEAD_A3,LEAD_A3,LEAD_A3,LEAD_E4,LEAD_E4,LEAD_E4,LEAD_E4
// .byte LEAD_D4,LEAD_C4_SHARP,LEAD_H3,LEAD_C4_SHARP,LEAD_A3,LEAD_A3,LEAD_A3
// 
// .byte LEAD_A3,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2
// .byte LEAD_E3_2,LEAD_E3_2,LEAD_F3_SHARP,LEAD_F3_SHARP,LEAD_F3_SHARP
// .byte LEAD_F3_SHARP,LEAD_F4_SHARP,LEAD_F4_SHARP,LEAD_F4_SHARP,LEAD_F4_SHARP
// .byte LEAD_E4,LEAD_D4_SHARP,LEAD_C4_SHARP,LEAD_D4_SHARP,LEAD_H3,LEAD_H3
// .byte LEAD_H3,LEAD_H3,LEAD_F3_SHARP,LEAD_F3_SHARP,LEAD_F3_SHARP
// .byte LEAD_F3_SHARP,LEAD_G3_SHARP,LEAD_G3_SHARP,LEAD_G3_SHARP,LEAD_H3
// .byte LEAD_C4_SHARP,LEAD_A3,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2,LEAD_E3_2
// .byte LEAD_E3_2

var ET_Theme_music = [{
  frq: notes["A3"],
  notelength: 4
}, {
  frq: notes["E4"],
  notelength: 4
}, {
  frq: notes["D4"],
  notelength: 1
}, {
  frq: notes["C#4"],
  notelength: 1
}, {
  frq: notes["B3"],
  notelength: 1
}, {
  frq: notes["C#4"],
  notelength: 1
}, {
  frq: notes["A3"],
  notelength: 3
}, {
  frq: notes["A3"],
  notelength: 1
}, {
  frq: notes["E3"],
  notelength: 9
}, {
  frq: notes["F#3"],
  notelength: 4
}, {
  frq: notes["F#4"],
  notelength: 4
}, {
  frq: notes["E4"],
  notelength: 1
}, {
  frq: notes["D#4"],
  notelength: 1
}, {
  frq: notes["C#4"],
  notelength: 1
}, {
  frq: notes["D#4"],
  notelength: 1
}, {
  frq: notes["B3"],
  notelength: 4
}, {
  frq: notes["F#3"],
  notelength: 4
}, {
  frq: notes["G#3"],
  notelength: 3
}, {
  frq: notes["B3"],
  notelength: 1
}, {
  frq: notes["C#4"],
  notelength: 1
}, {
  frq: notes["A3"],
  notelength: 1
}, {
  frq: notes["E3"],
  notelength: 5
}];

playSequence(ET_Theme_music, 300, "square")
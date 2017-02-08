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
  notelength: 3
}, {
  frq: notes["A3"],
  notelength: 1
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
  frq: notes["B3"], // aka H3
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


/*
PlayETWalkingSound
   lda SWCHA                        ; read joystick values
   cmp #P0_NO_MOVE
   bcs .turnOffETWalkingSound
   bit etMotionValues               ; check E.T. motion values
   bpl .playETWalkingSound          ; branch if E.T. not running
   lda frameCount                   ; get the current frame count
   lsr                              ; divide value by 4
   lsr
   and #7
   sta AUDF1
   lda #SOUND_CHANNEL_SQUARE + 1
   sta AUDC1
   lda #7
   sta AUDV1
   bne .donePlayingSoundChannel1    ; unconditional branch

.playETWalkingSound
   lda frameCount                   ; get the current frame count
   and #7
   bne .turnOffETWalkingSound
   lda frameCount                   ; get the current frame count
   lsr                              ; divide value by 8
   lsr
   lsr
   and #3
   beq .turnOffETWalkingSound
   ldx #7
   stx AUDV1
   adc #$16
   bne .setSoundChannel1AndFrequency

   .turnOffETWalkingSound
   lda #0
   sta AUDV1
.setSoundChannel1AndFrequency
   sta AUDC1
   sta AUDF1
.donePlayingSoundChannel1
   lda currentScreenId              ; get the current screen id
   cmp #ID_ET_HOME
   bne .checkIfOnTitleScreen
   jmp SetSpecialSpriteForPit
 */

var ET_WalkSound = [{
  frq: notes["C0"],
  notelength: 0.5
}];

// playSequence(ET_Theme_music);
playSequence(ET_WalkSound);
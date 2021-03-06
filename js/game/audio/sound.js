window.AudioContext = window.AudioContext || window.webkitAudioContext;

/*
http://www.qotile.net/files/2600_music_guide.txt
http://www.popular-musicology-online.com/issues/01/collins-01.html
http://problemkaputt.de/2k6specs.htm#audio
===================================================================
2 TIA Sound Overview
===================================================================

The TIA is the chip in the Atari 2600 that produces audio and video.  The audio portion has two independent voices, each of which has a 4 bit volume control (16 values), 5 bit pitch (32 values), and a 4 bit control register which selects the type of sound you will hear.  When writing software for the Atari, the standard labels for these registers are AUDV0 and AUDV1 for the volume registers, AUDF0 and AUDF1 for the pitch registers, and AUDC0 and AUDC1 for the control registers.  The 5 bit pitch is very limited and the frequency values are simply divided down from the system clock, so many of the pitch values are not in-tune with others.  Note that setting the pitch register to a lower value results in a higher pitch.

2 independent voices
- 4 bit volume (16 values)
- 5 bit pitch (32 values)
- 4 bit rcontrol egister: 
-- AUDV0 and AUDV1 for the volume registers
-- AUDF0 and AUDF1 for the pitch registers
-- AUDC0 and AUDC1 for the control registers

;============================================================================
; T I A - M U S I C  C O N S T A N T S
;============================================================================
 
SOUND_CHANNEL_SAW       = 1         ; sounds similar to a saw waveform
SOUND_CHANNEL_ENGINE    = 3         ; many games use this for an engine sound
SOUND_CHANNEL_SQUARE    = 4         ; a high pitched square waveform
SOUND_CHANNEL_BASS      = 6         ; fat bass sound
SOUND_CHANNEL_PITFALL   = 7         ; log sound in pitfall, low and buzzy
SOUND_CHANNEL_NOISE     = 8         ; white noise
SOUND_CHANNEL_LEAD      = 12        ; lower pitch square wave sound
SOUND_CHANNEL_BUZZ      = 15        ; atonal buzz, good for percussion
 
LEAD_F4_SHARP           = 13
LEAD_E4                 = 15
LEAD_D4_SHARP           = 16
LEAD_D4                 = 17
LEAD_C4_SHARP           = 18
LEAD_H3                 = 20 // same as B3
LEAD_A3                 = 23
LEAD_G3_SHARP           = 24
LEAD_F3_SHARP           = 27
LEAD_E3_2               = 31

themeMusicNoteDelay     = $EE
themeMusicFreqIndex     = $EF


PlayThemeMusic
   lda #7
   sta AUDV1
   lda #SOUND_CHANNEL_LEAD
   sta AUDC1
   ldx themeMusicNoteDelay          ; get theme music note delay value
   dex
   bpl .playCurrentThemeNote        ; hold note if not negative
   ldx #11                          ; initial hold note delay
   ldy themeMusicFreqIndex          ; get theme music frequency index
   iny                              ; increment frequency index
   cpy #55
   bcc .setThemeMusicFreqIndex
   ldy #0


	WebAudio API help:
	http://modernweb.com/2014/03/31/creating-sound-with-the-web-audio-api-and-oscillators/
 */

// might need to generate noise for certain sounds.  these might help:
// https://github.com/zacharydenton/noise.js/blob/master/noise.js
// http://noisehack.com/generate-noise-web-audio-api/



var notes = {
  'C0': 16.35,
  'C#0': 17.32,
  'Db0': 17.32,
  'D0': 18.35,
  'D#0': 19.45,
  'Eb0': 19.45,
  'E0': 20.60,
  'F0': 21.83,
  'F#0': 23.12,
  'Gb0': 23.12,
  'G0': 24.50,
  'G#0': 25.96,
  'Ab0': 25.96,
  'A0': 27.50,
  'A#0': 29.14,
  'Bb0': 29.14,
  'B0': 30.87,
  'C1': 32.70,
  'C#1': 34.65,
  'Db1': 34.65,
  'D1': 36.71,
  'D#1': 38.89,
  'Eb1': 38.89,
  'E1': 41.20,
  'F1': 43.65,
  'F#1': 46.25,
  'Gb1': 46.25,
  'G1': 49.00,
  'G#1': 51.91,
  'Ab1': 51.91,
  'A1': 55.00,
  'A#1': 58.27,
  'Bb1': 58.27,
  'B1': 61.74,
  'C2': 65.41,
  'C#2': 69.30,
  'Db2': 69.30,
  'D2': 73.42,
  'D#2': 77.78,
  'Eb2': 77.78,
  'E2': 82.41,
  'F2': 87.31,
  'F#2': 92.50,
  'Gb2': 92.50,
  'G2': 98.00,
  'G#2': 103.83,
  'Ab2': 103.83,
  'A2': 110.00,
  'A#2': 116.54,
  'Bb2': 116.54,
  'B2': 123.47,
  'C3': 130.81,
  'C#3': 138.59,
  'Db3': 138.59,
  'D3': 146.83,
  'D#3': 155.56,
  'Eb3': 155.56,
  'E3': 164.81,
  'F3': 174.61,
  'F#3': 185.00,
  'Gb3': 185.00,
  'G3': 196.00,
  'G#3': 207.65,
  'Ab3': 207.65,
  'A3': 220.00,
  'A#3': 233.08,
  'Bb3': 233.08,
  'B3': 246.94,
  'C4': 261.63,
  'C#4': 277.18,
  'Db4': 277.18,
  'D4': 293.66,
  'D#4': 311.13,
  'Eb4': 311.13,
  'E4': 329.63,
  'F4': 349.23,
  'F#4': 369.99,
  'Gb4': 369.99,
  'G4': 392.00,
  'G#4': 415.30,
  'Ab4': 415.30,
  'A4': 440.00,
  'A#4': 466.16,
  'Bb4': 466.16,
  'B4': 493.88,
  'C5': 523.25,
  'C#5': 554.37,
  'Db5': 554.37,
  'D5': 587.33,
  'D#5': 622.25,
  'Eb5': 622.25,
  'E5': 659.26,
  'F5': 698.46,
  'F#5': 739.99,
  'Gb5': 739.99,
  'G5': 783.99,
  'G#5': 830.61,
  'Ab5': 830.61,
  'A5': 880.00,
  'A#5': 932.33,
  'Bb5': 932.33,
  'B5': 987.77,
  'C6': 1046.50,
  'C#6': 1108.73,
  'Db6': 1108.73,
  'D6': 1174.66,
  'D#6': 1244.51,
  'Eb6': 1244.51,
  'E6': 1318.51,
  'F6': 1396.91,
  'F#6': 1479.98,
  'Gb6': 1479.98,
  'G6': 1567.98,
  'G#6': 1661.22,
  'Ab6': 1661.22,
  'A6': 1760.00,
  'A#6': 1864.66,
  'Bb6': 1864.66,
  'B6': 1975.53,
  'C7': 2093.00,
  'C#7': 2217.46,
  'Db7': 2217.46,
  'D7': 2349.32,
  'D#7': 2489.02,
  'Eb7': 2489.02,
  'E7': 2637.02,
  'F7': 2793.83,
  'F#7': 2959.96,
  'Gb7': 2959.96,
  'G7': 3135.96,
  'G#7': 3322.44,
  'Ab7': 3322.44,
  'A7': 3520.00,
  'A#7': 3729.31,
  'Bb7': 3729.31,
  'B7': 3951.07,
  'C8': 4186.01
};

var ctx = new AudioContext();

function playNote(pitch, length, wave, vol) {
  var frq = notes[pitch];
  var o = ctx.createOscillator();
  o.type = wave;
  var g = ctx.createGain();
  o.connect(g);
  g.connect(ctx.destination);
  g.gain.value = (typeof vol === "undefined" || vol === null) ? 0.1 : vol;

  if (frq) {
    o.frequency.value = frq;
    o.start(0);
    o.stop(length);
  }
}

//playNote("A3", 1, "square", 0.3);


function playSequence(sequence, opts) {
  if (!opts) { opts = {}; }
  // set defaults
  var _opts = {
    bpm : (opts.bpm) ? opts.bpm : 300,
    wave : (opts.wave) ? opts.wave : "square",
    vol : (opts.vol) ? opts.vol : 0.1
  };

  var o, t = ctx.currentTime,
    arrayLength = sequence.length,
    playlength = 0;

  for (var i = 0; i < arrayLength; i++) {
    o = ctx.createOscillator();
    // 1 second divided by number of beats per second times number of beats (length of a note)
    playlength = 1 / (_opts.bpm / 60) * sequence[i].notelength;
    o.type = _opts.wave;
    o.frequency.value = sequence[i].frq;
    o.start(t);
    o.stop(t + playlength);
    t += playlength;
    var g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.value = _opts.vol;
  }
}
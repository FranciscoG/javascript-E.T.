/**
 * TIA Audio Emulation
 *
 * The TIA produces audio through 2 independent channels. Each channel has:
 * - AUDC (4-bit): Control register — selects waveform type (0–15)
 * - AUDF (5-bit): Frequency divider (0–31). Lower values = higher pitch.
 * - AUDV (4-bit): Volume (0–15)
 *
 * Frequency formula (NTSC):
 *   output_freq = TIA_CLOCK / (AUDF + 1) / poly_divisor
 *
 * The TIA clock is ~31440 Hz (NTSC system clock 3.579545 MHz / 114).
 *
 * AUDC waveform types and their polynomial counter divisors:
 *   0  = silent (set as 1 / no output)
 *   1  = 4-bit poly (buzzy saw-like)
 *   2  = 4-bit poly / 31 (rumble)
 *   3  = 5-bit poly / 31 (engine)
 *   4  = pure tone / 2 (square wave, div 2)
 *   5  = pure tone / 2 (same as 4)
 *   6  = pure tone / 31 (bass)
 *   7  = 5-bit poly / 2 (buzzy, Pitfall log)
 *   8  = 9-bit poly (white noise)
 *   9  = 5-bit poly (metallic buzz)
 *   10 = pure tone / 31 (same as 6)
 *   11 = set last 4 bits (same as 0 in practice)
 *   12 = pure tone / 6 (lead, lower square)
 *   13 = pure tone / 6 (same as 12)
 *   14 = pure tone / 93 (very low)
 *   15 = 5-bit poly / 6 (atonal buzz)
 *
 * References:
 *   http://www.qotile.net/files/2600_music_guide.txt
 *   https://www.randomterrain.com/atari-2600-memories-music-and-sound.html
 */

const TIA_CLOCK = 31440; // NTSC TIA audio clock in Hz

type AudioSequenceStep = {
  audf: number;
  ticks: number;
};

type ActiveSequence = {
  audc: number;
  audv: number;
  framesPerTick: number;
  loop: boolean;
  stepIndex: number;
  framesRemaining: number;
  steps: AudioSequenceStep[];
};

// Pure-tone divisors for each AUDC value.
// 0 means use polynomial counter (noise), handled separately.
const AUDC_DIVISOR: Record<number, number> = {
  0: 0,   // silent
  1: 0,   // 4-bit poly
  2: 0,   // 4-bit poly / 31
  3: 0,   // 5-bit poly / 31
  4: 2,   // pure square / 2
  5: 2,   // pure square / 2
  6: 31,  // pure tone / 31
  7: 0,   // 5-bit poly / 2
  8: 0,   // 9-bit poly (noise)
  9: 0,   // 5-bit poly
  10: 31, // pure tone / 31
  11: 0,  // silent
  12: 6,  // pure tone / 6
  13: 6,  // pure tone / 6
  14: 93, // pure tone / 93
  15: 0,  // 5-bit poly / 6
};

// Map AUDC to the closest Web Audio OscillatorType for tonal approximation.
// Noise types (1,2,3,7,8,9,15) are rendered via a noise buffer instead.
const AUDC_WAVE: Record<number, OscillatorType> = {
  4: "square",
  5: "square",
  6: "square",
  10: "square",
  12: "square",
  13: "square",
  14: "square",
};

function isNoiseType(audc: number): boolean {
  return AUDC_DIVISOR[audc] === 0 && audc !== 0 && audc !== 11;
}

// Approximate divisor for noise types to get roughly correct pitch
function noiseDivisor(audc: number): number {
  switch (audc) {
    case 1: return 1;    // 4-bit poly, fast
    case 2: return 31;   // 4-bit poly / 31
    case 3: return 31;   // 5-bit poly / 31
    case 7: return 2;    // 5-bit poly / 2
    case 8: return 1;    // 9-bit poly (white noise)
    case 9: return 1;    // 5-bit poly
    case 15: return 6;   // 5-bit poly / 6
    default: return 1;
  }
}

function calcFrequency(audf: number, divisor: number): number {
  return TIA_CLOCK / (audf + 1) / divisor;
}

/**
 * Represents one of the TIA's two audio channels.
 */
class TIAChannel {
  audc: number = 0;
  audf: number = 0;
  audv: number = 0;

  private ctx: AudioContext;
  private gainNode: GainNode;
  private oscillator: OscillatorNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private noiseBuffer: AudioBuffer;

  constructor(ctx: AudioContext, destination: AudioNode) {
    this.ctx = ctx;
    this.gainNode = ctx.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(destination);

    // Pre-generate a noise buffer (1 second of white noise)
    const sampleRate = ctx.sampleRate;
    this.noiseBuffer = ctx.createBuffer(1, sampleRate, sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < sampleRate; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }

  /**
   * Apply current register values. Call after changing audc, audf, or audv.
   */
  apply(): void {
    // Set volume (0–15 mapped to 0.0–1.0)
    this.gainNode.gain.value = this.audv / 15;

    // Stop previous sources
    this.stopSources();

    // Silent
    if (this.audc === 0 || this.audc === 11 || this.audv === 0) {
      return;
    }

    if (isNoiseType(this.audc)) {
      // Noise-based sound: play noise buffer at a playback rate that
      // approximates the TIA frequency
      const divisor = noiseDivisor(this.audc);
      const freq = calcFrequency(this.audf, divisor);
      const source = this.ctx.createBufferSource();
      source.buffer = this.noiseBuffer;
      source.loop = true;
      // Adjust playback rate to shift the noise spectrum toward the target freq
      source.playbackRate.value = Math.max(0.01, freq / 1000);
      source.connect(this.gainNode);
      source.start();
      this.noiseSource = source;
    } else {
      // Tonal sound
      const divisor = AUDC_DIVISOR[this.audc];
      const freq = calcFrequency(this.audf, divisor);
      const osc = this.ctx.createOscillator();
      osc.type = AUDC_WAVE[this.audc] || "square";
      osc.frequency.value = freq;
      osc.connect(this.gainNode);
      osc.start();
      this.oscillator = osc;
    }
  }

  private stopSources(): void {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
    if (this.noiseSource) {
      this.noiseSource.stop();
      this.noiseSource.disconnect();
      this.noiseSource = null;
    }
  }

  /** Silence this channel and release resources. */
  stop(): void {
    this.audv = 0;
    this.gainNode.gain.value = 0;
    this.stopSources();
  }
}

/**
 * TIA Audio — models the Atari 2600's two audio channels.
 *
 * Usage mirrors how the 2600 writes to TIA registers:
 *   audio.write(0, AUDC, 12);  // channel 0 control = lead square
 *   audio.write(0, AUDF, 23);  // channel 0 frequency divider = 23
 *   audio.write(0, AUDV, 7);   // channel 0 volume = 7
 */
export const AUDC = 0;
export const AUDF = 1;
export const AUDV = 2;

export class Audio {
  ctx: AudioContext;
  channels: [TIAChannel, TIAChannel];
  private activeSequences: [ActiveSequence | null, ActiveSequence | null];

  constructor() {
    this.ctx = new AudioContext();
    this.channels = [
      new TIAChannel(this.ctx, this.ctx.destination),
      new TIAChannel(this.ctx, this.ctx.destination),
    ];
    this.activeSequences = [null, null];
  }

  resume(): Promise<void> {
    if (this.ctx.state === "suspended") {
      return this.ctx.resume();
    }
    return Promise.resolve();
  }

  private applyChannel(channel: 0 | 1): void {
    this.channels[channel].apply();
  }

  setChannel(channel: 0 | 1, values: { audc?: number; audf?: number; audv?: number }): void {
    const ch = this.channels[channel];
    if (typeof values.audc === "number") {
      ch.audc = values.audc & 0x0F;
    }
    if (typeof values.audf === "number") {
      ch.audf = values.audf & 0x1F;
    }
    if (typeof values.audv === "number") {
      ch.audv = values.audv & 0x0F;
    }
    this.applyChannel(channel);
  }

  /**
   * Write a value to a TIA audio register.
   * @param channel 0 or 1
   * @param register AUDC (0), AUDF (1), or AUDV (2)
   * @param value the register value (4-bit or 5-bit depending on register)
   */
  write(channel: 0 | 1, register: number, value: number): void {
    const ch = this.channels[channel];
    switch (register) {
      case AUDC:
        ch.audc = value & 0x0F;
        break;
      case AUDF:
        ch.audf = value & 0x1F;
        break;
      case AUDV:
        ch.audv = value & 0x0F;
        break;
    }
    this.applyChannel(channel);
  }

  private loadSequenceStep(channel: 0 | 1, sequence: ActiveSequence): void {
    const step = sequence.steps[sequence.stepIndex];
    sequence.framesRemaining = Math.max(1, step.ticks) * sequence.framesPerTick;
    this.setChannel(channel, {
      audc: sequence.audc,
      audf: step.audf,
      audv: sequence.audv,
    });
  }

  playSequence(
    channel: 0 | 1,
    steps: AudioSequenceStep[],
    options: { audc: number; audv: number; framesPerTick?: number; loop?: boolean }
  ): void {
    if (steps.length === 0) {
      this.stopSequence(channel);
      return;
    }

    this.activeSequences[channel] = {
      audc: options.audc,
      audv: options.audv,
      framesPerTick: options.framesPerTick ?? 12,
      loop: options.loop ?? false,
      stepIndex: 0,
      framesRemaining: 0,
      steps,
    };

    this.loadSequenceStep(channel, this.activeSequences[channel]!);
  }

  stopSequence(channel: 0 | 1): void {
    this.activeSequences[channel] = null;
    this.channels[channel].stop();
  }

  updateFrame(): void {
    this.activeSequences.forEach((sequence, channelIndex) => {
      if (!sequence) {
        return;
      }

      sequence.framesRemaining -= 1;
      if (sequence.framesRemaining > 0) {
        return;
      }

      const nextIndex = sequence.stepIndex + 1;
      if (nextIndex >= sequence.steps.length) {
        if (!sequence.loop) {
          this.stopSequence(channelIndex as 0 | 1);
          return;
        }
        sequence.stepIndex = 0;
      } else {
        sequence.stepIndex = nextIndex;
      }

      this.loadSequenceStep(channelIndex as 0 | 1, sequence);
    });
  }

  /** Silence both channels. */
  reset(): void {
    this.activeSequences = [null, null];
    this.channels[0].stop();
    this.channels[1].stop();
  }
}
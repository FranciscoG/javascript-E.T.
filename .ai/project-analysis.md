# JavaScript E.T. — Project Context

## What
HTML5/Canvas recreation of **Atari 2600 E.T.** with a custom engine that mirrors the TIA chip architecture.

## Reference
- Original disassembled source: `ET_atari_2600_source_code.asm` (root)
- All sprite/sound assets extracted from that ROM into `src/assets/`

## Code Boundary
- **`src/lib/`** = TIA engine (hardware-accurate, game-agnostic). Sprite rendering, display, collision, input, audio, color palettes.
- **`src/` (outside lib)** = E.T. game logic. Screens, assets, state, behavior.

## Engine (`src/lib/`)
- **Display.ts**: Canvas 320×210 (160×192 doubled horizontally), 3x scale, no smoothing.
- **Sprite.ts**: Binary byte arrays (1=pixel). `clockSize` (1/2/4/8) = horizontal stretch (NUSIZ). `scanLinesPerRow` = vertical stretch. `OneBitSprite` = missiles/ball.
- **GameEngine.ts**: 6 TIA objects (player1, player2, missile1, missile2, ball, playfield). 15-pair collision matrix. `backgroundSprite` = per-scanline color bands (COLUBK). Built-in game loop + input.
- **InputHandler.ts**: Joystick model (binary axes 0b10/0b01/0b00, one button).
- **Audio.ts**: Web Audio oscillators approximating TIA channels.
- **colors.ts / ntsc-colors.ts**: Two NTSC palette maps (byte → hex RGB).

## Game State (`src/game.ts`)
**Working**: Title screen (E.T. text at QUAD_SIZE + scanLinesPerRow=2, dots as missiles, 6-slice head composite, colors from ASM: $24 text, $EA head, $9A score band). E.T. walk animation (3 frames, direction flip). Input transitions title→game.

**Not implemented**: Screen transitions, playfield rendering (PF1/PF2 data exists), pit mechanics, phone pieces, NPCs (FBI/Elliott/scientist), energy, score display, sound effects, Scene system.

## World Map
7 screens with directional links (toroidal topology). Defined in `worldMap` object but not wired to transitions. Screen types: forest, 4 pit variants, Washington D.C., pit/well.

## Key Files
- `src/game.ts` — main game logic
- `src/assets/visual.ts` — all sprite data (hex bytes from ASM)
- `src/assets/sounds.ts` — theme music sequence
- `src/lib/GameEngine.ts` — core engine
- `src/lib/Sprite.ts` — sprite rendering
- `src/lib/Scene.ts` — skeleton (unused)
- `src/lib/game-loop.ts` — older loop (superseded by GameEngine)
- `demo/` — legacy vanilla JS version

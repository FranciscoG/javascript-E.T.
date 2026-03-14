# Project Analysis: JavaScript E.T.

## What This Project Is

An HTML5/Canvas recreation of **E.T. the Extra-Terrestrial** for the Atari 2600, built with a custom JavaScript game engine that deliberately mirrors the architecture and constraints of the Atari 2600's TIA (Television Interface Adapter) chip.

This is not just a port of the game — it's an attempt to faithfully reproduce the *hardware model* of the 2600 in software, then run E.T. on top of it.

---

## The Custom Game Engine ("VCS Engine")

The engine in `src/lib/` replicates the Atari 2600's TIA hardware model:

### Display (`Display.ts`)
- Canvas resolution of **320×210**, matching the adjusted Atari resolution (native 160×192, doubled horizontally for square-ish pixels on modern displays).
- Pixel smoothing is explicitly disabled to preserve the chunky retro look.
- Scalable (currently 3x) to fill a modern screen.

### Sprite System (`Sprite.ts`)
- **Sprites are defined in binary**, exactly as they were on the 2600. Each byte = one row of 8 pixels (1 = filled, 0 = empty).
- The `clockSize` property (1, 2, 4, 8) replicates TIA's NUSIZ register — it stretches each "clock" (pixel) by that factor, just like the real hardware.
- `OneBitSprite` class models the **Ball** and **Missile** objects — single-pixel-wide sprites that can span multiple scanlines, exactly as on the TIA.
- Pixel dimensions are calculated from the 160×192 native resolution: `pixelW = 320/160 = 2`, `pixelH = floor(210/192) = 1`.

### GameEngine (`GameEngine.ts`)
Mirrors the TIA's object model with exactly **6 drawable objects**:
1. `player1` — Player 0 sprite
2. `player2` — Player 1 sprite
3. `missile1` — Player 0's missile
4. `missile2` — Player 1's missile
5. `ball` — Ball sprite
6. `playfield` — Static background

Plus a **15-element collision matrix** that checks all possible pairs of the 6 objects — this is exactly how the TIA's hardware collision detection worked (CXM0P, CXM1P, CXP0FB, CXP1FB, CXM0FB, CXM1FB, CXBLPF, CXPPMM registers).

The `backgroundSprite` system draws full-width colored bands — mimicking how 2600 programmers changed the background color register (COLUBK) at specific scanlines to create multi-colored backgrounds.

### Input Handler (`InputHandler.ts`)
Models the Atari joystick with binary axis states:
- `0b10` = up/left, `0b01` = down/right, `0b00` = centered
- One button (space bar = joystick fire button)
- Supports arrow keys and WASD

### Audio (`Audio.ts`)
- Documents the TIA's audio system: 2 voices, 4-bit volume, 5-bit pitch, 4-bit control register.
- Contains the actual assembly source for the E.T. theme music frequency table and walking sound.
- Uses Web Audio API oscillators to approximate TIA sound channels (square waves at specific frequencies).
- The E.T. theme music sequence is transcribed from the original ROM's `ThemeMusicFrequencyTable`.

### Colors (`colors.ts`, `ntsc-colors.ts`)
- Two NTSC color palette implementations (one older nested map, one newer flat map).
- The Atari stored color as a single byte: high 4 bits = hue (0-15), low 3 bits = luminance (0-7).
- Both files map these byte values to hex RGB colors.

---

## The E.T. Game Assets

### Sprite Data (`src/assets/visual.ts` — 2595 lines)
All sprite graphics are **copied directly from the original 6502 assembly source code** of E.T., preserving the `.byte $XX` format with the ASCII art comments. The `byteToBinaryString()` utility parses this format into drawable arrays.

Sprites included:
- **Title screen**: Large "E" and "T" letters, E.T.'s head (6 animation frames for a bobbing effect), dot sprites for the periods in "E.T."
- **E.T. character**: Walk cycle A (3 frames), Walk cycle B (3 frames), neck extension animations (A0-A3, B0-B3 — E.T. extends his neck in the game), death sprites (2 frames)
- **Playfield graphics**: Forest (PF1 + PF2), Wide Diamond Pit (PF1 + PF2), pit kernel data
- **Items**: Flower sprites (4 frames of growth animation, A and B variants)
- **Colors**: NTSC color constants matching the original game's palette definitions

### Sound Data (`src/assets/sounds.ts`)
- E.T. theme music transcribed as a note sequence with frequencies and lengths, ready for the Web Audio playback system.

---

## Game Logic (`src/game.ts`)

### What's Working
1. **Title screen**: Displays "E.T." with the large letters, dots (using missiles), and E.T.'s head graphic.
2. **E.T. walking**: 3-frame walk animation, direction-aware (sprite flips horizontally when moving right).
3. **Standing idle**: Returns to frame 0 when not moving.
4. **Input handling**: Arrow keys / WASD move E.T., space transitions from title to gameplay.
5. **Frame skipping**: A simple frame-skip mechanism (every 5th frame processes input) to slow down movement.
6. **Background bands**: Colored horizontal stripes drawn via the bg sprite system.

### World Map (Defined but Not Implemented)
The world map is defined with 7 screens matching the original game's layout:
- **Screen 1**: Forest (top) — the starting screen
- **Screens 2-5**: Pit screens (middle row) — "tall twins", "4 diamonds", "arrows", "8 diamonds"
- **Screen 6**: Washington D.C. (bottom)
- **Screen 7**: Pit/Well

Each screen has directional links (up/down/left/right → next screen ID), replicating the original game's toroidal world topology. The HTML layout even shows this as an unfolded cube diagram.

### What's Not Yet Implemented
- Screen transitions (the world map navigation)
- Pit/well falling and levitation mechanics
- Phone piece collection (E.T.'s main objective)
- Enemy NPCs (FBI agent, scientist, Elliott)
- Energy system / power zones
- Score display
- Playfield rendering (forest trees, pit terrain) — the PF1/PF2 graphics data exists but isn't drawn
- The "call home" phone mechanic
- Game over / win conditions
- Sound effects during gameplay
- The flower growing mechanic (sprites exist but unused)

---

## Project Evolution

The project has gone through **two distinct phases**:

### Phase 1: Vanilla JS (`demo/` folder)
- Plain JavaScript with a module-based VCS library (`demo/dist/vcs.js`, now missing).
- Separate test pages for sprites and audio.
- Sprite data lived in global JS files (`assets/sprites.js`).
- The `demo/game.js` shows an earlier version of the same game loop with manual canvas operations and ctx.save()/restore() for sprite flipping.

### Phase 2: TypeScript + Vite (`src/` folder) — Current
- Migrated to TypeScript with Vite as the build tool.
- Engine classes refactored: `GameEngine` now encapsulates Display, Input, collision detection, and the game loop.
- Sprite data moved into TypeScript modules.
- The `Sprite` class now handles its own drawing and state (position, direction, clock size).
- Some design patterns changed — e.g., sprite flipping went from `ctx.scale(-1,1)` to `row.reverse()` on the byte array.

### Unfinished Pieces
- `Scene.ts` is a skeleton class — lifecycle hooks defined (`setup`, `onSceneStart`, `onSceneEnd`, `update`) but not integrated into the engine. This was likely intended to manage screen transitions.
- `GameLoop.ts` exists separately from `GameEngine`'s built-in loop — looks like an earlier abstraction that was folded into GameEngine.
- The `addSprite` method accepts `""` as a name (used for the ET head on the title screen), which falls through the switch without assignment — the sprite gets drawn because it's referenced directly, not through the engine's slots.
- `playfield` sprite is created but never configured or drawn.
- The `index.html` references `/src/game.js` but the actual file is `game.ts` (Vite handles this).

---

## Architecture Insight

The key insight of this project is the decision to model the Atari 2600's hardware constraints in the engine itself:
- Only 6 drawable objects (not arbitrary sprite lists)
- Hardware-accurate collision detection matrix
- Sprites defined as binary byte arrays, not images
- Background colors changed per-scanline band
- Clock-based pixel sizing
- Separate missile/ball primitives

This means game logic can be written in a style very similar to the original 6502 assembly — just setting registers and letting the "TIA" (the engine) handle rendering. The sprite data can be copied nearly verbatim from the original ROM disassembly.

---

## Summary

**Goal**: A faithful browser recreation of Atari 2600 E.T. with an engine that mirrors TIA hardware.

**Status**: Engine core is functional (display, sprites, input, collision, audio). Title screen and basic E.T. walking work. The game world, objectives, enemies, and most gameplay mechanics are not yet implemented. The `Scene` system that would enable screen management is stubbed out. All the raw sprite/sound assets from the original ROM are already extracted and converted.

**Next likely steps**: Integrate the Scene system, implement screen transitions using the world map, render playfield graphics for each screen, add game objects (phone pieces, enemies), implement the energy/scoring system.

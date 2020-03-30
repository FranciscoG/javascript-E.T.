(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.vcs = factory());
}(this, (function () { 'use strict';

    var utils = {
        hex2bin: function (hex) {
            function pad(num, size) {
                var s = "000" + num;
                return s.substr(s.length - size);
            }
            var hexArr = hex.split("");
            var bin = "";
            hexArr.forEach(function (e, i, arr) {
                var dec = parseInt(arr[i], 16);
                bin += pad(dec.toString(2), 4);
            });
            return bin;
        },
        hex2rgb: function (hex) {
            if (hex.charAt(0) === "#") {
                hex = hex.substr(1);
            }
            var parts = hex.match(/[0-9A-Za-z]{2}/g);
            return parts.map(function (e) {
                return parseInt(e, 16);
            });
        }
    };
    //# sourceMappingURL=utils.js.map

    function repl(match, p1) {
        return utils.hex2bin(p1);
    }
    function SpriteDrawer(sprite, color) {
        if (color === void 0) { color = "#696969"; }
        if (!sprite) {
            return;
        }
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        sprite = sprite.trim().replace(/.*\$([a-f0-9]{2}).*\n?/gi, repl);
        canvas.height = sprite.match(/%?[0-1]{8}[\s\n]*/g).length;
        canvas.width = 8;
        var spriteArr = sprite.split("");
        var n = 0;
        var rbgArr = utils.hex2rgb(color);
        var imgData = ctx.createImageData(8, spriteArr.length);
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 0] = rbgArr[0];
            imgData.data[i + 1] = rbgArr[1];
            imgData.data[i + 2] = rbgArr[2];
            if (spriteArr[n] === "1") {
                imgData.data[i + 3] = 255;
            }
            else {
                imgData.data[i + 3] = 0;
            }
            n++;
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
    }
    //# sourceMappingURL=draw.js.map

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
    var sequenceOptsDefault = {
        bpm: 300,
        wave: "square",
        vol: 0.1
    };
    function playSequence(sequence, opts) {
        var options = sequenceOptsDefault;
        if (opts) {
            options = Object.assign({}, sequenceOptsDefault, opts);
        }
        var arrayLength = sequence.length;
        var o = null;
        var t = ctx.currentTime;
        var playlength = 0;
        for (var i = 0; i < arrayLength; i++) {
            o = ctx.createOscillator();
            playlength = 1 / (options.bpm / 60) * sequence[i].notelength;
            o.type = options.wave;
            o.frequency.value = sequence[i].frq;
            o.start(t);
            o.stop(t + playlength);
            t += playlength;
            var g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            g.gain.value = options.vol;
        }
    }
    var sound = {
        playSequence: playSequence,
        notes: notes
    };
    //# sourceMappingURL=sound.js.map

    var inputState = {
        vert: 0,
        horz: 0,
        bttn: false
    };
    var DIRECTIONS = {
        UP: "UP",
        DOWN: "DOWN",
        LEFT: "LEFT",
        RIGHT: "RIGHT"
    };
    Object.freeze(DIRECTIONS);
    var KEY_MAP = {
        "ArrowUp": DIRECTIONS.UP,
        "ArrowDown": DIRECTIONS.DOWN,
        "ArrowLeft": DIRECTIONS.LEFT,
        "ArrowRight": DIRECTIONS.RIGHT,
        "Up": DIRECTIONS.UP,
        "Down": DIRECTIONS.DOWN,
        "Left": DIRECTIONS.LEFT,
        "Right": DIRECTIONS.RIGHT,
        "w": DIRECTIONS.UP,
        "s": DIRECTIONS.DOWN,
        "a": DIRECTIONS.LEFT,
        "d": DIRECTIONS.RIGHT,
        "KeyW": DIRECTIONS.UP,
        "KeyS": DIRECTIONS.DOWN,
        "KeyA": DIRECTIONS.LEFT,
        "KeyD": DIRECTIONS.RIGHT
    };
    function handleKeyDown(key) {
        if (key === "Space") {
            inputState.bttn = true;
            return true;
        }
        var dir = KEY_MAP[key];
        if (!dir) {
            return false;
        }
        var handled = false;
        switch (dir) {
            case DIRECTIONS.UP:
                handled = true;
                inputState.vert = 2;
                break;
            case DIRECTIONS.DOWN:
                handled = true;
                inputState.vert = 1;
                break;
            case DIRECTIONS.LEFT:
                handled = true;
                inputState.horz = 2;
                break;
            case DIRECTIONS.RIGHT:
                handled = true;
                inputState.horz = 1;
                break;
        }
        return handled;
    }
    function handleKeyUp(key) {
        if (key === "Space") {
            inputState.bttn = false;
            return true;
        }
        var dir = KEY_MAP[key];
        if (!dir) {
            return false;
        }
        var handled = false;
        switch (dir) {
            case DIRECTIONS.UP:
                handled = true;
                inputState.vert = 0;
                break;
            case DIRECTIONS.DOWN:
                handled = true;
                inputState.vert = 0;
                break;
            case DIRECTIONS.LEFT:
                handled = true;
                inputState.horz = 0;
                break;
            case DIRECTIONS.RIGHT:
                handled = true;
                inputState.horz = 0;
                break;
        }
        return handled;
    }
    function setup(element) {
        (element || document).addEventListener("keydown", function onDown(e) {
            if (handleKeyDown(e.code)) {
                e.preventDefault();
            }
        }, false);
        (element || document).addEventListener("keyup", function onUp(e) {
            if (handleKeyUp(e.code)) {
                e.preventDefault();
            }
        }, false);
    }
    var read = function () { return inputState; };
    var input = {
        setup: setup,
        read: read
    };
    //# sourceMappingURL=input.js.map

    var loopCb = function () { };
    input.setup();
    function frame(timestamp) {
        loopCb(timestamp, input.read());
        requestAnimationFrame(frame);
    }
    function registerLoop(cb) {
        loopCb = cb;
        return function start() {
            frame(0);
        };
    }
    //# sourceMappingURL=game-loop.js.map

    var canvas = document.createElement("canvas");
    canvas.width = 160 * 2;
    canvas.height = 192;
    var ctx$1 = canvas.getContext("2d");
    ctx$1.webkitImageSmoothingEnabled = false;
    ctx$1.mozImageSmoothingEnabled = false;
    ctx$1.imageSmoothingEnabled = false;
    var display = {
        canvas: canvas,
        ctx: ctx$1
    };
    //# sourceMappingURL=display.js.map

    var vcs = {
        draw: SpriteDrawer,
        sound: sound,
        loop: registerLoop,
        display: display
    };
    //# sourceMappingURL=vcs.js.map

    return vcs;

})));

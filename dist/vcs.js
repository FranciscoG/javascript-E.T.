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
        var _n = 0;
        var rbgArr = utils.hex2rgb(color);
        var imgData = ctx.createImageData(8, spriteArr.length);
        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i + 0] = rbgArr[0];
            imgData.data[i + 1] = rbgArr[1];
            imgData.data[i + 2] = rbgArr[2];
            if (spriteArr[_n] === "1") {
                imgData.data[i + 3] = 255;
            }
            else {
                imgData.data[i + 3] = 0;
            }
            _n++;
        }
        ctx.putImageData(imgData, 0, 0);
        return canvas;
    }
    //# sourceMappingURL=draw.js.map

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
        var o = null;
        var t = ctx.currentTime;
        var arrayLength = sequence.length;
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

    var vcs = {
        draw: SpriteDrawer,
        sound: playSequence
    };

    return vcs;

})));

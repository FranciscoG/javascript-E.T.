export class Display {
    constructor(w = 320, h = 210) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext("2d");
    }
    scale(x, y) {
        this.canvas.width = this.canvas.width * x;
        this.canvas.height = this.canvas.height * y;
        this.ctx.scale(x * 2, y * 2);
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    }
}

class CanvasRect {
  constructor(src, ctx) {
    this.x = 0; // x轴坐标
    this.img = new Image();
    this.img.crossOrigin = 'Anonymous';
    this.img.src = src;
    this.w = 0;
    this.h = 0;
    this.naturalWidth = 0;
    this.naturalHeight = 0;
    this.ctx = ctx;
    this.widthProportion = 0;
    this.heightProportion = 0;
    this.img.onload = this.onload;
  }

  onload = () => {
    this.w = this.img.width;
    this.h = this.img.height;
    this.naturalWidth = this.img.naturalWidth;
    this.naturalHeight = this.img.naturalHeight;
    this.widthProportion = this.naturalWidth / this.w;
    this.heightProportion = this.naturalHeight / this.h;
    this.start();
  };

  draw = () => {
    this.x += 15;
    this.ctx.drawImage(this.img, this.widthProportion * this.x, 0, 15, this.naturalHeight, this.x, 0, 15, this.h);
  };

  start = () => {
    this.animation();
  };

  animation = () => {
    this.draw();
    if (this.x > this.w) {
      cancelAnimationFrame(this.animation);
      return;
    }
    requestAnimationFrame(this.animation);
  };
}

export default CanvasRect;

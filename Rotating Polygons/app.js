import { Polygon } from './polygon.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas'); // canvas 생성
    document.body.appendChild(this.canvas); // DOM에 canvas 삽입
    this.ctx = this.canvas.getContext('2d'); // context 호출
    
    // Retina 디스플레이 대응
    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // document view의 크기가 변경될 때 발생
    // this.resize.bind(this) 명시적 바인딩
    window.addEventListener('resize', this.resize.bind(this), false); 
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);

    // this.animate.bind(this) 명시적 바인딩
    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.polygon = new Polygon(
      this.stageWidth / 2,
      this.stageHeight + (this.stageHeight / 4),
      this.stageHeight / 1.5,
      16
    );
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    // canvas 초기화
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.5;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
  }

  onMove(e) {
    if(this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
  }
}

window.onload = () => {
  new App();
}
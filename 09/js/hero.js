/**
  * @Description: 英雄（包括其操作）
  * @author: Icon
  * @date: 2021/12/6
  * @time: 15:36
*/
// 1. 全局只有一个

  /**
   * 英雄
   * w: 84
   * h: 65
   * */
let heroImage = new Image();
heroImage.src="imgs/hero.png";
// 图片的大小
const heroWidth = 186, heroHeight = 130;
// 在屏幕上显示的大小
const hw = heroWidth / 2;
const hh = heroHeight / 2;
let hero = {
  x: (sw - hw)/2,
  y: sh - hh,
  w: hw,
  h: hh,
  // 爆炸时的下标
  showIndex: 0,
  maxIndex: 19,
  isBol: false,
  isOver: false,
  draw() {
    ctx.beginPath();
    if (this.isBol) {
      // 爆炸
      this.showIndex ++;
      if (this.showIndex > this.maxIndex) {
        this.showIndex = this.maxIndex;
        this.isOver = true;
      }
      let bolImage = new Image();
      bolImage.src=`imgs/explosion${this.showIndex}.png`;
      ctx.drawImage(bolImage, 0, 0, 64, 48, this.x, this.y, 64, 48);
    } else {
      ctx.drawImage(heroImage, 0, 0, heroWidth, heroHeight, this.x, this.y, this.w, this.h);
    }
  }
}

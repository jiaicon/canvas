/**
  * @Description: 举行类，是子弹类、奖励类、子弹类的父级
  * @author: Icon
  * @date: 2021/12/6
  * @time: 16:56
*/

class Rect {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDel = false;
    this.speed = 0; // 继承后被子集重写
    this.isBol = false;
    this.img=null;

    this.showIndex = 0;
    this.maxIndex = 19;
  }
  move() {
    this.y += this.speed;
    if ((this.speed > 0 && this.y > sh + this.h) || (this.speed < 0 && this.y < -this.h)) {
      this.isDel = true;
    }
  }
  draw() {
    this.move();
    ctx.beginPath();
    if (this.isBol) {
      this.speed=0;
      // 爆炸
      this.showIndex ++;
      if (this.showIndex > this.maxIndex) {
        this.showIndex = this.maxIndex;
        this.isDel = true;
      }
      let bolImage = new Image();
      bolImage.src=`imgs/explosion${this.showIndex}.png`;
      ctx.drawImage(bolImage, 0, 0, 64, 48, this.x, this.y, 64, 48);
    } else {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
  }
}

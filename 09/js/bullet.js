/**
  * @Description: 子弹类型
  * @author: Icon
  * @date: 2021/12/6
  * @time: 17:10
*/

let gap = 7; // 子弹间隔
let gapNum = 0; // 计量子弹间隔
let bullets = [];

let isDouble = false; // 是否创建双排子弹
let isCrowed = false; // 是否创建密集子弹

let bulletW = 62;
let bulletH = 108

const bulletImg = new Image();
bulletImg.src = 'imgs/bullet.png';
class Bullet extends Rect {
  constructor(x, y) {
    super(x, y);
    this.w = bulletW / 4;
    this.h = bulletH / 4;
    this.hurt = 100;
    this.speed = -10;
    this.img = bulletImg;
  }
}

// 创建子弹的方法
function createBullet() {
  // 是否是密集子弹
  gap = isCrowed ? 3 : 7;
  gapNum ++;
  if (gapNum % gap === 0) {
    gapNum = 0;
    if (isDouble) {
      // 双排子弹
      let bullet1 = new Bullet(hero.x + hero.w / 2 - 25, hero.y + 22);
      let bullet2 = new Bullet(hero.x + hero.w / 2 + 19, hero.y + 22);

      bullets.push(bullet1);
      bullets.push(bullet2);
    } else {
      // 单排子弹
      let bullet = new Bullet(hero.x + hero.w / 2 - bulletW / 8, hero.y);
      bullets.push(bullet);
    }
  }
}

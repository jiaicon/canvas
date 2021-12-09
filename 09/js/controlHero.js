/**
  * @Description: 控制英雄飞机
  * @author: Icon
  * @date: 2021/12/6
  * @time: 16:11
*/

// 2. PC操作，键盘
// 3. 移动端，触屏事件

  // 检测键盘状态
let isLeft = false;
let isTop= false;
let isRight = false;
let isBottom = false;

// 检测移动端触碰
let tx = 0; // 当前触摸X
let ty = 0; // 当前触摸Y
let touchX = 0;
let touchY = 0;

// 当前英雄位置
let heroX = 0;
let heroY = 0;

const move = ev => {
  ev.preventDefault();
  let touchEV = ev.touches[0];
  let x = touchEV.clientX;
  let y = touchEV.clientY;
  hero.x = heroX + x - tx;
  hero.y = heroY + y - ty;
}

if (isMobile()) {
  // 添加触碰事件
  window.addEventListener('touchstart', e => {
    e.preventDefault();
    // 触摸列表  不一定只有一个   也可能是十个手指
    let ts = e.touches;
    if (ts.length === 1) {
      let touch = ts[0];
      tx = touch.clientX;
      ty = touch.clientY;
      // 初始化位置为英雄当前的位置
      heroX = hero.x;
      heroY = hero.y;
      // 判断触摸的是否是英雄  即手指在小飞机上
      if (tx > hero.x && tx < hero.x + hero.w && ty > hero.y && ty < hero.y + hero.h) {
        window.addEventListener('touchmove', move)
      }
    } else if (ts.length === 2) {
      // 用来使用炸弹

    }
  })
  window.addEventListener('touchend', () => {
    window.removeEventListener('touchmove', move)
  })
} else {
  // 添加键盘事件
  window.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        isRight = false
        isLeft = true;
        break;
      case 38:
        isBottom = false;
        isTop = true;
        break;
      case 39:
        isLeft = false;
        isRight = true;
        break;
      case 40:
        isTop = false;
        isBottom = true;
        break;
      default:
        break;
    }
  }
}

function control() {
  if (isLeft) {
    hero.x -=7;
    hero.x = hero.x < -hero.w/2 ? -hero.w/2 : hero.x;
  }
  if (isRight) {
    hero.x +=7;
    hero.x = hero.x > sw-hero.w/2 ? sw-hero.w/2 : hero.x;
  }
  if (isTop) {
    hero.y -=7;
    hero.y = hero.y < 0 ? 0 : hero.y;
  }
  if (isBottom) {
    hero.y +=7;
    hero.y = hero.y > sh-hero.h ? sh-hero.h : hero.y;
  }
}











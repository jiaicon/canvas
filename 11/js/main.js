const canvas = document.querySelector('#canvas');

const sw = 802;
const sh = 600;
canvas.width = sw;
canvas.height = sh;

const ctx = canvas.getContext('2d');

const totalScore = 3;

/**
 * 创建球类
 * 只有一个
 * 初始在球场中心
 */
class Ball {
  constructor() {
    this.r = 10;
    this.x = sw/2;
    this.y = sh/2;
    this.vx = 5;
    this.vy = 0;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
  update() {
    // 小球界限
    if (this.x >= sw) {
      this.vx = -this.vx;
    }
    if (this.y >= sh) {
      this.vy = -this.vy;
    }
    if (this.x <= 0) {
      this.vx = -this.vx;
    }
    if (this.y <= 0) {
      this.vy = -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}

/**
 * 创建球场
 */
function createBallRect() {
  ctx.beginPath();
  ctx.fillStyle='#333333';
  ctx.fillRect(0, 0, sw, sh);
  ctx.closePath();
  // 中界线
  for (let i = 0; i < sh; i+=40) {
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(sw/2 - 1, i + 10, 2, 20);
    ctx.closePath();
  }
}

/**
 * 创建人物
 */
const personW = 5;
const personH = 80;
class Person {
  constructor(person, x, y, color, upCode, downCode) {
    this.person = person;
    this.x = x;
    this.y = y;
    this.color = color;
    this.w = personW;
    this.h = personH;
    this.score = 0;
    this.isReStart = false;

    // 人物上下对应的键盘code
    this.upCode = upCode;
    this.downCode = downCode;

    this.isDoubleClick = false;
    this.keyCode = null;
    this.keyDownTime = new Date().getTime();
    this.isTop = false;
    this.isBottom = false;

    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fill();
    ctx.closePath();
  }
  knock() {
    if (ball.y < this.y || ball.y > (this.y + this.h)) {
      // 没撞到人物
      this.score++;
      this.isReStart = true;
    } else if (ball.y >= this.y && ball.y <= (this.y + this.h)) {
      if (this.isTop) {
        ball.vy -= 3 * ((ball.y - this.y) / this.h);
      } else {
        ball.vy += 3 * ((ball.y - this.y) / this.h);
      }
    }
  }
  update() {
    if (this.person === 'left' && ball.x <= 0) {
      this.knock();
    }
    if (this.person === 'right' && ball.x >= (sw - ball.r)) {
      this.knock();
    }
    if (this.isTop && this.isDoubleClick) {
      this.y -= 7;
    } else if (this.isTop) {
      this.y -= 4;
    }
    if (this.isBottom && this.isDoubleClick) {
      this.y += 7;
    } else if (this.isBottom) {
      this.y += 4;
    }
    this.draw();
  }
  move(keyCode) {
    const time = new Date().getTime();
    const nowTime = time;
    if (keyCode === this.upCode || keyCode === this.downCode) {
      // person1
      if (keyCode === this.keyCode && nowTime - this.keyDownTime <= 200) {
        this.isDoubleClick = true;
      }
      this.keyDownTime = time;
    }
    switch (keyCode) {
      case this.upCode:
        this.isBottom = false;
        this.isTop = true;
        break;
      case this.downCode:
        this.isTop = false;
        this.isBottom = true;
        break;
      default:
        break;
    }
  }
  stop() {
    this.isDoubleClick = false;
    this.keyCode = null;
    this.keyDownTime = new Date().getTime();
    this.isTop = false;
    this.isBottom = false;
  }
}

/**
 * 创建分数类
 */
class Score {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '40px DejaVu Sans Mono';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.score, this.x, this.y);
    ctx.fill();
    ctx.closePath();
  }
  update(score) {
    this.score = score;
    this.draw();
  }
}

/**
 * 创建结果
 */
function createResult(person) {
  ctx.beginPath();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillText(`${person} WIN!`, sw / 2, sh / 2);
  ctx.strokeStyle = '#eeeeee';
  ctx.strokeText(`${person} WIN!`, sw / 2, sh / 2);
  ctx.closePath();
}

// 创建球
const ball = new Ball();
// 创建人物1 左侧
const person1 = new Person('left', 0, (sh - personH) / 2, 'blue', 38, 40);
const score1 = new Score(100, 100);
// 创建人物2 右侧
const person2 = new Person('right', sw - personW, (sh - personH) / 2, 'red', 87, 83);
const score2 = new Score(702, 100);

window.onkeydown = (e) => {
  person1.move(e.keyCode);
  person2.move(e.keyCode);
}
window.onkeyup = () => {
  person1.stop();
  person2.stop();
}

let animationId = null;
/**
 * 判断谁赢
 */
function check() {
  // 哪个胜利
  if (person1.score >= totalScore || person2.score >= totalScore) {
    if (animationId) {
      cancelAnimationFrame(animationId);
      createResult(person1.score > person2.score ? 'person2' : 'person1');
    }
  }
  // 是否重新发球
  if (person1.isReStart || person2.isReStart) {
    ball.x=sw/2;
    ball.y=sh/2;
    ball.vx = 5;
    ball.vy = 0;
    person1.isReStart = false;
    person2.isReStart = false;
  }
}

// 执行动画函数
function animation() {
  animationId = requestAnimationFrame(animation);

  ctx.clearRect(0, 0, sw, sh);

  createBallRect();

  ball.update();

  person1.update();
  person2.update();

  score1.update(person2.score);
  score2.update(person1.score);

  check();
}

animation();

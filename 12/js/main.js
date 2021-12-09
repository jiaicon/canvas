const canvas = document.querySelector('canvas');

let sw = 800;
let sh = 600;

if (isMobile()) {
  sw = window.innerWidth;
  sh = window.innerHeight;
}

canvas.width = sw;
canvas.height = sh;

const ctx = canvas.getContext('2d');

let isStart = false;

let twinkle_init_time = new Date().getTime();
function startPanel() {
  const twinkle_now_time = new Date().getTime();
  if ((twinkle_now_time - twinkle_init_time) >= 2000) {
    twinkle_init_time = twinkle_now_time;
  }
  const opacity = (twinkle_now_time - twinkle_init_time) / 2000;
  ctx.beginPath();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '40pt Calibri';
  ctx.strokeStyle = 'rgba(238, 238, 238, 1';
  ctx.strokeText('FLAPPY BIRD', sw/2, sh/2);


  ctx.font = '20pt Calibri';
  ctx.fillStyle = `rgba(238, 238, 238, ${opacity})`;
  ctx.fillText('START', sw/2, sh/2 + 60);
  ctx.closePath();
}

// 柱子左右间隔宽度
const spaceW = 150;
// 柱子上下间隔距离
const spaceH = 200;
// 保存当前的柱子
let posts = [];
class Post {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = '#579242';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.fillRect(this.x, this.h + spaceH, this.w, sh - this.h - spaceH);
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.x -= 2;
    this.draw();
  }
}
/**
 * 背景
 * 创建柱子: 最后一根柱子出现时
 * 删除柱子: 柱子x位置小于0
 */
const postMinWidth = 80;
const postMaxWidth = 100;
const postMinHeight = 150;
const postMaxHeight = sh - spaceH - postMinHeight;
function scrollBg() {
  if (!posts.length || (sw - spaceW) >= (posts[posts.length - 1].x + posts[posts.length - 1].w)) {
    // 添加柱子
    const pw = random(postMinWidth, postMaxWidth);
    const ph = random(postMinHeight, postMaxHeight);
    const post = new Post(sw, 0, pw, ph);
    posts.push(post);
  }
  for(let i = 0; i < posts.length; i++) {
    const post = posts[i];
    if (post.x + post.w <= 0) {
      posts.splice(i, 1);
      continue;
    }
    post.update();
  }
}

// 记录点击的间隔时间
let keyUpTime = null;
class Fly {
  constructor(x, y, vy, w, h) {
    this.x = x;
    this.y = y;
    this.vy = -vy;
    this.originVy = vy;
    this.w = w;
    this.h = h;
    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.closePath();
  }
  update() {
    const nowTime = new Date().getTime();
    if ((nowTime - keyUpTime) <= 300) {
      this.vy = -1;
    } else {
      this.vy = 2;
    }
    if (this.y <= postMinHeight) {
      // 达到上边柱子最大高度时
      this.vy = 0;
    }
    this.y += this.vy;
    this.draw();
  }
}

const fly = new Fly(sw/2, sh/2, 2, 10, 10);

let animationId = null;
if (isMobile()) {
  window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    let ts = e.touches;
    if (ts.length === 1) {
      let touch = ts[0];
      tx = touch.clientX;
      ty = touch.clientY;
      if (!isStart || isEnd) {
        // 判断触摸的是start上  start文字位置：ctx.fillRect(sw/2 - 40, sh/2 + 40, 80, 40);
        if (tx > (sw/2 - 40) && tx < (sw/2 + 40) && ty > (sh/2 + 40) && ty < (sh/2 + 80)) {
          isStart = true;
          isEnd = false;
          fly.x = sw/2;
          fly.y = sh/2;
          posts = [];
        }
      } else {
        keyUpTime = new Date().getTime();
      }
    }
  }, { passive: false })
} else {
  window.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
      isStart = true;
    }
    if (e.keyCode === 32) {
      keyUpTime = new Date().getTime();
    }
  })
}

let isEnd = false;
// 碰撞检测
function check() {
  if (fly.y >= sh || fly.h <= 0) {
    isEnd = true;
  }
  posts.forEach(post => {
    if ((fly.x + fly.w) >= post.x && fly.x <= (post.x + post.w) && (fly.y <= post.h || fly.y >= post.h + spaceH)) {
      isEnd = true;
    }
  })
}

function endPanel() {
  ctx.beginPath();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '40pt Calibri';
  const gradient = ctx.createLinearGradient(sw/2, sh/2 - 30, sw/2, sh/2 + 22);
  gradient.addColorStop(0, '#1E9600');
  gradient.addColorStop(0.5, '#FFF200');
  gradient.addColorStop(1, '#FF0000');
  ctx.fillStyle = gradient;
  ctx.fillText('IS END', sw/2, sh/2)

  ctx.font = '20pt Calibri';
  ctx.fillStyle = 'rgba(238, 238, 238, 1)';
  ctx.fillText('RESTART', sw/2, sh/2 + 60);
  ctx.closePath();
}

const animation = () => {
  animationId = window.requestAnimationFrame(animation);

  ctx.clearRect(0, 0, sw, sh);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, sw, sh);
  ctx.closePath();

  if (!isStart) {
    startPanel();
  }
  if (isStart && !isEnd) {
    scrollBg();
    fly.update();
    check();
  }
  if (isEnd) {
    endPanel();
  }
}

animation();


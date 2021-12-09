const canvas = document.getElementById('canvas');

const pr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * pr;
canvas.height = window.innerHeight * pr;

// 创建上下文
let ctx = canvas.getContext('2d');

// 鼠标位置
let mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
}
// 鼠标范围
const area = 50;

class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originRadius = radius;
    this.color = color;
    this.draw();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.x + this.radius >= canvas.width) {
      this.dx = -this.dx;
    }
    if (this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= canvas.height) {
      this.dy = -this.dy;
    }
    if (this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    // 鼠标位置
    if (Math.abs(mouse.x - this.x) < area && Math.abs(mouse.y - this.y) < area && this.radius < this.originRadius*3) {
      this.radius+=0.7;
    } else if (this.radius>this.originRadius) {
      this.radius-=0.7;
    }

    this.draw();
  }
}

/*
* 生成n~m的随机数
* **/
function random(n, m) {
  return Math.random() * (m - n) + n;
}

// 创建所有球
const colors = ['#6190E8', '#ee9ca7', '#0F2027', '#493240', '#FFF200', '#1E9600', '#FF0000'];
const num = 1000;
let list = [];
console.log(random(-1, 1).toFixed(2))
function init() {
  list = []
  for (let i = 0; i < num; i++) {
    const dx = +random(-1, 1).toFixed(2);
    const dy = +random(-1, 1).toFixed(2);
    const radius = random(1, 4);
    const x = random(0 + radius, canvas.width - radius);
    const y = random(0 + radius, canvas.height - radius);
    const color = colors[parseInt(random(0, 6))];
    const ball = new Ball(x, y, dx, dy, radius, color);
    list.push(ball);
  }
  animation();
}
// 更新鼠标位置
window.addEventListener('mousemove', function (e) {
  mouse.x=e.pageX;
  mouse.y=e.pageY;
})
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < list.length; i++) {
    list[i].update();
  }

  window.requestAnimationFrame(animation)
}
init();

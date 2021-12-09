const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

/*
* 生成n~m的随机数
* **/
function random(n, m) {
  return Math.random() * (m - n) + n;
}

/*
* @params{color}:
* **/
class Star {
  constructor(x, y, radius, color) {
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.color=color;

    this.draw();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,0,2*Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.x=mouse.x;
    this.y=mouse.y;
    this.draw();
  }
}
const mouse = {
  x: canvas.width/2,
  y: canvas.height/2,
};
window.addEventListener('mousemove', e => {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
  start.update();
})
const start = new Star(mouse.x, mouse.y, 10, 'red');

function animation() {
  ctx.fillStyle = 'rgba(0, 0, 0, .07)';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  window.requestAnimationFrame(animation);
}

animation();

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
  constructor(x, y, dx, dy, radius, color) {
    this.x=x;
    this.y=y;
    this.dx=dx;
    this.dy=dy;
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

    this.draw();
  }
}

const list=[];
const start_length = 100;
const colors = [[97, 144, 232], [238, 265, 167], [15, 32, 39]];
for (let i = 0; i < start_length; i++) {
  const radius=random(1, 4);
  const x = random(0+radius, canvas.width-radius);
  const y = random(0+radius, canvas.height-radius);
  const dx = random(-1, 1);
  const dy = random(-1, 1);
  const tColor = colors[parseInt(random(0, 2))];
  const color = `rgba(${tColor[0]}, ${tColor[1]}, ${tColor[2]}, 1)`;
  // 开始时，透明度为0，慢慢显示，
  const start = new Star(x, y, dx, dy, radius, color);
  list.push(start);
}

function animation() {
  ctx.fillStyle = 'rgba(0, 0, 0, .07)';
  ctx.rect(0, 0, this.canvas.width, this.canvas.height);
  ctx.fill();
  for (let i = 0; i < list.length; i++) {
    list[i].update();
  }
  window.requestAnimationFrame(animation);
}

animation();

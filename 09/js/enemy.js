/**
 * @Description: 敌机类
 * @author: Icon
 * @date: 2021/12/6
 * @time: 17:41
 */
const enemys = [];

let enemy_gap = 0;
let enemy_crowed = false;
let enemy_gap_num = 0;

const enemyW = 120;
const enemyH = 79;
const enemyImg = new Image();
enemyImg.src = "imgs/enemy.png";

class Enemy extends Rect {
  constructor(x, y) {
    super(x, y);

    this.w = enemyW / 2;
    this.h = enemyH / 2;
    this.speed = 10;
    this.img = enemyImg;
  }
}

// 创建敌机
const createEnemy = () => {
  // x轴随机
  enemy_gap = enemy_crowed ? 5 : 9;
  enemy_gap_num++;
  if (enemy_gap_num % enemy_gap === 0) {
    enemy_gap_num = 0;
    let enemy = new Enemy(random(0, sw - enemyW / 2), -enemyH);
    enemys.push(enemy);
  }
}

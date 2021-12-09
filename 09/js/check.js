/**
  * @Description: 1. 碰撞检测
 *                2. 敌机 奖励  子弹的运动
  * @author: Icon
  * @date: 2021/12/6
  * @time: 17:21
*/

/**
 * 碰撞检测
 * @param a
 * @param b
 */
function isCrash(a, b) {
  const al = a.x;
  const ar = a.x + a.w;
  const at = a.y;
  const ab = a.y + a.h;

  const bl = b.x;
  const br = b.x + b.w;
  const bt = b.y;
  const bb = b.y + b.h;
  if (al > br || bl > ar || at > bb || bt > ab) {
    return false;
  }
  return true;
}

/**
 * rect子集移动函数
 * 需要完成碰撞
 * 1. 英雄与敌机
 * 2. 子弹与敌机
 */
function allMove() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].draw();
    if (bullets[i].isDel) {
      bullets.splice(i, 1);
      i--;
      continue;
    }
  }
  // 敌机数组遍历
  for (let i = 0; i < enemys.length; i++) {
    const enemy = enemys[i];
    // 与英雄碰撞检测
    if (!hero.isBol && !enemy.isBol && isCrash(enemy, hero)) {
      enemy.isBol = true;
      hero.isBol = true;
    }
    // 与子弹的碰撞检测
    for (let j = 0; j < bullets.length; j++) {
      const bullet = bullets[j];
      if (!enemy.isBol && isCrash(enemy, bullet)) {
        enemy.isBol = true;
        bullets.splice(j, 1);
        j--;
        break;
      }
    }
    if (enemy.isBol && enemy.isDel) {
      enemys.splice(i, 1);
      i--;
      continue;
    }
    enemy.draw();
  }
}

/**
  * @Description: 背景滚动
  * @author: Icon
  * @date: 2021/12/6
  * @time: 15:25
*/
// 记录背景图偏移量
let disRoll = 0;
let bgImage = new Image();
bgImage.src = "imgs/bg.jpg";
function bgScroll() {
  disRoll += 5;
  if (disRoll > sh) {
    disRoll = 0;
  }
  ctx.beginPath();
  ctx.drawImage(bgImage, 0, disRoll, sw, sh);
  ctx.beginPath();
  ctx.drawImage(bgImage, 0, -sh + disRoll, sw, sh);
  ctx.closePath();
}

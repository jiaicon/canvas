/**
  * @Description:
  * @author: Icon
  * @date: 2021/12/7
  * @time: 10:13
*/

function createResult() {
  if (hero.isOver) {
    // clearInterval(timer);
    console.log(timer);
    cancelAnimationFrame(timer);
    alert('game over');
  }
}

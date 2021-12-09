/**
  * @Description: 预加载
  * @author: Icon
  * @date: 2021/12/6
  * @time: 14:46
*/

const src = ["bg.jpg", "hero.png", "enemy.png", "bullet.png", "explosion1.png", "explosion2.png", "explosion3.png", "explosion4.png", "explosion5.png", "explosion6.png", "explosion7.png", "explosion8.png", "explosion9.png", "explosion10.png", "explosion11.png", "explosion12.png", "explosion13.png", "explosion14.png", "explosion15.png", "explosion16.png", "explosion17.png", "explosion18.png", "explosion19.png"];
// 加载好图片的个数
let loaded_num=0;

/**
 * 预加载函数
 * @param callback
 */
function preload(callback) {
  for (let i = 0; i < src.length; i++) {
    let img = new Image();
    img.onload = () => {
      loaded_num+=1;
      if (loaded_num === src.length) {
        // 加载完毕
        callback && typeof callback === 'function' && callback();
      }
    }
    img.src=`./../imgs/${src[i]}`;
  }
}

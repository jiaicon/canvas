/**
  * @Description: 工具文件
  * @author: Icon
  * @date: 2021/12/6
  * @time: 15:17
*/

let mobileSystem = ["iOS", "Android", "Symbian", "iPhone", "iPad", "iPod"];
function isMobile() {
  for (let i = 0; i < mobileSystem.length; i++) {
    if (navigator.userAgent.includes(mobileSystem[i])) {
      return true;
    }
  }
  return false
}

/*
* 生成n~m的随机数
* **/
function random(n, m) {
  return Math.random() * (m - n) + n;
}


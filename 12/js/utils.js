/*
* 生成n~m的随机数
* **/
function random(n, m) {
  return Math.random() * (m - n) + n;
}

let mobileSystem = ["iOS", "Android", "Symbian", "iPhone", "iPad", "iPod"];
function isMobile() {
  for (let i = 0; i < mobileSystem.length; i++) {
    if (navigator.userAgent.includes(mobileSystem[i])) {
      return true;
    }
  }
  return false
}

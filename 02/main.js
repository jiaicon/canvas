const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function drawCircle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.strokeStyle='red';
  ctx.stroke();
  ctx.closePath();
}

drawCircle(100, 100, 50);
drawCircle(200, 200, 100);
function getCanvasPosition(e) {
  return {
    x: e.pageX,
    y: e.pageY,
  }
}

canvas.addEventListener('mousedown', function (e) {
  getCanvasPosition(e)
})


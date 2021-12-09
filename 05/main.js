const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 800;

const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(200, 200, 100, 0, 2 * Math.PI, false);
ctx.fillStyle='rgba(255, 0, 0, 0.5)';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(300, 200, 100, 0, 2 * Math.PI, false);
ctx.fillStyle='rgba(0, 255, 0, 0.5)';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(250, 300, 100, 0, 2 * Math.PI, false);
ctx.fillStyle='rgba(0, 0, 255, 0.5)';
ctx.fill();
ctx.closePath();

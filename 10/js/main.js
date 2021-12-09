/**
 * @Notes:
 * @Author: Icon
 * @Date: 2021/12/8
 * @Time: 11:54
 * @Name: main
 */
var canvas = document.getElementById("oc");
var gd = canvas.getContext("2d");
var W = canvas.width = 800;
var H = canvas.height = 600;
var ballX = W / 2
var ballY = H / 2
var ballR = 10
var ballVx = 10
var ballVy = 1
var panelW = 10 //矩形宽度10，长度100
var panelH = 100
var panel1Y = (H - panelH) / 2 //矩形Y坐标
var panel2Y = (H - panelH) / 2
var player1Score = 0
var player2Score = 0
var winnerScore = 3
var isEnd = 0
animate()
canvas.addEventListener("click", function () {
  if (isEnd) {
    player1Score = 0;
    player2Score = 0;
    isEnd = 0;
    animate();
  }
});
canvas.addEventListener("mousemove", function (e) {
  panel1Y = e.clientY - canvas.getBoundingClientRect().top - panelH / 2;
});
function animate() {
  fillRect(0, 0, W, H, "#333745");
  if (isEnd) {
    if (player1Score >= winnerScore) {
      fillText("YOU WIN!", W / 2, H / 2);
    } else {
      fillText("YOU LOSE!", W / 2, H / 2);
    }
    fillText("TRY?", W / 2, H / 3 * 2, "italic 40pt Calibri");
    return;
  }
  drawNet();
  if (panel2Y + panelH / 2 < ballY - 40) {
    panel2Y = panel2Y + 5;
  } else if (panel2Y + panelH / 2 > ballY + 40) {
    panel2Y = panel2Y - 5;
  }
  ballX += ballVx;
  ballY += ballVy;
  if (ballX - ballR - panelW < 0) {
    if (ballY > panel1Y && ballY < panel1Y + panelH) {
      ballVx = -ballVx;
      ballVy = (ballY - (panel1Y + panelH / 2)) * .3;
    } else {
      player2Score++;
      ballReset();
    }
  }
  if (ballX + ballR + panelW > W) {
    if (ballY > panel2Y && ballY < panel2Y + panelH) {
      ballVx = -ballVx;
      ballVy = (ballY - (panel2Y + panelH / 2)) * .3;
    } else {
      player1Score++;
      ballReset();
    }
  }
    if (ballY + ballR < 0 || ballY - ballR > H) {
      ballVy = -ballVy;
    }
  fillRect(1, panel1Y, panelW, panelH, "#EA2E49");
  fillRect(W - panelW - 1, panel2Y, panelW, panelH, "#EA2E49");
  fillCircle(ballX, ballY, ballR, "#EA2E49");
  fillText(player1Score, 100, 100);
  fillText(player2Score, W - 100, 100);
  requestAnimationFrame(animate);
}
function drawNet() { //绘制中线
  for (var i = 0; i < H; i += 40) {
    fillRect(W / 2 - 1, i + 10, 2, 20, "#DAEDE2");
  }
}
function ballReset() {
  if (player1Score >= winnerScore || player2Score >= winnerScore) {
    isEnd = 1;
  }
  ballVx = -ballVx;
  ballX = W / 2;
  ballY = H / 2;
}
function fillRect(x, y, w, h, style) {
  gd.fillStyle = style;
  gd.fillRect(x, y, w, h);
}
function fillCircle(x, y, r, style) {
  gd.fillStyle = style;
  gd.beginPath();
  gd.arc(x, y, r, 0, Math.PI * 2);
  gd.fill();
}
function fillText(txt, x, y, font, style) {
  gd.fillStyle = style || "white";
  gd.font = font || "italic 40pt Calibri";
  gd.textAlign = "center";
  gd.textBaseline = "middle";
  gd.fillText(txt, x, y);
}
let stars = [];
let canvasTopCtx;

class MeteorStar {
  constructor(x, y, vx, vy, r = 2) {
    this.x = x || rand(-100, 600);
    this.y = y || -20 * Math.random();
    this.a = 0.01;
    this.vx = vx || 2 * Math.random();
    this.vy = vy || 3 * Math.random();
    this.r = r;
    this.dis = window.innerHeight * rand(0.7, 1.2);
  }
  move() {
    this.vy += this.a;
    this.x += this.vx;
    this.r *= 0.9992;
    this.y += this.vy;
    if (this.x < 0) this.x = 900;
    if (this.y > this.dis) {
      stars.forEach((star, i) => {
        if (star === this) {
          stars.splice(i, 1);
          stars.push(new MeteorStar());
        }
      });
    }
  }
  draw() {
    let { x, y } = this;
    canvasTopCtx.beginPath();
    var grad = canvasTopCtx.createRadialGradient(x, y, 1, x, y, 18);
    grad.addColorStop(0, "rgb(193,255,255)");
    grad.addColorStop(1, "rgb(1,1,1)");
    canvasTopCtx.fillStyle = grad;
    canvasTopCtx.arc(x, y, this.r, 0, 2 * Math.PI);
    canvasTopCtx.fill();
    canvasTopCtx.closePath();
  }
}

function initStars(num = 10) {
  const canvasTop = document.getElementById("canvasTop");
  canvasTopCtx = canvasTop.getContext("2d");

  for (let i = 0; i < num; i++) {
    stars.push(
      new MeteorStar(
        Math.floor(rand(0, window.innerWidth)),
        Math.floor(rand(0, 100)),
        rand(-3, 3),
        rand(1, 2)
      )
    );
  }

  setInterval(() => {
    canvasTopCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }, 60 * 60 * 3);
}
function rand(min, max) {
  return min + Math.random() * (max - min);
}
function drawMeteor() {
  for (let star of stars) {
    star.draw();
    star.move();
  }

  // 这里在不断加半透明蒙层，使上一帧的流星变淡
  canvasTopCtx.fillStyle = "rgba(0,0,0,0.1)";
  canvasTopCtx.rect(0, 0, window.innerWidth, window.innerHeight);
  canvasTopCtx.fill();
}

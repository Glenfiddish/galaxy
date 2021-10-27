var entities = [];
var currentRotate = 45;

function randomNum(maximum, minimum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getPi(degree) {
  return (degree * Math.PI) / 180;
}

function createShootingStar(num = 50) {
  var canvasTop = document.getElementById("canvasTop");
  var { width, height } = canvasTop;
  var bgCtx = canvasTop.getContext("2d");

  function ShootingStar() {
    this.reset();
  }

  ShootingStar.prototype.reset = function () {
    this.x = Math.random() * width * 1.5;
    this.y = 0;
    this.len = Math.random() * 80 + 10;
    // this.speed = Math.random() * 10 + 6;
    this.speed = 1;
    this.size = Math.random() * 1 + 0.1;
    this.rotate = num > 5 ? 40 : randomNum(35, 55);
    // this is used so the shooting stars arent constant
    this.waitTime = new Date().getTime() + Math.random() * 3000 + 500;
    this.active = false;
  };

  ShootingStar.prototype.update = function () {
    if (this.active) {
      this.y += this.speed;
      this.x -= this.speed / Math.tan(getPi(this.rotate));
      if (this.x < 0 || this.y >= height) {
        this.reset();
      } else {
        bgCtx.lineWidth = this.size;
        bgCtx.beginPath();
        bgCtx.moveTo(this.x, this.y);
        bgCtx.lineTo(
          this.x + this.len * Math.cos(getPi(this.rotate)),
          this.y - this.len * Math.sin(getPi(this.rotate))
        );
        bgCtx.stroke();
      }
    } else {
      if (this.waitTime < new Date().getTime()) {
        this.active = true;
      }
    }
  };

  // Add 2 shooting stars that just cycle.
  for (let i = 0; i < num; i++) {
    entities.push(new ShootingStar());
  }
}

function randomOpa() {
  randomOpaWhite;
}

function randomOpa(max = 0.85, min = 0.3) {
  const opacity = Math.max(Math.random() * 10, min);
  return Math.max(opacity, max);
}

function toShootStar() {
  var canvasTop = document.getElementById("canvasTop");
  var entLen = entities.length;
  var canvasTopCtx = canvasTop.getContext("2d");
  var { width, height } = canvasTop;
  var opa = randomOpa();
  var starColor = `rgba(227, 227, 238, ${opa})`;

  canvasTopCtx.clearRect(0, 0, width, height);
  canvasTopCtx.fillStyle = starColor;
  canvasTopCtx.strokeStyle = starColor;
  canvasTopCtx.shadowOffsetX = 1;
  canvasTopCtx.shadowOffsetY = 1;
  canvasTopCtx.shadowBlur = 1;
  canvasTopCtx.shadowColor = `rgba(0, 0, 0, ${opa + 0.15})`;

  while (entLen--) {
    entities[entLen].update();
  }
}

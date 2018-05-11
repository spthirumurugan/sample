let mouseX;
let mouseY;

function Ball(x, y, radius, ballAnimationSpeed, color) {
  const ball = this;
  ball.x = x || 0;
  ball.y = y || 0;
  ball.radius = radius || 10;
  ball.speed = ballAnimationSpeed;
  ball.color = color || '#B93433';
  // ball.x -= ball.radius / 2;
  // ball.y -= ball.radius / 2;
}
function createBall(ball, ctx) {
  const context = ctx;
  context.fillStyle = '#B93433';
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}
function reset(ctx, ball) {
  const ballLocal = ball;
  ballLocal.x = 235;
  ballLocal.y = 291;
  createBall(ballLocal, ctx);
}
function moveBall(x, y, ball) {
  const ballLocal = ball;
  ballLocal.targetX = x;
  ballLocal.targetY = y;
  if (ballLocal.y > 370 || ballLocal.y < 210 || ballLocal.x > 995) {
    return true;
  }
  if (ballLocal.x > ballLocal.targetX - 5) {
    return true;
  }
  ballLocal.x += (ballLocal.targetX - ballLocal.x) / ballLocal.speed;
  ballLocal.y += (ballLocal.targetY - ballLocal.y) / ballLocal.speed;
  return false;
}
function angleCalc(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  let theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  return theta;
}
function angle360(cx, cy, ex, ey) {
  let theta = angleCalc(cx, cy, ex, ey); // range (-180, 180]
  if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
function getStartPoint(p1) {
  const x1 = mouseX || 113;
  const y1 = mouseY || 291;
  const x2 = 205;
  const y2 = 291;
  if (x1 + 10 > x2 - 20) return;
  const dist = 94;
  const last = angle360(x2, y2, x1, y1);
  const angle1 = last * (Math.PI / 180);
  const moveX = (dist * Math.cos(angle1)) + x2;
  const moveY = (dist * Math.sin(angle1)) + y2;
  p1[0] = moveX;
  p1[1] = moveY;
}
function createArrow(ctx, p1, p2, suffleRefresh) {
  // console.log('Arrow created');
  const ctxLocal = ctx;
  ctxLocal.clearRect(10, 50, 210, 500);
  // p1[1] = angle;
  // console.log('b4 p1 ', p1, 'p2 ', p2);
  getStartPoint(p1);
  ctxLocal.save();
  if (suffleRefresh) {
    p1 = [113, 291];
  }
  // console.log('p1 ', p1, 'p2 ', p2, this.suffleRefresh);
  const dist = Math.sqrt(((p2[0] - p1[0]) * (p2[0] - p1[0])) +
        ((p2[1] - p1[1]) * (p2[1] - p1[1])));
  const arrowColor = 'orange';
  ctxLocal.beginPath();
  ctxLocal.lineWidth = 8;
  ctxLocal.strokeStyle = arrowColor;
  ctxLocal.moveTo(p1[0], p1[1]);
  ctxLocal.lineTo(p2[0], p2[1]);
  ctxLocal.stroke();

  let arrowAngle = Math.acos((p2[1] - p1[1]) / dist);

  if (p2[0] < p1[0]) arrowAngle = ((2 * Math.PI) - arrowAngle);

  const size = 10;
  ctxLocal.beginPath();
  ctxLocal.translate(p2[0], p2[1]);
  ctxLocal.rotate(-arrowAngle);
  ctxLocal.fillStyle = arrowColor;
  ctxLocal.lineWidth = 6;
  ctxLocal.strokeStyle = arrowColor;
  ctxLocal.moveTo(0, -size);
  ctxLocal.lineTo(-size, -size);
  ctxLocal.lineTo(0, 0);
  ctxLocal.lineTo(size, -size);
  ctxLocal.lineTo(0, -size);
  ctxLocal.closePath();
  ctxLocal.fill();
  ctxLocal.stroke();
  ctxLocal.restore();
}

function isCircleIntersect(pnt1, pnt2) {
  const a = pnt1.x - pnt2.x;
  const b = pnt1.y - pnt2.y;
  const c = Math.sqrt((a * a) + (b * b));
  return (c < 20);
}

function getPrize(angle, force, value, ctx, shuffleBoardData, point, completeOstPopup) {
  const context = ctx;
  context.font = '20px Arial';
  context.fillStyle = 'black';
  const arr = [
    { x: 370, y: 291 }, // 1 m yellow circle x, y
    { x: 490, y: 245 }, // 2 m yellow circle x, y
    { x: 609, y: 325 }, // 3 m yellow circle x, y
    { x: 728, y: 255 }, // 4 m yellow circle x, y
    { x: 848, y: 291 }  // 5 m yellow circle x, y
  ];
  let isIntersect = null;
  if (value === 2) {
    isIntersect = isCircleIntersect(arr[0], point);
    if (isIntersect) context.fillText('5', 364, 299);
  } else if (value === 4) {
    isIntersect = isCircleIntersect(arr[1], point);
    if (isIntersect) context.fillText('20', 478, 253);
  } else if (value === 6) {
    isIntersect = isCircleIntersect(arr[2], point);
    if (isIntersect) context.fillText('25', 598, 332);
  } else if (value === 8) {
    isIntersect = isCircleIntersect(arr[3], point);
    if (isIntersect) context.fillText('15', 716, 263);
  } else if (value === 10) {
    isIntersect = isCircleIntersect(arr[4], point);
    if (isIntersect) context.fillText('10', 836, 299);
  }
  if (isIntersect) completeOstPopup(true);

  // const minAngle = shuffleBoardData[value].minAngle;
  // const maxAngle = shuffleBoardData[value].maxAngle;
  // if ((angle > minAngle && angle < maxAngle) && value === 2) {
  //   ctx.fillText('5', 364, 299);
  // }
  // if ((angle > minAngle && angle < maxAngle) && value === 4) {
  //   ctx.fillText('20', 478, 253);
  // }
  // if ((angle > minAngle && angle < maxAngle) && value === 6) {
  //   ctx.fillText('25', 598, 332);
  // }
  // if ((angle > minAngle && angle < maxAngle) && value === 8) {
  //   ctx.fillText('15', 717, 265);
  // }
  // if ((angle > minAngle && angle < maxAngle) && value === 10) {
  //   ctx.fillText('10', 835, 300);
  // }
}

function getEndPoint(force) {
  const x1 = mouseX || 113;
  const y1 = mouseY || 291;
  const x2 = 205;
  const y2 = 291;
  const last = angle360(x1, y1, x2, y2);
  const angle1 = last * (Math.PI / 180);
  const moveX = (force * Math.cos(angle1));
  const moveY = (force * Math.sin(angle1)) + y2;
  return {
    x: moveX,
    y: moveY,
    angle: angle1
  };
}
let myInterval = null;
function displayTableData(value, ball, shuffleBoardData, angle) {
  const finalValue = ball.x;
  const data = shuffleBoardData.slice(0);
  let distance = -1;
  data.reduce((pre, cur, index) => {
    if (finalValue > pre.force && finalValue < cur.force && distance === -1) {
      const diff = (finalValue - pre.force) / (cur.force - pre.force);
      distance = ((index - 1) / 2) + (diff / 2);
    }
    return cur;
  });
  let angleText = 'Straight';
  if (angle > 5 && angle < 6) {
    angleText = 'Angled Up';
  } else if (angle > 0.1 && angle < 0.7) {
    angleText = 'Angled Down';
  }
  return {
    force: value,
    distance: (Math.round(distance * 100) / 100),
    dirOfForce: angleText,
    dirOfMotion: angleText
  };
}

function animate(ctx, width, height, ball, force, angle,
  value, shuffleBoardData, start, tablePopup, p1, p2, completeOstPopup) {
  clearInterval(myInterval);
  myInterval = window.setInterval(() => {
    ctx.clearRect(200, 200, width, height);
    const point = getEndPoint(force);
    const clearRunInterval = moveBall(point.x, point.y, ball);
    createBall(ball, ctx);
    createArrow(ctx, p1, p2, false);
    if (clearRunInterval) {
      createArrow(ctx, p1, p2, false);
      clearInterval(myInterval);
      const dataValues = displayTableData(value, ball, shuffleBoardData, point.angle);
      start(dataValues, tablePopup(true));
      if (value % 2 === 0) {
        getPrize(angle, force, value, ctx, shuffleBoardData,
          { x: point.x, y: point.y }, completeOstPopup);
      }
    }
  }, 50);
}

class ShuffleBoard {
  constructor(canElement, value, shuffleBoardData, start, playButton,
      tablePopup, completeOstPopup, suffleRefresh) {
    this.canvas = canElement;
    this.start = start;
    this.tablePopup = tablePopup;
    this.value = value;
    this.shuffleBoardData = shuffleBoardData;
    this.completeOstPopup = completeOstPopup;
    this.suffleRefresh = suffleRefresh;
    this.playButton = playButton;
    this.ctx = this.canvas.getContext('2d');
    this.init();
    this.addEventHandlers();
  }
  init() {
    this.width = 1024;
    this.height = 587;
    this.angle = 291;
    this.force = 240;
    this.ballAnimationSpeed = 50;
    this.arrowRotationAngle = 0;
    this.p1 = [113, 291];
    this.p2 = [205, 291];
    this.ball = new Ball(235, 291, 10, this.ballAnimationSpeed);
    createBall(this.ball, this.ctx, this.width, this.height);
    createArrow(this.ctx, this.p1, this.p2, this.suffleRefresh);
  }
  update(value, suffleRefresh) {
    this.suffleRefresh = suffleRefresh;
    this.value = value;
    if (this.suffleRefresh) {
      // this.angle = 288;
      this.p1 = [113, 291];
      this.p2 = [205, 291];
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      reset(this.ctx, this.ball);
      createArrow(this.ctx, this.p1, this.p2, this.suffleRefresh);
      this.suffleRefresh = false;
    }
    if (this.value !== 0) {
      this.force = this.shuffleBoardData[this.value].force;
    }
  }
  addEventHandlers() {
    const self = this;
    self.isMousedown = false;
    self.playButton.addEventListener('click', () => {
      if (self.angle > 215 && self.angle < 360) {
        reset(self.ctx, self.ball);
        animate(self.ctx, self.width, self.height, self.ball, self.force,
           self.angle, self.value, self.shuffleBoardData,
           self.start, self.tablePopup, self.p1, self.p2, self.completeOstPopup);
      }
    });
    // self.resetButton.addEventListener('click', (e) => {
    //   reset(this.ctx, this.ball, this.width, this.height);
    // });
    self.canvas.addEventListener('click', (e) => {
      event = e;
      event = event || window.event;
      const rect = this.canvas.getBoundingClientRect();
      // const x = (event.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (event.clientY - rect.top) * (this.canvas.height / rect.height);
      self.angle = y;
      self.suffleRefresh = false;
      this.arrowRotationAngle = 270;
      createBall(self.ball, self.ctx);
    });
    self.canvas.addEventListener('mousedown', (e) => {
      self.suffleRefresh = false;
      self.isMousedown = true;
      self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      reset(self.ctx, self.ball);
      /* const rect = self.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (self.canvas.width / rect.width);
      console.log(x); */
    });
    self.canvas.addEventListener('mousemove', (e) => {
      const event = e;
      if (self.isMousedown) {
        const rect = self.canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (self.canvas.width / rect.width);
        const y = (event.clientY - rect.top) * (self.canvas.height / rect.height);
        mouseX = x;
        mouseY = y;
        self.angle = y;
        if (self.angle > 197 && self.angle < 384) {
          // console.log('angle :: ', self.angle);
          createArrow(self.ctx, self.p1, self.p2, false);
          createBall(self.ball, self.ctx);
        }
      }
    });
    self.canvas.addEventListener('mouseup', () => {
      self.isMousedown = false;
      self.suffleRefresh = false;
      createArrow(self.ctx, self.p1, self.p2, false);
      createBall(self.ball, self.ctx);
    });
    self.canvas.addEventListener('touchstart', () => {
      self.suffleRefresh = false;
      self.isMousedown = true;
      self.ctx.clearRect(200, 200, self.canvas.width, self.canvas.height);
      reset(self.ctx, self.ball);
    });
    self.canvas.addEventListener('touchmove', (e) => {
      const event = e;
      if (self.isMousedown) {
        const rect = self.canvas.getBoundingClientRect();
        const clientX = event.touches[0].clientX;
        const clientY = event.touches[0].clientY;
        const x = (clientX - rect.left) * (self.canvas.width / rect.width);
        const y = (clientY - rect.top) * (self.canvas.height / rect.height);
        mouseX = x;
        mouseY = y;
        self.angle = y;
        if (self.angle > 197 && self.angle < 384) {
          createArrow(self.ctx, self.p1, self.p2, false);
          createBall(self.ball, self.ctx);
        }
      }
    });
    self.canvas.addEventListener('touchend', () => {
      self.isMousedown = false;
      self.suffleRefresh = false;
      createArrow(self.ctx, self.p1, self.p2, false);
      createBall(self.ball, self.ctx);
    });
  }
}

export default ShuffleBoard;

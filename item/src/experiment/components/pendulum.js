const starBlank = require('../media/images/stars_inactive.png');
const starFilled20 = require('../media/images/stars_dinged_20.png');
const starFilled50 = require('../media/images/stars_dinged_50.png');
const starFilled80 = require('../media/images/stars_dinged_80.png');

function pendulumClearScreen(canvas, ctx) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function pendulumGetMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height)
  };
}

function arrowGetMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  const clientX = evt.clientX ? evt.clientX : evt.touches[0].clientX;
  const clientY = evt.clientY ? evt.clientY : evt.touches[0].clientY;

  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height)
  };
}

class PendulumBall {
  constructor(x, y, r, mass) {
    this.isBallMouseDown = false;
    this.x = x;
    this.y = y;
    this.r = r;
    this.prevMousePos = {};
    if (mass === undefined) this.mass = 0;
    else this.mass = mass;
  }
  draw(ctx) {
    const ctxLocal = ctx;
    ctxLocal.beginPath();
    const innerRadius = 1;
    const outerRadius = 40;
    const gradient = ctxLocal.createRadialGradient(this.x, this.y, innerRadius,
      this.x, this.y, outerRadius);
    gradient.addColorStop(0, '#951C2D');
    gradient.addColorStop(1, 'black');
    ctxLocal.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctxLocal.fillStyle = gradient;
    ctxLocal.fill();
  }
  isPointIn(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));

    if (distance <= this.r) return true;
    return false;
  }
}

class PendulumBar {
  constructor(pivotX, pivotY, moveX, moveY) {
    this.pivotX = pivotX;
    this.pivotY = pivotY;
    this.moveX = moveX;
    this.moveY = moveY;
  }
  length() {
    const dx = this.pivotX - this.moveX;
    const dy = this.pivotY - this.moveY;

    return Math.sqrt((dx * dx) + (dy * dy));
  }
  theta() {
    const dx = this.pivotX - this.moveX;
    const dy = this.pivotY - this.moveY;

    let theta;

    if (dy === 0) {
      if (dx > 0) theta = Math.PI / 2;
      else theta = -Math.PI / 2;
    } else if (dy > 0) {
      if (dx < 0) theta = (Math.PI / 2) + (Math.atan(-dy / dx));
      else theta = -(Math.PI / 2) - Math.atan(dy / dx);
    } else theta = Math.atan(dx / dy);

    return theta;
  }

  getThetaAcceleration() {
    return -Math.sin(this.theta()) / this.length();
  }

  addTheta(theta) {
    const newTheta = this.theta() + theta;
    const length = this.length();
    this.newTheta = newTheta;
    this.moveX = (length * Math.sin(newTheta)) + this.pivotX;
    this.moveY = (length * Math.cos(newTheta)) + this.pivotY;
  }
  addInitialTheta(theta) {
    const newTheta = theta;
    const length = this.length();
    this.newTheta = newTheta;
    this.moveX = (length * Math.sin(newTheta)) + this.pivotX;
    this.moveY = (length * Math.cos(newTheta)) + this.pivotY;
  }

  move(dx, dy) {
    const prevLength = this.length();
    let tempX = (this.moveX + dx) - this.pivotX;
    let tempY = (this.moveY + dy) - this.pivotY;

    const tempLength = Math.sqrt((tempX * tempX) + (tempY * tempY));
    tempX *= (prevLength / tempLength);
    tempY *= (prevLength / tempLength);

    this.moveX = tempX + this.pivotX;
    this.moveY = tempY + this.pivotY;
  }

  draw(ctx) {
    const ctxLocal = ctx;
    ctxLocal.lineWidth = '1';
    ctxLocal.strokeStyle = 'black';
    ctxLocal.moveTo(this.pivotX, this.pivotY);
    ctxLocal.beginPath();
    ctxLocal.lineTo(this.pivotX, this.pivotY);
    ctxLocal.lineTo(this.moveX, this.moveY);
    ctxLocal.stroke();
  }
}

function pendulumDrawEverything(array, ctx) {
  for (let i = 0; i < array.length; i += 1) {
    array[i].draw(ctx);
  }
}

class HeightPointer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw(ctx) {
    const ctxLocal = ctx;
    ctxLocal.save();
    ctxLocal.beginPath();
    ctxLocal.translate(this.x, this.y);
    ctxLocal.rotate(-55);
    ctxLocal.moveTo(0, 0);
    ctxLocal.lineTo(10, 20);
    ctxLocal.lineTo(-10, 20);
    ctxLocal.closePath();
    ctxLocal.fillStyle = '#8BD3EC';
    ctxLocal.strokeStyle = '#17B0CF';
    ctxLocal.lineWidth = 6;
    ctxLocal.stroke();
    ctxLocal.fill();
    ctxLocal.restore();
  }
  isPointIn(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    const distance = Math.sqrt((dx * dx) + (dy * dy));
    if (distance <= 25) return true;
    return false;
  }
}

class SpeedometerPointer {
  constructor(x, y, rotation) {
    this.isArrowMouseDown = false;
    this.x = x;
    this.y = y;
    this.angle = rotation;
  }
  draw(ctx) {
    const ctxLocal = ctx;
    ctxLocal.save();
    ctxLocal.translate(this.x, this.y);
    ctxLocal.fillStyle = 'black';
    ctxLocal.strokeStyle = '#555';
    ctxLocal.rotate(this.degreesToRadians(this.angle));
    const size = 70;
    const thickness = 6;
    ctxLocal.beginPath();
    ctxLocal.moveTo(0, 0); // center
    ctxLocal.lineTo(thickness * -1, -10);
    ctxLocal.lineTo(0, size * -1);
    ctxLocal.lineTo(thickness, -10);
    ctxLocal.lineTo(0, 0);
    ctxLocal.fill();
    ctxLocal.stroke();
    ctxLocal.restore();
  }
  rotate(rotation) {
    this.ctxLocal.restore();
    this.ctxLocal.rotate(this.degreesToRadians(rotation));
  }
  degreesToRadians(degrees) {
    return (Math.PI / 180) * degrees;
  }
}

class ScaleImage {
  constructor(cx, cy, img) {
    this.cx = cx;
    this.cy = cy;
    this.img = img;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.img, this.cx, this.cy);
    ctx.closePath();
  }
}

class StarClip {
  constructor(cx, cy, c, comp, imgsrc) {
    this.spikes = 5;
    this.outerRadius = 18;
    this.initcolor = c;
    this.color = this.initcolor;
    this.complete = comp;
    this.innerRadius = 8;
    this.cx = cx;
    this.cy = cy;
    this.imgSrc = imgsrc;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.drawImage(this.imgSrc, this.cx - (this.imgSrc.width / 2),
    this.cy - (this.imgSrc.height / 2));
    ctx.closePath();
  }
  reset() {
    this.color = 'red';
    this.outerRadius = 18;
    this.innerRadius = 8;
    this.imgSrc.src = starBlank;
  }
  changeStarColor(starFilled) {
    // this.color = color;
    this.complete = true;
    this.outerRadius = 25;
    this.innerRadius = 12;
    this.imgSrc.src = starFilled;
    // console.log('starFilled');
  }
}

class Pendulum {
  constructor(canElement, playpause, start, scaleImage, starData,
    onSliderChange, onComplete, prize, allPrize, suffleRefresh) {
    const self = this;
    self.myInterval = null;
    self.onCompleteAnim = onComplete;
    self.onSliderChange = onSliderChange;
    self.onPrizeHit = prize;
    self.onPrizeAllHit = allPrize;
    self.starData = starData;
    self.suffleRefresh = suffleRefresh;
    self.tableData = {
      height: 40,
      speed_10L: 40,
      speed_0B: 20,
      speed_10R: 38
    };
    self.speedValues = {
      minAngle: -135,
      maxAngle: 135,
      minSpeed: 0.003,
      maxSpeed: 0.084
    };
    self.scaleValues = {
      maxScaleAngle: -98,
      minScaleAngle: 0,
      minValue: 0,
      maxValue: 100
    };
    self.damping = 1;
    self.canvas = canElement;
    self.playpauseButton = playpause;
    self.startButton = start;
    self.ctx = self.canvas.getContext('2d');
    const img = new Image();
    img.src = scaleImage;
    if (img.complete) {
      self.scaleImageSrc = img;
      const imgNew = new Image();
      imgNew.src = starBlank;
      if (imgNew.complete) {
        self.starImageSrc = imgNew;
        self.init();
        self.addEventHandlers();
      } else {
        imgNew.onload = () => {
          self.starImageSrc = imgNew;
          self.init();
          self.addEventHandlers();
        };
      }
    } else {
      img.onload = () => {
        self.scaleImageSrc = img;
        const imgNew = new Image();
        imgNew.src = starBlank;
        if (imgNew.complete) {
          self.starImageSrc = imgNew;
          self.init();
          self.addEventHandlers();
        } else {
          imgNew.onload = () => {
            self.starImageSrc = imgNew;
            self.init();
            self.addEventHandlers();
          };
        }
      };
    }
  }

  init() {
    this.animationSpeed = 16;
    this.pendulumBarHeight = 445;
    this.pendulumLeftPosition = 513;
    this.isPlaying = false;
    this.onReplay = false;
    this.isComplete = true;
    this.startHeight = 0;
    this.pendulumBallDiameter = 25;
    this.pendulumBarTop = 130;
    this.speedometerPointerLeft = 924;
    this.speedometerPointerTop = 420;
    this.speedometerPointerAngle = this.speedValues.minAngle;
    this.everythingArr = [];
    self.ballPrevCord = [];
    this.pendulumBar = new PendulumBar(this.pendulumLeftPosition,
      this.pendulumBarTop, this.pendulumLeftPosition, this.pendulumBarHeight);
    this.everythingArr.push(this.pendulumBar);

  // scale
    this.scaleImageX = 50;
    this.scaleImageY = 66;

    this.scalePointerTop = 87;
    this.scalePointerBottom = this.pendulumBarHeight;
    this.heightPointerArrowLeft = 42;
    this.heightPointerArrowTop = this.scalePointerBottom;
  // scale


  // create stars
    this.createStars();

    this.pendulumBall = new PendulumBall(this.pendulumLeftPosition,
        this.pendulumBarHeight, this.pendulumBallDiameter);
    this.everythingArr.push(this.pendulumBall);
    this.scaleImage = new ScaleImage(this.scaleImageX, this.scaleImageY, this.scaleImageSrc);
    this.everythingArr.push(this.scaleImage);
    this.heightPointer = new HeightPointer(this.heightPointerArrowLeft, this.heightPointerArrowTop);
    this.everythingArr.push(this.heightPointer);
    this.speedometerPointer = new SpeedometerPointer(this.speedometerPointerLeft,
    this.speedometerPointerTop, this.speedometerPointerAngle);
    this.everythingArr.push(this.speedometerPointer);
    this.increaseHeight(this.pendulumBarHeight);
    this.setScaleAtTen();
  // for table values
  // this.tableThetaSpeeds();
  }
  update(suffleRefresh) {
    self.suffleRefresh = suffleRefresh;
    if (self.suffleRefresh) {
      this.animationSpeed = 16;
      this.pendulumBarHeight = 445;
      this.pendulumLeftPosition = 513;
      this.startHeight = 0;
      this.pendulumBallDiameter = 25;
      this.pendulumBarTop = 130;
      this.speedometerPointerLeft = 924;
      this.speedometerPointerTop = 420;

      this.speedometerPointerAngle = this.speedValues.minAngle;
      this.everythingArr = [];
      this.pendulumBar = new PendulumBar(this.pendulumLeftPosition,
        this.pendulumBarTop, this.pendulumLeftPosition, this.pendulumBarHeight);
      this.everythingArr.push(this.pendulumBar);

    // scale
      this.scaleImageX = 50;
      this.scaleImageY = 66;
      this.scalePointerTop = 87;
      this.scalePointerBottom = this.pendulumBarHeight;
      this.heightPointerArrowLeft = 42;
      this.heightPointerArrowTop = this.scalePointerBottom;

      this.createStars();

      // this.starObjArr[0].changeStarColor('red');
      // this.starObjArr[1].changeStarColor('red');
      // this.starObjArr[2].changeStarColor('red');
      this.starObjArr[0].reset();
      this.starObjArr[1].reset();
      this.starObjArr[2].reset();

      this.pendulumBall = new PendulumBall(this.pendulumLeftPosition,
      this.pendulumBarHeight, this.pendulumBallDiameter);
      this.everythingArr.push(this.pendulumBall);
      this.scaleImage = new ScaleImage(this.scaleImageX, this.scaleImageY, this.scaleImageSrc);
      this.everythingArr.push(this.scaleImage);
      this.heightPointer = new HeightPointer(this.heightPointerArrowLeft,
        this.heightPointerArrowTop);
      this.everythingArr.push(this.heightPointer);
      this.speedometerPointer = new SpeedometerPointer(this.speedometerPointerLeft,
      this.speedometerPointerTop, this.speedometerPointerAngle);
      this.everythingArr.push(this.speedometerPointer);
      this.increaseHeight(this.pendulumBarHeight);
      this.setScaleAtTen();

      pendulumClearScreen(this.canvas, this.ctx);
      pendulumDrawEverything(this.everythingArr, this.ctx);
    }
  }
  createStars(imgSrc) {
    this.starObjArr = [];
    this.getStarPos();
    const imgNew = new Image();
    imgNew.src = starBlank;
    const imgNew1 = new Image();
    imgNew1.src = starBlank;
    const imgNew2 = new Image();
    imgNew2.src = starBlank;
    const imgArr = [imgNew2, imgNew, imgNew1];
    for (let i = 0; i < this.starPosArr.length; i += 1) {
      let color = 'red';
      let complete = false;
      if (this.starData[i]) {
        color = 'black';
        complete = true;
      }
      const star = new StarClip(this.starPosArr[i].left, this.starPosArr[i].top,
        color, complete, imgArr[i]);
      this.starObjArr.push(star);
      this.everythingArr.push(star);
    }
  }

  getStarPos() {
    const self = this;
    self.startsAt = [-20, -50, -80];
    self.starPosArr = [];
    self.startsAt.map((v, i) => {
      self.starPosArr[i] = self.getPointAtScaleValue(v);
      return v;
    });
  }

  increaseHeight(height) {
    this.pendulumBarHeight = height;
    this.pendulumBar.moveY = height;
    this.pendulumBall.y = height;
    pendulumClearScreen(this.canvas, this.ctx);
    pendulumDrawEverything(this.everythingArr, this.ctx);
  }

  addEventHandlers() {
    const self = this;
    self.canvas.addEventListener('mousedown', (e) => {
      self.canvasMouseDown(e);
    });
    self.canvas.addEventListener('touchstart', (e) => {
      self.canvasMouseDown(e);
    });
    self.canvas.addEventListener('mousemove', (e) => {
      self.canvasMouseMove(e);
    });
    self.canvas.addEventListener('touchmove', (e) => {
      self.canvasMouseMove(e);
    });
    self.canvas.addEventListener('touchend', (e) => {
      self.canvasMouseUp(e);
    });
    self.canvas.addEventListener('mouseup', (e) => {
      self.canvasMouseUp(e);
    });
    self.startButton.addEventListener('click', () => {
      if (self.startHeight === 0) return;
      self.ballPrevCord = [self.pendulumBall.x, self.pendulumBall.y];
      self.prevHeight = self.heightPointer.y;
      this.isBallMouseDown = false;
      self.animationSpeed = 16;
      self.animate();
      self.isComplete = false;
      self.leftSwingComp1 = false;
      self.leftSwingComp2 = false;
      self.rightSwingComp = false;
    });
    self.playpauseButton.addEventListener('click', () => {
      if (!self.isComplete) {
        if (!self.isPlaying) {
          self.doPlay();
          self.isPlaying = true;
        } else {
          self.doPause();
          self.isPlaying = false;
        }
      } else {
        // slow motion code here
        this.onReplay = true;
        self.animationSpeed = 32;
        self.heightPointer.y = self.prevHeight;
        self.scaleValueAndTheta();
        self.pendulumBall.x = self.pendulumBar.moveX;
        self.pendulumBall.y = self.pendulumBar.moveY;
        self.vtheta = 0;
        self.vx = 0;
        self.vy = 0;
        pendulumClearScreen(self.canvas, self.ctx);
        pendulumDrawEverything(self.everythingArr, self.ctx);
        self.doPlay();
        self.isPlaying = true;
        self.isComplete = false;
        self.leftSwingComp1 = false;
        self.leftSwingComp2 = false;
        self.rightSwingComp = false;
      }
    });
  }

  canvasMouseDown(e) {
    const self = this;
    self.mousePos = arrowGetMousePos(self.canvas, e);
    if (self.heightPointer.isPointIn(self.mousePos.x,
   self.mousePos.y)) {
      if (self.myInterval != null) {
        window.clearInterval(self.myInterval);
        self.myInterval = null;
      }
      self.isArrowMouseDown = true;
    }

    if (self.pendulumBall.isPointIn(self.mousePos.x,
   self.mousePos.y)) {
      this.isBallMouseDown = true;
      self.pendulumBall.prevMousePos = self.mousePos;
    }
  }
  canvasMouseMove(e) {
    const self = this;
    self.mousePos = arrowGetMousePos(self.canvas, e);
    if (self.isArrowMouseDown) {
      if (self.mousePos.y > self.scalePointerTop && self.mousePos.y < self.scalePointerBottom) {
        self.heightPointer.y = self.mousePos.y;
        self.scaleValueAndTheta();
        self.pendulumBall.x = self.pendulumBar.moveX;
        self.pendulumBall.y = self.pendulumBar.moveY;
        pendulumClearScreen(self.canvas, self.ctx);
        pendulumDrawEverything(self.everythingArr, self.ctx);
      }
    }
    if (self.heightPointer.isPointIn(self.mousePos.x,
     self.mousePos.y)) {
      self.canvas.classList.add('active');
    } else {
      self.canvas.classList.remove('active');
    }
    if (this.isBallMouseDown) {
      if (self.pendulumBall.y > 89 && self.pendulumBall.x < 505) {
        const dx = self.mousePos.x - self.pendulumBall.prevMousePos.x;
        const dy = self.mousePos.y - self.pendulumBall.prevMousePos.y;
        self.pendulumBall.prevMousePos = self.mousePos;
        self.pendulumBar.move(dx, dy);
        if (self.pendulumBar.moveY > 90 && self.pendulumBar.moveX < 504) {
          self.pendulumBall.x = self.pendulumBar.moveX;
          self.pendulumBall.y = self.pendulumBar.moveY;
          self.heightPointer.y = self.getPointerHeight();
        } else {
          this.isBallMouseDown = false;
          self.vtheta = 0;
          self.vx = 0;
          self.vy = 0;
        }
        // self.heightPointer.y = self.pendulumBall.y;
        pendulumClearScreen(self.canvas, self.ctx);
        pendulumDrawEverything(self.everythingArr, self.ctx);
      }
    }
  }

  setScaleAtTen() {
    const self = this;
    self.heightPointer.y = 408;
    self.scaleValueAndTheta();
    self.pendulumBall.x = self.pendulumBar.moveX;
    self.pendulumBall.y = self.pendulumBar.moveY;
    pendulumClearScreen(self.canvas, self.ctx);
    pendulumDrawEverything(self.everythingArr, self.ctx);
  }
  canvasMouseUp() {
    const self = this;
    if (self.isArrowMouseDown) {
      self.vtheta = 0;
      self.vx = 0;
      self.vy = 0;
      self.isArrowMouseDown = false;
    }
    if (this.isBallMouseDown) {
      this.isBallMouseDown = false;
      self.vtheta = 0;
      self.vx = 0;
      self.vy = 0;
    }
  }
  scaleValueAndTheta() {
    const self = this;
    const perc = 1 - ((self.heightPointer.y - self.scalePointerTop) /
    (self.scalePointerBottom - self.scalePointerTop));
    const angle = ((self.scaleValues.maxScaleAngle - self.scaleValues.minScaleAngle) * perc) +
    self.scaleValues.minScaleAngle;
    const radians = (angle * Math.PI) / 180;
    self.pendulumBar.addInitialTheta(radians);
    self.startHeight = Math.round(perc * 100);
    self.tableData.height = self.startHeight;
    self.onSliderChange(self.startHeight);
  }
  getPointerHeight() {
    const self = this;
    const angle = (self.pendulumBar.theta() * 180) / Math.PI;
    let perc = (Math.abs(angle) * 100) / 96.5;
    self.startHeight = Math.round(perc) - 1;
    self.tableData.height = self.startHeight;
    perc = 100 - perc;
    const a = (self.scalePointerBottom - self.scalePointerTop);
    const height = ((perc * a) + a) + self.scalePointerTop;
    return (height / 100) + 86;
  }
  getPendulumAtHeight() {
    const self = this;
    const angle = (self.pendulumBar.newTheta * 180) / Math.PI;
    const scaleValue = (angle - self.scaleValues.minScaleAngle) /
    (self.scaleValues.maxScaleAngle - self.scaleValues.minScaleAngle);
    return (scaleValue * 100);
  }

  getPointAtScaleValue(scaleValueToCheck) {
    const self = this;
    const perc = (scaleValueToCheck - self.scaleValues.minValue) /
    (self.scaleValues.maxValue - self.scaleValues.minValue);
    const angle = ((self.scaleValues.maxScaleAngle - self.scaleValues.minScaleAngle) * perc) +
    self.scaleValues.minScaleAngle;
    const theta = (angle * Math.PI) / 180;
    return self.getPointAtTheta(theta);
  }

  getPointAtTheta(theta) {
    const self = this;
    const newTheta = theta;
    const length = self.pendulumBar.length();
    const point = {};
    point.left = (length * Math.sin(newTheta)) + self.pendulumBar.pivotX;
    point.top = (length * Math.cos(newTheta)) + self.pendulumBar.pivotY;
    return point;
  }

  calculateSpeedValues() {
    const self = this;
    const speedValue = Math.abs(self.vtheta);
    const speedPerc = (speedValue - self.speedValues.minSpeed) /
    (self.speedValues.maxSpeed - self.speedValues.minSpeed);
    const angleToApply = ((self.speedValues.maxAngle - self.speedValues.minAngle) * speedPerc) +
    self.speedValues.minAngle;
    return angleToApply;
  }

  animate() {
    const self = this;
    clearInterval(this.myInterval);
    self.isPlaying = true;
    self.highlightAt = self.isPrizeHitted();
    self.startHitComp = false;
    this.myInterval = window.setInterval(() => {
      const atheta = self.pendulumBar.getThetaAcceleration();
      self.vtheta += atheta;
    // slow pendulum
      self.vtheta *= self.damping;
      self.pendulumBar.addTheta(self.vtheta);
      self.pendulumBall.x = self.pendulumBar.moveX;
      self.pendulumBall.y = self.pendulumBar.moveY;

      self.speedometerPointer.angle = self.calculateSpeedValues();
      self.isWingCompleted();

    // pendulum at
      if (self.highlightAt !== -1) {
        const hghtAt = self.getPendulumAtHeight();
        if (Math.round(hghtAt) === self.startsAt[self.highlightAt] && !self.startHitComp) {
          self.startHitComp = true;
          self.glowStarPrize();
        }
      }
      pendulumClearScreen(self.canvas, self.ctx);
      pendulumDrawEverything(self.everythingArr, self.ctx);
    }, self.animationSpeed);
  }
  catchPendulumData() {
    const self = this;
    const speed10lMax = 165;
    const speed10rMax = 150;
    const speed0bMax = 180;
    const maxHeight = 100;
    const heightPerc = (self.tableData.height / maxHeight);
    self.tableData.speed_10L = Math.round(heightPerc * speed10lMax);
    self.tableData.speed_10R = Math.round(heightPerc * speed10rMax);
    self.tableData.speed_0B = Math.round(heightPerc * speed0bMax);
  }
  /* catchPendulumData() {
    const self = this;
    const pendAt = self.getPendulumAtHeight();
    const speedValue = Math.round(self.calculateSpeedValues() + self.speedValues.minSpeed);
    console.log(speedValue);
    if (pendAt > 5 && pendAt < 15) {
      self.tableData.speed_10L = (speedValue > 0) ? speedValue : 0;
    }
    if (pendAt > -15 && pendAt < -5) {
      self.tableData.speed_10R = (speedValue > 0) ? speedValue : 0;
    }
    if (pendAt > -5 && pendAt < 5) {
      self.tableData.speed_0B = (speedValue > 0) ? speedValue : 0;
    }
  } */
  glowStarPrize() {
    const self = this;
    // self.ctx.font = '20px Arial';
    // self.ctx.fillStyle = 'white';
    const highlightVal = (self.highlightAt === 0) ? starFilled20 : (self.highlightAt === 1) ?
    starFilled50 : starFilled80;
    self.starObjArr[self.highlightAt].changeStarColor(highlightVal);
    const allComplete = [false, false, false];
    self.starObjArr.map((v, i) => {
      allComplete[i] = v.complete;
      return v;
    });
    self.onPrizeHit(self.highlightAt);
    if (allComplete.indexOf(false) === -1) {
      self.allPrizesHitted();
    }
  }
  allPrizesHitted() {
    const self = this;
    self.onPrizeAllHit();
  }
  isPrizeHitted() {
    const self = this;
    let returnValue = -1;
    self.startsAt.map((v, i) => {
      returnValue = (Math.abs(v) === self.startHeight) ? i : returnValue;
    });
    return returnValue;
  }
  isWingCompleted() {
    const self = this;
    const angle = (self.pendulumBar.newTheta * 180) / Math.PI;
    if (angle > 0) {
      self.leftSwingComp1 = true;
    }
    if (angle < 0 && self.leftSwingComp1) {
      self.rightSwingComp = true;
    }

    if (angle > 0 && self.rightSwingComp) {
      self.isComplete = true;
      self.catchPendulumData();
      clearInterval(self.myInterval);
      self.pendulumBar.addInitialTheta(0);
      self.speedometerPointer.angle = self.speedValues.minAngle;
      self.startHeight = 0;
      if (!this.onReplay) {
        self.onCompleteAnim();
      }
      self.setScaleAtTen();
      this.onReplay = false;
    }
  }
  doPlay() {
    if (this.startHeight === 0) return;
    this.animate();
  }

  doPause() {
    clearInterval(this.myInterval);
  }
}

export default Pendulum;

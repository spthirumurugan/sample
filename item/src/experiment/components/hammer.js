import hammerData from '../../config/experiment/hammer_data';
import { AUDIO_END } from '../actions/activity_change';

const bellAudio = require('../media/videos/bell.mp3');

function hammerClearScreen(canvas, ctx) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
class HammerBell {
  constructor(x, y, r, mass, ballHeight) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.ballHeight = ballHeight;
    this.prevY = 393;
    this.showHighlight = false;
    this.strokeStyle = 'transparent';
    this.fillStyle = 'transparent';
    if (mass === undefined) this.mass = 0;
    else this.mass = mass;
  }
  draw(ctx) {
    const ctxLocal = ctx;
    const self = this;
    let yPos = this.y;
    this.strokeStyle = 'transparent';
    this.fillStyle = 'transparent';
    // Ball
    ctxLocal.beginPath();
    ctxLocal.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctxLocal.closePath();
    ctxLocal.fillStyle = '#4e4f51';
    // ctxLocal.fillStyle = '#0000ff';
    ctxLocal.fill();
    // Rectangle

    if (this.y < this.prevY) {
      this.prevY = yPos;
      this.showHighlight = true;
      this.strokeStyle = 'transparent';
      this.fillStyle = 'transparent';
    } else if (this.y === this.prevY) {
      // this.showHighlight = false;
      this.strokeStyle = 'transparent';
      this.fillStyle = 'transparent';
    } else {
      yPos = this.prevY;
      if (this.showHighlight) {
        this.strokeStyle = '#1AB0CC';
        this.fillStyle = 'rgba(141, 216, 230, 0.5)';
        this.highlightTimeout = setTimeout(() => {
          this.showHighlight = false;
          this.strokeStyle = 'transparent';
          this.fillStyle = 'transparent';
          self.draw(ctx);
          clearTimeout(this.highlightTimeout);
        }, 2000);
      }
    }

    ctxLocal.beginPath();
    ctxLocal.lineWidth = 3;
    ctxLocal.strokeStyle = this.strokeStyle;
    if (this.ballHeight === 5) {
      ctxLocal.rect(this.x - 30, yPos + 43, 60, 22);
    }
    if (this.ballHeight === 4.5) {
      ctxLocal.rect(this.x - 30, yPos + 63, 60, 22);
    }
    if (this.ballHeight < 4.5) {
      ctxLocal.rect(this.x - 30, yPos - 8, 60, 22);
    }
    ctxLocal.stroke();
    ctxLocal.fillStyle = this.fillStyle;
    ctxLocal.fill();
    ctxLocal.closePath();
    // Triangle
    ctxLocal.beginPath();
    if (this.ballHeight === 5) {
      ctxLocal.moveTo((this.x - 84) + 50, (yPos + 45) + 12);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos + 45) + 25);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos + 45) + 0);
    }
    if (this.ballHeight === 4.5) {
      ctxLocal.moveTo((this.x - 84) + 50, (yPos + 65) + 12);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos + 65) + 25);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos + 65) + 0);
    }
    if (this.ballHeight < 4.5) {
      ctxLocal.moveTo((this.x - 84) + 50, (yPos - 8) + 12);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos - 8) + 25);
      ctxLocal.lineTo((this.x - 84) + 37, (yPos - 8) + 0);
    }
    ctxLocal.closePath();
    ctxLocal.lineWidth = 3;
    ctxLocal.strokeStyle = this.strokeStyle;
    ctxLocal.stroke();
    ctxLocal.fillStyle = this.fillStyle;
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

function hammerDrawEverything(array, ctx) {
  for (let i = 0; i < array.length; i += 1) {
    array[i].draw(ctx);
  }
}
class Hammer {
  constructor(canElement, play, start, value, tablePopup, ballHeight,
    toggleHammerAnim, playAudio, completeOstPopup) {
    this.myInterval = null;
    this.canvas = canElement;
    this.playButton = play;
    this.ctx = this.canvas.getContext('2d');
    this.start = start;
    this.value = value;
    this.tablePopup = tablePopup;
    this.ballHeight = ballHeight;
    this.completeOstPopup = completeOstPopup;
    this.toggleHammerAnim = toggleHammerAnim;
    this.playAudio = playAudio;
    this.init();
    this.addEventHandlers();
  }
  init() {
    this.animationSpeed = 0.002;
    this.hammerTopPosition = 393;
    this.hammerLeftPosition = 512;
    this.ballPosition = null;
    this.ballDirection = true;
    this.hammerBellDiameter = 6;
    this.ballAnimatePos = this.ballHeight;

    this.everythingArr = [];
    this.hammerBell = new HammerBell(this.hammerLeftPosition,
    this.hammerTopPosition, this.hammerBellDiameter, this.ballHeight
  );
    this.everythingArr.push(this.hammerBell);
    hammerDrawEverything(this.everythingArr, this.ctx);
    this.addEventHandlers();
    this.ballPosition = this.hammerBell.y;
  }
  addEventHandlers() {
    const self = this;
    self.playButton.addEventListener('click', () => {
      self.toggleHammerAnim(true);
    });
  }
  update(ballHeight, value) {
    this.ballHeight = ballHeight;
    this.value = value;
    this.ballAnimatePos = hammerData[this.value].highlight;
    this.hammerBell.ballHeight = this.ballHeight;
  }
  animate() {
    const self = this;
    clearInterval(this.myInterval);
    this.myInterval = window.setInterval(() => {
      if (self.ballPosition === self.ballAnimatePos && this.ballHeight >= 4.5) {
        self.playAudio(bellAudio, { type: AUDIO_END });
        self.completeOstPopup(true);
      }
      if (self.ballPosition > self.ballAnimatePos && self.ballDirection) {
        self.ballPosition -= 1;
      } else if (self.ballPosition === self.ballAnimatePos || !self.ballDirection) {
        self.ballPosition += 1;
        self.ballDirection = false;
        if (self.ballPosition === 393) {
          self.ballDirection = true;
          clearInterval(this.myInterval);
          setTimeout(() => {
            hammerClearScreen(self.canvas, self.ctx);
            this.start(this.value, this.tablePopup(true));
          }, 2000);
        }
      }
      self.hammerBell.y = self.ballPosition;
      hammerClearScreen(self.canvas, self.ctx);
      hammerDrawEverything(self.everythingArr, self.ctx);
    }, self.animationSpeed);
  }
  doPlay() {
    this.animate();
  }
}
export default Hammer;

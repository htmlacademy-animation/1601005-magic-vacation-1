import {bezierEasing} from './cubic-bezier';
import {animateDuration, animateEasing} from './animate';
import {runSerial} from './promise';

export default class LoseScene {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.canvas.width = 1500;
    this.canvas.height = 1500;

    this.crocodileImg = new Image();
    this.snowflakeImg = new Image();
    this.keyImg = new Image();
    this.flamingoImg = new Image();
    this.dropImg = new Image();
    this.leafImg = new Image();
    this.saturnImg = new Image();
    this.watermeloneImg = new Image();
    this.keyMaskImg = new Image();

    this.loadingCounter = 0;

    this.isAnimated = false;

    this.startAnimations = [];

    this.crocodileT = 96;
    this.crocodileL = 1500;
    this.crocodileHeight = 1500;
    this.crocodileWidth = 1500;
    this.crocodileAngle = 0;

    this.keyWidth = 350;
    this.keyHeight = 570;
    this.keyL = 580;
    this.keyT = 570;
    this.keyScale = 0.8;
    this.keyOpacity = 0;

    this.flamingoWidth = 300;
    this.flamingoHeight = 300;
    this.flamingoL = 434;
    this.flamingoT = 791;
    this.flamingoScale = 0;
    this.flamingoAngle = 60;

    this.saturnWidth = 280;
    this.saturnHeight = 280;
    this.saturnL = 1240;
    this.saturnT = 1050;
    this.saturnScale = 0;
    this.saturnAngle = 50;

    this.snowflakeWidth = 240;
    this.snowflakeHeight = 240;
    this.snowflakeL = 990;
    this.snowflakeT = 780;
    this.snowflakeScale = 0;
    this.snowflakeAngle = -60;

    this.watermeloneWidth = 260;
    this.watermeloneHeight = 260;
    this.watermeloneL = 0;
    this.watermeloneT = 920;
    this.watermeloneScale = 0;
    this.watermeloneAngle = 60;

    this.leafWidth = 360;
    this.leafHeight = 360;
    this.leafL = 1210;
    this.leafT = 428;
    this.leafScale = 0;
    this.leafAngle = -40;

    this.dropWidth = 60;
    this.dropHeight = 90;
    this.dropL = 685;
    this.dropT = 960;
    this.dropScale = 0;
    this.dropOpacity = 0;

    this.keyMaskWidth = 765;
    this.keyMaskHeight = 796;
    this.keyMaskL = 760;
    this.keyMaskT = 570;

    this.initEventListeners();
    this.loadImages();
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 8) {
      this.drawScene();
    }
  }

  initEventListeners() {
    this.keyImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.keyMaskImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.crocodileImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.watermeloneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.saturnImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.flamingoImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.leafImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.dropImg.onload = () => {
      this.increaseLoadingCounter();
    };
  }

  loadImages() {
    this.crocodileImg.src = `/img/crocodile.png`;
    this.snowflakeImg.src = `/img/snowflake.png`;
    this.watermeloneImg.src = `/img/watermelon.png`;
    this.flamingoImg.src = `/img/flamingo.png`;
    this.saturnImg.src = `/img/saturn.png`;
    this.keyImg.src = `/img/key.png`;
    this.leafImg.src = `/img/leaf.png`;
    this.dropImg.src = `/img/drop.png`;
    this.keyMaskImg.src = `/img/key-mask.svg`;
  }

  scaleCtx(x, y, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.transform(x, 0, 0, y, 0, 0);
    this.ctx.translate(-cx, -cy);
  }

  rotateCtx(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  }

  drawKey() {
    this.ctx.save();
    this.ctx.globalAlpha = this.keyOpacity;
    this.scaleCtx(this.keyScale, this.keyScale, this.keyL + this.keyWidth / 2, this.keyT + this.keyHeight / 2);
    this.ctx.drawImage(this.keyImg, this.keyL, this.keyT, this.keyWidth, this.keyHeight);
    this.ctx.restore();
  }

  drawKeyMask() {
    this.ctx.drawImage(this.keyMaskImg, this.keyMaskL, this.keyMaskT, this.keyMaskWidth, this.keyMaskHeight);
  }

  drawCrocodile() {
    this.ctx.save();
    this.rotateCtx(this.crocodileAngle, this.crocodileL + this.crocodileWidth / 2, this.crocodileT + this.crocodileHeight / 2);
    this.ctx.drawImage(this.crocodileImg, this.crocodileL, this.crocodileT, this.crocodileWidth, this.crocodileHeight);
    this.ctx.restore();
  }

  drawSnowflake() {
    this.ctx.save();
    this.scaleCtx(this.snowflakeScale, this.snowflakeScale, this.snowflakeL + this.snowflakeWidth / 2, this.snowflakeT + this.snowflakeHeight / 2);
    this.rotateCtx(this.snowflakeAngle, this.snowflakeL + this.snowflakeWidth / 2, this.snowflakeT + this.snowflakeHeight / 2);
    this.ctx.drawImage(this.snowflakeImg, this.snowflakeL, this.snowflakeT, this.snowflakeWidth, this.snowflakeHeight);
    this.ctx.restore();
  }

  drawFlamingo() {
    this.ctx.save();
    this.scaleCtx(this.flamingoScale, this.flamingoScale, this.flamingoL + this.flamingoWidth / 2, this.flamingoT + this.flamingoHeight / 2);
    this.rotateCtx(this.flamingoAngle, this.flamingoL + this.flamingoWidth / 2, this.flamingoT + this.flamingoHeight / 2);
    this.ctx.drawImage(this.flamingoImg, this.flamingoL, this.flamingoT, this.flamingoWidth, this.flamingoHeight);
    this.ctx.restore();
  }

  drawLeaf() {
    this.ctx.save();
    this.scaleCtx(this.leafScale, this.leafScale, this.leafL + this.leafWidth / 2, this.leafT + this.leafHeight / 2);
    this.rotateCtx(this.leafAngle, this.leafL + this.leafWidth / 2, this.leafT + this.leafHeight / 2);
    this.ctx.drawImage(this.leafImg, this.leafL, this.leafT, this.leafWidth, this.leafHeight);
    this.ctx.restore();
  }

  drawWatermelone() {
    this.ctx.save();
    this.scaleCtx(this.watermeloneScale, this.watermeloneScale, this.watermeloneL + this.watermeloneWidth / 2, this.watermeloneT + this.watermeloneHeight / 2);
    this.rotateCtx(this.watermeloneAngle, this.watermeloneL + this.watermeloneWidth / 2, this.watermeloneT + this.watermeloneHeight / 2);
    this.ctx.drawImage(this.watermeloneImg, this.watermeloneL, this.watermeloneT, this.watermeloneWidth, this.watermeloneHeight);
    this.ctx.restore();
  }

  drawSaturn() {
    this.ctx.save();
    this.scaleCtx(this.saturnScale, this.saturnScale, this.saturnL + this.saturnWidth / 2, this.saturnT + this.saturnHeight / 2);
    this.rotateCtx(this.saturnAngle, this.saturnL + this.saturnWidth / 2, this.saturnT + this.saturnHeight / 2);
    this.ctx.drawImage(this.saturnImg, this.saturnL, this.saturnT, this.saturnWidth, this.saturnHeight);
    this.ctx.restore();
  }

  drawDrop() {
    this.ctx.save();
    this.ctx.globalAlpha = this.dropOpacity;
    this.scaleCtx(this.dropScale, this.dropScale, this.dropL + this.dropWidth / 2, this.dropT);
    this.ctx.drawImage(this.dropImg, this.dropL, this.dropT, this.dropWidth, this.dropHeight);
    this.ctx.restore();
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isAnimated) {
      this.drawKey();
      this.drawCrocodile();
      this.drawKeyMask();
      this.drawLeaf();
      this.drawFlamingo();
      this.drawSaturn();
      this.drawWatermelone();
      this.drawSnowflake();
      this.drawDrop();
    }
  }

  animateKey() {
    const keyOpacityTick = (progress) => {
      this.keyOpacity = progress;
    };

    const keyScaleTick = (from, to) => (progress) => {
      this.keyScale = from + progress * (to - from);
    };

    const keyOpacityAnimations = [
      () => animateEasing(keyOpacityTick, 183, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const keyScaleAnimations = [
      () => animateEasing(keyScaleTick(0.8, 1), 183, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(keyOpacityAnimations);
    runSerial(keyScaleAnimations);
  }

  animateCrocodile() {
    const crocodileTTick = (from, to) => (progress) => {
      this.crocodileT = from + progress * (to - from);
    };

    const crocodileLTick = (from, to) => (progress) => {
      this.crocodileL = from + progress * (to - from);
    };

    const crocodileRotateTick = (from, to) => (progress) => {
      this.crocodileAngle = from + progress * (to - from);
    };

    animateEasing(crocodileTTick(96, 200), 600, bezierEasing(0.15, 0.00, 0.82, 1.00));
    animateEasing(crocodileLTick(334, 0), 600, bezierEasing(0.15, 0.00, 0.82, 1.00));
    animateEasing(crocodileRotateTick(15, 0), 600, bezierEasing(0.15, 0.00, 0.82, 1.00));
  }

  animateFlamingo() {
    const flamingoTTick = (from, to) => (progress) => {
      this.flamingoT = from + progress * (to - from);
    };

    const flamingoLTick = (from, to) => (progress) => {
      this.flamingoL = from + progress * (to - from);
    };

    const flamingoScaleTick = (from, to) => (progress) => {
      this.flamingoScale = from + progress * (to - from);
    };

    const flamingoRotateTick = (from, to) => (progress) => {
      this.flamingoAngle = from + progress * (to - from);
    };

    const flamingoTAnimations = [
      () => animateEasing(flamingoTTick(791, 585), 617, bezierEasing(0.11, 0.00, 0.00, 1.00)),
      () => animateEasing(flamingoTTick(585, 1500), 567, bezierEasing(0.87, 0.00, 0.83, 0.83)),
    ];

    animateEasing(flamingoScaleTick(0, 1), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(flamingoRotateTick(60, 0), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(flamingoLTick(634, 190), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    runSerial(flamingoTAnimations);
  }

  animateLeaf() {
    const leafTTick = (from, to) => (progress) => {
      this.leafT = from + progress * (to - from);
    };

    const leafLTick = (from, to) => (progress) => {
      this.leafL = from + progress * (to - from);
    };

    const leafScaleTick = (from, to) => (progress) => {
      this.leafScale = from + progress * (to - from);
    };

    const leafRotateTick = (from, to) => (progress) => {
      this.leafAngle = from + progress * (to - from);
    };

    const leafTAnimations = [
      () => animateEasing(leafTTick(791, 428), 533, bezierEasing(0.11, 0.00, 0.00, 1.00)),
      () => animateEasing(leafTTick(428, 1500), 583, bezierEasing(0.87, 0.00, 0.83, 0.83)),
    ];

    animateEasing(leafScaleTick(0, 1), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(leafRotateTick(-40, 0), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(leafLTick(634, 1210), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    runSerial(leafTAnimations);
  }

  animateSaturn() {
    const saturnTTick = (from, to) => (progress) => {
      this.saturnT = from + progress * (to - from);
    };

    const saturnLTick = (from, to) => (progress) => {
      this.saturnL = from + progress * (to - from);
    };

    const saturnScaleTick = (from, to) => (progress) => {
      this.saturnScale = from + progress * (to - from);
    };

    const saturnRotateTick = (from, to) => (progress) => {
      this.saturnAngle = from + progress * (to - from);
    };

    const saturnTAnimations = [
      () => animateEasing(saturnTTick(791, 1050), 617, bezierEasing(0.11, 0.00, 0.00, 1.00)),
      () => animateEasing(saturnTTick(1050, 1500), 583, bezierEasing(0.87, 0.00, 0.83, 0.83)),
    ];

    animateEasing(saturnScaleTick(0, 1), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(saturnRotateTick(50, 0), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(saturnLTick(634, 1240), 617, bezierEasing(0.11, 0.00, 0.00, 1.00));
    runSerial(saturnTAnimations);
  }

  animateSnowflake() {
    const snowflakeTTick = (from, to) => (progress) => {
      this.snowflakeT = from + progress * (to - from);
    };

    const snowflakeLTick = (from, to) => (progress) => {
      this.snowflakeL = from + progress * (to - from);
    };

    const snowflakeScaleTick = (from, to) => (progress) => {
      this.snowflakeScale = from + progress * (to - from);
    };

    const snowflakeRotateTick = (from, to) => (progress) => {
      this.snowflakeAngle = from + progress * (to - from);
    };

    const snowflakeTAnimations = [
      () => animateEasing(snowflakeTTick(791, 780), 683, bezierEasing(0.11, 0.00, 0.00, 1.00)),
      () => animateEasing(snowflakeTTick(780, 1500), 583, bezierEasing(0.87, 0.00, 0.83, 0.83)),
    ];

    animateEasing(snowflakeScaleTick(0, 1), 683, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(snowflakeRotateTick(-60, 0), 683, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(snowflakeLTick(634, 990), 683, bezierEasing(0.11, 0.00, 0.00, 1.00));
    runSerial(snowflakeTAnimations);
  }

  animateWatermelone() {
    const watermeloneTTick = (from, to) => (progress) => {
      this.watermeloneT = from + progress * (to - from);
    };

    const watermeloneLTick = (from, to) => (progress) => {
      this.watermeloneL = from + progress * (to - from);
    };

    const watermeloneScaleTick = (from, to) => (progress) => {
      this.watermeloneScale = from + progress * (to - from);
    };

    const watermeloneRotateTick = (from, to) => (progress) => {
      this.watermeloneAngle = from + progress * (to - from);
    };

    const watermeloneTAnimations = [
      () => animateEasing(watermeloneTTick(791, 920), 533, bezierEasing(0.11, 0.00, 0.00, 1.00)),
      () => animateEasing(watermeloneTTick(920, 1500), 583, bezierEasing(0.87, 0.00, 0.83, 0.83)),
    ];

    animateEasing(watermeloneScaleTick(0, 1), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(watermeloneRotateTick(60, 0), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    animateEasing(watermeloneLTick(634, 0), 533, bezierEasing(0.11, 0.00, 0.00, 1.00));
    runSerial(watermeloneTAnimations);
  }

  animateDropInfinite() {
    const dropYTick = (from, to) => (progress) => {
      this.dropT = from + progress * (to - from);
    };

    const dropScaleTick = (from, to) => (progress) => {
      this.dropScale = from + progress * (to - from);
    };

    const dropOpacityTick = (from, to) => (progress) => {
      this.dropOpacity = from + progress * (to - from);
    };

    const dropYAnimations = [
      () => animateEasing(dropYTick(960, 960), 710, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(dropYTick(960, 1120), 507, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const dropScaleAnimations = [
      () => animateEasing(dropScaleTick(0, 0.5), 330, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(dropScaleTick(0.5, 1), 253, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(dropScaleTick(1, 1), 431, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(dropScaleTick(1, 0.5), 203, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const dropOpacityAnimations = [
      () => animateEasing(dropOpacityTick(1, 1), 1014, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(dropOpacityTick(1, 0), 203, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(dropYAnimations);
    runSerial(dropScaleAnimations);
    runSerial(dropOpacityAnimations);
  }

  startAnimateDropInfinite() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateDropInfinite();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 1217)
    ];

    runSerial(animations).then(this.startAnimateDropInfinite.bind(this));
  }

  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 1217)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }

  startAnimation() {
    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = (globalProgress) => {

        const dropAnimationDelay = 1283;
        const crocodailAnimationDelay = 683;
        const itemsAnimationDelay = 100;

        this.animateKey();
        this.startAnimationInfinite();

        if (globalProgress >= dropAnimationDelay && this.startAnimations.indexOf(dropAnimationDelay) < 0) {
          this.startAnimations.push(dropAnimationDelay);
          this.startAnimateDropInfinite();
        }

        if (globalProgress >= crocodailAnimationDelay && this.startAnimations.indexOf(crocodailAnimationDelay) < 0) {
          this.startAnimations.push(crocodailAnimationDelay);

          this.animateCrocodile();
        }

        if (globalProgress >= itemsAnimationDelay && this.startAnimations.indexOf(itemsAnimationDelay) < 0) {
          this.startAnimations.push(itemsAnimationDelay);

          this.animateFlamingo();
          this.animateLeaf();
          this.animateSaturn();
          this.animateSnowflake();
          this.animateWatermelone();
        }
      };

      animateDuration(globalAnimationTick, 4000);
    }
  }
}

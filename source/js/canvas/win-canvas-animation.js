import {bezierEasing} from './cubic-bezier';
import {animateDuration, animateEasing} from './animate';
import {runSerial} from './promise';

export default class WinScene {
  constructor(options) {
    this.canvas = document.querySelector(options.canvas);
    this.ctx = this.canvas.getContext(`2d`);

    this.canvas.width = 1500;
    this.canvas.height = 1500;

    this.seaCalfImg = new Image();
    this.snowflakeLeftImg = new Image();
    this.snowflakeRightImg = new Image();
    this.treeImg = new Image();
    this.tree2Img = new Image();
    this.backImg = new Image();
    this.airplaneImg = new Image();
    this.iceImg = new Image();

    this.loadingCounter = 0;

    this.isAnimated = false;

    this.startAnimations = [];

    this.seaCalfT = 457;
    this.seaCalfL = 90;
    this.seaCalfHeight = 980;
    this.seaCalfWidth = 980;

    this.treeWidth = 90;
    this.treeHeight = 285;
    this.treeL = 771;
    this.treeT = 718;
    this.treeOpacity = 0;

    this.tree2Width = 67;
    this.tree2Height = 178;
    this.tree2L = 861;
    this.tree2T = 861;
    this.tree2Opacity = 0;

    this.backWidth = 1180;
    this.backHeight = 650;
    this.backL = 180;
    this.backT = 555;
    this.backSize = 0;

    this.snowflakesOpacity = 0;

    this.snowflakeLeftWidth = 450;
    this.snowflakeLeftHeight = 450;
    this.snowflakeLeftL = -30;
    this.snowflakeLeftT = 680;

    this.snowflakeRightWidth = 360;
    this.snowflakeRightHeight = 360;
    this.snowflakeRightL = 846;
    this.snowflakeRightT = 857;

    this.airplaneWidth = 260;
    this.airplaneHeight = 260;
    this.airplaneL = 1300;
    this.airplaneT = 562;
    this.airplaneOpacity = 0;
    this.airplaneAngle = 75;

    this.iceWidth = 808;
    this.iceHeight = 330;
    this.iceL = 200;
    this.iceT = 915;
    this.iceAngle = 19;

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
    this.seaCalfImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeLeftImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeRightImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.tree2Img.onload = () => {
      this.increaseLoadingCounter();
    };

    this.backImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.airplaneImg.onload = () => {
      this.increaseLoadingCounter();
    };

    this.iceImg.onload = () => {
      this.increaseLoadingCounter();
    };
  }

  loadImages() {
    this.seaCalfImg.src = `/img/sea-calf.png`;
    this.snowflakeLeftImg.src = `/img/snowflake.png`;
    this.snowflakeRightImg.src = `/img/snowflake.png`;
    this.treeImg.src = `/img/tree.png`;
    this.tree2Img.src = `/img/tree2.png`;
    this.backImg.src = `/img/back.png`;
    this.airplaneImg.src = `/img/airplane.png`;
    this.iceImg.src = `/img/ice.png`;
  }

  drawSeeaCalf() {
    this.ctx.save();
    this.rotateCtx(this.iceAngle, this.iceL + this.iceWidth / 2, this.iceT + this.iceHeight / 2);
    this.ctx.drawImage(this.seaCalfImg, this.seaCalfL, this.seaCalfT, this.seaCalfWidth, this.seaCalfHeight);
    this.ctx.restore();
  }

  drawSnowflakeLeft() {
    this.ctx.save();
    this.ctx.globalAlpha = this.snowflakesOpacity;
    this.ctx.drawImage(this.snowflakeLeftImg, this.snowflakeLeftL, this.snowflakeLeftT, this.snowflakeLeftWidth, this.snowflakeLeftHeight);
    this.ctx.restore();
  }

  drawSnowflakeRight() {
    this.ctx.save();
    this.ctx.globalAlpha = this.snowflakesOpacity;
    this.rotateCtx(180, this.snowflakeRightL + this.snowflakeRightWidth / 2, this.snowflakeRightT + this.snowflakeRightHeight / 2);
    this.ctx.drawImage(this.snowflakeRightImg, this.snowflakeRightL, this.snowflakeRightT, this.snowflakeRightWidth, this.snowflakeRightHeight);
    this.ctx.restore();
  }

  drawTree() {
    this.ctx.save();
    this.ctx.globalAlpha = this.treeOpacity;
    this.ctx.drawImage(this.treeImg, this.treeL, this.treeT, this.treeWidth, this.treeHeight);
    this.ctx.restore();
  }

  drawTree2() {
    this.ctx.save();
    this.ctx.globalAlpha = this.tree2Opacity;
    this.ctx.drawImage(this.tree2Img, this.tree2L, this.tree2T, this.tree2Width, this.tree2Height);
    this.ctx.restore();
  }

  drawBack() {
    this.ctx.drawImage(this.backImg, this.backL, this.backT, this.backWidth, this.backHeight);
  }

  drawIce() {
    this.ctx.save();
    this.rotateCtx(this.iceAngle, this.iceL + this.iceWidth / 2, this.iceT + this.iceHeight / 2);
    this.ctx.drawImage(this.iceImg, this.iceL, this.iceT, this.iceWidth, this.iceHeight);
    this.ctx.restore();
  }

  drawAirplane() {
    this.ctx.save();
    this.ctx.globalAlpha = this.airplaneOpacity;
    this.rotateCtx(this.airplaneAngle, this.airplaneL + this.airplaneWidth / 2, this.airplaneT + this.airplaneHeight / 2);
    this.ctx.drawImage(this.airplaneImg, this.airplaneL, this.airplaneT, this.airplaneWidth, this.airplaneHeight);
    this.ctx.restore();
  }

  rotateCtx(angle, cx, cy) {
    this.ctx.translate(cx, cy);
    this.ctx.rotate(angle * Math.PI / 180);
    this.ctx.translate(-cx, -cy);
  }

  drawBack() {
    this.backWidth = 1180;
    this.backHeight = 650;
    this.backL = 180;
    this.backT = 555;

    const radius = this.backHeight / 2;

    this.ctx.save();
    this.ctx.fillStyle = `#acc3ff`;

    this.ctx.beginPath();
    this.ctx.arc(
        radius + this.backL,
        radius * this.backSize + this.backT,
        radius * this.backSize,
        Math.PI / 2,
        Math.PI * 3 / 2,
    );
    this.ctx.moveTo(radius + this.backL, this.backT);
    this.ctx.bezierCurveTo(
        radius + this.backL,
        this.backT,
        this.
        this.backWidth * this.backSize,
        radius * this.backSize + this.backT,
        this.backWidth * this.backSize + this.backL,
        radius * this.backSize + this.backT - 120,
    );
    this.ctx.bezierCurveTo(
        this.backWidth * this.backSize + this.backL,
        radius * this.backSize + this.backT - 120,
        this.backWidth * this.backSize - 250 + this.backL,
        radius * this.backSize + 350 + this.backT,
        radius + this.backL,
        2 * radius * this.backSize + this.backT,
    );

    this.ctx.fill();
    this.ctx.restore();
  }

  animateBack() {
    const backSizeTick = (from, to) => (progress) => {
      this.backSize = from + progress * (to - from);
    };

    const backSizeAnimations = [
      () => animateEasing(backSizeTick(0, 1), 567, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(backSizeAnimations);
  }

  drawScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.isAnimated) {
      // this.drawBack();
      this.drawAirplane();
      this.drawTree();
      this.drawTree2();
      this.drawIce();
      this.drawSeeaCalf();
      this.drawSnowflakeLeft();
      this.drawSnowflakeRight();
    }
  }

  startAnimationInfinite() {
    const globalAnimationTick = () => {
      this.drawScene();
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 2000)
    ];

    runSerial(animations).then(this.startAnimationInfinite.bind(this));
  }

  animateSnowflakes() {
    const snowflakesOpacityTick = (progress) => {

      this.snowflakesOpacity = progress;
    };

    animateEasing(snowflakesOpacityTick, 633, bezierEasing(0.33, 0, 0.67, 1));
  }

  animateSnowflakesInfinite() {

    const snowflakeLeftYTick = (from, to) => (progress) => {
      this.snowflakeLeftT = from + progress * (to - from);
    };

    const snowflakeRightYTick = (from, to) => (progress) => {
      this.snowflakeRightT = from + progress * (to - from);
    };

    const snowflakeLeftYFrom = 680;
    const snowflakeLeftYTo = 700;

    const snowflakeLeftAnimations = [
      () => animateEasing(snowflakeLeftYTick(snowflakeLeftYFrom, snowflakeLeftYTo), 1167, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(snowflakeLeftYTick(snowflakeLeftYTo, snowflakeLeftYFrom), 1167, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const snowflakeRightYFrom = 857;
    const snowflakeRightYTo = 837;

    const snowflakeRightAnimations = [
      () => animateEasing(snowflakeRightYTick(snowflakeRightYFrom, snowflakeRightYTo), 1167, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(snowflakeRightYTick(snowflakeRightYTo, snowflakeRightYFrom), 1167, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(snowflakeLeftAnimations);
    runSerial(snowflakeRightAnimations);
  }

  startAnimateSnowflakes() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateSnowflakes();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 633)
    ];

    runSerial(animations);

    runSerial(animations).then(this.startAnimateSnowflakesInfinite.bind(this));
  }

  startAnimateSnowflakesInfinite() {
    const globalAnimationTick = (globalProgress) => {
      if (globalProgress === 0) {
        this.animateSnowflakesInfinite();
      }
    };

    const animations = [
      () => animateDuration(globalAnimationTick, 2344)
    ];

    runSerial(animations).then(this.startAnimateSnowflakesInfinite.bind(this));
  }

  animateTree() {
    const treeOpacityTick = (progress) => {
      this.treeOpacity = progress;
    };

    const treeShowTick = (from, to) => (progress) => {
      this.treeT = from + progress * (to - from);
    };

    const treeOpacityAnimations = [
      () => animateEasing(treeOpacityTick, 567, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const treeShowAnimations = [
      () => animateEasing(treeShowTick(918, 718), 567, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(treeOpacityAnimations);
    runSerial(treeShowAnimations);
  }

  animateTree2() {
    const treeOpacityTick = (progress) => {
      this.tree2Opacity = progress;
    };

    const treeShowTick = (from, to) => (progress) => {
      this.treeT = from + progress * (to - from);
    };

    const treeOpacitywAnimations = [
      () => animateEasing(treeOpacityTick, 433, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const treeShowAnimations = [
      () => animateEasing(treeShowTick(981, 861), 433, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(treeOpacitywAnimations);
    runSerial(treeShowAnimations);
  }

  animateShowIce() {
    const iceTTick = (from, to) => (progress) => {
      this.iceT = from + progress * (to - from);
    };

    const seaCalfTTick = (from, to) => (progress) => {
      this.seaCalfT = from + progress * (to - from);
    };

    const iceTAnimations = [
      () => animateEasing(iceTTick(1475, 889), 367, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceTTick(889, 936), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceTTick(936, 903), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceTTick(903, 927), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceTTick(927, 908), 300, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceTTick(908, 915), 400, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const seaCalfTAnimations = [
      () => animateEasing(seaCalfTTick(1017, 431), 367, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfTTick(431, 478), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfTTick(478, 445), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfTTick(445, 469), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfTTick(469, 450), 300, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfTTick(450, 457), 400, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(seaCalfTAnimations);
    runSerial(iceTAnimations);
  }

  animateRotateIce() {
    const iceRotateTick = (from, to) => (progress) => {
      this.iceAngle = from + progress * (to - from);
    };

    const seaCalfRotateTick = (from, to) => (progress) => {
      this.seaCalfAngle = from + progress * (to - from);
    };

    const iceRotateAnimations = [
      () => animateEasing(iceRotateTick(19, -4), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceRotateTick(-4, 5), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceRotateTick(5, -4), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceRotateTick(-4, 1), 300, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(iceRotateTick(1, 0), 400, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    const seaCalfRotateAnimations = [
      () => animateEasing(seaCalfRotateTick(19, -4), 367, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfRotateTick(-4, 5), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfRotateTick(5, -4), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfRotateTick(-4, 1), 267, bezierEasing(0.33, 0, 0.67, 1)),
      () => animateEasing(seaCalfRotateTick(1, 0), 300, bezierEasing(0.33, 0, 0.67, 1)),
    ];

    runSerial(seaCalfRotateAnimations);
    runSerial(iceRotateAnimations);
  }

  animateShowAirplane() {
    const airplaneOpacityTick = (progress) => {
      this.airplaneOpacity = progress;
    };

    animateEasing(airplaneOpacityTick, 200, bezierEasing(0.33, 0, 0.67, 1));
  }

  animateFlyAirplane() {
    const airplaneLFrom = 505;
    const airolaneLTo = 1300;

    const airplaneTick = (from, to) => (progress) => {
      this.airplaneL = from + progress * (to - from);

      this.airplaneT = Math.sin((from - to) * progress / 250 - 500) * 100 + 500;
      this.airplaneAngle = 35 * Math.sin((from - to) * progress / 250 - 500) + 25;
    };

    const airplaneAnimations = [
      () => animateEasing(airplaneTick(airplaneLFrom, airolaneLTo), 567, bezierEasing(0.17, 0.17, 0.67, 1)),
    ];

    runSerial(airplaneAnimations);
  }

  startAnimation() {
    if (!this.isAnimated) {
      this.isAnimated = true;

      const globalAnimationTick = (globalProgress) => {
        const snowflakesAnimationDelay = 633;
        const treeAnimationDelay = 300;
        const tree2AnimationDelay = 166;
        this.startAnimationInfinite();
        this.animateShowIce();

        if (globalProgress >= snowflakesAnimationDelay && this.startAnimations.indexOf(snowflakesAnimationDelay) < 0) {
          this.startAnimations.push(snowflakesAnimationDelay);

          this.startAnimateSnowflakes();
        }

        if (globalProgress >= treeAnimationDelay && this.startAnimations.indexOf(treeAnimationDelay) < 0) {
          this.startAnimations.push(treeAnimationDelay);

          this.animateTree();
          this.animateRotateIce();
          this.animateShowAirplane();
          this.animateFlyAirplane();
          this.animateBack();
        }

        if (globalProgress >= tree2AnimationDelay && this.startAnimations.indexOf(tree2AnimationDelay) < 0) {
          this.startAnimations.push(tree2AnimationDelay);

          this.animateTree2();
        }
      };

      animateDuration(globalAnimationTick, 4000);
    }
  }
}

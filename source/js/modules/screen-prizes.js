const countCaseAnim = (countCase, parent) => {
  const countEl = parent.querySelector('b');
  let fps = 12;

  let fpsInterval = 1000 / fps;
  let now,
    then = Date.now(),
    elapsed;
  let count = 1;
  countEl.innerHTML = String(count);

  function tick() {
    requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval && count < countCase) {
      then = now - (elapsed % fpsInterval);
      count += 1;
      countEl.innerHTML = String(count);
    }
  };

  requestAnimationFrame(tick);
}

const getRandomArr = (length, min, max) => {
  const arr = [min];
  for( let i=0 ; i < length - 2; i++) {
    arr.push(Math.floor(Math.random() * (max - min) + min));
  }
  arr.sort((a, b) => a - b);
  arr.push(max);

  return arr;
}

const countCodeAnim = (min, max, parent) => {
  const countEl = parent.querySelector('b');
  let fps = 12;

  let fpsInterval = 1000 / fps;
  let now,
    start = Date.now(),
    then = start,
    elapsed;
  let count = 1;

  countEl.innerHTML = String(min);

  function tick() {
    requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval && count < fps - 1 ) {
      then = now - (elapsed % fpsInterval);
      count += 1;

      const randomNumbers = getRandomArr(fps, min, max);
      countEl.innerHTML = String(randomNumbers[count]);
    }
  };

  requestAnimationFrame(tick);
}

const screenPrizes = () => {
  const prize1 = document.querySelector('.prizes__item--journeys');
  const prize2 = document.querySelector('.prizes__item--cases');
  const prize3 = document.querySelector('.prizes__item--codes');


  document.body.addEventListener(`screenChanged`, (e) => {
    if(e.detail.screenName === "prizes") {

      if (prize1 && prize1.childNodes.length === 0) {
        prize1.classList.add('is-anim');
        prize1.innerHTML = '<div class="prizes__icon"><img src="img/anim-plane.svg" alt=""></div><p class="prizes__desc"><b>3</b><span>загадочных путешествия</span></p>'

        setTimeout(() => {
          prize1.classList.remove('is-anim');
        }, 7000)
      }

      if (prize2 && prize2.childNodes.length === 0) {
        setTimeout(() => {
          prize2.innerHTML = '<div class="prizes__icon"><img src="img/anim-case.svg" alt=""></div><p class="prizes__desc"><b>1</b><span>надежных чемоданов</span></p>'

          setTimeout(() => {
            countCaseAnim(7, prize2);
          }, 1500);
        }, 6500)
      }

      if (prize3 && prize3.childNodes.length === 0) {
        setTimeout(() => {
          prize3.innerHTML = '<div class="prizes__icon"><img src="img/anim-code.svg" alt=""></div><p class="prizes__desc"><b>11</b><span>промокодов на&nbsp;скидку 15%</span></p>'

          setTimeout(() => {
            countCodeAnim(11, 900, prize3);
          }, 1500);

        }, 10000);
      }
    }
  })
};

export {screenPrizes};

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
        }, 8000)
      }

      if (prize2 && prize2.childNodes.length === 0) {
        setTimeout(() => {
          prize2.innerHTML = '<div class="prizes__icon"><img src="img/anim-case.svg" alt=""></div><p class="prizes__desc"><b>7</b><span>надежных чемоданов</span></p>'
        }, 7500)
      }

      if (prize3 && prize3.childNodes.length === 0) {
        setTimeout(() => {
          prize3.innerHTML = '<div class="prizes__icon"><img src="img/anim-code.svg" alt=""></div><p class="prizes__desc"><b>900</b><span>промокодов на&nbsp;скидку 15%</span></p>'
        }, 10000);
      }
    }
  })
};

export {screenPrizes};

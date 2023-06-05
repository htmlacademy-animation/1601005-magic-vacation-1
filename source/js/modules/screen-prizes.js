const screenPrizes = () => {
  const prize1 = document.querySelector('.prizes__item--journeys');

  document.body.addEventListener(`screenChanged`, (e) => {
    if(e.detail.screenName === "prizes") {
      console.log(prize1.childNodes)
      if (prize1.childNodes.length === 0) {
        prize1.innerHTML = '<div class="prizes__icon"><img src="img/anim-plane.svg" alt=""></div><p class="prizes__desc"><b>3</b><span>загадочных путешествия</span></p>'
      }
    }
  })
};

export {screenPrizes};

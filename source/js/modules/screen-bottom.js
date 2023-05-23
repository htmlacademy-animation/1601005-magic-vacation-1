const screenBottom = () => {
  let screenBottoms = document.querySelectorAll(`.screen-bottom`);
  let activeScreen;

  if (!screenBottoms.length) {
    return;
  }

  const removeClass = () => {
    screenBottoms.forEach((bottom) => {
      bottom.classList.remove('is-show');
      bottom.classList.remove('is-opacity');
    })
  };

  document.body.addEventListener(`screenChanged`, (e) => {
    const bottom = e.detail.screenElement.querySelector(`.screen-bottom`);

    if(!bottom) {
      return;
    }

    if(activeScreen === "prizes" && e.detail.screenName === "rules" || activeScreen === "rules" && e.detail.screenName === "prizes") {
      bottom.classList.add('is-opacity');
      activeScreen = e.detail.screenName;
    } else {
      removeClass();
      bottom.classList.add('is-show')

      activeScreen = e.detail.screenName;
    }
  })
};

export {screenBottom};

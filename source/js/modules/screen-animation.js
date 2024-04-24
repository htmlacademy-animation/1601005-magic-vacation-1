import {initTypographyAnimation} from "../animate/typography-animate";

const introTitleAnimation = () => {
  const title = document.querySelector(`.intro__title`);
  initTypographyAnimation(title, 500, `transform`);
};

const dateAnimation = () => {
  const date = document.querySelector(`.intro__date`);
  initTypographyAnimation(date, 500, `transform`, false);
};

const titleAnimation = () => {
  const titles = document.querySelectorAll(`h2:not(.result__title)`);

  if (titles.length === 0) {
    return;
  }

  titles.forEach((title) => {
    initTypographyAnimation(title, 500, `transform`);
  });
};

const initScreenAnimation = () => {
  introTitleAnimation();
  dateAnimation();
  titleAnimation();
};

export default initScreenAnimation;

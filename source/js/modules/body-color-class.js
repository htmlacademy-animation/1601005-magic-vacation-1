import { Color } from "three";
import { storySlider } from "./slider";

const body = document.querySelector('body');

const removeBodyColorClass = () => {
  body.classList.remove('color-violet');
  body.classList.remove('color-blue');
  body.classList.remove('color-grey');
}

const changeBodyColorClass = () => {
  const storyScreen = document.querySelector(`.screen--story`);

  removeBodyColorClass();

  if (storyScreen.classList.contains('active')) {
    if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
      body.classList.add('color-violet');
    }

    if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
      body.classList.add('color-blue');
    }

    if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
      body.classList.add('color-grey');
    }
  }
};

const bodyColorClass = () => {
  changeBodyColorClass();

  storySlider.on('slideChange', () => {
    changeBodyColorClass();
  });

  document.body.addEventListener(`screenChanged`, () => {
    removeBodyColorClass();

    setTimeout(() => {
      changeBodyColorClass();
    },600);

  });
};

export {bodyColorClass, changeBodyColorClass}

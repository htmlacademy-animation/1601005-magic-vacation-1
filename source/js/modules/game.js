import { cancelAnimation, initTimerAnimation } from "../animate/timer-animation";

export default () => {
  document.body.addEventListener(`screenChanged`, (e) => {
    if(e.detail.screenName === "game") {
      initTimerAnimation(5);
    } else {
      cancelAnimation();
    }
  })
};

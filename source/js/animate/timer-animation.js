const timerEl = document.querySelector('[data-timer');

const initTimerAnimation = (timeInMin) => {

  if(!timerEl) {
    return;
  }

  const timeInSec = timeInMin * 60;
  const minEl = timerEl.querySelector('[data-min');
  const secEl = timerEl.querySelector('[data-sec');

  let start = Date.now();
  let fpsInterval = 1000 / 1;
  let now,
    then = Date.now(),
    elapsed;
  let totalTime = 0;

  const draw = () => {
    const min = Math.floor((timeInSec - totalTime) / 60);
    const sec = Math.floor((timeInSec - totalTime) % 60);

    minEl.innerHTML = min < 10 ? `0${min}` : min;
    secEl.innerHTML = sec < 10 ? `0${sec}` : sec;
  }

  draw();

  const timer = () => {
    const timerReq = requestAnimationFrame(timer);

    now = Date.now();
    elapsed = now - then;
    totalTime = Math.floor((now - start) / 1000);

    if (elapsed > fpsInterval && totalTime <= timeInSec) {

      then = now - (elapsed % fpsInterval);

      draw();
    }

    document.body.addEventListener(`screenChanged`, (e) => {
      if(e.detail.screenName !== "game") {
        cancelAnimationFrame(timerReq);
      }
    })
  }

  requestAnimationFrame(timer);
};

export { initTimerAnimation };

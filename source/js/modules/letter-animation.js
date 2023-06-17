const svgTitles = document.querySelectorAll('[data-letter-animation]');

const initLetterAnimation = () => {
  if (svgTitles.length === 0) {
    return;
  }

  svgTitles.forEach((title) => {
    const dropStep = title.dataset.dropStep ? title.dataset.dropStep : null;
    const pathes = title.querySelectorAll('path');

    pathes.forEach((el, index) => {
      const pathLength = el.getTotalLength();
      const pointCount = el.dataset.pointCount;

      const from = `0 ${pathLength/pointCount} `.repeat(pointCount);
      const to = `${pathLength/pointCount} 0 `.repeat(pointCount);

      if(dropStep) {
        const delay = index * dropStep;

        el.innerHTML = `<animate attributeName="stroke-dasharray" from="${from}" to="${to}" dur="0.8s" calcMode="paced"/>
          <animateTransform attributeName="transform"
            type="translate"
            values="0 -99; 0 0; 0 -5; 0 0"
            keyTimes="0; 0.66; 0.83; 1"
            keySplines="0.88 0 1 1; 0.33 0 0.67 1; 0.33 0 0.67 1"
            calcMode="spline"
            dur="0.8s"
            fill="freeze"
            begin="${delay}s" />`
      } else {
        el.innerHTML = `<animate attributeName="stroke-dasharray" from="${from}" to="${to}" dur="0.8s" calcMode="paced"/>`
      }
    })
  });
};

export {initLetterAnimation};

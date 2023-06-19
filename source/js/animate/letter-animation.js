const initLetterAnimation = () => {
  const svgTitles = document.querySelectorAll('[data-letter-animation]');

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
        const opacityDur = 0.1 +  delay;

        el.innerHTML = `<animate id="dasharray" attributeName="stroke-dasharray" from="${from}" to="${to}" dur="0.8s" calcMode="paced" begin="indefinite"/>
          <animate attributeType="CSS"
            attributeName="opacity"
            values="0; 1"
            keyTimes="0; 1"
            dur="${opacityDur}s"
            calcMode="discrete"
            fill="freeze" />
          <animateTransform attributeName="transform"
            type="translate"
            values="0 -99; 0 0; 0 -5; 0 0"
            keyTimes="0; 0.66; 0.83; 1"
            keySplines="0.88 0 1 1; 0.33 0 0.67 1; 0.33 0 0.67 1"
            calcMode="spline"
            dur="0.9s"
            fill="freeze"
            begin="dasharray.begin + ${delay}s" />`
      } else {
        el.innerHTML = `<animate attributeName="stroke-dasharray" from="${from}" to="${to}" dur="0.8s" calcMode="paced" begin="indefinite"/>`
      }
    })
  });

  const animateEls = document.querySelectorAll('animate');

  animateEls.forEach((el) => {
    el.beginElement();
  });
};

export {initLetterAnimation};

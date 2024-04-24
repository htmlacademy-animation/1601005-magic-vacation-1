const typographyBuild = (element, timer, property, isRandomDelay, isDelayed, delay, timeOffsetDelta) => {

  let delta = 0;
  let timeOffset = 0;

  const createElement = (letter, d) => {
    const span = document.createElement(`span`);
    span.textContent = letter;

    if (isRandomDelay) {
      timeOffset = Math.floor(Math.random() * timeOffsetDelta);
      span.style.transition = `${property} ${timer}ms ease ${delay + timeOffset + d}ms`;
    }

    return span;
  };

  const prepareText = () => {
    const text = element.textContent.trim().split(/[\s]+/);

    const {length} = text;
    const content = text.reduce((fragmentParent, word, index) => {
      const wordElement = Array.from(word).reduce((fragment, letter) => {
        delta = isDelayed ? index * timeOffsetDelta : 0;
        fragment.appendChild(createElement(letter, delta));
        return fragment;
      }, document.createDocumentFragment());

      const wordContainer = document.createElement(`span`);

      wordContainer.classList.add(`word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);

      // Add Space text node:
      if (index < length - 1) {
        fragmentParent.appendChild(document.createTextNode(` `));
      }

      return fragmentParent;
    }, document.createDocumentFragment());

    element.innerHTML = ``;
    element.appendChild(content);
  };

  prepareText();
};

const initTypographyAnimation = (element, timer, property, isRandomDelay = false, isDelayed = true, delay = 0, timeOffsetDelta = 200) => {

  if (!element) {
    return;
  }

  typographyBuild(element, timer, property, isRandomDelay, isDelayed, delay, timeOffsetDelta);

  document.body.addEventListener(`screenChanged`, () => {
    element.classList.remove(`animate--active`);

    setTimeout(() => {
      element.classList.add(`animate--active`);
    }, 500);
  });
};

export {initTypographyAnimation};

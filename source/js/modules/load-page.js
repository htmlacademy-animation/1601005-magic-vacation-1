const loadPage = () => {
  window.addEventListener("load", () => {
    const body = document.querySelector('body');

    if(!body) {
      return;
    }

    body.classList.add('is-load');
  })
};

export default loadPage;

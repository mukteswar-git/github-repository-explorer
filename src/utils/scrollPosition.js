let scrollY = 0;

export const saveScrollPosition = () => {
  scrollY = window.scrollY;
};

export const restoreScrollPosition = () => {
  window.scrollTo({
    top: scrollY,
    behavior: "instant",
  });
};
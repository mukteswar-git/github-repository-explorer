export const saveHomeScroll = () => {
  sessionStorage.setItem("home-scroll-position", window.scrollY.toString());
};

export const restoreHomeScroll = () => {
  const savedPosition = sessionStorage.getItem("home-scroll-position");

  if (!savedPosition) return;

  requestAnimationFrame(() => {
    window.scrollTo({
      top: Number(savedPosition),
      behavior: "instant",
    });
  });
};

export const clearHomeScroll = () => {
  sessionStorage.removeItem("home-scroll-position");
};

export const saveScrollPosition = () => {
  sessionStorage.setItem(
    "home-scroll-position",
    window.scrollY.toString()
  );
};

export const getScrollPosition = () => {
  return Number(
    sessionStorage.getItem("home-scroll-position") || 0
  );
};
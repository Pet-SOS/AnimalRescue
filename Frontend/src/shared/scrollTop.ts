export const scrollTop = () => {
  const headerEl = document.getElementsByTagName('header')[0];
  if (!!headerEl) {
    headerEl.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
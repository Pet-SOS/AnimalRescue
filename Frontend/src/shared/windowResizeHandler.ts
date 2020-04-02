export default () => {
  let resizeId: NodeJS.Timeout;
  const className: string = 'resize';
  const bodyElement: HTMLElement = document.body;
  const onResizeFinish = (): void => {
    if (bodyElement.classList.contains(className)) {
      bodyElement.classList.remove(className);
    }
  }
  const onResize = (): void => {
    clearTimeout(resizeId);
    resizeId = setTimeout(onResizeFinish, 500)
    if (!bodyElement.classList.contains(className)) {
      bodyElement.classList.add(className);
    }
  }
  window.addEventListener('resize', onResize);  
}
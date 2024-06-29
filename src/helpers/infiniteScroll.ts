function infiniteScroll(fn: Fn0, offset: number = 0.8) {
  return function (event: { currentTarget: HTMLElement | EventTarget }) {
    const { clientHeight, scrollHeight, scrollTop } =
      event.currentTarget as HTMLElement;
    if (scrollHeight - scrollTop - clientHeight < offset) fn();
  };
}

export default infiniteScroll;

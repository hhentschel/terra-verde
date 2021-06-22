class FocusHandler {
  classes = {
    tabbingActive: 'focus--active',
  }

  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('keydown', this.focusHandler.bind(this));
  }

  focusHandler(event) {
    if (event.keyCode === 9) {
      document.body.classList.add(this.classes.tabbingActive);
      window.removeEventListener('keydown', this.focusHandler);
      window.addEventListener('mousedown', this.handleMouseDownOnce.bind(this));
    }
  }

  handleMouseDownOnce() {
    document.body.classList.remove(this.classes.tabbingActive);

    window.removeEventListener('mousedown', this.handleMouseDownOnce);
    window.addEventListener('keydown', this.handleFirstTab);
  }
}

// export as singleton
export default new FocusHandler();

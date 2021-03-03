class NavMain {
  classes = {
    nav: 'nav-main',
    button: 'nav-main__button',
    buttonActive: 'nav-main__button--active',
    navLinkActive: 'nav-main__list-item--active',
    flyout: 'nav-main__flyout',
    flyoutExpanded: 'nav-main__flyout--expanded',
    navExpandedButton: 'nav-expanded',
    navSublistActive: 'nav-main__sublist--active',
  };

  ariaAttributes = {
    expanded: 'aria-expanded',
  };

  html = {
    nav: null,
    buttons: [],
    flyouts: [],
  };

  constructor() {
    this.html.nav = document.querySelector(`.${this.classes.nav}`);
    this.html.buttons = Array.from(this.html.nav.querySelectorAll(`.${this.classes.button}`));
    this.html.flyouts = Array.from(this.html.nav.querySelectorAll(`.${this.classes.flyout}`));

    this.init();
  }

  init() {
    this.html.buttons.forEach((button) => {
      button.addEventListener('click', this.navClickHandler.bind(this));
    });
    document.querySelectorAll(`.${this.classes.navExpandedButton}`).forEach((item) => {
      item.addEventListener('click', this.navFlyoutClickHandler.bind(this));
    });

    document.addEventListener('click', (event) => {
      let targetEl = event.target;

      do {
        if (targetEl === this.html.nav) {
          return;
        }
        targetEl = targetEl.parentNode;
      } while (targetEl);

      this.closeAll();
    });
  }

  navClickHandler(event) {
    const index = this.html.buttons.indexOf(event.currentTarget);

    // clicked button is active
    if (event.currentTarget.classList.contains(this.classes.buttonActive)) {
      this.close(index);
    } else {
      this.closeAll();
      this.open(index);
    }
  }

  navFlyoutClickHandler(event) {
    const subListElement = event.currentTarget.parentElement.children[1];
    if (event.currentTarget.getAttribute('aria-expanded') === 'false') {
      event.currentTarget.setAttribute(this.ariaAttributes.expanded, true);
      subListElement.classList.add(`${this.classes.navSublistActive}`);
      event.currentTarget.parentElement.classList.add('nav-main__expanded');
    } else {
      event.currentTarget.setAttribute(this.ariaAttributes.expanded, false);
      subListElement.classList.remove(`${this.classes.navSublistActive}`);
      event.currentTarget.parentElement.classList.remove('nav-main__expanded');
    }
  }

  open(index) {
    const targetButton = this.html.buttons[index];
    const targetFlyout = this.html.flyouts[index];

    targetButton.setAttribute(this.ariaAttributes.expanded, true);
    targetButton.parentElement.classList.add(this.classes.navLinkActive);
    targetButton.classList.add(this.classes.buttonActive);
    targetFlyout.classList.add(this.classes.flyoutExpanded);
    document.body.setAttribute('style', 'overflow: hidden');
  }

  close(index) {
    const targetButton = this.html.buttons[index];
    const targetFlyout = this.html.flyouts[index];

    targetButton.setAttribute(this.ariaAttributes.expanded, false);
    targetButton.classList.remove(this.classes.buttonActive);
    targetButton.parentElement.classList.remove(this.classes.navLinkActive);
    targetFlyout.classList.remove(this.classes.flyoutExpanded);
    document.body.setAttribute('style', '');
  }

  closeAll() {
    for (let i = 0; i < this.html.buttons.length; i += 1) {
      this.close(i);
    }
  }
}

// export as singleton
export default new NavMain();

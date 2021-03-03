class Header {
  scrollPathUntilSticky = 20;
  debounceDelay = 50;
  debounceTimer = null;

  classes = {
    header: 'header',
    headerSticky: 'header--sticky',
    headerBackground: 'header__background',
    headerBackgroundTransparent: 'header__background--transparent',
    headerWithImage: 'header__background--with-image',
    navMainSubtext: 'nav-main__button-subtext',
    navMainSubtextSticky: 'nav-main__button-subtext--sticky',
  }

  html = {
    header: null,
    headerBackground: null,
    headerNavService: null,
    navMainSubtext: [],
  }

  constructor() {
    this.init();
  }

  init() {
    this.html.header = document.querySelector(`.${this.classes.header}`);
    this.html.headerBackground = this.html.header.querySelector(`.${this.classes.headerBackground}`);
    this.html.navMainSubtext = document.querySelectorAll(`.${this.classes.navMainSubtext}`);

    if (window.pageYOffset > this.scrollPathUntilSticky) {
      this.html.navMainSubtext.forEach((item) => {
        item.classList.add(this.classes.navMainSubtextSticky);
      });
    }

    window.addEventListener('scroll', (this.scrollSpy.bind(this)));
  }

  scrollSpy() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      if (window.pageYOffset > this.scrollPathUntilSticky) {
        this.html.header.classList.add(this.classes.headerSticky);
        if (this.html.headerBackground.classList.contains(this.classes.headerWithImage)) {
          this.html.headerBackground.classList.remove(this.classes.headerBackgroundTransparent);
        }
        this.html.navMainSubtext.forEach((item) => {
          item.classList.add(this.classes.navMainSubtextSticky);
        });
      } else {
        this.html.header.classList.remove(this.classes.headerSticky);
        if (this.html.headerBackground.classList.contains(this.classes.headerWithImage)) {
          this.html.headerBackground.classList.add(this.classes.headerBackgroundTransparent);
        }
        this.html.navMainSubtext.forEach((item) => {
          item.classList.remove(this.classes.navMainSubtextSticky);
        });
      }
    }, this.debounceDelay);
  }
}

// export as singleton
export default new Header();

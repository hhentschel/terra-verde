export class MobileNav {
  classes = {
    mobileNav: 'mobile-nav',
    mobileNavExpanded: 'mobile-nav--expanded',
    mobileNavListActive: 'mobile-nav__list--active',
    mobileNavListHidden: 'mobile-nav__list--hidden',
    mobileNavButton: 'mobile-nav__trigger:not(.nav-expanded)',
    mobileNavButtonBack: 'mobile-nav__button-back',
    mobileNavButtonBackActive: 'mobile-nav__button-back--active',
    mobileNavButtonClose: 'mobile-nav__button-close',
    headerButtonOpen: 'header__menu-button-mobile',
    headerMenuText: 'header__menu-button-text',
  };

  ariaAttributes = {
    expanded: 'aria-expanded',
  };

  html = {
    mobileNavButtonsBack: [],
    mobileNavButtons: [],
    mobileNavButtonClose: null,
    headerButtonOpen: null,
    headerMenuText: null,
  };

  constructor() {
    if (document.querySelector(`.${this.classes.mobileNav}`)) {
      // mobile Navigation
      this.html.mobileNav = document.querySelector(`.${this.classes.mobileNav}`);
      this.html.mobileNavButtons = this.html.mobileNav.querySelectorAll(`.${this.classes.mobileNavButton}`);
      this.html.mobileNavButtonsBack = this.html.mobileNav.querySelectorAll(`.${this.classes.mobileNavButtonBack}`);
      this.html.mobileNavButtonClose = this.html.mobileNav.querySelector(`.${this.classes.mobileNavButtonClose}`);

      // header mobile
      this.html.headerMenuText = document.querySelector(`.${this.classes.headerMenuText}`);
      this.html.headerButtonOpen = document.querySelector(`.${this.classes.headerButtonOpen}`);
      this.init();
    }
  }

  init() {
    this.html.headerButtonOpen.addEventListener('click', this.toggleMobileNav.bind(this));
    this.html.mobileNavButtonClose.addEventListener('click', this.toggleMobileNav.bind(this));
    this.html.mobileNavButtons.forEach((item) => {
      item.addEventListener('click', this.navClickHandler.bind(this));
    });
    this.html.mobileNavButtonsBack.forEach((item) => {
      item.addEventListener('click', this.goBackClickHandler.bind(this));
    });
  }

  toggleMobileNav() {
    this.html.mobileNav.classList.toggle(this.classes.mobileNavExpanded);
    this.html.headerButtonOpen.setAttribute(this.ariaAttributes.expanded, 'true');
  }

  navClickHandler(event) {
    event.target.parentElement.nextElementSibling.classList.remove(this.classes.mobileNavListHidden);
    event.target.parentElement.nextElementSibling.classList.add(this.classes.mobileNavListActive);
    this.html.mobileNavButtonsBack[1].classList.add(this.classes.mobileNavButtonBackActive);
    const lengthActiveLists = this.html.mobileNav.querySelectorAll(`.${this.classes.mobileNavListActive}`).length;
    if (lengthActiveLists > 2) {
      const textBackButton = event.target.innerHTML;
      this.html.mobileNavButtonsBack[0].innerHTML = textBackButton;
      this.showBackButtons(lengthActiveLists);
    }
  }

  goBackClickHandler() {
    this.html.mobileNav.querySelectorAll(`.${this.classes.mobileNavListActive}`).forEach((item, id, array) => {
      if (id === array.length - 1) {
        item.classList.remove(`${this.classes.mobileNavListActive}`);
        item.classList.add(`${this.classes.mobileNavListHidden}`);
      }
    });
    const lengthActiveLists = this.html.mobileNav.querySelectorAll(`.${this.classes.mobileNavListActive}`).length;
    this.showBackButtons(lengthActiveLists);
  }

  showBackButtons(activeItems) {
    if (activeItems === 1) {
      this.html.mobileNavButtonsBack.forEach((item) => {
        item.classList.remove(this.classes.mobileNavButtonBackActive);
      });
    } else if (activeItems === 2) {
      this.html.mobileNavButtonsBack[0].classList.remove(this.classes.mobileNavButtonBackActive);
      this.html.mobileNavButtonsBack[1].classList.add(this.classes.mobileNavButtonBackActive);
    } else {
      this.html.mobileNavButtonsBack[0].classList.add(this.classes.mobileNavButtonBackActive);
      this.html.mobileNavButtonsBack[1].classList.remove(this.classes.mobileNavButtonBackActive);
    }
  }
}

// export as singleton
export default new MobileNav();

class MapLink {
  classes = {
    teaserPlusPointWrapper: 'producers-list__item',
    teaserPlusPointBody: 'teaser-plus-point__item-body',
    teaserPlusPointButtonLinkActive: 'active',
  };

  ariaAttributes = {
    expanded: 'aria-expanded',
  };

  html = {
    teaserPlusPointWrapper: [],
    teaserPlusPointBody: [],
  };

  constructor() {
    this.html.teaserPlusPointWrapper = document.querySelectorAll(`.${this.classes.teaserPlusPointWrapper}`);
    this.html.teaserPlusPointBody = document.querySelectorAll(`.${this.classes.teaserPlusPointBody}`);
    this.addEvents();
  }

  addEvents() {
    this.html.teaserPlusPointWrapper.forEach((item) => {
      item.addEventListener('click', this.TeaserPlusToggle.bind(this));
    });
  }

  TeaserPlusToggle(event) {
    this.expanded = !this.expanded;
    event.currentTarget.classList.toggle(this.classes.teaserPlusPointButtonLinkActive);
    event.target.setAttribute(this.ariaAttributes.expanded, this.expanded);
  }
}

// export as singleton
export default new MapLink();

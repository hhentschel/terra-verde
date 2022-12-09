class MapLink {
  classes = {
    nav: 'nav-main',
    prodList: 'producers-list',
    mapList: 'map-list',
    mapLinkSingle: 'map-link',
    prodListItem: 'producers-list__item',
    active: 'active',
  };

  html = {
    nav: null,
    prodList: null,
    mapList: null,
    mapLinkSingle: null,
    prodListItem: null,
    mapLinks: [],
    prodListItems: [],
    currentLinkId: '',
  };

  attributes = {
    currentLinkId: 'data-id',
  };

  constructor() {
    this.html.prodList = document.querySelector(`.${this.classes.prodList}`);
    this.html.nav = document.querySelector(`.${this.classes.nav}`);
    this.html.mapList = document.querySelector(`.${this.classes.mapList}`);
    this.html.prodListItems = Array.from(this.html.prodList.querySelectorAll(`.${this.classes.prodListItem}`));
    this.html.mapLinkSingle = document.querySelector(`.${this.classes.mapLinkSingle}`);
    this.html.mapLinks = Array.from(this.html.mapList.querySelectorAll(`.${this.classes.mapLinkSingle}`));
    this.attributes.currentLinkId = this.attributes.getAttribute(this.attributes.currentLinkId);
    this.init();
  }

  init() {
    this.html.prodListItems.forEach((mapLinkSingle) => {
      mapLinkSingle.addEventListener('click', this.navClickHandler.bind(this));
    });
  }

  navClickHandler(event) {
    const index = this.html.mapLinks.indexOf(event.currentTarget);
    console.log(index);

    // clicked button is active
    if (event.currentTarget.classList.contains(this.classes.active)) {
      this.removeLink(index);
    } else {
      console.log('hallo add');
      this.addLink(index);
    }
  }

  addLink(index) {
    const targetLink = this.html.prodListItems[index];
    console.log(targetLink);
    console.log('hallo active link class');
    targetLink.classList.add(this.classes.active);
  }

  removeLink(index) {
    const targetLink = this.html.prodListItems[index];

    targetLink.classList.remove(this.classes.active);
  }
}

// export as singleton
export default new MapLink();

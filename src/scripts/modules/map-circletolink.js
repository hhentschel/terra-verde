export default class MapCircleToLink {
  classes = {
    circle: 'producer-circle',
  };

  html = {
    circle: null,
  };

  attributes = {
    currentLinkId: 'data-id',
  };


  constructor(mapCirclesToLink) {
    this.circleLink = mapCirclesToLink;

    /*    this.html.producerCircle = document.querySelector(`.${this.classes.circle}`);
        this.html.mapLink = document.querySelector(`.${this.classes.mapLink}`); */

    this.attributes.currentLinkId = this.circleLink.getAttribute('data-id');

    this.circleLink.addEventListener('mouseover', this.clickHandler.bind(this));
    this.circleLink.addEventListener('mouseout', this.clickHandlerOut.bind(this));
  }

  clickHandler() {
    console.log('hover');
    const id = this.circleLink.getAttribute('data-id');
    const linksWithSameId = document.querySelectorAll(`[data-id="${id}"]`);
    linksWithSameId.forEach((linkWithSameId) => {
      linkWithSameId.classList.add('producers-list__item--active');
    });
  }

  clickHandlerOut() {
    const id = this.circleLink.getAttribute('data-id');
    const linksWithSameId = document.querySelectorAll(`[data-id="${id}"]`);
    linksWithSameId.forEach((linkWithSameId) => {
      linkWithSameId.classList.remove('producers-list__item--active');
    });
  }
}

export default class MapLink {
  classes = {
    mapLink: 'producers-list__item',
    circle: 'producer-circle',
  };

  html = {
    mapLink: null,
    circle: null,
  };

  attributes = {
    currentLinkId: 'data-id',
  };


  constructor(mapLinkToCircle) {
    this.mapLink = mapLinkToCircle;

    /*    this.html.producerCircle = document.querySelector(`.${this.classes.circle}`);
        this.html.mapLink = document.querySelector(`.${this.classes.mapLink}`); */

    this.attributes.currentLinkId = this.mapLink.getAttribute('data-id');

    this.mapLink.addEventListener('mouseover', this.clickHandler.bind(this));
    this.mapLink.addEventListener('mouseout', this.clickHandlerOut.bind(this));
  }

  clickHandler() {
    const circle = document.querySelector(`a[data-id="${this.attributes.currentLinkId}"]`);
    circle.classList.add('producer-circle-active');
  }

  clickHandlerOut() {
    const circle = document.querySelector(`a[data-id="${this.attributes.currentLinkId}"]`);
    circle.classList.remove('producer-circle-active');
  }
}

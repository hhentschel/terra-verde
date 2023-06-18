import Flickity from 'flickity';
// import sliderImageFlickity from '../../../web/assets/scripts/main';

export default class GallerySlider {
  element = null;

  constructor(GalleryElement) {
    this.element = GalleryElement;
    this.init();
  }

  init() {
    const flickitySlider = this.element.querySelector('.gallery-slider');
    // const buttonPrev = document.querySelector('.gallery-navigation__button--prev');
    // const buttonNext = document.querySelector('.gallery-navigation__button--next');
    // const flickitySlide = this.element.querySelector('.image-matrix');
    const flkty = new Flickity(flickitySlider, {
      cellAlign: 'center',
      contain: false,
      imagesLoaded: true,
      prevNextButtons: true,
      pageDots: true,
      percentPosition: false,

      /* on: {
         change:
           function () {
             console.log('Flickity ready');
             flickitySlide.style.width = '100%';
           },
       }, */
    });


    /*buttonNext.addEventListener('click', () => {
      flkty.next();
    });

    buttonPrev.addEventListener('click', () => {
      flkty.previous();
    });*/
  }
}

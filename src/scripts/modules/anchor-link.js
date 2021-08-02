export default class AnchorNav {
  classes = {
    anchorLink: 'anchor-link',
  };

  html = {
    anchorLink: null,
    anchorTarget: null,
  };

  constructor(anchorLink) {
    this.anchorLink = anchorLink;
    this.anchorTarget = document.querySelector(`[id='${this.anchorLink.getAttribute('href').replace('#', '')}']`);
    if (this.anchorTarget) {
      this.anchorLink.addEventListener('click', this.clickHandler.bind(this));
    }
  }

  clickHandler(event) {
    event.preventDefault();
    const scrollTargetOffset = document.querySelector('.header').offsetHeight;
    window.scrollTo({
      top:
        window.pageYOffset +
        (this.anchorTarget.getBoundingClientRect().top - scrollTargetOffset),
      behavior: 'smooth',
    });
  }
}

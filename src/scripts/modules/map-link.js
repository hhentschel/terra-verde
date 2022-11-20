export default class AnchorNav {
  classes = {
    anchorLink: 'anchor-link',
  };

  html = {
    anchorLink: null,
    anchorTarget: null,
  };

  scrollTargetOffset = 36;

  constructor(anchorLink) {
    this.anchorLink = anchorLink;
    this.anchorTarget = document.querySelector(
      `[id='${this.anchorLink.getAttribute('href').replace('#', '')}']`
    );
    if (this.anchorTarget) {
      this.anchorLink.addEventListener('click', this.clickHandler.bind(this));
    }
  }

  clickHandler(event) {
    event.preventDefault();
    window.scrollTo({
      top:
        window.pageYOffset +
        (this.anchorTarget.getBoundingClientRect().top -
          this.scrollTargetOffset),
      behavior: 'smooth',
    });
  }
}

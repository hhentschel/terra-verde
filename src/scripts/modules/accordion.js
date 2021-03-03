export default class Accordion {
  classes = {
    accordion: 'accordion',
    accordionPanel: 'accordion__panel',
    accordionTrigger: 'accordion__trigger',
    accordionContent: 'accordion__content',
    accordionContentWrapper: 'accordion__content-wrapper',
    accordionPanelOpen: 'accordion__panel--open',
  };

  ariaAttributes = {
    hidden: 'aria-hidden',
    expanded: 'aria-expanded',
  };

  html = {
    accordion: null,
    accordionPanels: [],
    accordionTriggers: [],
  };

  constructor(accordion) {
    this.accordion = accordion;
    this.accordionPanels = this.accordion.querySelectorAll(`.${this.classes.accordionPanel}`);
    this.accordionTriggers = this.accordion.querySelectorAll(`.${this.classes.accordionTrigger}`);
    this.events();

    // open accordion panel if open per default
    this.accordionPanels.forEach((panel) => {
      if (panel.classList.contains(this.classes.accordionPanelOpen)) {
        this.openPanelContent(panel);
      }
    });
  }

  events() {
    this.accordionTriggers.forEach((trigger) => {
      trigger.addEventListener('click', this.clickHandler.bind(this));
    });
  }

  clickHandler(event) {
    const panel = event.currentTarget.parentNode;
    if (panel.classList.contains(this.classes.accordionPanelOpen)) {
      this.closePanelContent(panel);
    } else {
      this.openPanelContent(panel);
    }
  }

  openPanelContent(accordionPanel) {
    const accordionContent = accordionPanel.querySelector(`.${this.classes.accordionContent}`);
    const accordionContentWrapper = accordionPanel.querySelector(`.${this.classes.accordionContentWrapper}`);
    const accordionTrigger = accordionPanel.querySelector(`.${this.classes.accordionTrigger}`);
    accordionTrigger.setAttribute(this.ariaAttributes.expanded, 'true');
    accordionContent.setAttribute(this.ariaAttributes.hidden, 'false');

    accordionContent.style.maxHeight = `${accordionContentWrapper.offsetHeight}px`;
    accordionPanel.classList.add(this.classes.accordionPanelOpen);
  }

  closePanelContent(accordionPanel) {
    const accordionContent = accordionPanel.querySelector(`.${this.classes.accordionContent}`);
    const accordionTrigger = accordionPanel.querySelector(`.${this.classes.accordionTrigger}`);
    accordionTrigger.setAttribute(this.ariaAttributes.expanded, 'false');
    accordionContent.setAttribute(this.ariaAttributes.hidden, 'true');

    accordionContent.style.maxHeight = 0;
    accordionPanel.classList.remove(this.classes.accordionPanelOpen);
  }
}

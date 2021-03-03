/**
 * Responsive View Handler
 * Emits a viewChangeEvent on window when view changes.
 * Views are defined in css (e.g. styles/layout/responsive-view-handler.scss).
 * Usage:
 * window.addEventListener('viewchange', (event) => {
 *   console.log(event.detail); // outputs { currentView: "sm", lastView: "xs" }
 * });
 * */
class ResponsiveViewHandler {
  debounceDelay = 250;
  debounceTimer = null;
  lastView = null;

  /**
   * Constructor
   */
  constructor() {
    this.lastView = this.getView();
    this.events();
  }

  /**
   * Events
   */
  events() {
    window.addEventListener('resize', this.resizeHandler.bind(this));
  }

  /**
   * Resize Handler
   * Trigger a debounced view change event when view changes
   */
  resizeHandler() {
    // clear timeout on resize
    clearTimeout(this.debounceTimer);

    // start timer
    this.debounceTimer = setTimeout(() => {
      // get current view out of body:after pseudo element (see responsive-view-handler.scss)
      const currentView = this.getView();

      // trigger view change event if view has changed
      if (currentView !== this.lastView) {
        this.triggerViewChangeEvent(currentView, this.lastView);
      }

      // update lastView
      this.lastView = currentView;
    }, this.debounceDelay);
  }

  /**
   * Get View
   * Read the content :after pseudoelement of body (responsive-view-handler.scss)
   */
  getView() {
    return window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '');
  }

  /**
   * Trigger View Change Event
   * @param {string} currentView
   * @param {string} lastView
   */
  triggerViewChangeEvent(currentView, lastView) {
    const viewChangeEvent = new CustomEvent('viewchange', { detail: { currentView, lastView } });
    window.dispatchEvent(viewChangeEvent);
  }
}

// export as singleton
export default new ResponsiveViewHandler();


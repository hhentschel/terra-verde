(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

require("./modules/nav-main");

require("./modules/mobile-nav");

require("./modules/focus");

require("./modules/header");

require("./modules/responsive-view-handler");

var _accordion = _interopRequireDefault(require("./modules/accordion"));

var _anchorLink = _interopRequireDefault(require("./modules/anchor-link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Use this file for main application handling and initializing of modules
 */
// imports

/* Accordions */
var accordions = document.querySelectorAll('.accordion');
accordions.forEach(function (accordion) {
  new _accordion["default"](accordion);
});
/* Anchor links */

var anchorLinks = document.querySelectorAll('.anchor-link');
anchorLinks.forEach(function (anchorLink) {
  new _anchorLink["default"](anchorLink);
});

},{"./modules/accordion":2,"./modules/anchor-link":3,"./modules/focus":4,"./modules/header":5,"./modules/mobile-nav":6,"./modules/nav-main":7,"./modules/responsive-view-handler":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Accordion = /*#__PURE__*/function () {
  function Accordion(accordion) {
    var _this = this;

    _classCallCheck(this, Accordion);

    _defineProperty(this, "classes", {
      accordion: 'accordion',
      accordionPanel: 'accordion__panel',
      accordionTrigger: 'accordion__trigger',
      accordionContent: 'accordion__content',
      accordionContentWrapper: 'accordion__content-wrapper',
      accordionPanelOpen: 'accordion__panel--open'
    });

    _defineProperty(this, "ariaAttributes", {
      hidden: 'aria-hidden',
      expanded: 'aria-expanded'
    });

    _defineProperty(this, "html", {
      accordion: null,
      accordionPanels: [],
      accordionTriggers: []
    });

    this.accordion = accordion;
    this.accordionPanels = this.accordion.querySelectorAll(".".concat(this.classes.accordionPanel));
    this.accordionTriggers = this.accordion.querySelectorAll(".".concat(this.classes.accordionTrigger));
    this.events(); // open accordion panel if open per default

    this.accordionPanels.forEach(function (panel) {
      if (panel.classList.contains(_this.classes.accordionPanelOpen)) {
        _this.openPanelContent(panel);
      }
    });
  }

  _createClass(Accordion, [{
    key: "events",
    value: function events() {
      var _this2 = this;

      this.accordionTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', _this2.clickHandler.bind(_this2));
      });
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(event) {
      var panel = event.currentTarget.parentNode;

      if (panel.classList.contains(this.classes.accordionPanelOpen)) {
        this.closePanelContent(panel);
      } else {
        this.openPanelContent(panel);
      }
    }
  }, {
    key: "openPanelContent",
    value: function openPanelContent(accordionPanel) {
      var accordionContent = accordionPanel.querySelector(".".concat(this.classes.accordionContent));
      var accordionContentWrapper = accordionPanel.querySelector(".".concat(this.classes.accordionContentWrapper));
      var accordionTrigger = accordionPanel.querySelector(".".concat(this.classes.accordionTrigger));
      accordionTrigger.setAttribute(this.ariaAttributes.expanded, 'true');
      accordionContent.setAttribute(this.ariaAttributes.hidden, 'false');
      accordionContent.style.maxHeight = "".concat(accordionContentWrapper.offsetHeight, "px");
      accordionPanel.classList.add(this.classes.accordionPanelOpen);
    }
  }, {
    key: "closePanelContent",
    value: function closePanelContent(accordionPanel) {
      var accordionContent = accordionPanel.querySelector(".".concat(this.classes.accordionContent));
      var accordionTrigger = accordionPanel.querySelector(".".concat(this.classes.accordionTrigger));
      accordionTrigger.setAttribute(this.ariaAttributes.expanded, 'false');
      accordionContent.setAttribute(this.ariaAttributes.hidden, 'true');
      accordionContent.style.maxHeight = 0;
      accordionPanel.classList.remove(this.classes.accordionPanelOpen);
    }
  }]);

  return Accordion;
}();

exports["default"] = Accordion;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AnchorNav = /*#__PURE__*/function () {
  function AnchorNav(anchorLink) {
    _classCallCheck(this, AnchorNav);

    _defineProperty(this, "classes", {
      anchorLink: 'anchor-link'
    });

    _defineProperty(this, "html", {
      anchorLink: null,
      anchorTarget: null
    });

    this.anchorLink = anchorLink;
    this.anchorTarget = document.querySelector("[id='".concat(this.anchorLink.getAttribute('href').replace('#', ''), "']"));

    if (this.anchorTarget) {
      this.anchorLink.addEventListener('click', this.clickHandler.bind(this));
    }
  }

  _createClass(AnchorNav, [{
    key: "clickHandler",
    value: function clickHandler(event) {
      event.preventDefault();
      var scrollTargetOffset = document.querySelector('.header').offsetHeight;
      window.scrollTo({
        top: window.pageYOffset + (this.anchorTarget.getBoundingClientRect().top - scrollTargetOffset),
        behavior: 'smooth'
      });
    }
  }]);

  return AnchorNav;
}();

exports["default"] = AnchorNav;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FocusHandler = /*#__PURE__*/function () {
  function FocusHandler() {
    _classCallCheck(this, FocusHandler);

    _defineProperty(this, "classes", {
      tabbingActive: 'focus--active'
    });

    this.init();
  }

  _createClass(FocusHandler, [{
    key: "init",
    value: function init() {
      window.addEventListener('keydown', this.focusHandler.bind(this));
    }
  }, {
    key: "focusHandler",
    value: function focusHandler(event) {
      if (event.keyCode === 9) {
        document.body.classList.add(this.classes.tabbingActive);
        window.removeEventListener('keydown', this.focusHandler);
        window.addEventListener('mousedown', this.handleMouseDownOnce.bind(this));
      }
    }
  }, {
    key: "handleMouseDownOnce",
    value: function handleMouseDownOnce() {
      document.body.classList.remove(this.classes.tabbingActive);
      window.removeEventListener('mousedown', this.handleMouseDownOnce);
      window.addEventListener('keydown', this.handleFirstTab);
    }
  }]);

  return FocusHandler;
}(); // export as singleton


var _default = new FocusHandler();

exports["default"] = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Header = /*#__PURE__*/function () {
  function Header() {
    _classCallCheck(this, Header);

    _defineProperty(this, "scrollPathUntilSticky", 20);

    _defineProperty(this, "debounceDelay", 50);

    _defineProperty(this, "debounceTimer", null);

    _defineProperty(this, "classes", {
      header: 'header',
      headerSticky: 'header--sticky',
      // headerLogo: 'header--logo',
      headerBackground: 'header__background',
      headerBackgroundTransparent: 'header__background--transparent',
      headerWithImage: 'header__background--with-image',
      navMainSubtext: 'nav-main__button-subtext',
      navMainSubtextSticky: 'nav-main__button-subtext--sticky'
    });

    _defineProperty(this, "html", {
      header: null,
      headerBackground: null,
      headerNavService: null,
      navMainSubtext: []
    });

    this.init();
  }

  _createClass(Header, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.html.header = document.querySelector(".".concat(this.classes.header));
      this.html.headerBackground = this.html.header.querySelector(".".concat(this.classes.headerBackground));
      this.html.navMainSubtext = document.querySelectorAll(".".concat(this.classes.navMainSubtext));

      if (window.pageYOffset > this.scrollPathUntilSticky) {
        this.html.navMainSubtext.forEach(function (item) {
          item.classList.add(_this.classes.navMainSubtextSticky);
        });
      }

      window.addEventListener('scroll', this.scrollSpy.bind(this));
    }
  }, {
    key: "scrollSpy",
    value: function scrollSpy() {
      var _this2 = this;

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(function () {
        if (window.pageYOffset > _this2.scrollPathUntilSticky) {
          _this2.html.header.classList.add(_this2.classes.headerSticky);

          if (_this2.html.headerBackground.classList.contains(_this2.classes.headerWithImage)) {
            _this2.html.headerBackground.classList.remove(_this2.classes.headerBackgroundTransparent);
          }

          _this2.html.navMainSubtext.forEach(function (item) {
            item.classList.add(_this2.classes.navMainSubtextSticky);
          });
        } else {
          _this2.html.header.classList.remove(_this2.classes.headerSticky);

          if (_this2.html.headerBackground.classList.contains(_this2.classes.headerWithImage)) {
            _this2.html.headerBackground.classList.add(_this2.classes.headerBackgroundTransparent);
          }

          _this2.html.navMainSubtext.forEach(function (item) {
            item.classList.remove(_this2.classes.navMainSubtextSticky);
          });
        }
      }, this.debounceDelay);
    }
  }]);

  return Header;
}(); // export as singleton


var _default = new Header();

exports["default"] = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MobileNav = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MobileNav = /*#__PURE__*/function () {
  function MobileNav() {
    _classCallCheck(this, MobileNav);

    _defineProperty(this, "classes", {
      mobileNav: 'mobile-nav',
      mobileNavExpanded: 'mobile-nav--expanded',
      mobileNavListActive: 'mobile-nav__list--active',
      mobileNavListHidden: 'mobile-nav__list--hidden',
      mobileNavButton: 'mobile-nav__trigger:not(.nav-expanded)',
      mobileNavButtonBack: 'mobile-nav__button-back',
      mobileNavButtonBackActive: 'mobile-nav__button-back--active',
      mobileNavButtonClose: 'mobile-nav__button-close',
      headerButtonOpen: 'header__menu-button-mobile',
      headerMenuText: 'header__menu-button-text'
    });

    _defineProperty(this, "ariaAttributes", {
      expanded: 'aria-expanded'
    });

    _defineProperty(this, "html", {
      mobileNavButtonsBack: [],
      mobileNavButtons: [],
      mobileNavButtonClose: null,
      headerButtonOpen: null,
      headerMenuText: null
    });

    if (document.querySelector(".".concat(this.classes.mobileNav))) {
      // mobile Navigation
      this.html.mobileNav = document.querySelector(".".concat(this.classes.mobileNav));
      this.html.mobileNavButtons = this.html.mobileNav.querySelectorAll(".".concat(this.classes.mobileNavButton));
      this.html.mobileNavButtonsBack = this.html.mobileNav.querySelectorAll(".".concat(this.classes.mobileNavButtonBack));
      this.html.mobileNavButtonClose = this.html.mobileNav.querySelector(".".concat(this.classes.mobileNavButtonClose)); // header mobile

      this.html.headerMenuText = document.querySelector(".".concat(this.classes.headerMenuText));
      this.html.headerButtonOpen = document.querySelector(".".concat(this.classes.headerButtonOpen));
      this.init();
    }
  }

  _createClass(MobileNav, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.html.headerButtonOpen.addEventListener('click', this.toggleMobileNav.bind(this));
      this.html.mobileNavButtonClose.addEventListener('click', this.toggleMobileNav.bind(this));
      this.html.mobileNavButtons.forEach(function (item) {
        item.addEventListener('click', _this.navClickHandler.bind(_this));
      });
      this.html.mobileNavButtonsBack.forEach(function (item) {
        item.addEventListener('click', _this.goBackClickHandler.bind(_this));
      });
    }
  }, {
    key: "toggleMobileNav",
    value: function toggleMobileNav() {
      this.html.mobileNav.classList.toggle(this.classes.mobileNavExpanded);
      this.html.headerButtonOpen.setAttribute(this.ariaAttributes.expanded, 'true');
    }
  }, {
    key: "navClickHandler",
    value: function navClickHandler(event) {
      event.target.parentElement.nextElementSibling.classList.remove(this.classes.mobileNavListHidden);
      event.target.parentElement.nextElementSibling.classList.add(this.classes.mobileNavListActive);
      this.html.mobileNavButtonsBack[1].classList.add(this.classes.mobileNavButtonBackActive);
      var lengthActiveLists = this.html.mobileNav.querySelectorAll(".".concat(this.classes.mobileNavListActive)).length;

      if (lengthActiveLists > 2) {
        var textBackButton = event.target.innerHTML;
        this.html.mobileNavButtonsBack[0].innerHTML = textBackButton;
        this.showBackButtons(lengthActiveLists);
      }
    }
  }, {
    key: "goBackClickHandler",
    value: function goBackClickHandler() {
      var _this2 = this;

      this.html.mobileNav.querySelectorAll(".".concat(this.classes.mobileNavListActive)).forEach(function (item, id, array) {
        if (id === array.length - 1) {
          item.classList.remove("".concat(_this2.classes.mobileNavListActive));
          item.classList.add("".concat(_this2.classes.mobileNavListHidden));
        }
      });
      var lengthActiveLists = this.html.mobileNav.querySelectorAll(".".concat(this.classes.mobileNavListActive)).length;
      this.showBackButtons(lengthActiveLists);
    }
  }, {
    key: "showBackButtons",
    value: function showBackButtons(activeItems) {
      var _this3 = this;

      if (activeItems === 1) {
        this.html.mobileNavButtonsBack.forEach(function (item) {
          item.classList.remove(_this3.classes.mobileNavButtonBackActive);
        });
      } else if (activeItems === 2) {
        this.html.mobileNavButtonsBack[0].classList.remove(this.classes.mobileNavButtonBackActive);
        this.html.mobileNavButtonsBack[1].classList.add(this.classes.mobileNavButtonBackActive);
      } else {
        this.html.mobileNavButtonsBack[0].classList.add(this.classes.mobileNavButtonBackActive);
        this.html.mobileNavButtonsBack[1].classList.remove(this.classes.mobileNavButtonBackActive);
      }
    }
  }]);

  return MobileNav;
}(); // export as singleton


exports.MobileNav = MobileNav;

var _default = new MobileNav();

exports["default"] = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NavMain = /*#__PURE__*/function () {
  function NavMain() {
    _classCallCheck(this, NavMain);

    _defineProperty(this, "classes", {
      nav: 'nav-main',
      button: 'nav-main__button',
      buttonActive: 'nav-main__button--active',
      navLinkActive: 'nav-main__list-item--active',
      flyout: 'nav-main__flyout',
      flyoutExpanded: 'nav-main__flyout--expanded',
      navExpandedButton: 'nav-expanded',
      navSublistActive: 'nav-main__sublist--active'
    });

    _defineProperty(this, "ariaAttributes", {
      expanded: 'aria-expanded'
    });

    _defineProperty(this, "html", {
      nav: null,
      buttons: [],
      flyouts: []
    });

    this.html.nav = document.querySelector(".".concat(this.classes.nav));
    this.html.buttons = Array.from(this.html.nav.querySelectorAll(".".concat(this.classes.button)));
    this.html.flyouts = Array.from(this.html.nav.querySelectorAll(".".concat(this.classes.flyout)));
    this.init();
  }

  _createClass(NavMain, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.html.buttons.forEach(function (button) {
        button.addEventListener('click', _this.navClickHandler.bind(_this));
      });
      document.querySelectorAll(".".concat(this.classes.navExpandedButton)).forEach(function (item) {
        item.addEventListener('click', _this.navFlyoutClickHandler.bind(_this));
      });
      document.addEventListener('click', function (event) {
        var targetEl = event.target;

        do {
          if (targetEl === _this.html.nav) {
            return;
          }

          targetEl = targetEl.parentNode;
        } while (targetEl);

        _this.closeAll();
      });
    }
  }, {
    key: "navClickHandler",
    value: function navClickHandler(event) {
      var index = this.html.buttons.indexOf(event.currentTarget); // clicked button is active

      if (event.currentTarget.classList.contains(this.classes.buttonActive)) {
        this.close(index);
      } else {
        this.closeAll();
        this.open(index);
      }
    }
  }, {
    key: "navFlyoutClickHandler",
    value: function navFlyoutClickHandler(event) {
      var subListElement = event.currentTarget.parentElement.children[1];

      if (event.currentTarget.getAttribute('aria-expanded') === 'false') {
        event.currentTarget.setAttribute(this.ariaAttributes.expanded, true);
        subListElement.classList.add("".concat(this.classes.navSublistActive));
        event.currentTarget.parentElement.classList.add('nav-main__expanded');
      } else {
        event.currentTarget.setAttribute(this.ariaAttributes.expanded, false);
        subListElement.classList.remove("".concat(this.classes.navSublistActive));
        event.currentTarget.parentElement.classList.remove('nav-main__expanded');
      }
    }
  }, {
    key: "open",
    value: function open(index) {
      var targetButton = this.html.buttons[index];
      var targetFlyout = this.html.flyouts[index];
      targetButton.setAttribute(this.ariaAttributes.expanded, true);
      targetButton.parentElement.classList.add(this.classes.navLinkActive);
      targetButton.classList.add(this.classes.buttonActive);
      targetFlyout.classList.add(this.classes.flyoutExpanded);
      document.body.setAttribute('style', 'overflow: hidden');
    }
  }, {
    key: "close",
    value: function close(index) {
      var targetButton = this.html.buttons[index];
      var targetFlyout = this.html.flyouts[index];
      targetButton.setAttribute(this.ariaAttributes.expanded, false);
      targetButton.classList.remove(this.classes.buttonActive);
      targetButton.parentElement.classList.remove(this.classes.navLinkActive);
      targetFlyout.classList.remove(this.classes.flyoutExpanded);
      document.body.setAttribute('style', '');
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      for (var i = 0; i < this.html.buttons.length; i += 1) {
        this.close(i);
      }
    }
  }]);

  return NavMain;
}(); // export as singleton


var _default = new NavMain();

exports["default"] = _default;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Responsive View Handler
 * Emits a viewChangeEvent on window when view changes.
 * Views are defined in css (e.g. styles/layout/responsive-view-handler.scss).
 * Usage:
 * window.addEventListener('viewchange', (event) => {
 *   console.log(event.detail); // outputs { currentView: "sm", lastView: "xs" }
 * });
 * */
var ResponsiveViewHandler = /*#__PURE__*/function () {
  /**
   * Constructor
   */
  function ResponsiveViewHandler() {
    _classCallCheck(this, ResponsiveViewHandler);

    _defineProperty(this, "debounceDelay", 250);

    _defineProperty(this, "debounceTimer", null);

    _defineProperty(this, "lastView", null);

    this.lastView = this.getView();
    this.events();
  }
  /**
   * Events
   */


  _createClass(ResponsiveViewHandler, [{
    key: "events",
    value: function events() {
      window.addEventListener('resize', this.resizeHandler.bind(this));
    }
    /**
     * Resize Handler
     * Trigger a debounced view change event when view changes
     */

  }, {
    key: "resizeHandler",
    value: function resizeHandler() {
      var _this = this;

      // clear timeout on resize
      clearTimeout(this.debounceTimer); // start timer

      this.debounceTimer = setTimeout(function () {
        // get current view out of body:after pseudo element (see responsive-view-handler.scss)
        var currentView = _this.getView(); // trigger view change event if view has changed


        if (currentView !== _this.lastView) {
          _this.triggerViewChangeEvent(currentView, _this.lastView);
        } // update lastView


        _this.lastView = currentView;
      }, this.debounceDelay);
    }
    /**
     * Get View
     * Read the content :after pseudoelement of body (responsive-view-handler.scss)
     */

  }, {
    key: "getView",
    value: function getView() {
      return window.getComputedStyle(document.querySelector('body'), ':after').getPropertyValue('content').replace(/["']/g, '');
    }
    /**
     * Trigger View Change Event
     * @param {string} currentView
     * @param {string} lastView
     */

  }, {
    key: "triggerViewChangeEvent",
    value: function triggerViewChangeEvent(currentView, lastView) {
      var viewChangeEvent = new CustomEvent('viewchange', {
        detail: {
          currentView: currentView,
          lastView: lastView
        }
      });
      window.dispatchEvent(viewChangeEvent);
    }
  }]);

  return ResponsiveViewHandler;
}(); // export as singleton


var _default = new ResponsiveViewHandler();

exports["default"] = _default;

},{}]},{},[1]);

//# sourceMappingURL=main.js.map

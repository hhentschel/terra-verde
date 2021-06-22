/**
 * Use this file for main application handling and initializing of modules
 */

// imports

import './modules/nav-main';
import './modules/mobile-nav';
import './modules/focus';
import './modules/header';
import './modules/responsive-view-handler';
import Accordion from './modules/accordion';

/* Accordions */
const accordions = document.querySelectorAll('.accordion');
accordions.forEach((accordion) => {
  new Accordion(accordion);
});

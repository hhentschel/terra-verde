/**
 * Use this file for main application handling and initializing of modules
 */

// imports

import './modules/nav-main';
import './modules/mobile-nav';
import './modules/focus';
import './modules/header';
import Accordion from './modules/accordion';
import AnchorLink from './modules/anchor-link';
import MapLinkToCircle from './modules/map-linktocircle';
import MapCircleToLink from './modules/map-circletolink';

/* Accordions */
const accordions = document.querySelectorAll('.accordion');
accordions.forEach((accordion) => {
  new Accordion(accordion);
});

/* Anchor links */
const anchorLinks = document.querySelectorAll('.anchor-link');
anchorLinks.forEach((anchorLink) => {
  new AnchorLink(anchorLink);
});

/* Map links to circle */
const mapLinkstoCircle = document.querySelectorAll('.map-link');
mapLinkstoCircle.forEach((mapLinkToCircle) => {
  new MapLinkToCircle(mapLinkToCircle);
});

/* Map circle to links */
const mapCirclesToLink = document.querySelectorAll('.producer-circle');
mapCirclesToLink.forEach((mapCircleToLink) => {
  new MapCircleToLink(mapCircleToLink);
});

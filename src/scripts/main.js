/**
 * Use this file for main application handling and initializing of modules
 */

// imports

import './modules/nav-main'
import './modules/mobile-nav'
import './modules/focus'
import './modules/header'
import Accordion from './modules/accordion'
import GallerySlider from './modules/gallery'
/* import AnchorLink from './modules/anchor-link'; */
import AnchorLink from './modules/anchor-link'
import MapLinkToCircle from './modules/map-linktocircle'
import MapCircleToLink from './modules/map-circletolink'

/* Accordions */
const accordions = document.querySelectorAll('.accordion')
accordions.forEach((accordion) => {
  new Accordion(accordion)
})

/* Anchor links */
const anchorLinks = document.querySelectorAll('.anchor-link')
anchorLinks.forEach((anchorLink) => {
  new AnchorLink(anchorLink)
})

/* Gallery Sliders */
const gallerySliders = document.querySelectorAll('.gallery-container')
gallerySliders.forEach((gallery) => {
  new GallerySlider(gallery)
})

/* Map links to circle */
const mapLinkstoCircle = document.querySelectorAll('.map-link')
mapLinkstoCircle.forEach((mapLinkToCircle) => {
  new MapLinkToCircle(mapLinkToCircle)
})

/* Map circle to links */
const mapCirclesToLink = document.querySelectorAll('.producer-circle')
mapCirclesToLink.forEach((mapCircleToLink) => {
  new MapCircleToLink(mapCircleToLink)
})

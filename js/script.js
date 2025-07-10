'use strict';


/**
 * preload
 * 
 * loading will end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function() {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// add event listener on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// NAVABR
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

// HEADER & back to top

const header = document.querySelector("[data-header]");
const backToTop = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (this.window.scrollY >= 50) {
    header.classList.add("active");
    backToBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
})


// HERO SLIDER

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const SlideNext = function () {
  if (currentSlidePos >= heroSliderItems.length -1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", SlideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length -1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto Slide

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    SlideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", autoSlide);

window.addEventListener("load", autoSlide);


// Parallax EFFECT
const ParallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function  (event) {
  x = (event.clientX / this.window.innerWidth * 10) -5;
  y = (event.clientY / this.window.innerHeight * 10) -5;

  // reverse 
  x = x - (x *2);
  y = y - (y *2);

  for (let i = 0, len = ParallaxItems.length; i < len; i++) {
     x = x * Number(ParallaxItems[i].dataset.parallaxSpeed);
     y = y * Number(ParallaxItems[i].dataset.parallaxSpeed);
     ParallaxItems[i].computedStyleMap.transform = 'translate3d(${x}px, ${y}px, 0px)';
  }
  
});
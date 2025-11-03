// ===========================================
// 1. NATIVE JAVASCRIPT / CUSTOM CAROUSEL LOGIC
// ===========================================

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "slide",
  once: true
});
/* ===================================
 * Custom Service Carousel Logic
 * =================================== */
document.addEventListener('DOMContentLoaded', function() {

  // Select all the elements we need
  const container = document.querySelector('.service-container');
  const track = document.querySelector('.service-track');
  
  // Safety check in case the element doesn't exist on another page
  if (!track) {
    return;
  }

  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.next-service');
  const prevButton = document.querySelector('.prev-service');

  let currentIndex = 0; // Keep track of which slide we're on
  let slideWidth = 0;
  let slidesPerView = 1;

  // Function to update dimensions (useful for responsiveness)
  function updateDimensions() {
    // Get the width of the first slide
    slideWidth = slides[0].getBoundingClientRect().width;
    
    // Calculate how many slides are visible in the container
    // Use Math.round to handle fractional pixels
    if (slideWidth > 0) {
      slidesPerView = Math.round(container.clientWidth / slideWidth);
    } else {
      slidesPerView = 1; // Default
    }

    // Ensure currentIndex is not out of bounds after resize
    const maxIndex = slides.length - slidesPerView;
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    
    // Move the track to the correct position
    setTrackPosition();
  }

  // Function to move the track
  function setTrackPosition() {
    const newTransform = -currentIndex * slideWidth;
    track.style.transform = 'translateX(' + newTransform + 'px)';
  }

  // --- Event Listeners ---

  // Next Button
  nextButton.addEventListener('click', () => {
    // Calculate the maximum slide index we can go to
    const maxIndex = slides.length - slidesPerView;
    
    if (currentIndex < maxIndex) {
      currentIndex++; // Move to the next slide
    } else {
      // Optional: Loop back to the start
      // currentIndex = 0;
    }
    setTrackPosition();
  });

  // Previous Button
  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--; // Move to the previous slide
    } else {
      // Optional: Loop to the end
      // currentIndex = slides.length - slidesPerView;
    }
    setTrackPosition();
  });

  // Re-calculate dimensions when the window is resized
  window.addEventListener('resize', updateDimensions);

  // Initial setup when the page loads
  // Use a small delay to ensure images are loaded and widths are correct
  setTimeout(updateDimensions, 100);
});

// ===========================================
// 2. JQUERY DOCUMENT READY BLOCK
// ===========================================

jQuery(document).ready(function ($) {
  "use strict";

  // --- SITE MENU CLONE ---
  const siteMenuClone = function () {
    $(".js-clone-nav").each(function () {
      $(this)
        .clone()
        .attr("class", "site-nav-wrap")
        .appendTo(".site-mobile-menu-body");
    });

    setTimeout(function () {
      let counter = 0;
      $(".site-mobile-menu .has-children").each(function () {
        const $this = $(this);
        $this.prepend('<span class="arrow-collapse collapsed">');
        $this.find(".arrow-collapse").attr({
          "data-toggle": "collapse",
          "data-target": "#collapseItem" + counter
        });
        $this.find("> ul").attr({
          class: "collapse",
          id: "collapseItem" + counter
        });
        counter++;
      });
    }, 1000);

    $("body").on("click", ".arrow-collapse", function (e) {
      e.preventDefault();
      const $this = $(this);
      $this.toggleClass("active", !$this.closest("li").find(".collapse").hasClass("show"));
    });

    $(window).resize(function () {
      if ($(this).width() > 768 && $("body").hasClass("offcanvas-menu")) {
        $("body").removeClass("offcanvas-menu");
      }
    });

    $("body").on("click", ".js-menu-toggle", function (e) {
      e.preventDefault();
      const $this = $(this);
      $("body").toggleClass("offcanvas-menu");
      $this.toggleClass("active");
    });

    $(document).mouseup(function (e) {
      const container = $(".site-mobile-menu");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("body").removeClass("offcanvas-menu");
      }
    });
  };
  siteMenuClone();

  // --- MAGNIFIC POPUP ---
  const siteMagnificPopup = function () {
    $(".image-popup").magnificPopup({
      type: "image",
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: "mfp-no-margins mfp-with-zoom",
      gallery: { enabled: true, navigateByImgClick: true, preload: [0, 1] },
      image: { verticalFit: true },
      zoom: { enabled: true, duration: 300 }
    });

    $(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
      disableOn: 700,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  };
  siteMagnificPopup();

  // --- OWL CAROUSEL ---
  const siteCarousel = function () {
    if ($(".nonloop-block-13").length > 0) {
      $(".nonloop-block-13").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        stagePadding: 0,
        margin: 0,
        autoplay: true,
        nav: true,
        navText: [
          '<span class="icon-arrow_back">',
          '<span class="icon-arrow_forward">'
        ],
        responsive: {
          600: { items: 2 },
          1000: { items: 2 },
          1200: { items: 3 }
        }
      });
    }

    $(".slide-one-item").owlCarousel({
      items: 1,
      loop: true,
      smartSpeed: 1500,
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      nav: true,
      navText: [
        '<span class="icon-keyboard_arrow_left">',
        '<span class="icon-keyboard_arrow_right">'
      ]
    });
  };
  siteCarousel();

  // --- STICKY HEADER ---
  const siteSticky = function () {
    $(".js-sticky-header").sticky({ topSpacing: 0 });
  };
  siteSticky();

  // --- ONE PAGE NAVIGATION ---
  const OnePageNavigation = function () {
    $("body").on(
      "click",
      ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a[href^='#']",
      function (e) {
        e.preventDefault();
        const hash = this.hash;
        $("html, body").animate(
          { scrollTop: $(hash).offset().top - 50 },
          600
        );
      }
    );
  };
  OnePageNavigation();

  // --- SCROLL SHRINK EFFECT ---
  const siteScroll = function () {
    $(window).scroll(function () {
      const st = $(this).scrollTop();
      $(".js-sticky-header").toggleClass("shrink", st > 100);
    });
  };
  siteScroll();

  // --- COUNTER (Animated Number) ---
  const counter = function () {
    $("#about-section, .counter").waypoint(
      function (direction) {
        if (
          direction === "down" &&
          !$(this.element).hasClass("ftco-animated")
        ) {
          const commaStep = $.animateNumber.numberStepFactories.separator(",");
          $(this.element)
            .find(".number > span")
            .each(function () {
              const $this = $(this);
              const num = $this.data("number");
              $this.animateNumber({ number: num, numberStep: commaStep }, 1000);
            });
        }
      },
      { offset: "95%" }
    );
  };
  counter();
});
/* ===================================
 * Custom Service Carousel Logic
 * (Now with Autoplay and Seamless Infinite Loop)
 * =================================== */
document.addEventListener('DOMContentLoaded', function() {

  const container = document.querySelector('.service-container');
  const track = document.querySelector('.service-track');

  // Safety check
  if (!track) {
    return;
  }

  // --- NEW: Store original slides ---
  const originalSlidesHTML = track.innerHTML;
  let originalSlides = Array.from(track.children);
  let slides = Array.from(track.children); // This will be updated
  const originalSlideCount = originalSlides.length;

  const nextButton = document.querySelector('.next-service');
  const prevButton = document.querySelector('.prev-service');

  let currentIndex = 0;
  let slideWidth = 0;
  let slidesPerView = 1;

  // --- NEW: Autoplay & Transition variables ---
  let autoPlayInterval;
  const autoPlayDelay = 2000; // Autoplay every 2 seconds
  let isTransitioning = false; // Prevents spam clicks
  // This MUST match your CSS: transition: transform 0.5s ease-in-out;
  const transitionDuration = 500; 

  /**
   * Recalculates dimensions AND re-clones slides for responsiveness.
   */
  function updateDimensionsAndClones() {
    isTransitioning = true; // Pause logic during resize

    // 1. Reset track to original state
    track.innerHTML = originalSlidesHTML;
    originalSlides = Array.from(track.children);

    // 2. Calculate new dimensions
    slideWidth = originalSlides[0].getBoundingClientRect().width;
    if (slideWidth > 0) {
      slidesPerView = Math.round(container.clientWidth / slideWidth);
    } else {
      slidesPerView = 1;
    }

    // 3. Clone and append
    // Only clone if there are slides
    if (originalSlideCount > 0) {
      for (let i = 0; i < slidesPerView; i++) {
        // Handle cases where slidesPerView > originalSlideCount
        const slideToClone = originalSlides[i % originalSlideCount];
        track.appendChild(slideToClone.cloneNode(true));
      }
    }

    // 4. Update slides array
    slides = Array.from(track.children);

    // 5. Ensure index is valid and set position
    const maxValidIndex = originalSlideCount - 1;
    if (currentIndex > maxValidIndex) {
      currentIndex = maxValidIndex;
    }

    setTrackPosition(false); // No transition on resize
    isTransitioning = false;
  }

  /**
   * Moves the track to the correct position.
   */
  function setTrackPosition(withTransition = true) {
    if (!withTransition) {
      track.classList.add('no-transition');
    }

    const newTransform = -currentIndex * slideWidth;
    track.style.transform = 'translateX(' + newTransform + 'px)';

    if (!withTransition) {
      // Force browser reflow to apply transform immediately
      track.offsetHeight;
      track.classList.remove('no-transition');
    }
  }

  /**
   * Slides to the next item.
   */
  function slideNext() {
    if (isTransitioning) return;
    isTransitioning = true;

    currentIndex++;
    setTrackPosition(true); // With transition

    // Check if we've slid to the first clone
    if (currentIndex === originalSlideCount) {
      // After the animation finishes, jump back to the start
      setTimeout(() => {
        setTrackPosition(false); // No transition
        currentIndex = 0; // Reset index
        setTrackPosition(false); // Jump to start
        isTransitioning = false;
      }, transitionDuration);
    } else {
      // Not a jump, just reset the flag
      setTimeout(() => {
        isTransitioning = false;
      }, transitionDuration);
    }
  }

  /**
   * Slides to the previous item.
   */
  function slidePrev() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentIndex === 0) {
      // We are at the start, need to jump to the *end* (the first clone)
      setTrackPosition(false);
      currentIndex = originalSlideCount;
      setTrackPosition(false); // Jump to clone

      // Use setTimeout to allow browser to render the jump, then slide
      setTimeout(() => {
        currentIndex--;
        setTrackPosition(true); // Slide to the last *real* slide

        setTimeout(() => {
          isTransitioning = false;
        }, transitionDuration);
      }, 20); // Small delay
    } else {
      currentIndex--;
      setTrackPosition(true);
      setTimeout(() => {
        isTransitioning = false;
      }, transitionDuration);
    }
  }

  // --- NEW: Autoplay Functions ---
  function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    autoPlayInterval = setInterval(slideNext, autoPlayDelay);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // --- MODIFIED: Event Listeners ---
  nextButton.addEventListener('click', () => {
    slideNext();
    stopAutoPlay(); // Stop autoplay when user manually interacts
  });

  prevButton.addEventListener('click', () => {
    slidePrev();
    stopAutoPlay(); // Stop autoplay when user manually interacts
  });

  // --- NEW: Pause on hover ---
  container.addEventListener('mouseenter', stopAutoPlay);
  container.addEventListener('mouseleave', startAutoPlay);

  // Re-calculate dimensions and clones when the window is resized
  window.addEventListener('resize', () => {
    stopAutoPlay();
    updateDimensionsAndClones(); // Re-do clones
    startAutoPlay();
  });

  // Initial setup
  setTimeout(() => {
    updateDimensionsAndClones();
    startAutoPlay();
  }, 100);
  
});

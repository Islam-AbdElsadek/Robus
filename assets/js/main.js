// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top-btn');
const chatbotBtn = document.getElementById('chatbot-btn');
const footer = document.querySelector('.footer-bottom');

// Show/Hide button based on scroll position and adjust position above footer
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }

    // Adjust button position to avoid covering footer
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const buttonHeight = 60; // approximate button height with margin
        const viewportHeight = window.innerHeight;
        const fixedBottomPosition = 30; // default fixed bottom position

        // If footer is visible in viewport and would be covered by button
        if (footerTop < viewportHeight - fixedBottomPosition) {
            // Move button above the footer
            const distanceFromBottom = viewportHeight - footerTop + 10;
            document.querySelector('.fixed-buttons-group').style.bottom = distanceFromBottom + 'px';
        } else {
            // Reset to normal position
            document.querySelector('.fixed-buttons-group').style.bottom = fixedBottomPosition + 'px';
        }
    }
});

// Scroll to top when button is clicked
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Chat Bot button click handler
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');

chatbotBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('show');
});

if (closeChatBtn) {
    closeChatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatWindow.classList.remove('show');
    });
}

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (chatWindow && chatWindow.classList.contains('show') && 
        !chatWindow.contains(e.target) && 
        !chatbotBtn.contains(e.target)) {
        chatWindow.classList.remove('show');
    }
});

const circle = document.querySelector('.progress-ring__circle');

const radius = 26;
const circumference = 2 * Math.PI * radius;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercent = (scrollTop / docHeight) * 100;

    setProgress(scrollPercent);
});



// Desktop nav behavior and active tab handling
const pageNavLinks = document.querySelectorAll('.top-nav .nav-links a, .nav-box .nav-links a');
const scrollTarget = document.getElementById('courses');
const boxNav = document.querySelector('.nav-box');
const topNav = document.querySelector('.top-nav');
const boxNavMobile = document.querySelector('.top-nav-mobile-box');
const topNavMobile = document.querySelector('.top-nav-mobile');
let lastNavState = null;

function updateNavVisibility() {
    if (!scrollTarget) {
        boxNav?.classList.remove('hidden');
        topNav?.classList.add('hidden');
        boxNavMobile?.classList.remove('hidden');
        topNavMobile?.classList.add('hidden');
        return;
    }

    const targetOffset = scrollTarget.offsetTop;
    const currentScroll = window.pageYOffset;
    const shouldShowTopNav = currentScroll >=  200;
    const shouldShowMobileTopNav = currentScroll >=  200;

    if (window.innerWidth < 992) {
        if (shouldShowMobileTopNav && lastNavState !== 'mobile-top') {
            boxNavMobile?.classList.add('hidden');
            void topNavMobile?.offsetWidth;
            topNavMobile?.classList.remove('hidden');
            lastNavState = 'mobile-top';
        } else if (!shouldShowMobileTopNav && lastNavState !== 'mobile-box') {
            boxNavMobile?.classList.remove('hidden');
            topNavMobile?.classList.add('hidden');
            lastNavState = 'mobile-box';
        }
        // console.log("Current Scroll:", currentScroll, "Target Offset:", targetOffset, "Should Show Mobile Top Nav:", shouldShowMobileTopNav);

        boxNav?.classList.remove('hidden');
        topNav?.classList.add('hidden');
        return;
    }


    boxNavMobile?.classList.add('hidden');
    topNavMobile?.classList.add('hidden');

    if (shouldShowTopNav && lastNavState !== 'top') {
        boxNav?.classList.add('hidden');
        void topNav.offsetWidth;
        topNav?.classList.remove('hidden');
        lastNavState = 'top';
    } else if (!shouldShowTopNav && lastNavState !== 'box') {
        boxNav?.classList.remove('hidden');
        topNav?.classList.add('hidden');
        lastNavState = 'box';
    }
}

function handleScroll() {
    console.log("scrolling...");
}

window.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', updateNavVisibility);
setTimeout(updateNavVisibility, 100);



// Get all navigation links from all navbars
const allNavLinks = document.querySelectorAll('.top-nav .nav-links a, .nav-box .nav-links a, .bottom-nav .tab');

// Function to update active state across all navbars
function setActiveNavLink(targetHref) {
    allNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === targetHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add click listeners to all navigation links
allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Only handle anchor links, not external links
        if (href.startsWith('#')) {
            setActiveNavLink(href);
        }
    });
});

// Update active link on page scroll
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveNavLink('#' + section.id);
        }
    });
}

window.addEventListener('scroll', updateActiveNavOnScroll);
window.addEventListener('load', updateActiveNavOnScroll);

// review swiper initialization
if (typeof Swiper !== 'undefined') {
    // Ticker — pure CSS infinite marquee (no Swiper JS, never stops)
    document.querySelectorAll('.ticker-swiper').forEach(function (el) {
        const wrapper = el.querySelector('.swiper-wrapper');
        if (wrapper) {
            // Duplicate slides so translateX(-50%) creates a seamless loop
            wrapper.innerHTML += wrapper.innerHTML;
        }
    });

    const reviewSwiper = new Swiper('.review-slider-2', {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.review-slider-2 .swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.review-slider-2 .swiper-button-next',
            prevEl: '.review-slider-2 .swiper-button-prev',
        },
    });
    
    // Ensure autoplay starts
    if (reviewSwiper && reviewSwiper.autoplay) {
        reviewSwiper.autoplay.start();
    }

    // Instagram swiper initialization (separate instance)
    const instagramSwiper = new Swiper('.footer-images-swiper', {
        loop: true,
        speed: 800,
        spaceBetween: 0,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        slidesPerView: 2,
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 6,
                spaceBetween: 0,
            },
        },
    });
    
    // Ensure autoplay starts
    if (instagramSwiper && instagramSwiper.autoplay) {
        instagramSwiper.autoplay.start();
    }
}

// Section 2 - Courses (Learning Path)
const courseButtons = document.querySelectorAll('#courses .path-btn');
const courseCards = document.querySelectorAll('#courses .courses-card');
const courseFloatingShapes = document.querySelectorAll('#courses .floating-shape');

// Determine the correct path prefix based on page location
const isArabicPage = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
const shapePathPrefix = isArabicPage ? '../assets/img/shapes/' : 'assets/img/shapes/';

courseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const course = button.dataset.course;
        const shapesData = button.dataset.shapes ? JSON.parse(button.dataset.shapes) : null;

        courseButtons.forEach(item => item.classList.toggle('active', item === button));
        courseCards.forEach(card => {
            card.classList.toggle('active', card.dataset.course === course);
        });

        // Change floating shapes based on course selection
        if (shapesData && courseFloatingShapes.length > 0) {
            if (courseFloatingShapes[0]) {
                const shape1Img = courseFloatingShapes[0].querySelector('img');
                if (shape1Img && shapesData.shape1) {
                    shape1Img.src = shapePathPrefix + shapesData.shape1;
                    shape1Img.style.transition = 'opacity 0.3s ease';
                }
            }
            
            if (courseFloatingShapes[1]) {
                const shape2Img = courseFloatingShapes[1].querySelector('img');
                if (shape2Img && shapesData.shape2) {
                    shape2Img.src = shapePathPrefix + shapesData.shape2;
                    shape2Img.style.transition = 'opacity 0.3s ease';
                }
            }
        }
    });
});

// Section 3 - Student Projects with Tabs
const projectButtons = document.querySelectorAll('#projects .path-btn');
const projectSliderWrappers = document.querySelectorAll('#projects .projects-slider-wrapper');
const projectSwipers = new Map();

function initializeProjectSwipers() {
    if (typeof Swiper === 'undefined') {
        return;
    }

    projectSliderWrappers.forEach((wrapper) => {
        const swiper = new Swiper(wrapper, {
            loop: true,
            speed: 800,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            breakpoints: {
                576: {
                    slidesPerView: 3,
                    spaceBetween: 18,
                    centeredSlides: true,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: true,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    centeredSlides: true,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                    centeredSlides: true,
                },
            },
        });

        if (!wrapper.classList.contains('active')) {
            swiper.autoplay.stop();
        } else {
            swiper.autoplay.start();
        }

        projectSwipers.set(wrapper.dataset.project, swiper);
    });
}

function setActiveProjectTab(projectId) {
    projectButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.project === projectId);
    });

    projectSliderWrappers.forEach((wrapper) => {
        const isActive = wrapper.dataset.project === projectId;
        wrapper.classList.toggle('active', isActive);

        const swiper = projectSwipers.get(wrapper.dataset.project);
        if (!swiper) {
            return;
        }

        if (isActive) {
            swiper.update();
            swiper.slideToLoop(0, 0, false);
            swiper.autoplay.start();
        } else {
            swiper.autoplay.stop();
        }
    });
}

projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setActiveProjectTab(button.dataset.project);
    });
});

window.addEventListener('load', () => {
    initializeProjectSwipers();
    const activeProjectButton = document.querySelector('#projects .path-btn.active');
    if (activeProjectButton) {
        setActiveProjectTab(activeProjectButton.dataset.project);
    }
});

// Video play button functionality for all video buttons
const videoPlayBtns = document.querySelectorAll('#projects .video-play-btn');

const closeVideoModal = (modal) => {
    if (!modal) {
        return;
    }

    if (modal._handleEscape) {
        document.removeEventListener('keydown', modal._handleEscape);
    }

    modal.remove();
    document.body.classList.remove('video-modal-open');
};

videoPlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = btn.dataset.video;

        // Remove any existing modal before opening another one
        const existingModal = document.querySelector('.video-modal');
        if (existingModal) {
            closeVideoModal(existingModal);
        }
        
        // Create modal for video
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.innerHTML = `
            <div class="video-modal-content">
                <button class="video-modal-close">&times;</button>
                <iframe width="100%" height="600" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.classList.add('video-modal-open');
        
        // Close modal on close button click
        modal.querySelector('.video-modal-close').addEventListener('click', () => {
            closeVideoModal(modal);
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal(modal);
            }
        });

        // Close modal with Escape key
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeVideoModal(modal);
            }
        };
        modal._handleEscape = handleEscape;
        document.addEventListener('keydown', handleEscape);
    });
});

function animated_swiper(selector, init) {
    const animated = function animated() {
        $(selector + " [data-animation]").each(function() {
            let anim = $(this).data("animation");
            let delay = $(this).data("delay");
            let duration = $(this).data("duration");
            $(this)
                .removeClass("anim" + anim)
                .addClass(anim + " animated")
                .css({
                    webkitAnimationDelay: delay,
                    animationDelay: delay,
                    webkitAnimationDuration: duration,
                    animationDuration: duration,
                })
                .one("animationend", function() {
                    $(this).removeClass(anim + " animated");
                });
        });
    };
    animated();
    init.on("slideChange", function() {
        $(sliderActive2 + " [data-animation]").removeClass("animated");
    });
    init.on("slideChange", animated);
}
// animated_swiper(sliderActive2, sliderInit2);




/*=============================================
	=    Lightbox Gallery Functionality          =
=============================================*/

const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const currentImageNum = document.getElementById('currentImageNum');
const totalImagesNum = document.getElementById('totalImagesNum');

let currentImageIndex = 0;
let uniquePopupImages = [];
let allPopupImages = [];

// Initialize lightbox
function initLightbox() {
    // Get all popup images - including duplicates from swiper
    allPopupImages = Array.from(document.querySelectorAll('.popup-image'));
    
    // Get only unique images (filter out duplicates from swiper loop)
    const imageUrls = new Set();
    uniquePopupImages = [];
    
    allPopupImages.forEach((img) => {
        const href = img.getAttribute('href');
        if (!imageUrls.has(href)) {
            imageUrls.add(href);
            uniquePopupImages.push(img);
        }
    });
    
    // Update total count with unique images only
    totalImagesNum.textContent = uniquePopupImages.length;

    if (uniquePopupImages.length === 0) return;

    // Add click listeners to all popup images
    allPopupImages.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            // Find the index in unique images array
            const href = img.getAttribute('href');
            const index = uniquePopupImages.findIndex(
                uniqueImg => uniqueImg.getAttribute('href') === href
            );
            currentImageIndex = index;
            openLightbox(index);
        });
    });
}

// Open lightbox
function openLightbox(index) {
    if (uniquePopupImages.length === 0) return;

    currentImageIndex = index;
    const imageUrl = uniquePopupImages[index].getAttribute('href');
    
    lightboxImage.src = imageUrl;
    currentImageNum.textContent = index + 1;
    
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % uniquePopupImages.length;
    openLightbox(currentImageIndex);
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + uniquePopupImages.length) % uniquePopupImages.length;
    openLightbox(currentImageIndex);
}

// Close button click
lightboxClose.addEventListener('click', closeLightbox);

// Next button click
lightboxNext.addEventListener('click', nextImage);

// Previous button click
lightboxPrev.addEventListener('click', prevImage);

// Backdrop click to close
lightboxBackdrop.addEventListener('click', closeLightbox);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
} else {
    initLightbox();
}

// Also reinitialize on window load to ensure all images are loaded
window.addEventListener('load', initLightbox);



  /*=============================================
	=    Footer Instagram Slider (Swiper)        =
=============================================*/
  if (typeof Swiper !== 'undefined') {
    window.addEventListener('load', () => {
      const footerSwiper = new Swiper('.footer-instagram-slider', {
        loop: true,
        speed: 800,
        spaceBetween: 0,
        slidesPerView: 5,
        slidesPerGroup: 1,
        centeredSlides: false,
        grabCursor: true,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        },
      });
      
      // Ensure autoplay starts
      if (footerSwiper && footerSwiper.autoplay) {
        footerSwiper.autoplay.start();
      }
    });
  }

/*=============================================
	=    Mobile Menu Functionality               =
=============================================*/

// Function to open mobile menu
function openMobileMenu() {
    console.log('Opening mobile menu');
    document.body.classList.add('gift-menu-visible');
}

// Function to close mobile menu
function closeMobileMenu() {
    console.log('Closing mobile menu');
    document.body.classList.remove('gift-menu-visible');
}

// Use event delegation to handle button clicks
document.body.addEventListener('click', (e) => {
    // Check if clicked element is a mobile menu button
    if (e.target.closest('.top-nav-mobile-button') || e.target.closest('.top-nav-mobile-box-button')
        || e.target.closest(".top-nav-button") || e.target.closest(".top-nav-box-button")) {
        console.log('Mobile menu button clicked via delegation');
        openMobileMenu();
    }
    
    // Check if clicked element is the close button
    if (e.target.closest('.gift-menu .close-btn')) {
        console.log('Close button clicked via delegation');
        closeMobileMenu();
    }
    
    // Check if clicked element is a menu link (but not dropdown buttons)
    if (e.target.closest('.gift-menu .navigation a') && !e.target.closest('.dropdown-btn')) {
        console.log('Menu link clicked via delegation');
        closeMobileMenu();
    }

    // Handle dropdown button clicks
    const dropdownBtn = e.target.closest('.gift-menu .dropdown-btn');
    if (dropdownBtn) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = dropdownBtn.parentElement;
        const subMenu = parentLi.querySelector(':scope > .sub-menu');
        if (!subMenu) return;

        // Close other open sub-menus at the same level
        const siblings = parentLi.parentElement.querySelectorAll(':scope > li');
        siblings.forEach(sibling => {
            if (sibling !== parentLi) {
                const sibBtn = sibling.querySelector(':scope > .dropdown-btn');
                const sibMenu = sibling.querySelector(':scope > .sub-menu');
                if (sibBtn) sibBtn.classList.remove('open');
                if (sibMenu) {
                    sibMenu.style.maxHeight = null;
                    sibMenu.classList.remove('open');
                }
            }
        });

        // Toggle current sub-menu
        dropdownBtn.classList.toggle('open');
        if (subMenu.classList.contains('open')) {
            subMenu.style.maxHeight = null;
            subMenu.classList.remove('open');
        } else {
            subMenu.classList.add('open');
            subMenu.style.maxHeight = subMenu.scrollHeight + 'px';
        }
    }
});

// Close menu when clicking backdrop
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-backdrop') && document.body.classList.contains('gift-menu-visible')) {
        console.log('Backdrop clicked');
        closeMobileMenu();
    }
});

// Also initialize on DOMContentLoaded as backup
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded - Mobile Menu initialized');
    
    const mobileMenuButton = document.querySelector('.top-nav-mobile-button');
    const mobileMenuBoxButton = document.querySelector('.top-nav-mobile-box-button');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const closeBtn = document.querySelector('.gift-menu .close-btn');
    const mobileMenuLinks = document.querySelectorAll('.gift-menu .navigation a');

    console.log('Mobile Menu Elements:', {
        mobileMenuButton: !!mobileMenuButton,
        mobileMenuBoxButton: !!mobileMenuBoxButton,
        menuBackdrop: !!menuBackdrop,
        closeBtn: !!closeBtn,
        mobileMenuLinksCount: mobileMenuLinks.length
    });
});

/*=============================================
	=    Chatbot Tooltip Functionality            =
=============================================*/

// Chatbot tooltip timeout ID
let tooltipTimeoutId = null;

// Function to initialize tooltip
function initTooltip() {
    const tooltip = document.getElementById('chatbotTooltip');
    if (tooltip && !tooltip.classList.contains('show')) {
        // Show tooltip
        tooltip.classList.add('show');
        
        // Hide tooltip after 15 seconds
        tooltipTimeoutId = setTimeout(() => {
            tooltip.classList.remove('show');
            tooltipTimeoutId = null;
        }, 15000);
    }
}

// Tooltip is initialized together with scroll animations (after loader disappears)

/*=============================================
	=    Scroll Animation Effects                =
=============================================*/

// Initialize Intersection Observer for scroll animations
function initScrollAnimations() {
    // Animation types mapping
    const animationTypes = {
        'fade-left': 'scroll-animate-fade-left',
        'fade-right': 'scroll-animate-fade-right',
        'fade-up': 'scroll-animate-fade-up',
        'fade-down': 'scroll-animate-fade-down',
        'scale': 'scroll-animate-scale',
        'zoom-in': 'scroll-animate-zoom-in',
        'slide-right': 'scroll-animate-slide-right',
        'slide-left': 'scroll-animate-slide-left',
        'slide-down': 'scroll-animate-slide-down',
        'slide-up': 'scroll-animate-slide-up',
        'swing': 'scroll-animate-swing',
        'tada': 'scroll-animate-tada',
        'back-in-right': 'scroll-animate-back-in-right',
        'back-in-left': 'scroll-animate-back-in-left',
        'back-in-up': 'scroll-animate-back-in-up',
        'back-in-down': 'scroll-animate-back-in-down',
        'flip': 'scroll-animate-flip',
        'flip-in-x': 'scroll-animate-flip-in-x',
        'flip-in-y': 'scroll-animate-flip-in-y'
    };

    // Function to check if element is in viewport
    function isInViewport(element, offset = 50) {
        const rect = element.getBoundingClientRect();
        return rect.top <= (window.innerHeight - offset) && rect.bottom >= 0;
    }

    // Function to trigger animation on element
    function triggerAnimation(element) {
        if (element.classList.contains('scroll-animate')) {
            return; // Already animated
        }

        // Get animation type from data attribute
        const animationType = element.dataset.scrollAnimate || 'fade-up';
        const animationClass = animationTypes[animationType] || 'scroll-animate-fade-up';
        
        // Get parent container to check for staggered items
        const parent = element.closest('[data-scroll-animate-group]');
        
        if (parent) {
            // If element is in a group, calculate stagger delay
            const siblings = Array.from(parent.querySelectorAll('[data-scroll-animate]'));
            const indexInParent = siblings.indexOf(element);
            const staggerDelay = indexInParent * 0.15; // 150ms delay between items
            
            element.style.setProperty('--stagger-delay', `${staggerDelay}s`);
            element.classList.add('scroll-animate-stagger');
        } else {
            // Reset stagger delay if not in a group
            element.style.setProperty('--stagger-delay', '0s');
        }
        
        // Add animation classes
        element.classList.add('scroll-animate', animationClass);
    }

    // Check all elements on initial load
    function checkAllElements() {
        const animatedElements = document.querySelectorAll('[data-scroll-animate]');
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                triggerAnimation(element);
            }
        });
    }

    // Check elements on scroll
    let scrollCheckTimeout;
    function onScroll() {
        // Debounce scroll event
        clearTimeout(scrollCheckTimeout);
        scrollCheckTimeout = setTimeout(() => {
            checkAllElements();
        }, 100);
    }

    // Initial check
    checkAllElements();

    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });

    return {
        checkAllElements: checkAllElements,
        triggerAnimation: triggerAnimation
    };
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for loader to disappear (2.0s: 1.5s delay + 0.5s animation duration)
        // Adding extra 100ms buffer to ensure loader is completely gone
        setTimeout(() => {
            initScrollAnimations();
            initTooltip();
        }, 2100);
    });
} else {
    // Wait for loader to disappear if page is already loaded
    setTimeout(() => {
        initScrollAnimations();
        initTooltip();
    }, 2100);
}

// Reinitialize animations for dynamically added elements
function observeNewElements(container = document) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationTypes = {
        'fade-left': 'scroll-animate-fade-left',
        'fade-right': 'scroll-animate-fade-right',
        'fade-up': 'scroll-animate-fade-up',
        'fade-down': 'scroll-animate-fade-down',
        'scale': 'scroll-animate-scale',
        'zoom-in': 'scroll-animate-zoom-in',
        'slide-right': 'scroll-animate-slide-right',
        'slide-left': 'scroll-animate-slide-left',
        'slide-down': 'scroll-animate-slide-down',
        'slide-up': 'scroll-animate-slide-up',
        'swing': 'scroll-animate-swing',
        'tada': 'scroll-animate-tada',
        'back-in-right': 'scroll-animate-back-in-right',
        'back-in-left': 'scroll-animate-back-in-left',
        'back-in-up': 'scroll-animate-back-in-up',
        'back-in-down': 'scroll-animate-back-in-down',
        'flip': 'scroll-animate-flip',
        'flip-in-x': 'scroll-animate-flip-in-x',
        'flip-in-y': 'scroll-animate-flip-in-y'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.scrollAnimate || 'fade-up';
                const animationClass = animationTypes[animationType] || 'scroll-animate-fade-up';
                
                const parent = element.closest('[data-scroll-animate-group]');
                if (parent) {
                    const siblings = Array.from(parent.querySelectorAll('[data-scroll-animate]'));
                    const indexInParent = siblings.indexOf(element);
                    const staggerDelay = indexInParent * 0.15;
                    element.style.setProperty('--stagger-delay', `${staggerDelay}s`);
                    element.classList.add('scroll-animate-stagger');
                }
                
                element.classList.add('scroll-animate', animationClass);
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    const newElements = container.querySelectorAll('[data-scroll-animate]');
    newElements.forEach(element => {
        observer.observe(element);
    });
}

// Hide tooltip when chatbot button is clicked
chatbotBtn.addEventListener('click', () => {
    const tooltip = document.getElementById('chatbotTooltip');
    if (tooltip) {
        tooltip.classList.remove('show');
        // Clear the timeout if it exists
        if (tooltipTimeoutId) {
            clearTimeout(tooltipTimeoutId);
            tooltipTimeoutId = null;
        }
    }
});




/*=============================================
	=    Odometer Counter Functionality           =
=============================================*/

// Odometer counter animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const odometerElements = document.querySelectorAll('.odometer');
    
    if (odometerElements.length === 0) return;

    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Function to update odometer values
    function updateOdometers() {
        odometerElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                const countValue = element.getAttribute('data-count');
                // Animate to the target count
                let currentValue = 0;
                const targetValue = parseFloat(countValue);
                const increment = targetValue / 50; // Divide animation into 50 steps
                const animationDuration = 2000; // 2 seconds
                const stepDuration = animationDuration / 50;

                const animationInterval = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= targetValue) {
                        element.textContent = countValue;
                        element.classList.add('animated');
                        clearInterval(animationInterval);
                    } else {
                        element.textContent = currentValue.toFixed(1).replace(/\.0$/, '');
                    }
                }, stepDuration);
            }
        });
    }

    // Update odometeters on scroll and load
    window.addEventListener('scroll', updateOdometers);
    window.addEventListener('load', updateOdometers);
    updateOdometers(); // Call once on page load
});

// Delay banner animations until loader disappears
// Loader animation: 0.5s duration + 1.5s delay = 2.0s total
setTimeout(() => {
    const pausedAnimations = document.querySelectorAll('.banner-section .pause-animation');
    pausedAnimations.forEach(element => {
        element.classList.remove('pause-animation');
    });
}, 2000);


// Add wow fadeInUp animations with staggered delays to all page elements
window.addEventListener('load', () => {
    // Animate all student cards
    const studentCards = document.querySelectorAll('.student-project-card');
    studentCards.forEach((card, index) => {
        if (!card.classList.contains('wow')) {
            card.classList.add('wow', 'fadeInUp');
            // Stagger delays for cards - 0.1s, 0.2s, 0.3s, 0.4s, 0.5s, then repeat
            const delay = ((index % 5) * 0.1 + 0.1).toFixed(1);
            card.setAttribute('data-wow-delay', delay + 's');
        }
    });
    
    // Animate course cards that aren't already animated
    const courseCards = document.querySelectorAll('.courses-card');
    courseCards.forEach((card, index) => {
        if (!card.classList.contains('wow')) {
            card.classList.add('wow', 'fadeInUp');
            const delay = 0.1 + (index * 0.1);
            card.setAttribute('data-wow-delay', delay.toFixed(1) + 's');
        }
    });
    
    // Animate choose-us items
    const chooseUsItems = document.querySelectorAll('.choose-us-wrapper .icon-items');
    chooseUsItems.forEach((item, index) => {
        if (!item.classList.contains('wow')) {
            item.classList.add('wow', 'fadeInUp');
            item.setAttribute('data-wow-delay', (0.3 * index + 0.2).toFixed(1) + 's');
        }
    });
    
    // Reinitialize WOW.js to trigger animations for newly added classes
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
});

/*=============================================
	=    Repeating Tada Animation Every 5 Seconds =
=============================================*/

// Function to repeat tada animation every 5 seconds
function initRepeatTadaAnimation() {
    // Find all gift images with tada animation
    const giftImages = document.querySelectorAll('img[data-scroll-animate="tada"]');
    
    giftImages.forEach(element => {
        // Apply initial animation
        element.classList.add('scroll-animate', 'scroll-animate-tada');
        
        // Repeat animation every 5 seconds
        setInterval(() => {
            // Remove animation classes
            element.classList.remove('scroll-animate-tada');
            
            // Trigger reflow to restart animation
            void element.offsetWidth;
            
            // Re-apply animation classes
            element.classList.add('scroll-animate-tada');
        }, 5000);
    });
}

// Initialize repeating tada animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initRepeatTadaAnimation, 4400);
    });
} else {
    setTimeout(initRepeatTadaAnimation, 4400);
}

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
const scrollTarget = document.getElementById('section-2');
const boxNav = document.querySelector('.nav-box');
const topNav = document.querySelector('.top-nav');
let lastNavState = null;

function updateNavVisibility() {
    if (!scrollTarget || !boxNav || !topNav || window.innerWidth < 992) {
        boxNav?.classList.remove('hidden');
        topNav?.classList.add('hidden');
        console.log(1)
        return;
    }
    // console.log(`currentScroll: ${window.pageYOffset}, targetOffset: ${scrollTarget.offsetTop}, windowWidth: ${window.innerWidth}`)

    const targetOffset = scrollTarget.offsetTop;
    const currentScroll = window.pageYOffset;
    const shouldShowTopNav = currentScroll >= targetOffset - 120;
    // console.log('Scroll:', currentScroll, 'Target:', targetOffset, 'Show Top Nav:', shouldShowTopNav)
    // console.log(document.documentElement.scrollTop);
    
    if (shouldShowTopNav && lastNavState !== 'top') {
        boxNav.classList.add('hidden');
        // topNav.classList.add('hidden');
        void topNav.offsetWidth; // Trigger reflow
        topNav.classList.remove('hidden');
        lastNavState = 'top';
        console.log(2)
    } else if (!shouldShowTopNav && lastNavState !== 'box') {
        boxNav.classList.remove('hidden');
        topNav.classList.add('hidden');
        lastNavState = 'box';
        console.log(3)
    }
}

function handleScroll() {
    console.log("scrolling...");
}

window.addEventListener('scroll', updateNavVisibility);
window.addEventListener('resize', updateNavVisibility);
setTimeout(updateNavVisibility, 100);



pageNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        pageNavLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Testimonial swiper initialization
if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-slider-2', {
        loop: true,
        speed: 800,
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonial-slider-2 .swiper-pagination',
            type: 'progressbar',
        },
        navigation: {
            nextEl: '.testimonial-slider-2 .swiper-button-next',
            prevEl: '.testimonial-slider-2 .swiper-button-prev',
        },
    });
}

// Section 2 - Courses (Learning Path)
const courseButtons = document.querySelectorAll('#section-2 .path-btn');
const courseCards = document.querySelectorAll('#section-2 .courses-card');

courseButtons.forEach(button => {
    button.addEventListener('click', () => {
        const course = button.dataset.course;

        courseButtons.forEach(item => item.classList.toggle('active', item === button));
        courseCards.forEach(card => {
            card.classList.toggle('active', card.dataset.course === course);
        });
    });
});

// Section 3 - Student Projects with Tabs
const projectButtons = document.querySelectorAll('#section-3 .path-btn');
const projectSliderWrappers = document.querySelectorAll('#section-3 .projects-slider-wrapper');
const projectSwipers = new Map();

function initializeProjectSwipers() {
    if (typeof Swiper === 'undefined') {
        return;
    }

    projectSliderWrappers.forEach((wrapper) => {
        const swiper = new Swiper(wrapper, {
            loop: true,
            speed: 800,
            slidesPerView: 1.1,
            spaceBetween: 20,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: wrapper.querySelector('.swiper-pagination'),
                type: 'progressbar',
            },
            navigation: {
                nextEl: wrapper.querySelector('.swiper-button-next'),
                prevEl: wrapper.querySelector('.swiper-button-prev'),
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 18,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 24,
                },
            },
        });

        if (!wrapper.classList.contains('active')) {
            swiper.autoplay.stop();
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
    const activeProjectButton = document.querySelector('#section-3 .path-btn.active');
    if (activeProjectButton) {
        setActiveProjectTab(activeProjectButton.dataset.project);
    }
});

// Video play button functionality for all video buttons
const videoPlayBtns = document.querySelectorAll('#section-3 .video-play-btn');
videoPlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = btn.dataset.video;
        
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
        
        // Close modal on close button click
        modal.querySelector('.video-modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
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


// see https://nextparticle.nextco.de for more informations

var nextParticle = new NextParticle(document.all.logo);
nextParticle.particleGap = 1;
nextParticle.noise = 0;
nextParticle.mouseForce = 30;
nextParticle.size = Math.max(window.innerWidth, window.innerHeight);
nextParticle.colorize = false;
nextParticle.tint = '#FF00FF';
nextParticle.minWidth = nextParticle.size;
nextParticle.minHeight = nextParticle.size;
nextParticle.maxWidth = nextParticle.size;
nextParticle.maxHeight = nextParticle.size;

var redraw = function() {
  nextParticle.initPosition = "none";
  nextParticle.initDirection = "none";
  nextParticle.fadePostion = "none";
  nextParticle.fadeDirection = "none";
  nextParticle.minWidth = nextParticle.size;
  nextParticle.minHeight = nextParticle.size;
  nextParticle.maxWidth = nextParticle.size;
  nextParticle.maxHeight = nextParticle.size;
  nextParticle.color = nextParticle.colorize ? nextParticle.tint : '';
  nextParticle.start();
};


window.addEventListener('resize', function() {
  nextParticle.width = window.innerWidth;
  nextParticle.height = window.innerHeight;
  redraw();
});

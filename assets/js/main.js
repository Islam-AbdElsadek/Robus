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
chatbotBtn.addEventListener('click', () => {
    alert('Chat Bot feature coming soon!');
    // You can replace this with your chat bot implementation
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
    console.log('Scroll:', currentScroll, 'Target:', targetOffset, 'Show Top Nav:', shouldShowTopNav)
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

const pathButtons = document.querySelectorAll('.path-btn');
const learningPathCards = document.querySelectorAll('.learning-path-card');

pathButtons.forEach(button => {
    button.addEventListener('click', () => {
        const path = button.dataset.path;

        pathButtons.forEach(item => item.classList.toggle('active', item === button));
        learningPathCards.forEach(card => {
            card.classList.toggle('active', card.dataset.path === path);
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
animated_swiper(sliderActive2, sliderInit2);


//>> Wow Animation Start <<//
new WOW().init();

//>> Video Popup Start <<//
$(".img-popup").magnificPopup({
    type: "image",
    gallery: {
        enabled: true,
    },
});

$('.video-popup').magnificPopup({
    type: 'iframe',
    callbacks: {}
});


//>> Wow Animation Start <<//
new WOW().init();

//>> Nice Select Start <<//
$('select').niceSelect();

$('.odometer').appear(function(e) {
    var odo = $(".odometer");
    odo.each(function() {
        var countNumber = $(this).attr("data-count");
        $(this).html(countNumber);
    });
});


// Tamino Martinius - All rights reserved

// Copyright © 2013 Tamino Martinius (http://zaku.eu)
// Copyright © 2013 Particleslider.com (http://particleslider.com

// Terms of usage: http://particleslider.com/legal/license

var init = function(){
  var isMobile = navigator.userAgent &&
    navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
  var isSmall = window.innerWidth < 1000;
  
  var ps = new ParticleSlider({
    ptlGap: 0,
    ptlSize: 2,
    width: 1e9,
    height: 1e9
  });
    
  var gui = new dat.GUI();
  gui.add(ps, 'ptlGap').min(0).max(5).step(1).onChange(function(){
    ps.init(true);
  });
  gui.add(ps, 'ptlSize').min(1).max(5).step(1).onChange(function(){
    ps.init(true);
  });
  gui.add(ps, 'restless');
  gui.addColor(ps, 'color').onChange(function(value){
    ps.monochrome = true;
    ps.setColor(value);
	  ps.init(true);
  });
  
  
  (window.addEventListener
   ? window.addEventListener('click', function(){ps.init(true)}, false)
   : window.onclick = function(){ps.init(true)});
}

var initParticleSlider = function(){
  var psScript = document.createElement('script');
  (psScript.addEventListener
    ? psScript.addEventListener('load', init, false)
    : psScript.onload = init);
  psScript.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/23500/ps-0.9.js';
	psScript.setAttribute('type', 'text/javascript');
  document.body.appendChild(psScript);
}
    
(window.addEventListener
  ? window.addEventListener('load', initParticleSlider, false)
  : window.onload = initParticleSlider);



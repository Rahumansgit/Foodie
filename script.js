var swiper = new Swiper(".home", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var profileBtn = document.querySelector('.profile-btn')
var profileOption = document.querySelector('.profile-details')
var overlay = document.querySelector('.overlay')

profileBtn.addEventListener('click' , function(){
  profileOption.style.display = 'block'
  profileBtn.style.transform = 'rotate(-180deg)'
  overlay.style.display = 'block'
})


overlay.addEventListener('click' , function(){
  profileOption.style.display = 'none'
  profileBtn.style.transform = 'rotate(0deg)'
  overlay.style.display = 'none'
})

// Initialize AOS animations
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
  });
}

// Theme toggle
const themeToggleButton = document.querySelector('.theme-toggle');
const themeToggleIcon = themeToggleButton ? themeToggleButton.querySelector('ion-icon') : null;

function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  if (themeToggleIcon) {
    themeToggleIcon.setAttribute('name', isDark ? 'sunny-outline' : 'moon-outline');
  }
}

// Initialize theme from localStorage or system preference
(function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeToApply = savedTheme ? savedTheme : (preferredDark ? 'dark' : 'light');
  applyTheme(themeToApply);
  // Preload potential dark hero image and set body flag for CSS
  const darkHero = new Image();
  darkHero.onload = function() {
    document.body.classList.add('has-dark-hero');
    document.body.classList.remove('no-dark-hero');
  };
  darkHero.onerror = function() {
    document.body.classList.add('no-dark-hero');
    document.body.classList.remove('has-dark-hero');
  };
  darkHero.src = './img/bg-dark.jpg';
})();

// Toggle on click and persist
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', function() {
    const isDark = document.body.classList.contains('dark-theme');
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('theme', nextTheme); } catch (e) {}
  });
}

// Mobile Navigation Toggle
const menuBtn = document.querySelector('.menu-btn');
const navList = document.querySelector('.nav-list');

if (menuBtn && navList) {
  menuBtn.addEventListener('click', function() {
    navList.classList.toggle('active');
    menuBtn.classList.toggle('active');
  });
}

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-list ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function() {
    navList.classList.remove('active');
    menuBtn.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (!menuBtn.contains(event.target) && !navList.contains(event.target)) {
    navList.classList.remove('active');
    menuBtn.classList.remove('active');
  }
});


/* ==========================================================
   STACKLY FURNITURE - SCRIPT
   1. Helpers
   2. Hero Slider
   3. Best Sellers
   4. Sale Countdown
   5. Testimonials
   6. Newsletter Form
   ========================================================== */


/* ---------- 1. HELPERS ---------- */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Adds a leading zero: 5 -> "05"
const pad = (number) => String(number).padStart(2, '0');


/* ---------- 2. HERO SLIDER ---------- */
const slides = $$('.slide');
const dots   = $$('.dots span');
const AUTO_PLAY_DELAY = 5000;

let currentSlide = 0;
let autoPlayTimer;

function showSlide(index) {
  // Wrap around at both ends
  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
  dots.forEach((dot, i) => dot.classList.toggle('on', i === currentSlide));
}

function startAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(() => showSlide(currentSlide + 1), AUTO_PLAY_DELAY);
}

function goToSlide(index) {
  showSlide(index);
  startAutoPlay(); // restart the timer after manual navigation
}

$('#hPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
$('#hNext').addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

startAutoPlay();


/* ---------- 3. BEST SELLERS ---------- */
const products = [
  { name: 'Fabric Accent Chair',    price: 20, icon: 'fa-chair' },
  { name: 'Luxury King Bed Frame',  price: 25, icon: 'fa-bed' },
  { name: 'Glass Top Center Table', price: 15, icon: 'fa-couch' },
  { name: 'Outdoor Patio Set',      price: 25, icon: 'fa-table' },
  { name: 'Space-Saving Wall Desk', price: 15, icon: 'fa-lightbulb' }
];

const track = $('#track');
const SCROLL_STEP = 300;

function renderProducts() {
  const stars = '<i class="fa-regular fa-star"></i> '.repeat(5);

  // Uses img/product-1.png ... product-5.png; falls back to the icon if missing
  track.innerHTML = products
    .map(({ name, price, icon }, i) => `
      <div class="prod">
        <div class="img">
          <img src="img/product-${i + 1}.png" alt="${name}"
               onload="this.nextElementSibling.remove()" onerror="this.remove()">
          <i class="fa-solid ${icon}"></i>
        </div>
        <p>${name}</p>
        <div class="st">${stars}</div>
        <p>$${price.toFixed(2)}</p>
      </div>`)
    .join('');
}

$('#pPrev').addEventListener('click', () => track.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' }));
$('#pNext').addEventListener('click', () => track.scrollBy({ left:  SCROLL_STEP, behavior: 'smooth' }));

renderProducts();


/* ---------- 4. SALE COUNTDOWN ---------- */
// Sale ends in 54 days, 5 hours, 29 minutes, 37 seconds from page load
const MS = { second: 1000, minute: 60000, hour: 3600000, day: 86400000 };

const saleEnd = Date.now()
  + 54 * MS.day
  + 5  * MS.hour
  + 29 * MS.minute
  + 37 * MS.second;

function updateCountdown() {
  const left = Math.max(0, saleEnd - Date.now());

  $('#d').textContent = Math.floor(left / MS.day);
  $('#h').textContent = pad(Math.floor((left % MS.day)    / MS.hour));
  $('#m').textContent = pad(Math.floor((left % MS.hour)   / MS.minute));
  $('#s').textContent = pad(Math.floor((left % MS.minute) / MS.second));
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* ---------- 5. TESTIMONIALS ---------- */
const testimonials = [
  { name: 'Meera',   text: '“From browsing to delivery, everything felt effortless. The furniture looks incredibly elegant in our new home.”' },
  { name: 'Karthik', text: '“Our living room finally feels complete. The quality and finish are far beyond what I expected.”' },
  { name: 'Archana', text: '“Warm bedroom that finally feels like my own space. The attention to detail is incredible.”' },
  { name: 'Priya',   text: '“Beautiful pieces, fast delivery and a team that truly cares. Highly recommended.”' }
];

let currentTestimonial = 0;

function showTestimonial(index) {
  currentTestimonial = (index + testimonials.length) % testimonials.length;
  const { name, text } = testimonials[currentTestimonial];

  $('#quote').textContent = text;
  $('#who').textContent   = name;
  $('#idx').textContent   = pad(currentTestimonial + 1);
}

$('#tPrev').addEventListener('click', () => showTestimonial(currentTestimonial - 1));
$('#tNext').addEventListener('click', () => showTestimonial(currentTestimonial + 1));

showTestimonial(0);


/* ---------- 6. NEWSLETTER FORM ---------- */
$('#nl').addEventListener('submit', (event) => {
  event.preventDefault();
  $('#nlMsg').textContent = 'Thank you for subscribing!';
});

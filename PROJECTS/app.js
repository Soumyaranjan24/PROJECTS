import pgListings from './apna_pg_data.js';

const loader = document.getElementById('loader');
const listingsContainer = document.getElementById('listings-container');
const locationInput = document.getElementById('location-input');
const genderFilter = document.getElementById('gender-filter');
const priceFilter = document.getElementById('price-filter');
const amenitiesFilter = document.getElementById('amenities-filter');
const searchButton = document.getElementById('search-button');
const toggleButton = document.getElementById('toggle-theme');

let darkMode = false;

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function createCard(pg) {
  const card = document.createElement('div');
  card.className = 'listing-card';
  card.innerHTML = `
    <div class="listing-image" style="background-image: url('${pg.image}')">
      <div class="gender-badge">${pg.gender}</div>
    </div>
    <div class="listing-details">
      <h3 class="listing-title">${pg.name}</h3>
      <p class="listing-price">₹${pg.price}/month</p>
      <p class="listing-location">${pg.location}</p>
      <div class="listing-amenities">
        ${pg.amenities.map(amenity => `<span>${amenity}</span>`).join(' ')}
      </div>
    </div>
  `;
  listingsContainer.appendChild(card);
}

function renderListings(listings) {
  listingsContainer.innerHTML = '';
  listings.forEach(pg => createCard(pg));
}

function filterListings() {
  const locationValue = locationInput.value.toLowerCase();
  const genderValue = genderFilter.value;
  const priceValue = priceFilter.value;
  const amenitiesValue = amenitiesFilter.value;

  let filtered = pgListings;

  if (locationValue) {
    filtered = filtered.filter(pg =>
      pg.location.toLowerCase().includes(locationValue) ||
      pg.name.toLowerCase().includes(locationValue)
    );
  }

  if (genderValue) {
    filtered = filtered.filter(pg => pg.gender === genderValue);
  }

  if (priceValue) {
    if (priceValue === '0-5000') filtered = filtered.filter(pg => pg.price <= 5000);
    if (priceValue === '5000-10000') filtered = filtered.filter(pg => pg.price > 5000 && pg.price <= 10000);
    if (priceValue === '10000+') filtered = filtered.filter(pg => pg.price > 10000);
  }

  if (amenitiesValue) {
    filtered = filtered.filter(pg => pg.amenities.includes(amenitiesValue));
  }

  renderListings(filtered);
}

toggleButton.addEventListener('click', () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-theme', darkMode);
  document.body.classList.toggle('light-theme', !darkMode);
  toggleButton.textContent = darkMode ? '🌞' : '🌙';
});

searchButton.addEventListener('click', filterListings);
genderFilter.addEventListener('change', filterListings);
priceFilter.addEventListener('change', filterListings);
amenitiesFilter.addEventListener('change', filterListings);
locationInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') filterListings();
});

window.addEventListener('DOMContentLoaded', () => {
  showLoader();
  setTimeout(() => {
    hideLoader();
    renderListings(pgListings);
  }, 1000);
});

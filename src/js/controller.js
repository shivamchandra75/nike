import * as model from "./model.js";
import { DOMAIN_NAME } from "./config.js";

// we can use resize observer for changing img src when size of img tag changes

const navLinks = document.querySelector(".nav-links-container");
const navBar = document.querySelector("#navbar");
const navBlurOverlay = document.querySelector(".nav-blur-overlay");
const menu = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".close-menu-icon-container");
const searchMenu = document.querySelector(".search-menu");
const searchIcon = document.querySelector(".search-icon");
const closebtn = document.querySelector(".search-close-btn");
const searchInput = document.querySelector(".search-input");
const searchInputForm = document.querySelector(".search-input-form");
const hero = document.querySelector("#hero");
const resultsGrid = document.querySelector(".results-grid");
const product = document.querySelector(".product");

// FUNCTIONS
const showMenuMobile = function () {
  navLinks.style.transform = "translateX(20vw)";
  navBlurOverlay.style.transform = "translateX(0)";
  navBlurOverlay.style.backdropFilter = "blur(5px) opacity(1)";
};

const closeMenuMobile = function () {
  navLinks.style.transform = "translateX(100vw)";
  navBlurOverlay.style.transform = "translateX(100vw)";
  navBlurOverlay.style.backdropFilter = "blur(5px) opacity(0)";
};

const showElement = function (element) {
  element.classList.add("show-element");
  element.classList.remove("hide-Element");
};

const hideElement = function (element) {
  element.classList.add("hide-element");
  element.classList.remove("show-element");
};

// >>>>>>>>>>>>> HELPER FUNC.
const getQuery = function () {
  const query = searchInput.value;
  searchInput.value = "";
  return query;
};

// <<<<<<<<<<<<< HELPER FUNC.

const renderSearchProduct = async function () {
  try {
    const url = new URL(window.location.href);
    const query = url.searchParams.get("query");
    if (!query) return;

    //loading the results
    await model.loadSearchResults(query);

    // use array of model.search.results to map and render cards.
    const cardsArray = model.state.search.results.map((product) => {
      return `
            <div class="card">
              <div class="card__img">
                <img src="${product.thumbnail}" alt="shoes Image" />
              </div>

              <div class="card__details">
                <h3 class="card__name">${product.name}</h3>
                <p class="card__desc">${product.description}</p>
                <h3 class="card__price">MRP: $${product.price}</h3>
              </div>

              <a class="card__overlay" href="../product/product.html?id=${product.id}&category=all&productPageLoaded=true"></a>
            </div>
            `;
    });

    const markup = cardsArray.join("");

    //empty the previous results content
    resultsGrid.innerHTML = "";

    // place new results content
    resultsGrid.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(err);
  }
};

const renderProductDetails = async function () {
  try {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    //loading the product details
    await model.loadProductDetails(id, category);

    const markup = `
      <div class="product__details">
        <p class="product__name">${model.state.product.name}</p>
        <p class="product__desc">${model.state.product.description}</p>
        <p class="product__price">MRP: $${model.state.product.price}</p>
        <div class="tax-details">incl. of all taxes</div>
        <div class="tax-details">(Also includes all applicable duties)</div>
      </div>
      <div class="product__img">
        <img
          src="${model.state.product.image}"
          alt="product image"
        />
      </div>
      <div class="product__size">
        <p>Select Size</p>
        <div class="size-btn-grid">
          <button class="btn-white">UK 5</button>
          <button class="btn-white">UK 5.5</button>
          <button class="btn-white">UK 6</button>
          <button class="btn-white">UK 6.5</button>
          <button class="btn-white">UK 7</button>
          <button class="btn-white">UK 7.5</button>
          <button class="btn-white">UK 8</button>
          <button class="btn-white">UK 8.5</button>
          <button class="btn-white">UK 9</button>
          <button class="btn-white">UK 9.5</button>
          <button class="btn-white">UK 11</button>
          <button class="btn-white">UK 11.5</button>
        </div>
      </div>
      <div class="product__btns">
        <button class="product__btn-black btn-black">Add to Bag</button>
        <button class="product__btn-white">
          Favourite

          <div class="heart-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M18 32.43a1 1 0 0 1-.61-.21C11.83 27.9 8 24.18 5.32 20.51C1.9 15.82 1.12 11.49 3 7.64c1.34-2.75 5.19-5 9.69-3.69A9.87 9.87 0 0 1 18 7.72a9.87 9.87 0 0 1 5.31-3.77c4.49-1.29 8.35.94 9.69 3.69c1.88 3.85 1.1 8.18-2.32 12.87c-2.68 3.67-6.51 7.39-12.07 11.71a1 1 0 0 1-.61.21ZM10.13 5.58A5.9 5.9 0 0 0 4.8 8.51c-1.55 3.18-.85 6.72 2.14 10.81A57.13 57.13 0 0 0 18 30.16a57.13 57.13 0 0 0 11.06-10.83c3-4.1 3.69-7.64 2.14-10.81c-1-2-4-3.59-7.34-2.65a8 8 0 0 0-4.94 4.2a1 1 0 0 1-1.85 0a7.93 7.93 0 0 0-4.94-4.2a7.31 7.31 0 0 0-2-.29Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>
          </div>
        </button>
      </div>
    
`;
    product.innerHTML = "";

    //rendering the product details
    product.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(err);
  }
};

const heroObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        navBar.style.backgroundColor = "#ffffffaa";
        navBar.style.backdropFilter = "blur(25px)";
        navBar.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const navReachesTopObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.boundingClientRect.top === 0) {
        navBar.style.backgroundColor = "transparent";
        navBar.style.backdropFilter = "none";
        navBar.style.boxShadow = "none";
      }
    });
  },
  {
    threshold: 1,
  }
);

if (hero) heroObserver.observe(hero);

if (hero) navReachesTopObserver.observe(hero);

//>>>>>>>>>>>>>>> EVENT-LISTENERS >>>>>>>>>>>>>>>>>>>>

window.addEventListener("load", () => {
  const url = new URL(window.location.href);
  const resultsPageLoaded = url.searchParams.get("resultsPageLoaded");
  const productPageLoaded = url.searchParams.get("productPageLoaded");

  if (resultsPageLoaded) renderSearchProduct();
  if (productPageLoaded) renderProductDetails();
});

menu.addEventListener("touchstart", showMenuMobile);
closeMenuBtn.addEventListener("touchstart", closeMenuMobile);

searchIcon.addEventListener("touchstart", () => showElement(searchMenu));
searchIcon.addEventListener("click", () => showElement(searchMenu));

closebtn.addEventListener("touchstart", () => hideElement(searchMenu));
closebtn.addEventListener("click", () => hideElement(searchMenu));

searchInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //can animate search bar smoothly

  window.location.href = `${DOMAIN_NAME}/src/result/result.html?query=${getQuery()}&resultsPageLoaded=true`;
});

//<<<<<<<<<<<<<<< EVENT-LISTENERS <<<<<<<<<<<<<<<<<<<<

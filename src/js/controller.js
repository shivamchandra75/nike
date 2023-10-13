import * as model from "./model.js";

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
const img = document.querySelector(".img");

const resultsGrid = document.querySelector(".results-grid");

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

/*
 create a function that takes input and searches for that product in database and render cards of that product.
 fetch input & store it in a state
 search for that product in the database using query.
 render cards and append them into the results-grid.

 *
 * */

const getQuery = function () {
  const query = searchInput.value;
  searchInput.value = "";
  return query;
};

export const renderSearchProduct = async function (query) {
  try {
    console.log("aa", query);
    if (!query) return;

    window.location.href = "http://localhost:5173/src/html/results.html";
    console.log("we switched to results page");
    //loading the results
    await model.loadSearchResults(query);

    // use array of results to map and render cards.
    // model.state.search.results
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
            </div>
            `;
    });

    const markup = cardsArray.join("");
    resultsGrid.innerHTML = "";

    resultsGrid.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error(err);
  }
};

// const renderProductDetails = function () {};

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

menu.addEventListener("touchstart", showMenuMobile);
closeMenuBtn.addEventListener("touchstart", closeMenuMobile);

searchIcon.addEventListener("touchstart", () => showElement(searchMenu));
searchIcon.addEventListener("click", () => showElement(searchMenu));

closebtn.addEventListener("touchstart", () => hideElement(searchMenu));
closebtn.addEventListener("click", () => hideElement(searchMenu));

searchInputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  renderSearchProduct(getQuery());
});
//<<<<<<<<<<<<<<< EVENT-LISTENERS <<<<<<<<<<<<<<<<<<<<
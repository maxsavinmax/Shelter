"use strict";

function renderPage() {
    fetch("pets.json") //path to the file with json data
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createSlider(data);
            return data;
        })
        .then((data) => {
            createPopUp(data);
        });
}

function createSlider(data) {
    const cardContainer = document.querySelectorAll(".our-friends__cards");

    cardContainer.forEach((el) => {
        data.forEach((item) => el.appendChild(createCard(item)));
    });

    return cardContainer;
}

function createCard(item) {
    const card = document.createElement("div");
    const image = document.createElement("img");
    const cardTitle = document.createElement("h4");
    const buttonsContainer = document.createElement("div");
    const buttonsShow = document.createElement("button");

    card.classList.add("card");
    cardTitle.classList.add("card__title");
    image.classList.add("card-img");
    buttonsContainer.classList.add("our-friends__button");
    buttonsShow.classList.add("cards__button", "button");

    card.setAttribute("id", item.id);

    image.src = item.img;
    cardTitle.innerText = item.name;

    buttonsShow.innerText = "Learn more";
    buttonsContainer.appendChild(buttonsShow);
    card.appendChild(image);
    card.appendChild(cardTitle);
    card.appendChild(buttonsContainer);

    return card;
}

function shuffle() {
    const parent = document.querySelectorAll(".our-friends__cards");

    parent.forEach((el) => {
        const frag = document.createDocumentFragment();
        while (el.children.length) {
            frag.appendChild(
                el.children[Math.floor(Math.random() * el.children.length)]
            );
        }
        el.appendChild(frag);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    shuffle();
});

function startShufle() {
    const lefArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    try {
        lefArrow.addEventListener("click", shuffle);
        rightArrow.addEventListener("click", shuffle);
    } catch (error) {}
}
startShufle();

// Burger

const blackOut = document.querySelector(".blackout");
const menuBurger = document.querySelector(".header__navigation");
const burger = document.querySelector(".header__logo-line");
const navLink = document.querySelectorAll(".navigation__link");
const html = document.querySelector("html");

function createBurger() {
    burger.addEventListener("click", () => {
        menuBurger.classList.toggle("header__navigation-active");
        blackOut.classList.toggle("blackout-active");
        burger.classList.toggle("header__logo-line-active");
        html.classList.toggle("html-active");

        const burgerNavHeader = document.querySelector(".burger-nav-header");

        if (!menuBurger.contains(burgerNavHeader)) {
            if (menuBurger.closest(".pets-wrapper")) {
                menuBurger.insertAdjacentHTML(
                    "afterbegin",
                    `
                        <div class = "burger-nav-header">
                             <a href="/index.html" class="logo">
                                    <div class="header-logo header-logo-pets">
                                        <h1 class = "logo-name" >Cozy House</h1>
                                        <p class="logo-title logo-title-pets">Shelter for pets in Boston</p>
                                    </div>
                                </a>
    
                        </div>
                  `
                );
            } else {
                menuBurger.insertAdjacentHTML(
                    "afterbegin",
                    `
                    <div class = "burger-nav-header">
                         <a href="/index.html" class="logo">
                                <div class="header-logo">
                                    <h1 class = "logo-name" >Cozy House</h1>
                                    <p class="logo-title">Shelter for pets in Boston</p>
                                </div>
                            </a>

                    </div>
              `
                );
            }
        }
    });

    closeBurger();
}
createBurger();

navLink.forEach((el) => {
    el.addEventListener("click", (e) => {
        menuBurger.classList.remove("header__navigation-active");
        blackOut.classList.remove("blackout-active");
        burger.classList.remove("header__logo-line-active");
        html.classList.remove("html-active");
        document.querySelector(".burger-nav-header").remove();
    });
});

function closeBurger() {
    document.addEventListener("click", (e) => {
        const click = e.composedPath().includes(blackOut, navLink);
        if (click) {
            menuBurger.classList.remove("header__navigation-active");
            blackOut.classList.remove("blackout-active");
            burger.classList.remove("header__logo-line-active");
            html.classList.remove("html-active");
            document.querySelector(".burger-nav-header").remove();
        }
    });
}

function createPopUp(data) {
    const card = document.querySelectorAll(".card");

    card.forEach((el) => {
        el.addEventListener("click", (e) => {
            const petId = e.currentTarget.id;
            const selectedPet = data.filter(
                (item) => item.id.toString() === petId
            )[0];
            const popUp = document.querySelector(".popup");
            if (!el.contains(popUp)) {
                blackOut.classList.add("blackout-active");
                html.classList.add("html-active");
                if (document.querySelector(".popup")) {
                    closePopUp();
                }

                el.parentNode.insertAdjacentHTML(
                    "afterbegin",
                    `
                <div class="popup">
                    <button class="arrow__button popup-close__button" onclick="closePopUp()"> <img src="./assets/icons/close.svg" alt="close" /></button>
                    <img class="popup__img" src = '${selectedPet.img}'/>
                    <div class="popup-info">
                        <div class="popup-info-title">
                            <h3 class="popup-info-name">${selectedPet.name}</h3>
                            <h4 class="popup-info-breed">${selectedPet.type} - ${selectedPet.breed} </h4>
                        </div>
                        <p class="popup-info-description">${selectedPet.description}</p>
                        <ul class="popup-info-list">
                            <li class="popup-list-item"><b>Age:</b> ${selectedPet.age}</li>
                            <li class="popup-list-item"><b>Inoculations:</b> ${selectedPet.inoculations}</li>
                            <li class="popup-list-item"><b>Diseases:</b> ${selectedPet.diseases}</li>
                            <li class="popup-list-item"><b>Parasites:</b> ${selectedPet.parasites}</li>
                        </ul>
                    </div>
                </div
              `
                );
            }
        });
    });
    document.addEventListener("click", (e) => {
        const click = e.composedPath().includes(blackOut);
        if (click) {
            document.querySelector(".popup").remove();
            blackOut.classList.remove("blackout-active");
            html.classList.remove("html-active");
        }
    });
}

function closePopUp() {
    document.querySelector(".popup").remove();
    blackOut.classList.remove("blackout-active");
    html.classList.remove("html-active");
}

function petCarusel() {
    let screenWidth = window.screen.width;
    let width;
    const count = 1;
    const pagesContainer = document.querySelector(".our-pets__slider");
    const pages = document.querySelectorAll(".our-pets__cards");
    let pageNumber = 1;
    const currentPage = document.querySelector(".current");
    let position = 0;

    if ((screenWidth <= 1279) & (screenWidth >= 768)) {
        width = 580;
    } else if (screenWidth >= 1280) {
        width = 1200;
    } else if (screenWidth <= 767) {
        width = 270;
    }

    try {
        document.querySelector(".prev").onclick = function () {
            position += width * count;
            position = Math.min(position, 0);

            pagesContainer.style.marginLeft = position + "px";
            pageNumber--;
            if (pageNumber <= 1) {
                pageNumber = 1;
            }
            if (pageNumber < 2) {
                document.querySelector(".prev").classList.add("disabled");
                document
                    .querySelector(".button-first")
                    .classList.add("disabled");
            }
            if (pageNumber <= 5) {
                document.querySelector(".next").classList.remove("disabled");
                document
                    .querySelector(".button-last")
                    .classList.remove("disabled");
            }
            currentPage.innerHTML = pageNumber;
        };

        document.querySelector(".button-first").onclick = function () {
            position += width * (count + 5);

            position = Math.min(position, 0);
            pagesContainer.style.marginLeft = position + "px";
            pageNumber -= 5;

            if (pageNumber <= 1) {
                pageNumber = 1;
            }
            if (pageNumber < 2) {
                document.querySelector(".prev").classList.add("disabled");
                document
                    .querySelector(".button-first")
                    .classList.add("disabled");
            }
            if (pageNumber <= 5) {
                document.querySelector(".next").classList.remove("disabled");
                document
                    .querySelector(".button-last")
                    .classList.remove("disabled");
            }
            currentPage.innerHTML = pageNumber;
        };

        document.querySelector(".next").onclick = function () {
            position -= width * count;
            position = Math.max(position, -width * (pages.length - count));
            pagesContainer.style.marginLeft = position + "px";
            pageNumber++;

            if (pageNumber >= 6) {
                pageNumber = 6;
            }

            if (pageNumber > 1) {
                document.querySelector(".prev").classList.remove("disabled");
                document
                    .querySelector(".button-first")
                    .classList.remove("disabled");
            }

            if (pageNumber > 5) {
                document.querySelector(".next").classList.add("disabled");
                document
                    .querySelector(".button-last")
                    .classList.add("disabled");
            }

            currentPage.innerHTML = pageNumber;
        };

        document.querySelector(".button-last").onclick = function () {
            position -= width * (count + 5);

            position = Math.max(position, -width * (pages.length - count));
            pagesContainer.style.marginLeft = position + "px";
            pageNumber += 5;

            if (pageNumber >= 6) {
                pageNumber = 6;
            }

            if (pageNumber > 1) {
                document.querySelector(".prev").classList.remove("disabled");
                document
                    .querySelector(".button-first")
                    .classList.remove("disabled");
            }
            if (pageNumber > 5) {
                document.querySelector(".next").classList.add("disabled");
                document
                    .querySelector(".button-last")
                    .classList.add("disabled");
            }
            currentPage.innerHTML = pageNumber;
        };
    } catch (error) {}
}
petCarusel();
renderPage();

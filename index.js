"use strict";

function renderPage() {
    fetch("pets.json") //path to the file with json data
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // createHeader(data);
            // createMain(data);
            return data;
        })
        .then((data) => {
            // addToCart(data);
            // popUp(data);
            // visibleCart();
        });
}

// Burger
(function () {
    const burgerItem = document.querySelector(".hamburger");
    const menu = document.querySelector(".header__navigation");
    const burger = document.querySelector(".header__logo-line");
    const logo = document.querySelector(".header-logo");
    const blackOut = document.querySelector(".blackout");
    const link = document.querySelector(".link-burger");

    burger.addEventListener("click", () => {
        menu.classList.toggle("header__navigation-active");
        blackOut.classList.toggle("blackout-active");
        burger.classList.toggle("header__logo-line-active");

        const burgerNavHeader = document.querySelector(".burger-nav-header");

        if (!menu.contains(burgerNavHeader)) {
            if (menu.closest(".pets-wrapper")) {
                menu.insertAdjacentHTML(
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
                menu.insertAdjacentHTML(
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

    document.addEventListener("click", (e) => {
        const click = e.composedPath().includes(blackOut);
        if (click) {
            menu.classList.remove("header__navigation-active");
            blackOut.classList.remove("blackout-active");
            burger.classList.remove("header__logo-line-active");
        }
    });
})();

// pop-up
// (function () {
//     const testimonials = document.querySelectorAll(".testimonials__content");
//     const testimonialsCloseItem = document.querySelector(".testimonials-close");
//     const blackOut = document.querySelector(".blackout-popup");
//     const text = document.querySelector(".testimonials__text");

//     for (let testimonial of testimonials) {
//         testimonial.addEventListener("click", () => {
//             testimonial.classList.add("testimonials__content-active");
//             blackOut.classList.add("blackout-popup-active");
//         });

//         document.addEventListener("click", (e) => {
//             const click = e
//                 .composedPath()
//                 .some((elem) => [...testimonials].includes(elem));

//             if (
//                 !click &&
//                 document.querySelector(".testimonials__content-active")
//             ) {
//                 testimonials.forEach((elem) =>
//                     elem.classList.remove("testimonials__content-active")
//                 );
//                 blackOut.classList.remove("blackout-popup-active");
//             }
//         });
//     }
// })();

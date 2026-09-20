// =========================================================
// BLACKROCK-EMPIRE
// SCRIPT.JS
// =========================================================


// ---------------------------------------------------------
// PAGE LOADER
// ---------------------------------------------------------

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.classList.add("hide");

        }, 650);

    }

});


// ---------------------------------------------------------
// NAVBAR EFFECT
// ---------------------------------------------------------

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (!header) return;

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


// ---------------------------------------------------------
// MOBILE MENU
// ---------------------------------------------------------

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("active");

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

        });

    });

}


// ---------------------------------------------------------
// SCROLL REVEAL ANIMATION
// ---------------------------------------------------------

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(function (element) {

    observer.observe(element);

});


// ---------------------------------------------------------
// SIMPLE HERO PARALLAX
// ---------------------------------------------------------

const hero =
    document.querySelector(".hero");


window.addEventListener("scroll", function () {

    if (!hero) return;

    const scrollPosition =
        window.scrollY;

    if (scrollPosition < window.innerHeight) {

        hero.style.backgroundPosition =
            "center " +
            (50 + scrollPosition * 0.015) +
            "%";

    }

});


// ---------------------------------------------------------
// SAFETY FALLBACK FOR REVEAL ELEMENTS
// ---------------------------------------------------------

setTimeout(function () {

    revealElements.forEach(function (element) {

        if (!element.classList.contains("visible")) {

            element.classList.add("visible");

        }

    });

}, 2500);
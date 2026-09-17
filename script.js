// =====================================
// LOADING SCREEN
// =====================================

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 1300);

});


// =====================================
// NAVBAR SCROLL
// =====================================

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 70) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// =====================================
// SCROLL REVEAL ANIMATION
// =====================================

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("show");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    (element, index) => {

        element.style.transitionDelay =
            `${(index % 6) * 0.1}s`;

        observer.observe(element);

    }
);


// =====================================
// SEARCH MOVIES
// =====================================

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function () {

        const value =
            this.value
                .toLowerCase()
                .trim();


        const cards =
            document.querySelectorAll(
                ".movie-card, .normal-card"
            );


        cards.forEach((card) => {

            const text =
                card.innerText.toLowerCase();


            if (text.includes(value)) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    }
);


// =====================================
// PLAY BUTTON
// =====================================

function playMovie() {

    const button =
        document.querySelector(".play-btn");

    const oldText =
        button.innerHTML;

    button.innerHTML =
        "▶ Playing...";

    button.style.transform =
        "scale(0.95)";


    setTimeout(() => {

        button.innerHTML =
            oldText;

        button.style.transform = "";

        alert(
            "Movie player demo 🎬"
        );

    }, 600);

}


// =====================================
// MORE INFO POPUP
// =====================================

function showInfo() {

    document
        .getElementById("moviePopup")
        .classList
        .add("active");

    document.body.style.overflow =
        "hidden";

}


function closeInfo() {

    document
        .getElementById("moviePopup")
        .classList
        .remove("active");

    document.body.style.overflow =
        "auto";

}


// Close popup by clicking outside

document
    .getElementById("moviePopup")
    .addEventListener(
        "click",
        function (event) {

            if (event.target === this) {

                closeInfo();

            }

        }
    );


// ESC key closes popup

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeInfo();

        }

    }
);


// =====================================
// MOVIE CARD CLICK ANIMATION
// =====================================

const movieCards =
    document.querySelectorAll(
        ".movie-card, .normal-card"
    );


movieCards.forEach((card) => {

    card.addEventListener(
        "click",
        function () {

            this.animate(

                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.07)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }
                ],

                {
                    duration: 350
                }

            );

        }
    );

});


// =====================================
// HERO MOUSE PARALLAX
// =====================================

const hero =
    document.querySelector(".hero");

const background =
    document.querySelector(
        ".hero-background"
    );


hero.addEventListener(
    "mousemove",
    (event) => {

        const x =
            (
                event.clientX /
                window.innerWidth
                - 0.5
            ) * 20;


        const y =
            (
                event.clientY /
                window.innerHeight
                - 0.5
            ) * 20;


        background.style.transform =
            `scale(1.1)
             translate(${x}px, ${y}px)`;

    }
);


hero.addEventListener(
    "mouseleave",
    () => {

        background.style.transform =
            "scale(1.1) translate(0,0)";

    }
);


// =====================================
// HORIZONTAL SCROLL WITH MOUSE WHEEL
// =====================================

const rows =
    document.querySelectorAll(
        ".movie-row"
    );


rows.forEach((row) => {

    row.addEventListener(
        "wheel",
        (event) => {

            if (
                Math.abs(event.deltaY) >
                Math.abs(event.deltaX)
            ) {

                row.scrollLeft +=
                    event.deltaY;

            }

        }
    );

});
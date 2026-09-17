// ========================================
// RC390 ANIMATED WEBSITE
// script.js
// ========================================


// ----------------------------------------
// LOADING SCREEN
// ----------------------------------------

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {

        loader.classList.add("hide");

    }, 1600);

});


// ----------------------------------------
// NAVBAR SCROLL EFFECT
// ----------------------------------------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ----------------------------------------
// MOBILE MENU
// ----------------------------------------

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

menuBtn.addEventListener("click", function () {

    navMenu.classList.toggle("show");

});

document
    .querySelectorAll("nav a")
    .forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("show");

        });

    });


// ----------------------------------------
// CUSTOM CURSOR
// ----------------------------------------

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");

document.addEventListener(
    "mousemove",
    function (event) {

        cursorDot.style.left =
            event.clientX + "px";

        cursorDot.style.top =
            event.clientY + "px";


        setTimeout(function () {

            cursorRing.style.left =
                event.clientX + "px";

            cursorRing.style.top =
                event.clientY + "px";

        }, 60);

    }
);


// Cursor gets bigger on links

document
    .querySelectorAll(
        "a, button, .gallery-card"
    )
    .forEach(function (item) {

        item.addEventListener(
            "mouseenter",
            function () {

                cursorRing.style.width =
                    "60px";

                cursorRing.style.height =
                    "60px";

            }
        );


        item.addEventListener(
            "mouseleave",
            function () {

                cursorRing.style.width =
                    "38px";

                cursorRing.style.height =
                    "38px";

            }
        );

    });


// ----------------------------------------
// SCROLL REVEAL
// ----------------------------------------

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (entry.isIntersecting) {

                        entry.target
                            .classList
                            .add("active");

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(element);

    }
);


// ----------------------------------------
// PERFORMANCE COUNTERS
// ----------------------------------------

const counters =
    document.querySelectorAll(".counter");

let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }

    countersStarted = true;


    counters.forEach(
        function (counter) {

            const target =
                Number(
                    counter.dataset.target
                );

            let current = 0;

            const increment =
                Math.max(
                    1,
                    target / 70
                );


            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent =
                        Math.floor(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target;

                }

            }


            updateCounter();

        }
    );

}


const performanceSection =
    document.getElementById(
        "performance"
    );


const counterObserver =
    new IntersectionObserver(

        function (entries) {

            if (
                entries[0]
                    .isIntersecting
            ) {

                startCounters();

                document
                    .querySelectorAll(
                        ".stat-card"
                    )
                    .forEach(
                        function (card) {

                            card.classList
                                .add("active");

                        }
                    );

            }

        },

        {
            threshold: 0.25
        }

    );


counterObserver.observe(
    performanceSection
);


// ----------------------------------------
// LIVE RPM SIMULATION
// ----------------------------------------

const liveRpm =
    document.getElementById("liveRpm");

const heroRpm =
    document.getElementById("heroRpm");

const rpmFill =
    document.getElementById("rpmFill");


let rpm = 1000;

let rpmDirection = 1;


setInterval(function () {

    const change =
        Math.floor(
            Math.random() * 600
        ) + 150;


    rpm +=
        change * rpmDirection;


    if (rpm >= 10000) {

        rpm = 10000;

        rpmDirection = -1;

    }


    if (rpm <= 1200) {

        rpm = 1200;

        rpmDirection = 1;

    }


    const rpmText =
        Math.floor(rpm)
            .toString()
            .padStart(4, "0");


    liveRpm.textContent =
        rpmText;


    heroRpm.textContent =
        rpmText;


    rpmFill.style.width =
        (rpm / 10000) * 100
        + "%";

}, 180);


// ----------------------------------------
// HERO IMAGE MOUSE PARALLAX
// ----------------------------------------

const hero =
    document.querySelector(".hero");

const heroBike =
    document.getElementById("heroBike");


hero.addEventListener(
    "mousemove",
    function (event) {

        if (
            window.innerWidth < 900
        ) {
            return;
        }


        const x =
            event.clientX /
            window.innerWidth -
            0.5;

        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        heroBike.style.transform =
            "translate("
            + (x * 15)
            + "px,"
            + (y * 10)
            + "px) scale(1.02)";

    }
);


hero.addEventListener(
    "mouseleave",
    function () {

        heroBike.style.transform =
            "translate(0,0) scale(1)";

    }
);


// ----------------------------------------
// CINEMATIC IMAGE PARALLAX
// ----------------------------------------

const cinematicImage =
    document.querySelector(
        ".cinematic-image"
    );

window.addEventListener(
    "scroll",
    function () {

        const cinematic =
            document.querySelector(
                ".cinematic"
            );

        const rect =
            cinematic
                .getBoundingClientRect();


        if (
            rect.bottom > 0 &&
            rect.top <
            window.innerHeight
        ) {

            const movement =
                rect.top * 0.06;


            cinematicImage.style.transform =
                "translateY("
                + movement
                + "px) scale(1.1)";

        }

    }
);


// ----------------------------------------
// GALLERY 3D TILT
// ----------------------------------------

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );


galleryCards.forEach(
    function (card) {

        card.addEventListener(
            "mousemove",
            function (event) {

                if (
                    window.innerWidth < 900
                ) {
                    return;
                }


                const rect =
                    card
                        .getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) /
                    centerY * -3;

                const rotateY =
                    (x - centerX) /
                    centerX * 3;


                card.style.transform =
                    "perspective(900px)"
                    + " rotateX("
                    + rotateX
                    + "deg)"
                    + " rotateY("
                    + rotateY
                    + "deg)"
                    + " translateY(-5px)";

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform =
                    "perspective(900px)"
                    + " rotateX(0)"
                    + " rotateY(0)"
                    + " translateY(0)";

            }
        );

    }
);


// ----------------------------------------
// FULLSCREEN GALLERY
// ----------------------------------------

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


galleryCards.forEach(
    function (card) {

        card.addEventListener(
            "click",
            function () {

                const image =
                    card.dataset.image;


                lightboxImage.src =
                    image;


                lightbox.classList
                    .add("show");


                document.body.style
                    .overflow =
                    "hidden";

            }
        );

    }
);


function closeGallery() {

    lightbox.classList
        .remove("show");

    document.body.style
        .overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            lightbox
        ) {

            closeGallery();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeGallery();

        }

    }
);


// ----------------------------------------
// ORANGE PARTICLES
// ----------------------------------------

const canvas =
    document.getElementById(
        "particles"
    );

const ctx =
    canvas.getContext("2d");


let particles = [];


function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.reset();

    }


    reset() {

        this.x =
            Math.random()
            * canvas.width;

        this.y =
            Math.random()
            * canvas.height;

        this.size =
            Math.random()
            * 2 + 0.5;

        this.speedX =
            Math.random()
            * 0.6 - 0.3;

        this.speedY =
            Math.random()
            * -0.7 - 0.1;

        this.opacity =
            Math.random()
            * 0.5 + 0.1;

    }


    update() {

        this.x +=
            this.speedX;

        this.y +=
            this.speedY;


        if (
            this.y < -10
        ) {

            this.y =
                canvas.height + 10;

        }


        if (
            this.x < 0
        ) {

            this.x =
                canvas.width;

        }


        if (
            this.x >
            canvas.width
        ) {

            this.x = 0;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,90,0,"
            + this.opacity
            + ")";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    let amount = 55;


    if (
        window.innerWidth < 700
    ) {

        amount = 25;

    }


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


createParticles();


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        function (particle) {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


// ----------------------------------------
// GALLERY IMAGE SCROLL EFFECT
// ----------------------------------------

window.addEventListener(
    "scroll",
    function () {

        galleryCards.forEach(
            function (card) {

                const rect =
                    card
                        .getBoundingClientRect();

                const image =
                    card.querySelector(
                        "img"
                    );


                if (
                    rect.top <
                    window.innerHeight &&
                    rect.bottom > 0
                ) {

                    const offset =
                        (
                            rect.top -
                            window.innerHeight / 2
                        ) * 0.015;


                    image.style
                        .objectPosition =
                        "center "
                        + (
                            50 + offset
                        )
                        + "%";

                }

            }
        );

    }
);


// ----------------------------------------
// NAVIGATION ACTIVE STATE
// ----------------------------------------

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a"
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop;


                if (
                    window.scrollY >=
                    sectionTop - 250
                ) {

                    current =
                        section
                            .getAttribute(
                                "id"
                            );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList
                    .remove("active");


                if (
                    link
                        .getAttribute(
                            "href"
                        ) ===
                    "#" + current
                ) {

                    link.classList
                        .add("active");

                }

            }
        );

    }
);


// ----------------------------------------
// CONSOLE MESSAGE
// ----------------------------------------

console.log(
    "%cRC390 RACING EXPERIENCE",
    "color:#ff5a00;"
    + "font-size:20px;"
    + "font-weight:bold;"
);

console.log(
    "Race system initialized."
);
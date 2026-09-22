// =============================================
// AKHIL.46 CINEMATIC EXPERIENCE
// =============================================


// ---------------------------------------------
// LOADER
// ---------------------------------------------

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    const loadingText =
        document.getElementById("loadingText");

    setTimeout(() => {
        loadingText.textContent =
            "SYSTEM READY";
    }, 1100);

    setTimeout(() => {
        loader.classList.add("hide");
    }, 2000);

});


// ---------------------------------------------
// NAVBAR
// ---------------------------------------------

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 70) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ---------------------------------------------
// MOBILE MENU
// ---------------------------------------------

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("open");

});

document
    .querySelectorAll("#nav a")
    .forEach(link => {

        link.addEventListener("click", () => {
            nav.classList.remove("open");
        });

    });


// ---------------------------------------------
// CUSTOM CURSOR
// ---------------------------------------------

const cursor =
    document.querySelector(".cursor");

const cursorRing =
    document.querySelector(".cursor-ring");


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";


            cursorRing.animate(
                {
                    left:
                        event.clientX + "px",

                    top:
                        event.clientY + "px"
                },

                {
                    duration: 300,
                    fill: "forwards"
                }
            );

        }
    );


    document
        .querySelectorAll(
            "a, button, .photo-card, .machine-card"
        )
        .forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorRing
                        .classList
                        .add("hover");

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorRing
                        .classList
                        .remove("hover");

                }
            );

        });

}


// ---------------------------------------------
// SCROLL REVEAL
// ---------------------------------------------

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


// ---------------------------------------------
// HERO 3D IMAGE
// ---------------------------------------------

const hero =
    document.querySelector(".hero");

const heroFrame =
    document.getElementById("heroFrame");


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    hero.addEventListener(
        "mousemove",
        event => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;

            const y =
                event.clientY /
                window.innerHeight -
                0.5;


            heroFrame.style.transform =
                `
                perspective(1000px)
                rotateY(${x * 6}deg)
                rotateX(${y * -5}deg)
                translate(
                    ${x * 12}px,
                    ${y * 10}px
                )
                `;

        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            heroFrame.style.transform =
                `
                perspective(1000px)
                rotateY(0deg)
                rotateX(0deg)
                translate(0,0)
                `;

        }
    );

}


// ---------------------------------------------
// SYSTEM NUMBER ANIMATION
// ---------------------------------------------

const systemNumber =
    document.getElementById(
        "systemNumber"
    );


setInterval(() => {

    const number =
        Math.floor(
            Math.random() * 9999
        );

    systemNumber.textContent =
        number
            .toString()
            .padStart(4, "0");

}, 800);


// ---------------------------------------------
// CINEMATIC BACKGROUND PARALLAX
// ---------------------------------------------

const cinematic =
    document.querySelector(
        ".cinematic"
    );

const cinematicBg =
    document.getElementById(
        "cinematicBg"
    );


window.addEventListener(
    "scroll",
    () => {

        const rect =
            cinematic
                .getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight &&
            rect.bottom > 0
        ) {

            const move =
                rect.top * 0.08;


            cinematicBg.style.transform =
                `
                translateY(${move}px)
                scale(1.12)
                `;

        }

    }
);


// ---------------------------------------------
// PHOTO CARD 3D TILT
// ---------------------------------------------

const photoCards =
    document.querySelectorAll(
        ".photo-card"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    photoCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card
                        .getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;

                const mouseY =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateY =
                    (
                        mouseX -
                        centerX
                    )
                    /
                    centerX
                    * 3;


                const rotateX =
                    (
                        mouseY -
                        centerY
                    )
                    /
                    centerY
                    * -3;


                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(.99)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale(1)
                    `;

            }
        );

    });

}


// ---------------------------------------------
// LIGHTBOX
// ---------------------------------------------

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


photoCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            const image =
                card.dataset.image;

            lightboxImage.src =
                image;

            lightbox
                .classList
                .add("active");

            document.body
                .classList
                .add("lock");

        }
    );

});


function closeViewer() {

    lightbox
        .classList
        .remove("active");

    document.body
        .classList
        .remove("lock");

}


closeLightbox.addEventListener(
    "click",
    closeViewer
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeViewer();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeViewer();

        }

    }
);


// ---------------------------------------------
// PARTICLE SYSTEM
// ---------------------------------------------

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
    () => {

        resizeCanvas();

        createParticles();

    }
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

        this.radius =
            Math.random()
            * 1.8 + .3;

        this.speedX =
            Math.random()
            * .5 - .25;

        this.speedY =
            Math.random()
            * -.6 - .1;

        this.opacity =
            Math.random()
            * .4 + .08;

    }


    update() {

        this.x +=
            this.speedX;

        this.y +=
            this.speedY;


        if (
            this.y < -20
        ) {

            this.y =
                canvas.height + 20;

        }


        if (
            this.x < -20
        ) {

            this.x =
                canvas.width + 20;

        }


        if (
            this.x >
            canvas.width + 20
        ) {

            this.x = -20;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `
            rgba(
                255,
                82,
                0,
                ${this.opacity}
            )
            `;


        ctx.fill();

    }

}


function createParticles() {

    particles = [];


    const count =
        window.innerWidth < 700
            ? 25
            : 65;


    for (
        let i = 0;
        i < count;
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
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();


// ---------------------------------------------
// IMAGE SCROLL MOTION
// ---------------------------------------------

window.addEventListener(
    "scroll",
    () => {

        photoCards.forEach(card => {

            const rect =
                card
                    .getBoundingClientRect();

            const image =
                card.querySelector("img");


            if (
                rect.top <
                window.innerHeight &&
                rect.bottom > 0
            ) {

                const offset =
                    (
                        rect.top -
                        window.innerHeight / 2
                    )
                    * .012;


                image.style.objectPosition =
                    `
                    center
                    ${50 + offset}%
                    `;

            }

        });

    }
);


// ---------------------------------------------
// MACHINE CARD MOUSE LIGHT
// ---------------------------------------------

const machineCards =
    document.querySelectorAll(
        ".machine-card"
    );


machineCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card
                    .getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            card.style
                .background =
                `
                radial-gradient(
                    circle at
                    ${x}px ${y}px,
                    rgba(255,82,0,.2),
                    #111 45%
                )
                `;

        }
    );

});


// ---------------------------------------------
// CONSOLE
// ---------------------------------------------

console.log(
    "%cAKHIL.46",
    "color:#ff5200;" +
    "font-size:28px;" +
    "font-weight:bold;"
);

console.log(
    "Cinematic system initialized."
);
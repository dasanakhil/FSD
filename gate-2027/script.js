/* =====================================================
   GATE 2027 — PREMIUM ANIMATION ENGINE
   ===================================================== */


/* =========================
   MOBILE MENU
   ========================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


if(menuBtn && navMenu){

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });


    document
        .querySelectorAll("nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

            });

        });

}


/* =========================
   NAVBAR
   ========================= */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if(!navbar) return;


    if(window.scrollY > 40){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});


/* =========================
   SCROLL REVEAL
   ========================= */

const revealItems =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target
                        .classList
                        .add("active");

                    revealObserver
                        .unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealItems.forEach((item,index) => {

    /*
       Small stagger creates a much more
       professional entrance animation.
    */

    item.style.transitionDelay =
        `${Math.min(index % 4,3) * 80}ms`;

    revealObserver.observe(item);

});


/* =========================
   3D BOOK TILT
   ========================= */

const books =
    document.querySelectorAll(".book3d");


books.forEach(book => {

    const face =
        book.querySelector(".book-face");


    if(!face) return;


    book.addEventListener(
        "mousemove",
        event => {

            if(window.innerWidth < 800)
                return;


            const rect =
                book.getBoundingClientRect();


            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;


            const percentX =
                mouseX / rect.width;

            const percentY =
                mouseY / rect.height;


            const rotateY =
                (percentX - 0.5) * 28;

            const rotateX =
                (0.5 - percentY) * 20;


            face.style.transform = `

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-16px)

                scale(1.035)

            `;

        }
    );


    book.addEventListener(
        "mouseleave",
        () => {

            face.style.transform = `

                rotateX(0deg)

                rotateY(0deg)

                translateY(0)

                scale(1)

            `;

        }
    );

});


/* =========================
   SYLLABUS CARD SPOTLIGHT
   ========================= */

const subjectCards =
    document.querySelectorAll(
        ".subject-card"
    );


subjectCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if(window.innerWidth < 800)
                return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            /*
               Update spotlight position
            */

            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );

            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            /*
               3D movement
            */

            const rotateY =
                ((x / rect.width) - .5) * 7;

            const rotateX =
                (.5 - (y / rect.height)) * 7;


            card.style.transform = `

                perspective(900px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-7px)

            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = `

                perspective(900px)

                rotateX(0)

                rotateY(0)

                translateY(0)

            `;

        }
    );

});


/* =========================
   HERO PARALLAX
   ========================= */

const heroBooks =
    document.querySelector(
        ".hero-books"
    );


document.addEventListener(
    "mousemove",
    event => {

        if(
            !heroBooks ||
            window.innerWidth < 1000
        ){
            return;
        }


        const x =
            (event.clientX /
            window.innerWidth - .5);

        const y =
            (event.clientY /
            window.innerHeight - .5);


        heroBooks.style.transform = `

            perspective(1400px)

            rotateY(${x * 5}deg)

            rotateX(${-y * 4}deg)

            translate3d(
                ${x * 10}px,
                ${y * 10}px,
                0
            )

        `;

    }
);


/* =========================
   CURSOR AMBIENT LIGHT
   ========================= */

const cursorLight =
    document.createElement("div");


cursorLight.className =
    "cursor-light";


document.body.appendChild(
    cursorLight
);


let mouseX = 0;
let mouseY = 0;

let lightX = 0;
let lightY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function animateLight(){

    lightX +=
        (mouseX - lightX) * .08;

    lightY +=
        (mouseY - lightY) * .08;


    cursorLight.style.left =
        `${lightX}px`;

    cursorLight.style.top =
        `${lightY}px`;


    requestAnimationFrame(
        animateLight
    );

}


animateLight();


/* =========================
   SMOOTH NAVIGATION
   ========================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event){

                const id =
                    this.getAttribute("href");


                if(id === "#")
                    return;


                const target =
                    document.querySelector(id);


                if(target){

                    event.preventDefault();


                    const navbarHeight =
                        100;


                    const top =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.pageYOffset
                        -
                        navbarHeight;


                    window.scrollTo({

                        top: top,

                        behavior: "smooth"

                    });

                }

            }
        );

    });


/* =========================
   ROADMAP HOVER
   ========================= */

document
    .querySelectorAll(".month")
    .forEach(month => {

        month.addEventListener(
            "mouseenter",
            () => {

                const number =
                    month.querySelector(
                        ".month-number"
                    );


                if(number){

                    number.style.transform =
                        "scale(1.12) rotate(8deg)";

                    number.style.transition =
                        ".3s";

                }

            }
        );


        month.addEventListener(
            "mouseleave",
            () => {

                const number =
                    month.querySelector(
                        ".month-number"
                    );


                if(number){

                    number.style.transform =
                        "scale(1) rotate(0)";

                }

            }
        );

    });


/* =========================
   HERO ENTRANCE
   ========================= */

window.addEventListener(
    "load",
    () => {

        document.body
            .classList
            .add("loaded");

    }
);

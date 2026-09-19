/* =========================================================
   IIT EXPLORE
   PREMIUM ANIMATION ENGINE
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");

const scrollProgress =
    document.getElementById("scrollProgress");

const cursorGlow =
    document.getElementById("cursorGlow");



/* =========================================================
   NAVBAR SCROLL
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });


    document
        .querySelectorAll("#navMenu a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("show");

            });

        });

}



/* =========================================================
   SCROLL PROGRESS
========================================================= */

window.addEventListener("scroll", () => {

    const documentHeight =
        document.documentElement.scrollHeight
        -
        window.innerHeight;


    if (documentHeight <= 0) {

        scrollProgress.style.width =
            "0%";

        return;

    }


    const percentage =
        (window.scrollY / documentHeight)
        * 100;


    scrollProgress.style.width =
        `${percentage}%`;

});



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("active");


                    revealObserver
                        .unobserve(
                            entry.target
                        );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    (element, index) => {

        element.style.transitionDelay =
            `${(index % 4) * 70}ms`;

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   CURSOR LIGHT
========================================================= */

let mouseX = 0;
let mouseY = 0;

let glowX = 0;
let glowY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


function animateCursor() {

    glowX +=
        (mouseX - glowX)
        * 0.08;

    glowY +=
        (mouseY - glowY)
        * 0.08;


    if (cursorGlow) {

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

    }


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();



/* =========================================================
   3D CAMPUS CARD EFFECT
========================================================= */

const campusCards =
    document.querySelectorAll(
        ".campus-card"
    );


campusCards.forEach(card => {


    card.addEventListener(
        "mousemove",
        event => {


            if (window.innerWidth < 900) {

                return;

            }


            const rectangle =
                card.getBoundingClientRect();


            const x =
                event.clientX
                -
                rectangle.left;


            const y =
                event.clientY
                -
                rectangle.top;


            card.style.setProperty(
                "--mouse-x",
                `${x}px`
            );


            card.style.setProperty(
                "--mouse-y",
                `${y}px`
            );


            const rotateY =
                (
                    x /
                    rectangle.width
                    -
                    0.5
                )
                * 8;


            const rotateX =
                (
                    0.5
                    -
                    y /
                    rectangle.height
                )
                * 7;


            card.style.transform = `

                perspective(1400px)

                rotateX(${rotateX}deg)

                rotateY(${rotateY}deg)

                translateY(-8px)

            `;

        }

    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = `

                perspective(1400px)

                rotateX(0deg)

                rotateY(0deg)

                translateY(0)

            `;

        }

    );


});



/* =========================================================
   CAMPUS INFORMATION
   IMPORTANT:
   Images are in SAME folder as HTML.
========================================================= */

const campusData = {


    madras: {

        title:
            "IIT Madras",

        location:
            "CHENNAI • TAMIL NADU",

        image:
            "iit-madras.jpg",

        description:
            "IIT Madras is located in Chennai and combines engineering education, research facilities, technology development and a distinctive green campus environment.",

        website:
            "https://www.iitm.ac.in/"

    },


    delhi: {

        title:
            "IIT Delhi",

        location:
            "NEW DELHI",

        image:
            "iit-delhi.jpg",

        description:
            "IIT Delhi is a major engineering and research institution in New Delhi with programmes spanning engineering, technology, science and interdisciplinary fields.",

        website:
            "https://home.iitd.ac.in/"

    },


    bombay: {

        title:
            "IIT Bombay",

        location:
            "MUMBAI • MAHARASHTRA",

        image:
            "iit-bombay.jpg",

        description:
            "IIT Bombay is located in Powai, Mumbai and is known for engineering education, research, computing, student technical activity and entrepreneurship.",

        website:
            "https://www.iitb.ac.in/"

    },


    kanpur: {

        title:
            "IIT Kanpur",

        location:
            "KANPUR • UTTAR PRADESH",

        image:
            "iit-kanpur.jpg",

        description:
            "IIT Kanpur is an engineering and research institution offering education across engineering, science and interdisciplinary disciplines.",

        website:
            "https://www.iitk.ac.in/"

    },


    kharagpur: {

        title:
            "IIT Kharagpur",

        location:
            "KHARAGPUR • WEST BENGAL",

        image:
            "iit-kharagpur.jpg",

        description:
            "IIT Kharagpur was the first Indian Institute of Technology established in India and has developed a broad multidisciplinary academic ecosystem.",

        website:
            "https://www.iitkgp.ac.in/"

    },


    roorkee: {

        title:
            "IIT Roorkee",

        location:
            "ROORKEE • UTTARAKHAND",

        image:
            "iit-roorkee.jpg",

        description:
            "IIT Roorkee has a long institutional history and today offers education and research across engineering, science and technology.",

        website:
            "https://www.iitr.ac.in/"

    },


    guwahati: {

        title:
            "IIT Guwahati",

        location:
            "GUWAHATI • ASSAM",

        image:
            "iit-guwahati.jpg",

        description:
            "IIT Guwahati is located in Assam and combines a scenic campus environment with engineering, science, design and research programmes.",

        website:
            "https://www.iitg.ac.in/"

    },


    hyderabad: {

        title:
            "IIT Hyderabad",

        location:
            "KANDI • TELANGANA",

        image:
            "iit-hyderabad.jpg",

        description:
            "IIT Hyderabad is a newer-generation IIT with modern infrastructure and research activity across engineering, science, design and emerging technologies.",

        website:
            "https://www.iith.ac.in/"

    }

};



/* =========================================================
   CAMPUS MODAL
========================================================= */

const modal =
    document.getElementById(
        "campusModal"
    );


const modalBackground =
    document.getElementById(
        "modalBackground"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalLocation =
    document.getElementById(
        "modalLocation"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalWebsite =
    document.getElementById(
        "modalWebsite"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );



/* OPEN MODAL */

document
    .querySelectorAll(
        ".explore-button"
    )
    .forEach(button => {


        button.addEventListener(
            "click",
            () => {


                const campusKey =
                    button.dataset.campus;


                const data =
                    campusData[campusKey];


                if (!data) {

                    return;

                }


                modalTitle.textContent =
                    data.title;


                modalLocation.textContent =
                    data.location;


                modalDescription.textContent =
                    data.description;


                modalWebsite.href =
                    data.website;


                modalBackground
                    .style
                    .backgroundImage =
                    `url("${data.image}")`;


                modal.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }

        );


    });



/* CLOSE MODAL */

function hideModal() {

    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}



if (closeModal) {

    closeModal.addEventListener(
        "click",
        hideModal
    );

}



/* CLICK OUTSIDE */

if (modal) {

    modal.addEventListener(
        "click",
        event => {


            if (
                event.target === modal
                ||
                event.target
                    .classList
                    .contains(
                        "modal-overlay"
                    )
            ) {

                hideModal();

            }

        }

    );

}



/* ESC KEY */

document.addEventListener(
    "keydown",
    event => {


        if (
            event.key === "Escape"
            &&
            modal.classList
                .contains("active")
        ) {

            hideModal();

        }

    }
);



/* =========================================================
   ANIMATED COUNTER
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


counters.forEach(counter => {


    const target =
        Number(
            counter.dataset.count
        );


    let current = 0;


    const interval =
        setInterval(
            () => {


                current++;


                counter.textContent =
                    current;


                if (
                    current >= target
                ) {

                    counter.textContent =
                        target;

                    clearInterval(
                        interval
                    );

                }


            },

            120

        );


});



/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {


        link.addEventListener(
            "click",
            event => {


                const id =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !id
                    ||
                    id === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        id
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const navbarOffset =
                    100;


                const position =

                    target
                        .getBoundingClientRect()
                        .top

                    +

                    window.scrollY

                    -

                    navbarOffset;


                window.scrollTo({

                    top:
                        position,

                    behavior:
                        "smooth"

                });


            }

        );


    });



/* =========================================================
   HERO IMAGE PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-image"
    );


window.addEventListener(
    "scroll",
    () => {


        if (!heroImage) {

            return;

        }


        const scroll =
            window.scrollY;


        if (scroll < window.innerHeight) {

            heroImage.style
                .backgroundPosition =
                `center calc(50% + ${scroll * 0.08}px)`;

        }


    }

);

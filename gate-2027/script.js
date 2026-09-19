/* =====================================================
   IIT CAMPUS EXPLORER
   Animation Engine
   ===================================================== */


/* ================= NAVBAR ================= */

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const navMenu =
    document.getElementById("navMenu");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


document
    .querySelectorAll("nav a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

        });

    });


/* ================= SCROLL PROGRESS ================= */

const scrollProgress =
    document.getElementById("scrollProgress");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight
        -
        window.innerHeight;

    const percentage =
        (scrollTop / pageHeight) * 100;

    scrollProgress.style.width =
        percentage + "%";

});


/* ================= REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("active");

                    observer.unobserve(
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

        observer.observe(element);

    }
);


/* ================= CURSOR GLOW ================= */

const cursorGlow =
    document.querySelector(".cursor-glow");

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
        (mouseX - glowX) * 0.08;

    glowY +=
        (mouseY - glowY) * 0.08;


    cursorGlow.style.left =
        glowX + "px";

    cursorGlow.style.top =
        glowY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* ================= 3D CAMPUS CARDS ================= */

const campusCards =
    document.querySelectorAll(".campus-card");


campusCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (window.innerWidth < 900)
                return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            card.style.setProperty(
                "--x",
                `${x}px`
            );

            card.style.setProperty(
                "--y",
                `${y}px`
            );


            const rotateY =
                ((x / rect.width) - 0.5) * 8;

            const rotateX =
                (0.5 - (y / rect.height)) * 7;


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

                rotateX(0)

                rotateY(0)

                translateY(0)

            `;

        }
    );

});


/* ================= CAMPUS DATA ================= */

const campusData = {

    madras: {

        title:
            "IIT Madras",

        location:
            "CHENNAI • TAMIL NADU",

        image:
            "images/iit-madras.jpg",

        description:
            "IIT Madras is an Institute of National Importance located in Chennai. Its campus combines engineering education, research facilities and a distinctive green environment.",

        website:
            "https://www.iitm.ac.in/"

    },


    delhi: {

        title:
            "IIT Delhi",

        location:
            "NEW DELHI",

        image:
            "images/iit-delhi.jpg",

        description:
            "IIT Delhi is an Institute of National Importance in New Delhi with programmes and research spanning engineering, technology, science and interdisciplinary fields.",

        website:
            "https://home.iitd.ac.in/"

    },


    bombay: {

        title:
            "IIT Bombay",

        location:
            "MUMBAI • MAHARASHTRA",

        image:
            "images/iit-bombay.jpg",

        description:
            "IIT Bombay is located in Powai, Mumbai and is known for engineering education, research, student technical activity and entrepreneurship.",

        website:
            "https://www.iitb.ac.in/"

    },


    kanpur: {

        title:
            "IIT Kanpur",

        location:
            "KANPUR • UTTAR PRADESH",

        image:
            "images/iit-kanpur.jpg",

        description:
            "IIT Kanpur is a major engineering and research institution offering education across engineering, science and interdisciplinary disciplines.",

        website:
            "https://www.iitk.ac.in/"

    },


    kharagpur: {

        title:
            "IIT Kharagpur",

        location:
            "KHARAGPUR • WEST BENGAL",

        image:
            "images/iit-kharagpur.jpg",

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
            "images/iit-roorkee.jpg",

        description:
            "IIT Roorkee traces its institutional history to the nineteenth century and today offers education and research across engineering, science and technology.",

        website:
            "https://www.iitr.ac.in/"

    },


    guwahati: {

        title:
            "IIT Guwahati",

        location:
            "GUWAHATI • ASSAM",

        image:
            "images/iit-guwahati.jpg",

        description:
            "IIT Guwahati is located in Assam beside the Brahmaputra and combines a scenic campus environment with engineering, science, design and research programmes.",

        website:
            "https://www.iitg.ac.in/"

    },


    hyderabad: {

        title:
            "IIT Hyderabad",

        location:
            "KANDI • TELANGANA",

        image:
            "images/iit-hyderabad.jpg",

        description:
            "IIT Hyderabad is a newer-generation IIT with a modern campus and research activity across engineering, science, design and emerging technologies.",

        website:
            "https://www.iith.ac.in/"

    }

};


/* ================= MODAL ================= */

const modal =
    document.getElementById("campusModal");

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


document
    .querySelectorAll(".explore-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const campusName =
                    button.dataset.campus;


                const data =
                    campusData[campusName];


                if (!data)
                    return;


                modalTitle.textContent =
                    data.title;

                modalLocation.textContent =
                    data.location;

                modalDescription.textContent =
                    data.description;

                modalWebsite.href =
                    data.website;


                modalBackground.style
                    .backgroundImage =
                    `url("${data.image}")`;


                modal.classList.add(
                    "active"
                );


                document.body.style
                    .overflow =
                    "hidden";

            }
        );

    });


function hideModal() {

    modal.classList.remove(
        "active"
    );

    document.body.style
        .overflow =
        "";

}


closeModal.addEventListener(
    "click",
    hideModal
);


modal.addEventListener(
    "click",
    event => {

        if (
            event.target === modal ||
            event.target.classList
                .contains("modal-overlay")
        ) {

            hideModal();

        }

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            hideModal();

        }

    }
);


/* ================= COUNTER ================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


counters.forEach(counter => {

    const target =
        Number(
            counter.dataset.count
        );


    let value = 0;


    const timer =
        setInterval(() => {

            value++;

            counter.textContent =
                value;


            if (value >= target) {

                clearInterval(timer);

            }

        }, 120);

});


/* ================= SMOOTH LINKS ================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute(
                        "href"
                    );


                if (id === "#")
                    return;


                const target =
                    document.querySelector(id);


                if (!target)
                    return;


                event.preventDefault();


                const position =
                    target
                        .getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    100;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });

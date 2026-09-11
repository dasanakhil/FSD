/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);

    }, 2200);

});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const ring = document.querySelector(".cursor-ring");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    ring.style.left = e.clientX + "px";
    ring.style.top = e.clientY + "px";

});


/* =========================
   3D MOTORCYCLE TILT
========================= */

const bike = document.getElementById("bike");

document.addEventListener("mousemove", (e) => {

    if (!bike) return;

    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;

    bike.style.transform =
        `perspective(1200px)
         rotateY(${-x}deg)
         rotateX(${y}deg)
         translateZ(20px)`;

});


/* =========================
   PARTICLE SYSTEM
========================= */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + .3;

        this.speedX =
            (Math.random() - .5) * .5;

        this.speedY =
            (Math.random() - .5) * .5;

        this.life = Math.random();

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        this.life -= .002;

        if (
            this.life <= 0 ||
            this.x < 0 ||
            this.x > canvas.width ||
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = 1;

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
            "rgba(255,90,0," +
            this.life +
            ")";

        ctx.fill();

    }

}


for (let i = 0; i < 130; i++) {

    particles.push(
        new Particle()
    );

}


function particleAnimation() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        p.update();
        p.draw();

    });

    requestAnimationFrame(
        particleAnimation
    );

}

particleAnimation();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(el => {

    observer.observe(el);

});


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target =
            parseInt(
                counter.dataset.target
            );

        let current = 0;

        const increment =
            Math.max(
                1,
                Math.ceil(target / 60)
            );

        const timer =
            setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;
                    clearInterval(timer);

                }

                counter.textContent =
                    current;

            }, 30);

    });

}


const performanceSection =
    document.querySelector(".performance");


const performanceObserver =
    new IntersectionObserver(
        entries => {

            if (
                entries[0].isIntersecting
            ) {

                startCounters();

            }

        },
        {
            threshold: .3
        }
    );


performanceObserver.observe(
    performanceSection
);


/* =========================
   RPM SIMULATION
========================= */

const rpm =
    document.getElementById("liveRpm");

const rpmFill =
    document.getElementById("rpmFill");

const heroRpm =
    document.getElementById("rpm");


function updateRPM() {

    const time =
        Date.now() / 500;

    const value =
        Math.floor(
            3500 +
            Math.sin(time) * 1800 +
            Math.random() * 500
        );

    const safeValue =
        Math.max(
            1000,
            Math.min(
                10000,
                value
            )
        );

    rpm.textContent =
        safeValue
            .toString()
            .padStart(4, "0");

    heroRpm.textContent =
        safeValue
            .toString()
            .padStart(4, "0");

    rpmFill.style.width =
        (safeValue / 10000 * 100) +
        "%";

    requestAnimationFrame(
        updateRPM
    );

}

updateRPM();


/* =========================
   MOUSE PARALLAX
========================= */

document.addEventListener(
    "mousemove",
    (e) => {

        const x =
            (e.clientX /
                window.innerWidth -
                .5) * 20;

        const y =
            (e.clientY /
                window.innerHeight -
                .5) * 20;

        document
            .querySelector(".hero-glow")
            ?.style.setProperty(
                "transform",
                `translate(${x}px, ${y}px)`
            );

    }
);


/* =========================
   BUTTON EFFECT
========================= */

const launchBtn =
    document.getElementById(
        "launchBtn"
    );

launchBtn.addEventListener(
    "click",
    () => {

        launchBtn.innerHTML =
            "<span>ENGINE STARTED ✓</span>";

        launchBtn.style.background =
            "#111";

        launchBtn.style.border =
            "1px solid #ff5a00";

        setTimeout(() => {

            document
                .getElementById("machine")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 700);

    }
);


/* =========================
   CARD MAGNETIC EFFECT
========================= */

document
    .querySelectorAll(".experience-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const rotateX =
                    (y -
                        rect.height / 2) /
                    30;

                const rotateY =
                    (rect.width / 2 -
                        x) /
                    30;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(800px) rotateX(0) rotateY(0)";

            }
        );

    });


/* =========================
   NAVBAR SCROLL
========================= */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (window.scrollY > 100) {

            navbar.style.background =
                "rgba(5,5,5,.9)";

            navbar.style.backdropFilter =
                "blur(15px)";

        } else {

            navbar.style.background =
                "linear-gradient(to bottom, rgba(0,0,0,.8), transparent)";

            navbar.style.backdropFilter =
                "none";

        }

    }
);

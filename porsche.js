/* ================= PARTICLES ================= */

const canvas =
    document.getElementById("particles");

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


function createParticles() {

    particles = [];

    for (let i = 0; i < 100; i++) {

        particles.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 2 + 0.5,

            speed:
                Math.random() * 1.5 + 0.2,

            opacity:
                Math.random()

        });

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

    particles.forEach(p => {

        p.y -= p.speed;

        if (p.y < 0) {

            p.y =
                canvas.height;

            p.x =
                Math.random() *
                canvas.width;

        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,255,255,${p.opacity})`;

        ctx.fill();

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();


/* ================= CAR 3D MOVEMENT ================= */

const car =
    document.getElementById("heroCar");

document.addEventListener(
    "mousemove",
    event => {

        const x =
            (event.clientX /
                window.innerWidth) -
            0.5;

        const y =
            (event.clientY /
                window.innerHeight) -
            0.5;

        const rotateY =
            x * 15;

        const rotateX =
            y * -8;

        car.style.transform =
            `
            rotateY(${rotateY}deg)
            rotateX(${rotateX}deg)
            scale(1.03)
            `;

    }
);


/* ================= SCROLL EFFECT ================= */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(
                ".navbar"
            );

        if (window.scrollY > 80) {

            navbar.style.background =
                "rgba(0,0,0,.9)";

            navbar.style.backdropFilter =
                "blur(20px)";

        } else {

            navbar.style.background =
                "linear-gradient(to bottom,rgba(0,0,0,.8),transparent)";

        }

    }
);


/* ================= MODEL SCROLL ================= */

function exploreModels() {

    document
        .getElementById("models")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= EXPERIENCE ================= */

function startExperience() {

    document
        .getElementById("performance")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= MODEL MESSAGE ================= */

function selectModel(model) {

    alert(
        "PORSCHE\n\n" +
        model +
        "\n\nPerformance engineered for those who refuse to compromise."
    );

}


/* ================= PERFORMANCE ================= */

function performanceMessage() {

    alert(
        "ENGINE STARTED.\n\n" +
        "Experience precision engineering, " +
        "instant response and pure driving emotion."
    );

}


/* ================= ABOUT ================= */

function showAbout() {

    alert(
        "PORSCHE\n\n" +
        "A legacy of performance, innovation and iconic design."
    );

}


/* ================= COUNTERS ================= */

const counters =
    document.querySelectorAll(
        ".counter"
    );

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;

                const counter =
                    entry.target;

                const target =
                    parseFloat(
                        counter.dataset.target
                    );

                let current = 0;

                const increment =
                    target / 80;

                function update() {

                    current += increment;

                    if (current < target) {

                        if (target < 10) {

                            counter.innerText =
                                current.toFixed(1);

                        } else {

                            counter.innerText =
                                Math.floor(
                                    current
                                );

                        }

                        requestAnimationFrame(
                            update
                        );

                    } else {

                        counter.innerText =
                            target;

                    }

                }

                update();

                counterObserver.unobserve(
                    counter
                );

            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach(counter => {

    counterObserver.observe(
        counter
    );

});

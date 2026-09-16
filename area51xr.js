// ---------------- CLASSIFIED ALERT ----------------

function showAlert() {
    document.getElementById("alertBox").classList.add("active");
}

function closeAlert() {
    document.getElementById("alertBox").classList.remove("active");
}


// Close alert when clicking outside the box

document.getElementById("alertBox").addEventListener("click", function(event) {

    if (event.target === this) {
        closeAlert();
    }

});


// ---------------- SYSTEM ACTIVATION ----------------

function activateSystem() {

    const button = document.querySelector(".final-section button");

    button.innerHTML = "SYSTEM ONLINE";

    button.style.background = "#8affb3";
    button.style.color = "#020405";
    button.style.borderColor = "#8affb3";

    setTimeout(() => {

        button.innerHTML = "ACTIVATE SYSTEM";

        button.style.background = "transparent";
        button.style.color = "#ff3030";
        button.style.borderColor = "#ff3030";

    }, 3000);

}


// ---------------- SCROLL REVEAL ----------------

const revealElements = document.querySelectorAll(
    ".facility-card, .timeline-item, .classified-card, .mystery-text"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition = "all .8s ease";

    observer.observe(element);

});


// ---------------- MOUSE PARALLAX ----------------

document.addEventListener("mousemove", (event) => {

    const ufo = document.querySelector(".ufo-container");

    if (!ufo) return;

    const x = (event.clientX / window.innerWidth - 0.5) * 20;
    const y = (event.clientY / window.innerHeight - 0.5) * 20;

    ufo.style.transform =
        `translate(${x}px, ${y}px)`;

});

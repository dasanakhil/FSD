function updateClock() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add 0 before single-digit numbers
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    // Display the time
    document.getElementById("clock").textContent =
        `${hours}:${minutes}:${seconds}`;

    // Display the date
    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    document.getElementById("date").textContent = date;
}

// Run the clock immediately
updateClock();

// Update the clock every second
setInterval(updateClock, 1000);

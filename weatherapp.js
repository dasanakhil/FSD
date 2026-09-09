async function getWeather() {

    const cityInput = document.getElementById("cityInput");

    const city = cityInput.value.trim();

    const loading = document.getElementById("loading");

    const error = document.getElementById("error");


    // Check if city is empty

    if (city === "") {

        error.innerText = "Please enter a city name.";

        return;
    }


    // Clear old messages

    error.innerText = "";

    loading.style.display = "block";


    try {

        // STEP 1:
        // Find the city using Open-Meteo Geocoding

        const geoURL =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json";


        const geoResponse = await fetch(geoURL);

        const geoData = await geoResponse.json();


        // Check city

        if (!geoData.results || geoData.results.length === 0) {

            throw new Error(
                "City not found. Please try another city."
            );
        }


        // Get city information

        const location = geoData.results[0];

        const latitude = location.latitude;

        const longitude = location.longitude;

        const cityName = location.name;

        const country = location.country;


        // STEP 2:
        // Get weather information

        const weatherURL =
            "https://api.open-meteo.com/v1/forecast?" +
            "latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
            "&timezone=auto";


        const weatherResponse = await fetch(weatherURL);

        const weatherData = await weatherResponse.json();


        // Current weather

        const current = weatherData.current;


        // Display city

        document.getElementById("cityName").innerText =
            cityName + ", " + country;


        // Temperature

        document.getElementById("temperature").innerText =
            Math.round(current.temperature_2m) + "°C";


        // Humidity

        document.getElementById("humidity").innerText =
            current.relative_humidity_2m + "%";


        // Wind speed

        document.getElementById("wind").innerText =
            current.wind_speed_10m + " km/h";


        // Weather description and icon

        const weatherInfo =
            getWeatherDescription(current.weather_code);


        document.getElementById("description").innerText =
            weatherInfo.description;


        document.getElementById("weatherIcon").innerText =
            weatherInfo.icon;


    }

    catch (error) {

        console.error(error);

        error.innerText = error.message;

        document.getElementById("cityName").innerText =
            "Error";

        document.getElementById("temperature").innerText =
            "--°C";

        document.getElementById("humidity").innerText =
            "--%";

        document.getElementById("wind").innerText =
            "-- km/h";

        document.getElementById("weatherIcon").innerText =
            "❌";
    }

    finally {

        loading.style.display = "none";
    }
}



// Weather code converter

function getWeatherDescription(code) {

    if (code === 0) {

        return {
            description: "Clear sky",
            icon: "☀️"
        };
    }


    if (code === 1 || code === 2) {

        return {
            description: "Partly cloudy",
            icon: "🌤️"
        };
    }


    if (code === 3) {

        return {
            description: "Overcast",
            icon: "☁️"
        };
    }


    if (code === 45 || code === 48) {

        return {
            description: "Foggy",
            icon: "🌫️"
        };
    }


    if (
        code >= 51 &&
        code <= 67
    ) {

        return {
            description: "Rain",
            icon: "🌧️"
        };
    }


    if (
        code >= 71 &&
        code <= 77
    ) {

        return {
            description: "Snow",
            icon: "❄️"
        };
    }


    if (
        code >= 80 &&
        code <= 82
    ) {

        return {
            description: "Rain showers",
            icon: "🌦️"
        };
    }


    if (
        code === 95 ||
        code === 96 ||
        code === 99
    ) {

        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };
    }


    return {

        description: "Unknown weather",

        icon: "🌤️"
    };
}



// Press Enter to search

document
    .getElementById("cityInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            getWeather();
        }

    });

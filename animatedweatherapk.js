async function getWeather() {

    const city = document
        .getElementById("cityInput")
        .value
        .trim();

    const loading =
        document.getElementById("loading");

    const errorBox =
        document.getElementById("error");

    const button =
        document.getElementById("searchButton");


    if (city === "") {

        errorBox.innerText =
            "Please enter a city name.";

        return;
    }


    errorBox.innerText = "";

    loading.style.display = "flex";

    button.disabled = true;

    button.innerText = "⌛";


    try {

        // STEP 1: Find the city

        const geoURL =
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&language=en&format=json";


        const geoResponse =
            await fetch(geoURL);


        if (!geoResponse.ok) {

            throw new Error(
                "Unable to find the city."
            );
        }


        const geoData =
            await geoResponse.json();


        if (
            !geoData.results ||
            geoData.results.length === 0
        ) {

            throw new Error(
                "City not found. Try another city."
            );
        }


        const location =
            geoData.results[0];


        // STEP 2: Get weather + daily forecast

        const weatherURL =
            "https://api.open-meteo.com/v1/forecast?" +
            "latitude=" + location.latitude +
            "&longitude=" + location.longitude +
            "&current=temperature_2m," +
            "relative_humidity_2m," +
            "apparent_temperature," +
            "weather_code," +
            "wind_speed_10m" +
            "&daily=weather_code," +
            "temperature_2m_max," +
            "temperature_2m_min," +
            "sunrise," +
            "sunset" +
            "&timezone=auto";


        const weatherResponse =
            await fetch(weatherURL);


        if (!weatherResponse.ok) {

            throw new Error(
                "Unable to get weather data."
            );
        }


        const weatherData =
            await weatherResponse.json();


        const current =
            weatherData.current;


        // City Name

        document
            .getElementById("cityName")
            .innerText =
            location.name +
            ", " +
            location.country;


        // Current Temperature

        document
            .getElementById("temperature")
            .innerText =
            Math.round(
                current.temperature_2m
            );


        // Humidity

        document
            .getElementById("humidity")
            .innerText =
            current.relative_humidity_2m +
            "%";


        // Wind

        document
            .getElementById("wind")
            .innerText =
            Math.round(
                current.wind_speed_10m
            ) +
            " km/h";


        // Feels Like

        const feelsLike =
            Math.round(
                current.apparent_temperature
            );


        document
            .getElementById("feelsLike")
            .innerText =
            "Feels like " +
            feelsLike +
            "°C";


        document
            .getElementById("feelsDetail")
            .innerText =
            feelsLike +
            "°C";


        // Weather Description

        const weather =
            getWeatherInfo(
                current.weather_code
            );


        document
            .getElementById("description")
            .innerText =
            weather.description;


        document
            .getElementById("weatherIcon")
            .innerText =
            weather.icon;


        // Sunrise

        document
            .getElementById("sunrise")
            .innerText =
            formatTime(
                weatherData.daily.sunrise[0]
            );


        // Sunset

        document
            .getElementById("sunset")
            .innerText =
            formatTime(
                weatherData.daily.sunset[0]
            );


        // Current Date and Time

        updateDateTime(
            weatherData.current.time
        );


        // 5 Day Forecast

        displayForecast(
            weatherData.daily
        );

    }

    catch (error) {

        console.error(error);

        errorBox.innerText =
            error.message;


        document
            .getElementById("cityName")
            .innerText =
            "Error";


        document
            .getElementById("temperature")
            .innerText =
            "--";


        document
            .getElementById("description")
            .innerText =
            "Weather unavailable";


        document
            .getElementById("weatherIcon")
            .innerText =
            "❌";

    }

    finally {

        loading.style.display =
            "none";


        button.disabled =
            false;


        button.innerText =
            "🔍";

    }
}



/* Weather Code Information */

function getWeatherInfo(code) {

    if (code === 0) {

        return {
            description: "Clear Sky",
            icon: "☀️"
        };
    }


    if (code === 1) {

        return {
            description: "Mainly Clear",
            icon: "🌤️"
        };
    }


    if (code === 2) {

        return {
            description: "Partly Cloudy",
            icon: "⛅"
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


    if (code >= 51 && code <= 57) {

        return {
            description: "Drizzle",
            icon: "🌦️"
        };
    }


    if (code >= 61 && code <= 67) {

        return {
            description: "Rainy",
            icon: "🌧️"
        };
    }


    if (code >= 71 && code <= 77) {

        return {
            description: "Snowy",
            icon: "❄️"
        };
    }


    if (code >= 80 && code <= 82) {

        return {
            description: "Rain Showers",
            icon: "🌦️"
        };
    }


    if (code === 95) {

        return {
            description: "Thunderstorm",
            icon: "⛈️"
        };
    }


    if (code === 96 || code === 99) {

        return {
            description: "Thunderstorm with Hail",
            icon: "⛈️"
        };
    }


    return {
        description: "Unknown",
        icon: "🌤️"
    };
}



/* Display 5-Day Forecast */

function displayForecast(daily) {

    const container =
        document.getElementById(
            "forecastContainer"
        );


    container.innerHTML = "";


    // Show first 5 days

    for (let i = 0; i < 5; i++) {

        const date =
            new Date(
                daily.time[i] +
                "T12:00:00"
            );


        const dayName =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "short"
                }
            );


        const weather =
            getWeatherInfo(
                daily.weather_code[i]
            );


        const maxTemp =
            Math.round(
                daily.temperature_2m_max[i]
            );


        const minTemp =
            Math.round(
                daily.temperature_2m_min[i]
            );


        container.innerHTML += `

            <div class="forecast-card">

                <p>${i === 0 ? "Today" : dayName}</p>

                <div class="forecast-icon">
                    ${weather.icon}
                </div>

                <h3>${maxTemp}°C</h3>

                <span class="min-temp">
                    ${minTemp}°C
                </span>

            </div>

        `;
    }
}



/* Format Sunrise and Sunset */

function formatTime(dateString) {

    if (!dateString) {

        return "--:--";
    }


    const date =
        new Date(
            dateString
        );


    return date.toLocaleTimeString(
        "en-US",
        {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        }
    );
}



/* Current Date and Time */

function updateDateTime(timeString) {

    if (!timeString) {

        return;
    }


    const date =
        new Date(
            timeString
        );


    const formattedDate =
        date.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    const formattedTime =
        date.toLocaleTimeString(
            "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );


    document
        .getElementById("dateTime")
        .innerText =
        formattedDate +
        " | " +
        formattedTime;
}



/* Press Enter */

document
    .getElementById("cityInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                getWeather();
            }

        }
    );


/* Load Delhi when the app starts */

window.addEventListener(
    "load",
    function() {

        document
            .getElementById("cityInput")
            .value =
            "Delhi";


        getWeather();

    }
);

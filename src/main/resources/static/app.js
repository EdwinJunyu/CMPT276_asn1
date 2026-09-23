const viewCityButton = document.getElementById("view-city-btn");

viewCityButton.addEventListener("click", function () {

    const city = document.getElementById("city-select").value;

    const geocodingURL =
        "https://geocoding-api.open-meteo.com/v1/search?name="
        + encodeURIComponent(city)
        + "&count=1&language=en&format=json";

    fetch(geocodingURL)
        .then(response => response.json())
        .then(locationData => {

            if (!locationData.results) {
                throw new Error("City not found.");
            }

            const latitude = locationData.results[0].latitude;
            const longitude = locationData.results[0].longitude;
            const cityName = locationData.results[0].name;

            const weatherURL =
                "https://api.open-meteo.com/v1/forecast"
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

            return fetch(weatherURL)
                .then(response => response.json())
                .then(weatherData => {

                    document.getElementById("city-name").textContent =
                        cityName;

                    document.getElementById("temperature").textContent =
                        weatherData.current.temperature_2m + " °C";

                    document.getElementById("wind").textContent =
                        weatherData.current.wind_speed_10m + " km/h";

                    document.getElementById("humidity").textContent =
                        weatherData.current.relative_humidity_2m + "%";
                });
        })
        .catch(error => {
            console.error(error);
        });
});
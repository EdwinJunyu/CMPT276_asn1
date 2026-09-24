const cityButtons = document.querySelectorAll(".city-btn");

cityButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const city = button.dataset.city;
        const latitude = button.dataset.lat;
        const longitude = button.dataset.lon;

        const weatherURL =
            "https://api.open-meteo.com/v1/forecast"
            + "?latitude=" + latitude
            + "&longitude=" + longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

        fetch(weatherURL)
            .then(response => response.json())
            .then(weatherData => {

                document.getElementById("city-name").textContent =
                    city;

                document.getElementById("temperature").textContent =
                    weatherData.current.temperature_2m + " °C";

                document.getElementById("wind").textContent =
                    weatherData.current.wind_speed_10m + " km/h";

                document.getElementById("humidity").textContent =
                    weatherData.current.relative_humidity_2m + "%";

            })
            .catch(error => {
                console.error(error);
            });

    });

});
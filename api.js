document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    const weatherCardsContainer = document.getElementById('weather-cards');

    dropdown.addEventListener('change', function() {
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        const location = selectedOption.textContent;
        const accessKey = 'd562f951fce799bb48b914e40c3cdbcf';
        const apiUrl = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${location}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderWeatherCard(data.current, weatherCardsContainer);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });

    function renderWeatherCard(currentWeather, container) {
        const cardHTML = `
            <div class="w-card">
                <h3>${currentWeather.observation_time}</h3>
                <p>Temperature: ${currentWeather.temperature}°C</p>
                <p>Weather: ${currentWeather.weather_descriptions[0]}</p>
                <img src="${currentWeather.weather_icons[0]}" alt="Weather Icon">
                <p>Humidity: ${currentWeather.humidity}%</p>
            </div>
        `;
        container.innerHTML = cardHTML;
    }
});

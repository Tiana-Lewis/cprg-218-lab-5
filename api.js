document.addEventListener('DOMContentLoaded', function() {
    const locationDropdown = document.getElementById('location-dropdown');
    const weatherCard = document.getElementById('weather-card');

    locationDropdown.addEventListener('change', function() {
        const selectedLocation = locationDropdown.value;
        const apiKey = '3d4792ea8fd9e88098fd04f01fadc422';
        const apiUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${selectedLocation}`;

        fetchWeather(apiUrl);
    });

    async function fetchWeather(apiUrl) {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            const data = await response.json();
            renderWeatherCard(data.current);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function renderWeatherCard(weatherData) {
        const cardHTML = `
            <div class="card">
                <h3>${weatherData.observation_time}</h3>
                <p>Temperature: ${weatherData.temperature}°C</p>
                <p>Weather: ${weatherData.weather_descriptions[0]}</p>
                <img src="${weatherData.weather_icons[0]}" alt="Weather Icon">
                <p>Humidity: ${weatherData.humidity}%</p>
            </div>
        `;
        weatherCard.innerHTML = cardHTML;
    }
});

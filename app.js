document.getElementById('check-weather').addEventListener('click', async function () {
    const countryValue = document.getElementById('country').value;
    const cityValue = document.getElementById('city').value;
    const postalCodeValue = document.getElementById('postalcode').value;

    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...'; // Loading message

    try {
        const responseData = await fetchWeatherData(countryValue, cityValue, postalCodeValue);

        if (responseData) {
            resultBox.innerHTML = formatWeatherData(responseData);
        } else {
            resultBox.innerHTML = '<p>No weather information available for this location.</p>';
        }
    } catch (error) {
        resultBox.innerHTML = `<p style="color: red;">Error fetching weather data: ${error.message}</p>`;
        console.error('Error:', error);
    }
});

async function fetchWeatherData(country, city, postalCode) {
    const url = `https://open-weather13.p.rapidapi.com/city/${city}/${country}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1a37e075camsh2b27495fee90d37p1839b1jsne3b0f7e23b05',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    return await response.json();
}

function formatWeatherData(weatherData) {
    return `
        <div class="weather-info">
            <h3>Weather Details</h3>
            <p><strong>City:</strong> ${weatherData.name || 'N/A'}</p>
            <p><strong>Temperature:</strong> ${weatherData.main.temp || 'N/A'}°C</p>
            <p><strong>Feels Like:</strong> ${weatherData.main.feels_like || 'N/A'}°C</p>
            <p><strong>Minimum Temperature:</strong> ${weatherData.main.temp_min || 'N/A'}°C</p>
            <p><strong>Maximum Temperature:</strong> ${weatherData.main.temp_max || 'N/A'}°C</p>
            <p><strong>Humidity:</strong> ${weatherData.main.humidity || 'N/A'}%</p>
            <p><strong>Wind Speed:</strong> ${weatherData.wind.speed || 'N/A'} m/s</p>
            <p><strong>Wind Direction:</strong> ${weatherData.wind.deg || 'N/A'}°</p>
            <p><strong>Cloudiness:</strong> ${weatherData.clouds.all || 'N/A'}%</p>
            <p><strong>Sunrise:</strong> ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() || 'N/A'}</p>
            <p><strong>Sunset:</strong> ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() || 'N/A'}</p>
        </div>
    `;
}
document.getElementById('check-weather').addEventListener('click', async function () {
    const countryValue = document.getElementById('country').value;
    const cityValue = document.getElementById('city').value;
    const postalCodeValue = document.getElementById('postalcode').value;

    const resultBox = document.getElementById('result');
    resultBox.innerHTML = 'Fetching weather data...'; // Display a loading message

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
        <div>
            <p><strong>City:</strong> ${weatherData.name || 'N/A'}</p>
            <p><strong>Temperature:</strong> ${weatherData.temp || 'N/A'}°C</p>
            <p><strong>Feels Lke:</strong> ${weatherData.feels_like || 'N/A'}°C</p>
            <p><strong>Humidity:</strong> ${weatherData.humidity || 'N/A'}%</p>
            <p><strong>Wind Speed:</strong> ${weatherData.wind_speed || 'N/A'} m/s</p>
            <p><strong>Cloudiness:</strong> ${weatherData.cloud_pct || 'N/A'}%</p>
        </div>
    `;
}

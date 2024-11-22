document.addEventListener("DOMContentLoaded", function () {
    const url = 'https://open-weather13.p.rapidapi.com/city/landon/EN';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1a37e075camsh2b27495fee90d37p1839b1jsne3b0f7e23b05',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Fetch Weather Data';
    document.body.appendChild(fetchButton);

    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.body.appendChild(resultDiv);

    fetchButton.addEventListener('click', async function () {
        try {
            console.log('Fetching weather data...');
            const response = await fetch(url, options);

            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error(`API Request Failed - Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log('API Response:', responseData);

            if (Object.keys(responseData).length > 0) {
                resultDiv.innerHTML = `
                    <h2>Weather Data</h2>
                    <pre>${JSON.stringify(responseData, null, 2)}</pre>
                `;
            } else {
                resultDiv.innerHTML = '<p>No data returned from API.</p>';
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            resultDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        }
    });
});
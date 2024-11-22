document.addEventListener("DOMContentLoaded", function () {
    // Define the API details
    const url = 'https://open-weather13.p.rapidapi.com/city/landon/EN';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1a37e075camsh2b27495fee90d37p1839b1jsne3b0f7e23b05',
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
    };

    // Button to trigger API fetch
    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Fetch Weather Data';
    document.body.appendChild(fetchButton);

    // Div to display results
    const resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    document.body.appendChild(resultDiv);

    // Fetch API on button click
    fetchButton.addEventListener('click', async function () {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            // Display the result in the page
            resultDiv.innerHTML = `
                <h2>Weather Data</h2>
                <pre>${JSON.stringify(result, null, 2)}</pre>
            `;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            resultDiv.innerHTML = `<p style="color: red;">Failed to fetch weather data. Check console for details.</p>`;
        }
    });
});
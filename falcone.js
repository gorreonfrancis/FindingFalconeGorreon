const API_URL = 'https://findfalcone.geektrust.com';

async function testConnection() {
    try {
        // Step 1: Get Token
        let tokenResponse = await fetch(`https://findfalcone.geektrust.com/token`, {
            method: 'POST',
            headers: { 'Accept': 'application/json' }
        });
        let tokenData = await tokenResponse.json();
        let token = tokenData.token;
        console.log('Token:', token);

        // Step 2: Define hardcoded planets and vehicles
        const requestData = {
            token: token,
            planet_names: ["Donlon", "Enchai", "Jebing", "Sapir"],
            vehicle_names: ["Space pod", "Space rocket", "Space shuttle", "Space ship"]
        };

        // Step 3: Send request to /find
        let response = await fetch(`https://findfalcone.geektrust.com/find`, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        let responseData = await response.json();

        console.log('Response:', responseData);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testConnection();

<?php

// Define the API URL
$apiUrl = "https://jsonplaceholder.typicode.com/users";

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignore SSL verification (only for testing)

// Execute the API request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo "cURL Error: " . curl_error($ch);
    exit;
}

// Close cURL session
curl_close($ch);

// Decode the JSON response
$data = json_decode($response, true);

// Display the API data
if (!empty($data)) {
    echo "<h2>Users List</h2>";
    echo "<ul>";
    foreach ($data as $user) {
        echo "<li><strong>" . htmlspecialchars($user['name']) . "</strong> - " . htmlspecialchars($user['email']) . "</li>";
    }
    echo "</ul>";
} else {
    echo "No data found.";
}

?>

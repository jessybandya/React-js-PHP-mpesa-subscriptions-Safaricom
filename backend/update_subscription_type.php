<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$servername = ""; // Replace with your database server name
$username = ""; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = ""; // Replace with your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $newSubscriptionStatus = $_POST['newSubscriptionType'];
    $created_at = $_POST['created_at'];
    

    // Check if the email exists in the database
    $checkEmailQuery = "SELECT * FROM users1 WHERE email = '$email'";
    $checkEmailResult = $conn->query($checkEmailQuery);

    if ($checkEmailResult->num_rows > 0) {
        // Update the subscription status
        $updateStatusQuery = "UPDATE users1 SET subscription_type = '$newSubscriptionStatus', created_at = '$created_at' WHERE email = '$email'";

        if ($conn->query($updateStatusQuery) === TRUE) {
            echo "Subscription status updated successfully";
        } else {
            echo "Error updating subscription status: " . $conn->error;
        }
    } else {
        echo "Email not found in the database";
    }
}

// Close the database connection
$conn->close();
?>

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
    // Create a new user
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subscriptionType = $_POST['subscriptionType'];
    $subscriptionStatus = $_POST['subscriptionStatus'];
    $password = $_POST['password'];
    $created_at = $_POST['created_at'];
    

    // Check if email already exists
    $checkEmailQuery = "SELECT * FROM users1 WHERE email = '$email'";
    $checkEmailResult = $conn->query($checkEmailQuery);

    if ($checkEmailResult->num_rows > 0) {
        echo "Email already exists";
    } else {
        // Hash the password using bcrypt
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        $sql = "INSERT INTO users1 (name, email, subscription_type, subscription_status, password, created_at) 
                VALUES ('$name', '$email', '$subscriptionType', '$subscriptionStatus', '$hashedPassword', '$created_at')";

        if ($conn->query($sql) === TRUE) {
            echo "New user created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

// Close the database connection
$conn->close();
?>

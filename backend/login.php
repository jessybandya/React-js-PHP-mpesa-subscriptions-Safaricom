<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database configuration
$host = ""; // Replace with your database server name
$dbName = ""; // Replace with your database name
$username = ""; // Replace with your database username
$password = ""; // Replace with your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}

// Retrieve form data
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

// Retrieve user data from the database based on the provided email
$stmt = $pdo->prepare("SELECT * FROM users1 WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user) {
    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Login successful

        // Start or resume the session
        session_start();

        // Generate a unique token
        $token = bin2hex(random_bytes(16));

        // Store the token and user ID in the session
        $_SESSION['token'] = $token;
        $_SESSION['user_id'] = $user['id'];

        $response = [
            'message' => 'Login successful. Welcome ' . $user['name'] . ' ' . $user['name'] . '!',
            'token' => $token,
            'user' => [
                'name' => $user['name'],
                'subscription_type' => $user['subscription_type'],
                'subscription_status' => $user['subscription_status'],
                'created_at' => $user['created_at'],
                'email' => $user['email'],
                'id' => $user['id'],
            ]
        ];

        if (isset($user['auth_id'])) {
            $response['authId'] = $user['auth_id'];
        } else {
            // If auth_id is not set, you can generate a unique identifier or use user's ID as authId
            $response['authId'] = $user['id']; // Assuming you have an 'id' column in the users table
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        // Invalid password
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid email or password']);
    }
} else {
    // User not found
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid email or password']);
}
?>

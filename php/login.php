<?php
session_start();

header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "compton_db");
if ($conn->connect_error) {
    echo json_encode(["errors" => ["server" => "Connection failed: " . $conn->connect_error]]);
    exit;
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(["errors" => ["login" => "Please fill in both username and password."]]);
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["errors" => ["login" => "Invalid username or password."]]);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password_hash'])) {
    echo json_encode(["errors" => ["login" => "Invalid username or password."]]);
    exit;
}

$_SESSION['user_id'] = $user['id'];
$_SESSION['username'] = $user['username'];

echo json_encode(["success" => true]);
?>
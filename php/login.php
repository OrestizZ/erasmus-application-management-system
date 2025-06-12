<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    header("Location: /index.html");
    exit;
}

require_once 'db_connect.php';

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(["errors" => ["login" => "Please fill in both username and password."]]);
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password_hash, first_name, last_name, student_id, role FROM users WHERE username = ?");
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
$_SESSION['firstName'] = $user['first_name'];
$_SESSION['lastName'] = $user['last_name'];
$_SESSION['studentId'] = $user['student_id'];
$_SESSION['role'] = $user['role'];

echo json_encode(["success" => true]);
?>
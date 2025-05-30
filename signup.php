<?php
header('Content-Type: application/json');

$conn = new mysqli("localhost", "root", "", "compton_db");
if ($conn->connect_error) {
    echo json_encode(["errors" => ["server" => "Connection failed: " . $conn->connect_error]]);
    exit;
}

$first = $_POST['firstName'] ?? '';
$last = $_POST['lastName'] ?? '';
$studentId = $_POST['studentId'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirmPassword'] ?? '';

$errors = [];

// Server-side validation:
if (!preg_match("/^[a-zA-Zα-ωΑ-ΩάέήίόύώΆΈΉΊΌΎΏ\s]+$/u", $first)) {
    $errors['firstName'] = "First name must not contain numbers or symbols.";
}

if (!preg_match("/^[a-zA-Zα-ωΑ-ΩάέήίόύώΆΈΉΊΌΎΏ\s]+$/u", $last)) {
    $errors['lastName'] = "Last name must not contain numbers or symbols.";
}

if (!preg_match("/^2022\d{9}$/", $studentId)) {
    $errors['studentId'] = "Student ID must start with 2022 and have 13 digits.";
}

if (!preg_match("/^\d{10}$/", $phone)) {
    $errors['phone'] = "Phone must be exactly 10 digits.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Invalid email format.";
}

if (strlen($password) < 5 || !preg_match("/[\W]/", $password)) {
    $errors['password'] = "Password must be at least 5 characters and contain a symbol.";
}

if ($password !== $confirm) {
    $errors['confirmPassword'] = "Passwords do not match.";
}

// Check existing username/email in DB
$check = $conn->prepare("SELECT id, email, username FROM users WHERE email = ? OR username = ?");
$check->bind_param("ss", $email, $username);
$check->execute();
$result = $check->get_result();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if ($row['email'] === $email) {
            $errors['email'] = "Email already exists.";
        }
        if ($row['username'] === $username) {
            $errors['username'] = "Username already exists.";
        }
    }
}

if (!empty($errors)) {
    echo json_encode(["errors" => $errors]);
    exit;
}

// Insert to DB
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, student_id, phone, email, username, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $first, $last, $studentId, $phone, $email, $username, $hashed);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["errors" => ["server" => "Database error. Please try again."]]);
}
?>

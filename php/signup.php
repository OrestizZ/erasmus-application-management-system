<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    header("Location: /index.html");
    exit;
}

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once 'db_connect.php';

$first = $_POST['firstName'] ?? '';
$last = $_POST['lastName'] ?? '';
$studentId = $_POST['studentId'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$role = 'user';

$errors = [];

try {
    $check = $conn->prepare("SELECT email, username, student_id FROM users WHERE email = ? OR username = ? OR student_id = ?");
    $check->bind_param("sss", $email, $username, $studentId);
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
            if ($row['student_id'] === $studentId) {
                $errors['studentId'] = "Student ID already exists.";
            }
        }
    }

    if (!empty($errors)) {
        echo json_encode(["errors" => $errors]);
        exit;
    }

    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, student_id, phone, email, username, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssss", $first, $last, $studentId, $phone, $email, $username, $hashed, $role);

    $stmt->execute();
    echo json_encode(["success" => true]);

} catch (mysqli_sql_exception $e) {
    echo json_encode(["errors" => ["server" => "Database error. Please try again."]]);
}
?>
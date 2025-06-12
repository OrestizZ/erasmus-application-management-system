<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        "loggedIn" => true,
        "username" => $_SESSION['username'],
        "firstName" => $_SESSION['firstName'],
        "lastName" => $_SESSION['lastName'],
        "studentId" => $_SESSION['studentId'],
        "role" => $_SESSION['role'] ?? 'user'
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
?>
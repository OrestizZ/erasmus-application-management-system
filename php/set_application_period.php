<?php
session_start();
header('Content-Type: application/json');
require_once 'db_connect.php';

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$start = $data['start_date'] ?? null;
$end = $data['end_date'] ?? null;

// if (!$start || !$end) {
//     echo json_encode(["success" => false, "error" => "Invalid input"]);
//     exit;
// }

$stmt = $conn->prepare("UPDATE application_period SET start_date = ?, end_date = ? WHERE id = 1");
$stmt->bind_param("ss", $start, $end);
$stmt->execute();

echo json_encode(["success" => true]);
?>
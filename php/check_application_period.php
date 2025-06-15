<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$now = date('Y-m-d');

$sql = "SELECT COUNT(*) as count FROM application_period WHERE '$now' BETWEEN start_date AND end_date";
$result = $conn->query($sql);
$row = $result->fetch_assoc();

$isOpen = ($row['count'] > 0);

echo json_encode(['isOpen' => $isOpen]);
?>
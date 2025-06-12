<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$query = $conn->query("SELECT start_date, end_date FROM application_period WHERE id = 1");
$row = $query->fetch_assoc();

echo json_encode([
    "start_date" => $row['start_date'],
    "end_date" => $row['end_date']
]);
?>
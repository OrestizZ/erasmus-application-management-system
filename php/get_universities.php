<?php
require_once 'db_connect.php';

header('Content-Type: application/json');

$query = "SELECT id, name FROM universities ORDER BY name ASC";
$result = $conn->query($query);

$universities = [];

while ($row = $result->fetch_assoc()) {
    $universities[] = $row;
}

echo json_encode($universities);
?>
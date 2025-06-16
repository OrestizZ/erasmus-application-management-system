<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$conn->query("UPDATE settings SET results_published = 1 WHERE id = 1");

echo json_encode(["success" => true]);
?>
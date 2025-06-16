<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$conn->query("UPDATE applications SET accepted = 0");

if (!empty($_POST['accept']) && is_array($_POST['accept'])) {
    $ids = array_map('intval', $_POST['accept']);
    $idList = implode(",", $ids);
    $query = "UPDATE applications SET accepted = 1 WHERE id IN ($idList)";
    $conn->query($query);
}

echo json_encode(['success' => true, 'message' => 'Accepted applications updated.']);
?>
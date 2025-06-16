<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$updateAccepted = "UPDATE applications SET public = 1 WHERE accepted = 1";

$updateNotAccepted = "UPDATE applications SET public = 0 WHERE accepted = 0";

$success1 = $conn->query($updateAccepted);
$success2 = $conn->query($updateNotAccepted);

if ($success1 && $success2) {
    echo json_encode(['success' => true, 'message' => 'Applications published based on acceptance status.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}
?>
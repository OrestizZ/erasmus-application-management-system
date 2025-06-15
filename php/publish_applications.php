<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

// Δημοσιεύει μόνο τις accepted αιτήσεις (public = 1)
$updateAccepted = "UPDATE applications SET public = 1 WHERE accepted = 1";

// Κάνει μη δημόσιες τις μη accepted αιτήσεις (public = 0)
$updateNotAccepted = "UPDATE applications SET public = 0 WHERE accepted = 0";

$success1 = $conn->query($updateAccepted);
$success2 = $conn->query($updateNotAccepted);

if ($success1 && $success2) {
    echo json_encode(['success' => true, 'message' => 'Applications published based on acceptance status.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}
?>
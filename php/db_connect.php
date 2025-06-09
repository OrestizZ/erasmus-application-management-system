<?php
$servername = "localhost";
$dbUsername = "root";
$dbPassword = "";     
$dbName = "compton_db";

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    echo json_encode(["errors" => ["server" => "Connection failed: " . $conn->connect_error]]);
    exit;
}
?>
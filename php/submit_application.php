<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
require_once 'db_connect.php';
header('Content-Type: application/json');

$response = ['success' => false, 'errors' => []];

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success' => false, 'errors' => ['general' => 'User not logged in']]);
  exit;
}

$user_id = $_SESSION['user_id'];

$uploadDir = realpath(__DIR__ . '/../uploads') . '/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$transcriptPath = '';
$certificatePath = '';

if (isset($_FILES['transcript_path']) && $_FILES['transcript_path']['error'] === 0) {
    $filename = basename($_FILES['transcript_path']['name']);
    $targetPath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['transcript_path']['tmp_name'], $targetPath)) {
        $transcriptPath = $filename;
    }
}

if (isset($_FILES['certificates_path']) && $_FILES['certificates_path']['error'] === 0) {
    $filename = basename($_FILES['certificates_path']['name']);
    $targetPath = $uploadDir . $filename;
    if (move_uploaded_file($_FILES['certificates_path']['tmp_name'], $targetPath)) {
        $certificatePath = $filename;
    }
}

// Read form fields
$avg_grade = $_POST['avg_grade'] ?? null;
$pass_rate = $_POST['pass_rate'] ?? null;
$english_level = $_POST['english_level'] ?? '';
$university_1 = $_POST['university_1'] ?? '';
$university_2 = !empty($_POST['university_2']) ? $_POST['university_2'] : 'NULL';
$university_3 = !empty($_POST['university_3']) ? $_POST['university_3'] : 'NULL';

// Simple validation
if ($avg_grade === null || $pass_rate === null || empty($english_level) || empty($university_1)) {
    $response['errors']['server'] = 'Missing required fields.';
    echo json_encode($response);
    exit;
}

// Escape values
$english_level = $conn->real_escape_string($english_level);
$university_1 = $conn->real_escape_string($university_1);
$university_2 = $conn->real_escape_string($university_2);
$university_3 = $conn->real_escape_string($university_3);

$query = "
INSERT INTO applications 
(user_id, avg_grade, pass_rate, english_level, university_1, university_2, university_3, transcript_path, certificates_path, accepted, submitted_at)
VALUES 
($user_id, $avg_grade, $pass_rate, '$english_level', $university_1, " . ($university_2 === 'NULL' ? 'NULL' : $university_2) . ", " . ($university_3 === 'NULL' ? 'NULL' : $university_3) . ", '$transcriptPath', '$certificatePath', NULL, NOW())
";

if ($conn->query($query)) {
    $response['success'] = true;
} else {
    $response['errors']['server'] = 'Database error: ' . $conn->error;
}

echo json_encode($response);
?>
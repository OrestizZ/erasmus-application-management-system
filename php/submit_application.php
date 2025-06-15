<?php
session_start();
require_once 'db_connect.php';
header('Content-Type: application/json');

$response = ['success' => false, 'errors' => []];

if (!isset($_SESSION['user_id'])) {
  echo json_encode(['success' => false, 'errors' => ['general' => 'User not logged in']]);
  exit;
}

$user_id = $_SESSION['user_id'];
$user_folder = 'user_' . $user_id;

$uploadBase = realpath(__DIR__ . '/../uploads') . '/';
$userUploadDir = $uploadBase . $user_folder . '/';

if (!is_dir($userUploadDir)) {
  mkdir($userUploadDir, 0777, true);
}

// --- Upload GPA (transcript) ---
$gpaPath = '';
if (isset($_FILES['gpa_path']) && $_FILES['gpa_path']['error'] === 0) {
  $filename = basename($_FILES['gpa_path']['name']);
  $targetPath = $userUploadDir . $filename;
  if (move_uploaded_file($_FILES['gpa_path']['tmp_name'], $targetPath)) {
    $gpaPath = $user_folder . '/' . $filename;
  }
}

// --- Upload English Proof ---
$englishPath = '';
if (isset($_FILES['english_path']) && $_FILES['english_path']['error'] === 0) {
  $filename = basename($_FILES['english_path']['name']);
  $targetPath = $userUploadDir . $filename;
  if (move_uploaded_file($_FILES['english_path']['tmp_name'], $targetPath)) {
    $englishPath = $user_folder . '/' . $filename;
  }
}

// --- Upload multiple certificates ---
$certificatePaths = [];
if (isset($_FILES['certificates_path']) && is_array($_FILES['certificates_path']['name'])) {
  foreach ($_FILES['certificates_path']['name'] as $index => $name) {
    if ($_FILES['certificates_path']['error'][$index] === 0) {
      $filename = basename($name);
      $tmp_name = $_FILES['certificates_path']['tmp_name'][$index];
      $targetPath = $userUploadDir . $filename;
      if (move_uploaded_file($tmp_name, $targetPath)) {
        $certificatePaths[] = $user_folder . '/' . $filename;  // Αποθήκευση στο path
      }
    }
  }
}

$certificatePathsJson = json_encode($certificatePaths);

// --- Read and validate other fields ---
$avg_grade = $_POST['avg_grade'] ?? null;
$pass_rate = $_POST['pass_rate'] ?? null;
$english_level = $_POST['english_level'] ?? '';
$university_1 = $_POST['university_1'] ?? '';
$university_2 = !empty($_POST['university_2']) ? $_POST['university_2'] : 'NULL';
$university_3 = !empty($_POST['university_3']) ? $_POST['university_3'] : 'NULL';

if ($avg_grade === null || $pass_rate === null || empty($english_level) || empty($university_1)) {
  $response['errors']['server'] = 'Missing required fields.';
  echo json_encode($response);
  exit;
}

// Escape strings
$english_level = $conn->real_escape_string($english_level);
$university_1 = (int)$university_1;
$university_2 = ($university_2 !== 'NULL') ? (int)$university_2 : 'NULL';
$university_3 = ($university_3 !== 'NULL') ? (int)$university_3 : 'NULL';

// Build query
$query = "
INSERT INTO applications 
(user_id, avg_grade, pass_rate, english_level, university_1, university_2, university_3, gpa_path, english_path, certificates_path, accepted, submitted_at)
VALUES 
($user_id, $avg_grade, $pass_rate, '$english_level', $university_1, $university_2, $university_3, '$gpaPath', '$englishPath', '$certificatePathsJson', NULL, NOW())
";

if ($conn->query($query)) {
  $response['success'] = true;
} else {
  $response['errors']['server'] = 'Database error: ' . $conn->error;
}

echo json_encode($response);
?>
<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

// Start query
$query = "
SELECT 
  a.*, 
  u.first_name, 
  u.last_name, 
  u.student_id,
  uni1.name AS university_1_name,
  uni2.name AS university_2_name,
  uni3.name AS university_3_name
FROM applications a
JOIN users u ON a.user_id = u.id
LEFT JOIN universities uni1 ON a.university_1 = uni1.id
LEFT JOIN universities uni2 ON a.university_2 = uni2.id
LEFT JOIN universities uni3 ON a.university_3 = uni3.id
";

$conditions = [];
$params = [];
$types = "";

// Apply filters
if (isset($_GET['minPassRate']) && is_numeric($_GET['minPassRate'])) {
    $conditions[] = "a.pass_rate >= ?";
    $params[] = $_GET['minPassRate'];
    $types .= "d";
}

if (isset($_GET['university']) && $_GET['university'] !== "") {
    $conditions[] = "(a.university_1 = ? OR a.university_2 = ? OR a.university_3 = ?)";
    $params[] = $_GET['university'];
    $params[] = $_GET['university'];
    $params[] = $_GET['university'];
    $types .= "iii";
}

if (count($conditions) > 0) {
    $query .= " WHERE " . implode(" AND ", $conditions);
}

if (isset($_GET['sortByGPA']) && $_GET['sortByGPA'] === 'true') {
    $query .= " ORDER BY a.avg_grade DESC";
}

// Prepare and bind
$stmt = $conn->prepare($query);
if ($params) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$applications = [];

while ($row = $result->fetch_assoc()) {
    $userFolder = "uploads/";

    $certificates = [];
    if (!empty($row['certificates_path'])) {
        $certsArray = json_decode($row['certificates_path'], true);
        if (is_array($certsArray)) {
            foreach ($certsArray as $file) {
                $certificates[] = $userFolder . $file;
            }
        }
    }

    $applications[] = [
        'firstName' => $row['first_name'],
        'lastName' => $row['last_name'],
        'studentId' => $row['student_id'],
        'avg_grade' => $row['avg_grade'],
        'pass_rate' => $row['pass_rate'],
        'english_level' => $row['english_level'],
        'university_1' => $row['university_1_name'],
        'university_2' => $row['university_2_name'],
        'university_3' => $row['university_3_name'],
        'gpa_path' => !empty($row['gpa_path']) ? $userFolder . $row['gpa_path'] : null,
        'english_path' => !empty($row['english_path']) ? $userFolder . $row['english_path'] : null,
        'certificates_path' => $certificates,
        'accepted' => $row['accepted'],
        'submitted_at' => $row['submitted_at']
    ];
}

echo json_encode(['success' => true, 'applications' => $applications]);
?>
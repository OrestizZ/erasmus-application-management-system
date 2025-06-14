<?php
require_once 'db_connect.php';
header('Content-Type: application/json');


$min_pass_rate = isset($_GET['min_pass_rate']) ? intval($_GET['min_pass_rate']) : 0;
$filter_university = isset($_GET['university_id']) ? intval($_GET['university_id']) : null;
$order_by_avg = isset($_GET['order_by_avg']) ? $_GET['order_by_avg'] === 'desc' : false;


$sql = "
SELECT
  a.id,
  u.first_name,
  u.last_name,
  u.username,
  u.student_id,
  a.avg_grade,
  a.pass_rate,
  a.english_level,
  a.transcript_path,
  a.certificates_path,
  a.accepted,
  a.submitted_at,
  un1.name AS university_1,
  un2.name AS university_2,
  un3.name AS university_3
FROM applications a
JOIN users u ON a.user_id = u.id
LEFT JOIN universities un1 ON a.university_1 = un1.id
LEFT JOIN universities un2 ON a.university_2 = un2.id
LEFT JOIN universities un3 ON a.university_3 = un3.id
WHERE a.pass_rate >= ?
";

$params = [$min_pass_rate];
$types = "i";


if ($filter_university) {
    $sql .= " AND (
        a.university_1 = ? OR
        a.university_2 = ? OR
        a.university_3 = ?
    )";
    $params[] = $filter_university;
    $params[] = $filter_university;
    $params[] = $filter_university;
    $types .= "iii";
}


$sql .= $order_by_avg ? " ORDER BY a.avg_grade DESC" : "";

$stmt = $conn->prepare($sql);
$stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$applications = [];
while ($row = $result->fetch_assoc()) {
    $applications[] = $row;
}

echo json_encode($applications);
?>

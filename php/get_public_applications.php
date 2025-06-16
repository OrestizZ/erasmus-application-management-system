<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$now = date('Y-m-d');
$periodCheck = $conn->query("SELECT * FROM application_period WHERE start_date <= '$now' AND end_date >= '$now'");
$applicationOpen = $periodCheck->num_rows > 0;

if ($applicationOpen) {
    echo json_encode([
        'success' => true,
        'period_active' => true,
        'applications' => []
    ]);
    exit;
}

$query = "
SELECT 
    u.first_name, 
    u.last_name, 
    u.student_id,
    a.avg_grade,
    a.pass_rate,
    a.english_level,
    uni1.name AS university_1,
    uni2.name AS university_2,
    uni3.name AS university_3
FROM applications a
JOIN users u ON a.user_id = u.id
LEFT JOIN universities uni1 ON a.university_1 = uni1.id
LEFT JOIN universities uni2 ON a.university_2 = uni2.id
LEFT JOIN universities uni3 ON a.university_3 = uni3.id
WHERE a.public = 1 AND a.accepted = 1
ORDER BY a.avg_grade DESC, a.pass_rate DESC
";

$result = $conn->query($query);

$applications = [];
while ($row = $result->fetch_assoc()) {
    $applications[] = $row;
}

echo json_encode([
    'success' => true,
    'period_active' => false,
    'applications' => $applications
]);
?>
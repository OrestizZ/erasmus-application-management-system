<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

// Έλεγχος αν είναι δημοσιευμένα
$check = $conn->query("SELECT results_published FROM settings WHERE id = 1");
if (!$check || !$check->fetch_assoc()['results_published']) {
    echo json_encode(["error" => "Results not yet published."]);
    exit;
}

$sql = "
SELECT
  u.first_name,
  u.last_name,
  u.student_id,
  a.avg_grade,
  a.pass_rate,
  a.english_level,
  un1.name AS university_1
FROM applications a
JOIN users u ON a.user_id = u.id
JOIN universities un1 ON a.university_1 = un1.id
WHERE a.accepted = 1
";

$result = $conn->query($sql);
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
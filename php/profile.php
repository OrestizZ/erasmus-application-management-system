<?php
session_start();
header('Content-Type: application/json');

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

require_once 'db_connect.php';

$field = $_POST['field'] ?? null;
$newValue = $_POST['newValue'] ?? '';
$userId = $_SESSION['user_id'];

if (empty($field) || empty($newValue)) {
    echo json_encode(["errors" => ["general" => "Missing required fields"]]);
    exit;
}

$allowedFields = [
    'first_name', 
    'last_name', 
    'student_id', 
    'phone', 
    'email', 
    'password_hash'
];

if (!in_array($field, $allowedFields)) {
    echo json_encode(["errors" => ["general" => "Invalid field selected"]]);
    exit;
}

try {
    // 5. ΕΙΔΙΚΟΙ ΕΛΕΓΧΟΙ ΓΙΑ ΚΡΙΣΙΜΑ ΠΕΔΙΑ
    $errors = [];
    
    // Ελεγχος μοναδικότητας email
    if ($field === 'email') {
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ? AND id != ?");
        $stmt->bind_param("si", $newValue, $userId);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            $errors['email'] = "Email already in use by another account";
        }
    }
    
    // Ελεγχος μοναδικότητας studentId
    if ($field === 'student_id') {
        $stmt = $conn->prepare("SELECT id FROM users WHERE student_id = ? AND id != ?");
        $stmt->bind_param("si", $newValue, $userId);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            $errors['studentId'] = "Student ID already in use";
        }
    }
    
    // Αν υπάρχουν σφάλματα, επιστροφή
    if (!empty($errors)) {
        echo json_encode(["errors" => $errors]);
        exit;
    }

    // 6. ΕΙΔΙΚΗ ΠΕΡΙΠΤΩΣΗ: ΑΛΛΑΓΗ ΚΩΔΙΚΟΥ
    if ($field === 'password_hash') {
        $hashedPassword = password_hash($newValue, PASSWORD_DEFAULT);
        $updateSql = "UPDATE users SET password_hash = ? WHERE id = ?";
        $stmt = $conn->prepare($updateSql);
        $stmt->bind_param("si", $hashedPassword, $userId);
    } 
    // 7. ΓΙΑ ΟΛΑ ΤΑ ΑΛΛΑ ΠΕΔΙΑ
    else {
        $updateSql = "UPDATE users SET $field = ? WHERE id = ?";
        $stmt = $conn->prepare($updateSql);
        $stmt->bind_param("si", $newValue, $userId);
    }

    $stmt->execute();

    $sessionFieldMap = [
        'first_name' => 'firstName',
        'last_name' => 'lastName',
        'student_id' => 'studentId'
    ];

    if (isset($sessionFieldMap[$field])) {
        $_SESSION[$sessionFieldMap[$field]] = $newValue;
    }

    echo json_encode(["success" => true]);

} catch (mysqli_sql_exception $e) {
    echo json_encode(["errors" => ["server" => "Database error: " . $e->getMessage()]]);
}
?>
<?php
require_once 'db_connect.php';
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'], $params);


if ($method === 'GET' && !isset($params['id'])) {
    $result = $conn->query("SELECT * FROM universities");
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
    exit;
}


if ($method === 'GET' && isset($params['id'])) {
    $id = intval($params['id']);
    $stmt = $conn->prepare("SELECT * FROM universities WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode($stmt->get_result()->fetch_assoc());
    exit;
}


if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("INSERT INTO universities (name, country, website) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $data['name'], $data['country'], $data['website']);
    $stmt->execute();
    echo json_encode(["id" => $stmt->insert_id]);
    exit;
}


if ($method === 'PUT' && isset($params['id'])) {
    $id = intval($params['id']);
    $data = json_decode(file_get_contents("php://input"), true);
    $stmt = $conn->prepare("UPDATE universities SET name = ?, country = ?, website = ? WHERE id = ?");
    $stmt->bind_param("sssi", $data['name'], $data['country'], $data['website'], $id);
    $stmt->execute();
    echo json_encode(["success" => true]);
    exit;
}


if ($method === 'DELETE' && isset($params['id'])) {
    $id = intval($params['id']);
    $stmt = $conn->prepare("DELETE FROM universities WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    echo json_encode(["deleted" => true]);
    exit;
}


http_response_code(400);
echo json_encode(["error" => "Unsupported request"]);
?>

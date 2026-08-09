<?php
// api/students.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';
$method = $_SERVER['REQUEST_METHOD'];

// 1. Get all students
if ($method === 'GET') {
    $result = $conn->query("SELECT * FROM students ORDER BY id DESC");
    $students = [];
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
    echo json_encode($students);
}

// 2. Add new student
if ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (!empty($data['name']) && !empty($data['admission_no'])) {
        $stmt = $conn->prepare("INSERT INTO students (admission_no, name, email, password, class, section) VALUES (?, ?, ?, ?, ?, ?)");
        $password = !empty($data['password']) ? $data['password'] : 'student123';
        $stmt->bind_param("ssssss", $data['admission_no'], $data['name'], $data['email'], $password, $data['class'], $data['section']);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Student Added Successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Admission No or Email already exists"]);
        }
    }
}

// 3. Delete student
if ($method === 'DELETE') {
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM students WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        echo json_encode(["status" => "success", "message" => "Student Deleted"]);
    }
}
?>
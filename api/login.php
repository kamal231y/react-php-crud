<?php
// login.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Pre-flight CORS handle
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'db.php';

$raw_input = file_get_contents("php://input");
$data = json_decode($raw_input, true);

if (!empty($data['email']) && !empty($data['password'])) {
    $email    = trim($data['email']);
    $password = trim($data['password']);

    // Database check (Email ya Username dono se login allow karega)
    $stmt = $conn->prepare("SELECT id, name, password, role FROM employees WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $email, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Password Verify (Hashed & Plaintext supports both)
        if (password_verify($password, $user['password']) || $password === $user['password']) {
            http_response_code(200);
            echo json_encode([
                "status"  => "success",
                "message" => "Login Successful",
                "user"    => [
                    "id"   => $user['id'],
                    "name" => $user['name'],
                    "role" => $user['role']
                ]
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Galat Password!"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "User Account nahi mila!"]);
    }
    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Email aur Password bharein!"]);
}
?>
<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once "db.php";

$method = $_SERVER['REQUEST_METHOD'];


/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
*/

if ($method === "OPTIONS") {
    exit;
}


/*
|--------------------------------------------------------------------------
| GET - Users List
|--------------------------------------------------------------------------
*/

if ($method === "GET") {

    $result = $conn->query(
        "SELECT * FROM users ORDER BY id DESC"
    );

    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode([
        "status" => true,
        "data" => $users
    ]);

    exit;
}


/*
|--------------------------------------------------------------------------
| POST - Add User
|--------------------------------------------------------------------------
*/

if ($method === "POST") {

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    $name  = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');

    if ($name === '' || $email === '') {

        echo json_encode([
            "status" => false,
            "message" => "Name and Email are required"
        ]);

        exit;
    }

    $stmt = $conn->prepare(
        "INSERT INTO users (name, email, phone)
         VALUES (?, ?, ?)"
    );

    $stmt->bind_param(
        "sss",
        $name,
        $email,
        $phone
    );

    if ($stmt->execute()) {

        echo json_encode([
            "status" => true,
            "message" => "User added successfully",
            "id" => $stmt->insert_id
        ]);

    } else {

        echo json_encode([
            "status" => false,
            "message" => "Failed to add user"
        ]);
    }

    exit;
}


/*
|--------------------------------------------------------------------------
| PUT - Update User
|--------------------------------------------------------------------------
*/

if ($method === "PUT") {

    $input = json_decode(
        file_get_contents("php://input"),
        true
    );

    $id    = intval($input['id'] ?? 0);
    $name  = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $phone = trim($input['phone'] ?? '');

    if ($id <= 0 || $name === '' || $email === '') {

        echo json_encode([
            "status" => false,
            "message" => "ID, Name and Email are required"
        ]);

        exit;
    }

    $stmt = $conn->prepare(
        "UPDATE users
         SET name = ?, email = ?, phone = ?
         WHERE id = ?"
    );

    $stmt->bind_param(
        "sssi",
        $name,
        $email,
        $phone,
        $id
    );

    if ($stmt->execute()) {

        echo json_encode([
            "status" => true,
            "message" => "User updated successfully"
        ]);

    } else {

        echo json_encode([
            "status" => false,
            "message" => "Failed to update user"
        ]);
    }

    exit;
}


/*
|--------------------------------------------------------------------------
| Invalid Request
|--------------------------------------------------------------------------
*/

echo json_encode([
    "status" => false,
    "message" => "Invalid request method"
]);

exit;
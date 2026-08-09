<?php
// db.php
$conn = new mysqli(
    "localhost",
    "root",
    "",
    "react_php"
);

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");
?>
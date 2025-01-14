<?php
session_start();

// Database connection
$conn = new mysqli("localhost", "root", "", "scsd_db");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle login
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        header('Location: admin-dashboard.html');
        exit();
    }
}

// Handle event submissions
if (isset($_POST['event_submit'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $date = $_POST['date'];

    // Handle image upload
    $target_dir = "uploads/";
    $image_url = $target_dir . basename($_FILES["image"]["name"]);
    move_uploaded_file($_FILES["image"]["tmp_name"], $image_url);

    $stmt = $conn->prepare("INSERT INTO events (title, description, date, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $description, $date, $image_url);
    $stmt->execute();
}

// Handle position submissions
if (isset($_POST['position_submit'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $requirements = $_POST['requirements'];
    $deadline = $_POST['deadline'];

    $stmt = $conn->prepare("INSERT INTO positions (title, description, requirements, deadline) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $title, $description, $requirements, $deadline);
    $stmt->execute();
}

$conn->close();
?>

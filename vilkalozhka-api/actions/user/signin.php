<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// echo "test";
// return;
ini_set('log_errors', 1);
ini_set('error_log', './error.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

include '../../database/database.php';
include '../../utils.php';

$input = file_get_contents('php://input');
error_log("Raw input: " . $input);

$input = json_decode($input, true);

$username = $input['username'] ?? '';
$password = $input['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    $data = [
        'status' => false,
        'data' => null,
        'message' => 'Email и пароль обязательны для заполнения'
    ];
    die(json_encode($data));
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(401);
    $data = [
        'status' => false,
        'data' => null,
        'message' => 'Неверный username'
    ];
    die(json_encode($data));
}

if (!password_verify($password, $user['password'])) {
    http_response_code(401);
    $data = [
        'status' => false,
        'data' => null,
        'message' => 'Неверный пароль'
    ];
    die(json_encode($data));
}

$token = generateToken();
$stmt = $pdo->prepare('INSERT INTO tokens (username, token) VALUES (?, ?)');
$stmt->execute([$user['username'], $token]);

header('Content-Type: application/json');
http_response_code(200);
$data = [
    'status' => true,
    'data' => [
        'token' => $token,
        'username' => $user['username']
    ],
    'message' => 'Успешная авторизация'
];
echo json_encode($data);

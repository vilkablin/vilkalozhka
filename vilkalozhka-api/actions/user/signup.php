<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

ini_set('log_errors', 1);
ini_set('error_log', './error.log');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}


$registrationSuccess = false;

include '../../database/database.php';
include '../../utils.php';

$input = file_get_contents('php://input');
error_log("Raw input: " . $input);


$input = json_decode($input, true);

$username = $input['username'] ?? '';
$email = $input['email'] ?? '';
$password = $input['password'] ?? '';
$password_r = $input['password_r'] ?? '';

if (empty($username) || empty($email) || empty($password) || empty($password_r)) {
    
    http_response_code(400);
    $data = [
        'status' => false,
        'data'=> null,
        'message' => 'Все поля обязательны для заполнения'
    ];
    die(json_encode($data));
}

if ($password !== $password_r) {

    http_response_code(400);
    $data = [
        'status' => false,
        'data'=> null,
        'message' => 'Пароли не совпадают'
    ];
    die(json_encode($data));
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? OR email = ?');
$stmt->execute([$username, $email]);
if ($stmt->rowCount() > 0) {

    http_response_code(409);
    $data = [
        'status' => false,
        'data'=> null,
        'message' => 'Пользователь с таким именем или email уже существует'
    ];
    die(json_encode($data));

}


$hashedPassword = password_hash($password, PASSWORD_BCRYPT);


$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");

$stmt->bindParam(':username', $username);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':password', $hashedPassword);

if ($stmt->execute()) {
    $registrationSuccess = true;
}

$token = generateToken();
$stmt = $pdo->prepare('INSERT INTO tokens (username, token) VALUES (?, ?)');
$stmt->execute([$username, $token]);


header('Content-Type: application/json');
if ($registrationSuccess) {
    http_response_code(201);
    $data = [
        'status' => true,
        'data'=> [
            'token'=>$token,
        ],
        'message' => 'Пользователь успешно зарегистрирован'
    ];
    die(json_encode($data));
} 

$data = [
    'status' => false,
    'data'=> null,
    'message' => 'Ошибка при регистрации',
];

http_response_code(400);
die(json_encode($data));



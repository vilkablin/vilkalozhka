<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, X-Requested-With");

ini_set('log_errors', 1);
ini_set('error_log', './error.log');

// Обработка предварительного запроса OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  header("Access-Control-Allow-Origin: http://localhost:5173");
  header("Access-Control-Allow-Methods: GET, OPTIONS");
  header("Access-Control-Allow-Headers: Authorization, X-Requested-With");
  http_response_code(200);
  exit;
}

error_log("Headers received: " . print_r(getallheaders(), true));


include '../../database/database.php';
include '../../utils.php';

$headers = getallheaders();
if (isset($headers['Authorization'])) {
  $authHeader = $headers['Authorization'];
  echo 'Authorization header: ' . $authHeader; // для отладки
} else {
  echo 'Authorization header not found';
}

<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Permite cualquier origen
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';


    function getUserByNickname() {
    $nickname = $_GET['nickname'] ?? '';

    if (empty($nickname)) {
        echo json_encode(['error' => 'Nickname no proporcionado']);
        return;
    }

    $userModel = new User();
    $userData = $userModel->getUserByNickname($nickname);

    if ($userData) {
        echo json_encode($userData);
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
}

?>
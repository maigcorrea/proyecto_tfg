<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    require_once '../config/connection.php';
    require_once '../models/user.php';
    require_once '../models/cookies_sesiones.php';
    


    function selectTags(){
        // Leer JSON directamente del cuerpo si $_POST está vacío
        // ⚠️ Aquí lees el cuerpo crudo JSON enviado desde axios
        $data = json_decode(file_get_contents('php://input'), true);
        $tagsArray = $data['tags'] ?? [];

        if (!is_array($tagsArray)) {
            echo json_encode(['success' => false, 'message' => 'Formato inválido']);
            return;
        }

        $tagsString = implode(',', array_map('trim', $tagsArray));

        require_once '../models/User.php';
        $userModel = new User();
        $success = $userModel->updateTags($_SESSION['user_id'], $tagsString);

        echo json_encode([
            'success' => $success,
            'tags' => $tagsArray
        ]);
    }
?>
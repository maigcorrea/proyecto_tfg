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
        
    $tagsString = $_REQUEST['tags'] ?? '';

    if (empty($tagsString)) {
        echo json_encode(['success' => false, 'message' => 'No se enviaron tags']);
        return;
    }

    $userModel = new User();
    $sesion = new Sesion();
    $usuario = $sesion->get_session("usu");
    $success = $userModel->selectTags($usuario, $tagsString);

    echo json_encode([
        'success' => $success,
        'tags' => explode(',', $tagsString)
    ]);
    }
?>
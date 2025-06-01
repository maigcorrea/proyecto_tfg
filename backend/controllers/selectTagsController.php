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
        
    /*$tagsString = $_REQUEST['tags'] ?? '';

    if (empty($tagsString)) {
        echo json_encode(['success' => false, 'message' => 'No se enviaron tags']);
        return;
    }*/

    // Lee el cuerpo de la petición como JSON
    $input = json_decode(file_get_contents('php://input'), true);
    $tagsArray = $input['tags'] ?? [];

    if (empty($tagsArray)) {
        echo json_encode(['success' => false, 'message' => 'No se enviaron tags']);
        return;
    }

    $userModel = new User();
    $sesion = new Sesion();
    $usuario = $sesion->get_session("usu");
    $success = $userModel->selectTags($usuario, $tagsArray); //Le pasamos el array directamente

    echo json_encode([
        'success' => $success,
        'tags' => $tagsArray // aquí estás devolviendo el array original de nombres
    ]);
    }
?>
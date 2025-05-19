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
        error_log(print_r($_POST, true)); 
        
         $tagsString = $_POST['tags'] ?? '';
         $user=$_SESSION["usu"];

        if (empty($tagsString)) {
            echo json_encode(['success' => false, 'message' => 'No se enviaron tags']);
            return;
        }

        $userModel = new User();
        $success = $userModel->selectTags($user, $tagsString);

        echo json_encode([
            'success' => $success,
            'tags' => explode(',', $tagsString)
        ]);
    }
?>
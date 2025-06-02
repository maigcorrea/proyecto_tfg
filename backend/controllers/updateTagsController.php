<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';

    function updateTags() {
        $id = $_GET['userId'];

        // Leer el JSON del cuerpo de la petición
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        // Asegurarse de que se recibe un array de tags
        if (!isset($data['tags']) || !is_array($data['tags'])) {
            echo json_encode(['success' => false, 'message' => 'No se han recibido las tags']);
            return;
        }

        $tags = $data['tags'];

        $user = new User();
        $result = $user->updateTags($id, $tags);

        echo json_encode($result);
    }
?>
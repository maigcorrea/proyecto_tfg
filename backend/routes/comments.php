<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");//Indicar que la respuesta del servidor será en formato JSON
    header("Access-Control-Allow-Credentials: true"); // Permite el uso de credenciales (como cookies)
    
    // 👉 Manejo explícito del preflight CORS
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    $action = isset($_GET['action']) ? $_GET['action'] : '';
    switch ($action){
        case 'createComment':
            require_once "../controllers/createCommentController.php";
            createComment();
        break;

        case 'getCommentsByPost':
            require_once "../controllers/getCommentsByPostController.php";
            getCommentsByPost();
        break;

        case 'getAllComments':
            require_once "../controllers/getAllCommentsController.php";
            getAllComments();
        break;
    }

?>
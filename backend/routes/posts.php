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

    require_once '../models/user.php';
    require_once '../models/cookies_sesiones.php';

    //Obtener el método HTTP usado en la solicitud (GET, POST, PUT, DELETE).
    $method = $_SERVER['REQUEST_METHOD'];
    //Obtener el valor de action pasado por parámetro en la url, si no está seteado el action se deja vacío
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    switch ($action) {
        case 'createPost':
            require_once "../controllers/createPostController.php";
            createPost();
        break;

        case 'getAllPosts':
            require_once "../controllers/getAllPostController.php";
        break;
        
        default:
            # code...
        break;
    }
?>
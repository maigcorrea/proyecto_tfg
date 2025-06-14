<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Permite cualquier origen
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';


    function getAllUsers() {
        $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
        $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;

        $session= new Sesion();
        $currentUser = $session->get_session('id');

        $userModel = new User();
        $usuarios = $userModel->getAllUsers($currentUser, $limit, $offset);

        

        echo json_encode([
            'success' => true,
            'usuarios' => $usuarios['users'],
            'total' => $usuarios['total']
        ]);
    }
?>
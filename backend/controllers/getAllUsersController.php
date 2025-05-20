<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Permite cualquier origen
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';


    function getAllUsers() {

        $session= new Sesion();
        $currentUser = $session->get_session('usu');

        $userModel = new User();
        $usuarios = $userModel->getAllUsers($currentUser);

        

        echo json_encode([
            'success' => true,
            'usuarios' => $usuarios
        ]);
    }
?>
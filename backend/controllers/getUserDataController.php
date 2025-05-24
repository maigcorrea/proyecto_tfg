<?php
    header("Access-Control-Allow-Origin: http://localhost:5173"); // Permite cualquier origen
    header("Access-Control-Allow-Methods: GET, POST");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");
    include_once '../config/connection.php';
    include_once '../models/user.php';

    function getDataUserProfile(){
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $currentSession = $_SESSION['id'];


        //Lista con los datos del usuario de la sesión
        $user=new User();
        $dataList=$user -> getDataUser($currentSession);

        return $dataList ;
    }
?>
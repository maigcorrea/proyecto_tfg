<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';


    function verifyPassword(){
        $sesion = new Sesion();
        $currentSession = $sesion->get_session("usu");

        //Leer el JSON del cuerpo de la petición
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        if(!isset($data['password'])) {
            echo json_encode(['success' => false, 'message' => 'No se ha recibido la contraseña']);
            return;
        }

        $password = $data['password'];

        $user=new User();
        $isValid = $user->checkLoginPassword($currentSession,$password);

        if ($isValid) {
            echo json_encode(['success' => true, 'message' => 'Contraseña correcta']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Contraseña incorrecta']);
        }
        

    }
?>
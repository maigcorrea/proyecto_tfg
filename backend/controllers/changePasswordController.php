<?php
    require_once '../config/connection.php';
require_once '../models/user.php';
require_once '../models/cookies_sesiones.php';

    function changePassword(){
        $sesion = new Sesion();
        $currentSesion = $sesion->get_session("id");

        //Leer el JSON del cuerpo de la petición
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);

        $password = $data['password'];

        if(!isset($password) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'No se ha recibido la contraseña']);
            return;
        }else if( preg_match('/\s/', $password)) { //PATRONES
            echo json_encode(['success' => false, 'message' => 'La contraseña no puede contener espacios']);
            return;
        }else if (strlen($password) < 8 || strlen($password) > 20) {
            echo json_encode(['success' => false, 'message' => 'La contraseña debe tener entre 8 y 20 caracteres']);
            return;
        }else if (!preg_match('/[A-Z]/', $password)) {
            echo json_encode(['success' => false, 'message' => 'Debe contener al menos una mayúscula']);
            return;
        }else if (!preg_match('/[0-9]/', $password)) {
            echo json_encode(['success' => false, 'message' => 'Debe contener al menos un número']);
            return;
        }else if (!preg_match('/[a-z]/', $password)) {
            echo json_encode(['success' => false, 'message' => 'Debe contener al menos una minúscula']);
            return;
        }else if (!preg_match('/[!@#$%^&*()\-_=+{};:,<.>]/', $password)) { // \W = no alfanumérico, _ incluido
            echo json_encode(['success' => false, 'message' => 'Debe contener al menos un carácter especial']);
            return;
        }

        

        $user = new User();
        $updated =$user->changePassword($currentSesion, $password);

        if($updated) {
            echo json_encode(['success' => true, 'message' => 'Contraseña cambiada correctamente']);
        }else{
            echo json_encode(['success' => false, 'message' => 'Error al cambiar la contraseña']);
        }
    }
?>
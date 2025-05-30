<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';

    function deleteUser(){
        $userId= $_GET['userId'];

        $user = new User();
        $deleted = $user->deleteUser($userId);

        if($deleted){
            echo json_encode([
                'success' => true,
                'message' => 'El usuario se ha eliminado correctamente'
            ]);
        }else{
            echo json_encode([
                'success' => false,
                'message' => 'Error al eliminar el usuario'
            ]);
        }
    }
?>
<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';


    function createPost(){
        $sesion= new Sesion();
        $currentSesion= $sesion->get_session("usu");

        //En base al nickname del usuario sacar su id(telefono)
        $user = new User();
        $id_telefono = $user -> getId($currentSesion);

        $contenido= $_POST["contenido"] ?? '';

        if (empty($contenido)) {
            echo json_encode(['error' => 'Contenido vacío']);
            http_response_code(400);
            return;
        }

        $post= new Post();
        $inserted = $post -> createPost($contenido, $id_telefono);

        if ($inserted) {
            echo json_encode(['success' => 'Post creado con éxito']);
        } else {
            echo json_encode(['error' => 'Error al crear el post']);
        }
    }
?>
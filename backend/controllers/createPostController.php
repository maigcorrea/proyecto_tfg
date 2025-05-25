<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';


    function createPost(){
        $sesion= new Sesion();
        $currentSesion= $sesion->get_session("usu");
        $id = $sesion->get_session("id");
       

        $contenido= $_POST["contenido"] ?? '';

        if (empty($contenido)) {
            echo json_encode(['error' => 'Contenido vacío']);
            http_response_code(400);
            return;
        }

        $post= new Post();
        $inserted = $post -> createPost($contenido, $id);

        if ($inserted) {
            echo json_encode([
                'success' => 'Post creado con éxito',
                'contenido' => $contenido,
                'fecha' => date('c'),
                'nickname' => $currentSesion,
            ]);
        } else {
            echo json_encode(['error' => 'Error al crear el post']);
        }
    }
?>
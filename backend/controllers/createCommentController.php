<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';

    function createComment(){
        $sesion = new Sesion();
        $currentSesion = $sesion->get_session("usu"); 
        $id = $sesion->get_session("id");
        

        if (!$id) {
            echo json_encode(['error' => 'No hay sesión activa']);
            http_response_code(401);
            return;
        }

        $content = $_POST['contenido'] ?? '';
        $postId = $_POST['postId'] ?? '';

        if (empty($content) || empty($postId)) {
            echo json_encode(['error' => 'Contenido o postId vacío']);
            http_response_code(400);
            return;
        }

        $comment = new Comment();
        $inserted = $comment->createComment($content, $id, $postId);

        if ($inserted) {
            echo json_encode([
                'success' => 'Comentario creado',
                'contenido' => $content,
                'fecha' => date('c'),
                'nickname' => $currentSesion,
            ]);
        } else {
            echo json_encode(['error' => 'Error al crear comentario']);
        }
    }
?>
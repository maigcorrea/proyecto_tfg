<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';
    include_once '../models/like.php';

    function createLike(){
        $currentSesion = new Sesion();
        $idUsuario = $currentSesion->get_session("id");

        $idPost = $_POST['postId'] ?? '';

        $like = new Like();
        $inserted = $like->createLike($idPost, $idUsuario);
        if ($inserted) {
            echo json_encode([
                'success' => true,
                'postId' => $idPost,
                'userId' => $idUsuario,
                'fecha' => date('c'),
            ]);
        } else {
            echo json_encode(['error' => 'Error al crear like']);
            http_response_code(500);
        }
    }
?>
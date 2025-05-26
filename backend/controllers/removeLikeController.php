<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';
    include_once '../models/like.php';

    function removeLike(){
        $currentSesion = new Sesion();
        $idUsuario = $currentSesion->get_session("id");

        $idPost = $_POST['postId'] ?? '';

        $like = new Like();
        $removed = $like->removeLike($idPost, $idUsuario);
        
        if($removed) {
            echo json_encode([
                'success' => true,
                'postId' => $idPost,
                'userId' => $idUsuario,
                'fecha' => date('c'),
            ]);
        } else {
            echo json_encode(['error' => 'Error al eliminar like']);
            http_response_code(500);
        }
    }
?>
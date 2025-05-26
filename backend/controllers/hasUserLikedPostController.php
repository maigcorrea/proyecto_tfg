<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';
    include_once '../models/comment.php';
    include_once '../models/like.php';


    function hasLikedPost() {
        $currentSesion = new Sesion();
        $idUsuario = $currentSesion->get_session("id");

        $idPost = $_GET['postId'] ?? '';

        $like = new Like();
        $liked = $like->hasUserLiked($idPost, $idUsuario);

        if ($liked) {
            echo json_encode([
                'success' => true,
                'postId' => $idPost,
                'userId' => $idUsuario,
                'fecha' => date('c'),
            ]);
        } else {
            echo json_encode(['success' => false]);
        }

    }
?>
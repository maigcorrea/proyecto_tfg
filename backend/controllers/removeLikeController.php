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
        
    }
?>
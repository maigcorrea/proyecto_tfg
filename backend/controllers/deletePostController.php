<?php
    include_once '../config/connection.php';
    include_once '../models/user.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/post.php';

    function deletePost(){
        $idPost = $_GET['postId'];

        $post = new Post();
        $deleted = $post->deletePost($idPost);
        
        if ($deleted) {
            echo json_encode(['success' => true, 'message' => 'Post eliminado correctamente.']);
        } else {
            echo json_encode(['error' => 'Error al eliminar el post.']);
        }
    }
?>
<?php
    include_once '../config/connection.php';
    include_once '../models/cookies_sesiones.php';
    include_once '../models/comment.php';

    function deleteComment(){
        $comment_id = $_GET['commentId'];

        $comment = new Comment();
        $deleted =$comment->deleteComment($comment_id);

        if ($deleted) {
            echo json_encode(['success' => true, 'message' => 'Comentario eliminado correctamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar el comentario.']);
        }
    }
?>